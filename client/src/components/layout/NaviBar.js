import { Link } from "react-router-dom";
import "./navibar.css";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function NaviBar() {
return (
    <div className = "navibar-default">
        <ul>
        <a href="#" className ="navibar-side">Home</a>
        <a href="#" className ="navibar-side">Todo</a>
        <a href="#" className ="navibar-side">Canvas</a>
        <a href="#" className ="navibar-side">Settings</a>
        </ul>
    </div>
);
}
