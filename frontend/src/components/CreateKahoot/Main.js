import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InforQuiz from './InforQuiz';
import ListQues from './ListQues'
import NewQues from './NewQues'
Main.propTypes = {
    
};

function Main(props) {
    const [listState, setListState] = useState({
        quiz_name:'',
        

    })
    useEffect(()=>{

    })
    return (
        <div>
            <InforQuiz/>
            <ListQues/>
            <NewQues/>
        </div>
    );
}

export default Main;