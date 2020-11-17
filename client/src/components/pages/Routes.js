import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';

export default function AuthOptions() {
    const {userData, setUserData} = useContext(UserContext);
    const history = useHistory();

    const reidrectCalendar = () => history.push('/calendar');
    const redirectTodo = () => history.push('/todo');
    return (
        <nav className="routes">
            {
                !userData.user ? (<></>) : (
                    <>
                        <button onClick={reidrectCalendar}> Calendar </button>
                        <button onClick={redirectTodo}> Todo </button>
                    </>
                )
            }
        </nav>
    );
}