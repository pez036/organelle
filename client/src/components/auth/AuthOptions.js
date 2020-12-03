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
                localStorage.getItem('auth-token') !== "" ? (<button onClick={redirectLogout}> Log out</button>) : (
                    <>
                        <button className="btn" onClick={redirectRegister}> Register </button>
                        <button className="btn" onClick={redirectLogin}> Log In </button>
                    </>
                )
            }
        </nav>
    );
}