import React from 'react';
import './Game.css';
import triangle from '../../Assests/triangle.svg'
import diamond from '../../Assests/diamond.svg'
import square from '../../Assests/square.svg'
import circle from '../../Assests/circle.svg'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export default function GameQuestions(props){
    return(
        <div className='questions-container' >
            <div style={{fontSize:"45px"}}>
                <CountdownCircleTimer
                    onComplete={() => {
                        // do your stuff here
                        return [true, 1500] // repeat animation in 1.5 seconds
                        }}
                    isPlaying
                    size={150}
                    duration={props.timeCoundown}
                    colors={[
                    ['#004777', 0.33],
                    ['#F7B801', 0.33],
                    ['#A30000', 0.33],
                    ]}
                >
                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
            </div>            
            <h1 className='player-name'>{props.question}</h1>
            <div className='questions-grid' >
                <div className='question q1'>
                <div className='shape-container' >
                    <img src={triangle} alt='' className='shape-question' />
                </div> 
                    <p id='player-join' >{props.answer1}</p>
                 </div> 
                <div className='question q2'>
                    <div className='shape-container'>
                    <img src={diamond} alt='' className='shape-question' />
                    </div> 
                    <p id='player-join'>{props.answer2}</p>
                 </div>
                <div className='question q3'>
                    <div className='shape-container'>
                    <img src={square} alt='' className='shape-question' />
                    </div> 
                    <p id='player-join'>{props.answer3}</p>
                 </div>
                <div className='question q4'>
                    <div className='shape-container'>
                     <img src={circle} alt='' className='shape-question' />
                    </div> 
                     <p id='player-join'>{props.answer4}</p>
                 </div>
            </div> 
        </div> 
    )
}