import { Link } from "react-router-dom";
import "./navibar.css";


export default function NaviBar() {
return (
    <div class = "navibar-default">
      <navibar>
        <ul>
        <a href="#" class ="navibar-side">Home</a>
        <a href="#" class ="navibar-side">Todo</a>
        <a href="#" class ="navibar-side">Canvas</a>
        <a href="#" class ="navibar-side">Settings</a>
        </ul>
        </navibar>
    </div>
);
}
