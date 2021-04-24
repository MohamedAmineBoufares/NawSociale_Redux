import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {setChat} from './features/chatSlice';
import './style/SidebarChat.css';
import * as timeago from 'timeago.js';
import axios from './axios.js';
import Pusher from 'pusher-js'
import ReactEmoji from 'react-emoji'

const pusher = new Pusher('470f630b8e55cfd2fd2c', {
    cluster: 'mt1'
  });

function SidebarChat({id, chatName}) {
    
    const dispatch = useDispatch();
    const [chatInfo, setChatInfo] = useState([]);

    const [lastMsg, setLastMsg] = useState('');
    const [lastPhoto, setLastPhoto] = useState('');
    const [lastTimestamp, setLastTimestamp] = useState('');

    const getSidebarElement = () => {
        axios.get(`/get/lastMessage?id=${id}`).then((res) => {
            setLastMsg(res.data.message)
            setLastPhoto(res.data.user.photo)
            setLastTimestamp(res.data.timestamp)
        })
    }

    useEffect (() => {
        
        getSidebarElement()

        const channel = pusher.subscribe('messages');
        channel.bind('newMessage', function (data) {
          getSidebarElement()
        });

    }, [id]);
    
    return (
        <div 
        onClick={() => 
            dispatch(
                setChat({
                    chatId: id,
                    chatName: chatName,
                })
            )
        } 
        className='sidebarChat'>
            <Avatar src={lastPhoto}/>
            <div className='sidebarChat__info'>
                <h3>{chatName}</h3>
                <p className='last__message'>{ReactEmoji.emojify(lastMsg)}</p>
                
                <small>
                {timeago.format(new Date(parseInt(lastTimestamp)).toUTCString())}
                {/*new Date(parseInt(lastTimestamp)).toUTCString()*/}
                </small>
            </div>
        </div>
    )
}

export default SidebarChat
