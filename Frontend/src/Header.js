import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style/Header.css';
import logo from './logo.svg';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import { Avatar, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { selectUser } from './features/userSlice';
import Dropdown from 'react-bootstrap/Dropdown'
import SidebarChat from './SidebarChat';
import axios from './axios.js'
import Pusher from 'pusher-js';

const pusher = new Pusher('470f630b8e55cfd2fd2c', {
    cluster: 'mt1'
  });

const Header = () => {

    const user = useSelector(selectUser);

    const [chats, setChats] = useState([]);

    const getChats = () => {
        axios.get('/get/conversationList')
        .then((res) => {
            setChats(res.data)
        })
    }

    useEffect(() => {
        getChats()
        const channel = pusher.subscribe('chats');
        channel.bind('newChat', function (data) {
            getChats()
        })
       
    }, [])
    
    return (
        <div className='header'>
            <div className="header__left">
                <img src={logo} alt="logo"/>
                

            </div>
            <div className="header__input">
                <SearchIcon/>
                <input placeholder='مانعملوش بحث' type="text"/>
            </div>
            

            <div className="header__centre">

                <div className="header__option header__option--active">
                    <HomeIcon fontSize='large'/>
                </div>
                
                <div className="header__option">
                    <SubscriptionsOutlinedIcon fontSize='large'/>
                </div>
                <div className="header__option">
                    <StorefrontOutlinedIcon fontSize='large'/>
                
                </div>
                
            
            </div>

            <div className="header__right">

                <div className="header__info">
                    <Avatar src={user.photo}/>
                    <h4>{user.displayName}</h4>
                </div>

                <IconButton>
                    <AddIcon/>
                </IconButton>
                   
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic_header">
                        <ForumIcon/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='MesgDropDown__header'>

                        {chats.map(({ id, name, timestamp }) => (
                    
                            <SidebarChat key={id} id={id} chatName={name} timestamp={timestamp}/>
                
                        ))}
                        
                    </Dropdown.Menu>
                </Dropdown>
                
                <IconButton>
                    <NotificationsActiveIcon/>
                </IconButton>
                
                <IconButton>
                    <ExpandMoreIcon/>   
                </IconButton>
            </div>

        </div>
    )
}

export default Header