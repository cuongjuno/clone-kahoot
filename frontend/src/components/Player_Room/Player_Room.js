import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

Player_Room.propTypes = {
    pin: PropTypes.number,
    nickname: PropTypes.string,
    view: PropTypes.string
};
Player_Room.defaultProps={
    pin: null,
    nickname:"",
    view:"id_room"
}
function Player_Room(props) {
    const {pin, nickname} = props;
    const [view, setView] = useState('id_room')
    function handleInput(e){
        
    }
    return (
        <div className="component-container">
            {
                view=="id_room"
                    ?
                    <div className='landing-wrapper' >
                        <div className='logo-container' >
                        <img src={Kwizz} alt='Kwizz logo' className='logo'/>
                        </div> 
                        <div className='player-input-wrapper' >
                            <input type='number' value={this.state.pin} placeholder='Kwizz! PIN' onChange={this.handleInput} className='input-user'/>
                            <button onClick={this.handleToggle} className='btn-enter' >Enter</button>
                        </div> 
                    </div>
                    :
                    <div className='landing-wrapper' >
                        <div className='logo-container' >
                        <img src={Kwizz} alt='Kwizz logo' className='logo'/>
                        </div> 
                        <div>
                            <input type='text' value={this.state.nickname} placeholder='Nickname' onChange={this.handleNicknameInput} className='input-user' />
                            <Link to='/player'>
                                <button onClick={this.handleGo} className='btn-enter' >OK, go!</button>
                            </Link>
                        </div> 
                    </div>
            }
        </div>
    );
}

export default Player_Room;