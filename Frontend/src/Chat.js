import React, { useEffect, useState } from 'react';
import './style/Chat.css';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EmojiIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message'
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from './features/chatSlice';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move';
import axios from './axios.js'
import Pusher from 'pusher-js';
import {auth} from './Firebase'
import Picker from 'emoji-picker-react';
import Dropdown from 'react-bootstrap/Dropdown'

const pusher = new Pusher('470f630b8e55cfd2fd2c', {
    cluster: 'mt1'
  });


function Chat() {
    
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const user = useSelector(selectUser);

    
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        
      };

    const getConversation = (chatId) => {
        if (chatId) {
            axios.get(`/get/conversation?id=${chatId}`).then((res) => {
                setMessages(res.data[0].conversation)
            })
        }
    }

    useEffect (() => {
        pusher.unsubscribe('messages')
    
        getConversation(chatId)

        const channel = pusher.subscribe('messages');
        channel.bind('newMessage', function (data) {
            getConversation(chatId)
        });

    }, [chatId])

    const sendMessage = (e) => {
        e.preventDefault();
        axios.post(`/new/message?id=${chatId}`, {
            message: input,
            timestamp: Date.now(),
            user: user
        })

        setInput("");
    };

    const deleteConversation = (e) => {
        console.log("Hi",chatId);

        if (chatId) {
            axios.delete(`/delete/conversation?id=${chatId}`).then((res) => {
                //setMessages(res.data[0].conversation)
                
                console.log('chat deleted')
            })
        }
    }

    return (
        <div className='chat' >

        {/* chat header */}
            <div className='chat__header'>
                <h4>To:
                    <span className='chat__name'> {chatName}</span>
                </h4>
                
                {/*<IconButton className='delete__icon'>
                    <DeleteIcon />
                </IconButton> */ }

                <button onClick={deleteConversation}>Delete me</button>
                
                <button onClick={() => auth.signOut()} >Log out</button>
            </div>
        {/* chat messages */}

        <div className='chat__messages'>
            
            <FlipMove>
                {messages.map(({ user, _id, message, timestamp }) => (
                <Message key={_id} id={_id} sender={user} message={message} timestamp={timestamp} />
                    ))}
            </FlipMove>
            
        </div>


        {/* chat input */}
            <div className='chat__input'>
                <form>
                    
                    <input 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder='ikteb hneye' type='text'/>
                    
                    <button onClick={sendMessage}>Send Message</button>
                    
                </form>

                <IconButton className='send__icon' disabled={!input} type='submit' onClick={sendMessage}>
                    <SendIcon/>
                </IconButton>

                <Dropdown drop='up'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <EmojiIcon/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Picker onEmojiClick={onEmojiClick} />
                    </Dropdown.Menu>
                </Dropdown>             

            </div>
        </div>
    )
}

export default Chat