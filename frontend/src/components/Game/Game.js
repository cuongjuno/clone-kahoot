import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { Socket } from 'socket.io-client';
import { debounce, duration } from '@material-ui/core';
import GameQuestions from './GameQuestions'
import GameQuestionOver from './Game_Question_Over'
import './Game.css'


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
        }
    ]
    useEffect(() => {
        // tạo mã pin
        setState({...state, listQuestion:listTestQUiz, listPlayer:listTestPlayer, pin:generatePin()}) // ==> get data from DB
    }, [])
    function generatePin() {
        let newPin = Math.floor(Math.random() * 9000, 10000)
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
        <p key={player.id} className="player-name">{player.name}</p>
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
            <div className='pin'>
                <p id='player-pin'>Pin Code</p>
                <h1>{state.pin}</h1>
            </div> 
            {
                !state.isPlaying && !state.questionOver && !state.gameOver ?
                    <div className='btn-players' >
                        <button onClick={() => startGame()}className='btn-play' >Play</button>
                        <p className='player-name' id='player-join'>Players joined!</p>
                        {mappedPlayersInRoom}
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