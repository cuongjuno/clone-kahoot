import React, { useState } from 'react';
import './App.css';
import Header from './components/Header'
import Quiz from './Quiz';
import Game from './components/Game/Game'
import InforQuiz from './components/CreateKahoot/InforQuiz';

function App() {
  
   // const [quiz, setQuiz] =useState({
   //    question:
   // })

   return (
      <div className="app">
         {/* <Header/> */}
         {/* <Quiz/> */}
         <Game/>
         {/* <InforQuiz/> */}
      </div>
   )
}

export default App;
