import { Link } from "react-router-dom";
import "./navibar.css";
import {useHistory} from 'react-router-dom';
import {useContext} from 'react';
import UserContext from "../../context/UserContext";
import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';


export default function NaviBar() {
    const {userData, setUserData} = useContext(UserContext);
    const history = useHistory();
    const handelLogout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem('auth-token', "");
        history.push("/");
    };
return (
    <div className = "navibar-default">

        <ul>
        <li><a href="/calendar" className ="navibar-side">Calendar</a></li>
        <li><a href="/todo" className ="navibar-side">Todo</a></li>
        <li><a href="https://canvas.ucsd.edu" className ="navibar-side">Canvas</a></li>
        <li><a href="/profile" className ="navibar-side">Profile</a></li>
        </ul>
        <div className="logout-button">
            <Button variant="outline-danger" onClick={handelLogout}>Logout</Button>
        </div>
    </div>
);
}
