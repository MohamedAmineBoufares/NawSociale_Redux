import { Avatar } from '@material-ui/core';
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import './style/Message.css';
import ReactEmoji from 'react-emoji'

const Message = forwardRef(
    (
    { id, sender, message, timestamp }, 
    ref 
    ) => {

    const user = useSelector(selectUser);

    return (
        <div 
            ref={ref} 
            className= {`message ${user.email === sender.email && 'message__sender'}`}>
            
            <Avatar className='message__photo' src={sender.photo}/>
            <p>{ReactEmoji.emojify(message)}</p>
            <small>{new Date(parseInt(timestamp)).toDateString()}</small>
        </div>
    )
})

export default Message
