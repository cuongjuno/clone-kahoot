import React, { useState } from 'react';
import './App.css';
import Header from './components/Header'
import Quiz from './Quiz';
import Game from './components/Game/Game'
function App() {
  
   // const [quiz, setQuiz] =useState({
   //    question:
   // })

   return (
      <div className="app">
         {/* <Header/> */}
         {/* <Quiz/> */}
         <Game/>
      </div>
   )
}

export default App;
