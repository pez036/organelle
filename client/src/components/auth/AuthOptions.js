import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';

export default function AuthOptions() {
    const {userData, setUserData} = useContext(UserContext);
    const history = useHistory();

    const redirectRegister = () => history.push('/register');
    const redirectLogin = () => history.push('/login');
    const redirectLogout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem('auth-token', "");
    };
    return (
        <nav className='auth-options'>
            {
                userData.user ? (<button onClick={redirectLogout}> Log out</button>) : (
                    <>
                        <button onClick={redirectRegister}> Register </button>
                        <button onClick={redirectLogin}> LogIn </button>
                    </>
                )
            }
        </nav>
    );
}