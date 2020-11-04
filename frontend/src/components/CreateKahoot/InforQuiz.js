import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './InforQuiz.css'

InforQuiz.propTypes = {
    
};

function InforQuiz(props) {
    const [stateInfor, setStateInfor] = useState({
        title:'',
        description:'',
        urlImgQuiz:''
    })
    function handleSubmit(){

    }
    function onFileChange(){

    }
    return (
        <div className=' infor-kahoot '>
            <form onSubmit={handleSubmit} className='style-form '>
                <div className='input-form d-flex justify-content-center'> 
                    <div className='mr-3 '>
                        <div className='title-kahoot'>
                            <label>Title</label>
                            <input type='text' placeholder='Enter kahoot title...' maxLength='95'/>
                        </div>
                        <div className='description-kahoot'>
                            <label>Description</label>
                            <textarea type='text' resize='none'  placeholder='Enter description...' maxLength='280' rows='5' />
                        </div>
                    </div>
                    <div className=''>
                        <div className='img-kahoot'>
                            <label>Cover image</label>
                            <input type='file'  accept='image/png,image/jpeg,image/jpg' onChange={onFileChange}/>
                        </div>
                    </div>
                </div>
                <div className='button-form d-flex justify-content-center'>
                    <button className='btn-danger'>cancel</button>
                    <button className='btn-success'>save</button>
                </div>
            </form>
        </div>
    );
}

export default InforQuiz;