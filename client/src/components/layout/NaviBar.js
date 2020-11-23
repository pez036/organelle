import { Link } from "react-router-dom";
import "./navibar.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function NaviBar() {
return (
    <div className = "navibar-default">
        <ul>
        <li><a href="/calendar" className ="navibar-side">Calendar</a></li>
        <li><a href="/todo" className ="navibar-side">Todo</a></li>
        <li><a href="https://canvas.ucsd.edu" className ="navibar-side">Canvas</a></li>
        <li><a href="/profile" className ="navibar-side">Profile</a></li>
        </ul>
        <div className="logout-button">
            <Button variant="outline-danger">Logout</Button>
        </div>
    </div>
);
}
