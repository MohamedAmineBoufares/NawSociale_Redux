import React from 'react';
import './style/IMessage.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Chat from './Chat';

function IMessage() {
    return (
        
        <div className='imessage'>
            {/* Header */}

            <Header className='header'/>

            {/* sidebar */}
            <div className='app__body'>
                <Sidebar/>
                
                {/* chat */}
                <Chat/>
            </div>
            
        </div>
    )
}

export default IMessage
