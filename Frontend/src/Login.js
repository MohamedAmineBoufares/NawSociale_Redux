import { Button } from '@material-ui/core';
import React from 'react';
import {auth, provider} from './Firebase'
import './style/Login.css';

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider)
        .catch((error) => alert(error.message));
    }

    return (
        <div className='login'>
            <div className='login__logo'>
                <img src='https://www.seekpng.com/png/full/138-1387775_login-to-do-whatever-you-want-login-icon.png'
                    alt='a yellow login logo'
                />
            </div>

            <Button onClick={signIn}>Sign In BALIIZ !</Button>
        </div>
    )
}

export default Login
