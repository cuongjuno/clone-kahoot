import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { Socket } from 'socket.io-client';
import { debounce, duration } from '@material-ui/core';
import GameQuestions from './GameQuestions'
import GameQuestionOver from './Game_Question_Over'
import './Game.css'
import logo from '../../assets/logo.svg'
import listPlayerJson from './listPlayer.json'

function Game(props) {
    const [state, setState] = useState({
        pin: 0,
        timer: 0,
        isPlaying: false,
        gameOver: false,
        questionOver: false,
        currentQuestion: 0,
        listQuestion: [

        ],
        listPlayer: [],
        charts: [5]
    })
    var listTestQUiz = [
        {
            ques: "Chon dap an",
            imgDetail: "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg",
            listAnswer: ["A", "B", "C", "D"],
            correctAnswer: 3,
            time: 3,
            point: 1000
        },
        {
            ques: "Chon dap an2",
            imgDetail: "https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg",
            listAnswer: ["A", "B", "C", "D"],
            correctAnswer: 3,
            time: 2,
            point: 1000
        },
    ]
    // var listTestPlayer = JSON.parse(listPlayer)
    var listTestPlayer=[
        {id: 1,
            name: "anh a",
            score: 0,
            qAnswered: false, // da tra loi chua
            answeredCorrect: false // tra loi dung chua
        },
        {   
            id: 2,
            name: "anh b",
            score: 0,
            qAnswered: false, // da tra loi chua
            answeredCorrect: false // tra loi dung chua
        },
        {
            id: 3,
            name: "anh c",
            score: 0,
            qAnswered: false, // da tra loi chua
            answeredCorrect: false // tra loi dung chua
        },        {id: 1,
            name: "anh a",
            score: 0,
            qAnswered: false, // da tra loi chua
            answeredCorrect: false // tra loi dung chua
        },
        {   
            id: 2,
            name: "anh b",
            score: 0,
            qAnswered: false, // da tra loi chua
            answeredCorrect: false // tra loi dung chua
        },
        {
            id: 3,
            name: "anh c",
            score: 0,
            qAnswered: false, // da tra loi chua
            answeredCorrect: false // tra loi dung chua
        },        {id: 1,
            name: "anh a",
            score: 0,
            qAnswered: false, // da tra loi chua
            answeredCorrect: false // tra loi dung chua
        },
        {   
            id: 2,
            name: "anh b",
            score: 0,
            qAnswered: false, // da tra loi chua
            answeredCorrect: false // tra loi dung chua
        },
        {
            id: 3,
            name: "anh c",
            score: 0,
            qAnswered: false, // da tra loi chua
            answeredCorrect: false // tra loi dung chua
        }
    ]
    useEffect(() => {
        // tạo mã pin
        setState({...state, listQuestion:listTestQUiz,listPlayer: listPlayerJson, pin:generatePin()}) // ==> get data from DB
    }, [])
    function generatePin() {
        // console.log(listPlayer)
        let newPin = Math.floor(Math.random() * 9000000, 10000000)
        return newPin;
        // Socket.emit('host-join', { pin: newPin })
        // ==> đưa pin lên db
    }

    function addPlayer(name, id) {
        let player = {
            id: id,
            name: name,
            score: 0,
            qAnswered: false, // da tra loi chua
            answeredCorrect: false // tra loi dung chua
        }
        let newPlayers = [...state.listPlayer]
        newPlayers.push(player) // them player vao list
        setState({ ...state, listPlayer: newPlayers })
    }
    function submitAnswer(name, answer) {
        // => lay ra Player vua submit
        let playerSummited = state.listPlayer.filter(player => player.name === name);
        let updatedListPlayer = state.listPlayer.filter(player => player.name !== name);
        playerSummited[0].qAnswered = true; // chuyen state da tra loi cau hoi
        answer === state.listQuestion[state.currentQuestion].correctAnswer
            ? playerSummited[0].answeredCorrect = true
            : playerSummited[0].answeredCorrect = false
        updatedListPlayer.push(playerSummited[0]) // them lai player vua submit vao list
        setState({ ...state, listPlayer: updatedListPlayer })
    }
    function getChartsScore() {
        let unsorted = [...state.listPlayer];
        let sorted = unsorted.sort((a, b) => b.score - a.score)
        setState({ ...state, charts: sorted.slice(0, 5) })
    }
    function questionOver() {
        // Socket.emit('question-over', state.pin); 
        let updatedListPlayer = [...state.listPlayer];
        updatedListPlayer.forEach((player) => {
            player.qAnswered = false;
            player.answeredCorrect = false;
        })
        getChartsScore()
        setState({...state,
            questionOver: true,
            currentQuestion: state.currentQuestion + 1,
            listPlayer: updatedListPlayer
        })
    }
    function timeKeeper() {
        let internalTimer = state.listQuestion[state.currentQuestion].time;
        // let internalTimer = 20;
        // setState({...state, listQuestion:listX})
        console.log(state.pin)
        console.log(state.listQuestion)
        let cloneListPlayer = [...state.listPlayer];
        setState({...state, questionOver: false });
        function timeCheck() {
            let checkAnswer = () => {
                let pAnswered = 0;
                cloneListPlayer.forEach((player) => {
                    if(player.qAnswered) ++pAnswered  // dem so nguoi da tra loi
                })
                cloneListPlayer.forEach((player) => {
                    if (player.answeredCorrect) {
                        player.score += (state.listQuestion[state.currentQuestion].point - internalTimer * 10)
                        // Socket.emit('sent-info', { id: player.id, score: player.score, answeredCorrect: player.answeredCorrect })
                    }
                })
                // ==> đổ dữ liệu player vào mới hoạt động
                if(pAnswered === state.listPlayer.length) internalTimer=0
                internalTimer-=1;
                console.log(internalTimer)
            }
            let endQuestion=()=>{
                clearInterval(timeKept);
                questionOver();
            }
            return internalTimer>0
            ? checkAnswer()       // kiem tra dap an, tinh toan score
            :endQuestion()        // ket thuc cau hoi
        }
        let timeKept=setInterval(()=>{timeCheck()},1000) // lap lai timeCheck sau 1s
        return timeKept
    }
    function nextQuestion() {
        timeKeeper(); // tinh diem score
        if(state.listQuestion.currentQuestion === state.listQuestion.length)
            setState({ ...state, gameOver: true });
            // : Socket.emit('next-question', state.pin) // push pin len
        setState({...state,  questionOver: false })
    }
    function startGame() {
        if(state.listPlayer.length>=0){
            nextQuestion();
            setState({...state,isPlaying:true});
        }
        else{
            alert('You need at least 3 players to start')
        }
    }
    var mappedPlayersInRoom=state.listPlayer.map(player=>{
        return(
        <div key={player.id} className="col-md-2 p-5">
            <span>{player.name}</span>
        </div>
        )
    })
    var Charts=()=>{
        return(
            <div>
                <h2 className='leaderBoard'>1st Place: {props.leaderboard[0].name}</h2>
                <h2 className='leaderBoard'>2nd Place: {props.leaderboard[1].name}</h2>
                <h2 className='leaderBoard'>Last Place: {props.leaderboard.pop().name}</h2>
            </div>

        )
    }
    return (
        <div className='component-container' >
            <div className="test">
                <div className="test_2">
                    <div className="test_3">
                        <div className="test_4">
                            <div className="test_5">
                                <div className="test_6">
                                    <div>Join at <strong>www.kahoot.it</strong></div>
                                    <div>or with the <strong>Kahoot! app</strong></div>
                                </div>
                            </div>
                            <div className="test_5_1">
                                <div className="test_5_1_a">Game PIN:</div>
                                <div className="test_5_1_b">{state.pin}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='pin' id='player-pin'> */}
                {/* Pin Code: {state.pin} */}
                {/* <div id='player-pin'></div> */}
                {/* <div>{state.pin}</div> */}
            {/* </div>  */}
            {
                !state.isPlaying && !state.questionOver && !state.gameOver ?
                    <div>
                        <div className='btn-players row justify-content-between' >
                            <div className='col-md-2'>
                                <div className='player-count'>
                                <span className="icon__Icon-xvsbpg-0 bJpEJN player-counter__Icon-fb3lj4-1 iItBrS" style={{display: 'inline-block', verticalAlign: 'middle', width: '4vmin', height: '4vmin'}}>
                                    <svg id="icon1" data-functional-selector="icon" viewBox="0 0 32 32" focusable="false" stroke="none" strokeWidth={0}>
                                        <path 
                                            d="M16,16 C13.2385763,16 11,13.7614237 11,11 C11,8.23857625 13.2385763,6 16,6 C18.7614237,6 21,8.23857625 21,11 C21,13.7614237 18.7614237,16 16,16 Z M25,24.3125 L7,24.3125 C7,20.2739178 11.0294373,17 16,17 C20.9705627,17 25,20.2739178 25,24.3125 Z" 
                                            style={{fill: 'rgb(255, 255, 255)'}}>
                                        </path>
                                    </svg>
                                </span>
                                <div style={{    
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '3.5vmin',
                                                lineHeight: '3.7vmin',
                                            }}>    
                                    {state.listPlayer.length}
                                </div>    
                                </div>
                            </div>
                            <div className='col-md-2'> 
                                <img src={logo} alt="logo" height="55"/>
                            </div>
                            <div className='col-md-2 '>
                                <button onClick={() => startGame()} className='btn-play ' >Play</button>
                            </div>
                        </div>
                        <section className="list-player-joined">
                            <div className="row justify-content-around ">{mappedPlayersInRoom}</div>
                        </section>
                    </div>
                    :
                    state.isPlaying && !state.questionOver && !state.gameOver ?
                        <GameQuestions
                            timeCoundown={state.listQuestion[state.currentQuestion].time}
                            question={state.listQuestion[state.currentQuestion].ques}
                            answer1={state.listQuestion[state.currentQuestion].listAnswer[0]}
                            answer2={state.listQuestion[state.currentQuestion].listAnswer[1]}
                            answer3={state.listQuestion[state.currentQuestion].listAnswer[2]}
                            answer4={state.listQuestion[state.currentQuestion].listAnswer[3]}
                            questionOver={questionOver}
                            charts={Charts} />
                        :
                        <GameQuestionOver 
                            nextQuestion={nextQuestion} 
                            leaderboard={state.charts} 
                            lastQuestion={state.listQuestion.length === state.currentQuestion}  />
            }
        </div>
    );
}

export default Game;