import "./navibar.css";
import {useHistory} from 'react-router-dom';
import { Link } from "react-router-dom";
import {useContext} from 'react';
import UserContext from "../../context/UserContext";
import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';


export default function NaviBar() {
    const {setUserData} = useContext(UserContext);
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
    <nav className = "navibar-default navbar-dark">
      {/* <h3>Welcome <script type="text/javascript">
        document.write(displayName)
      </script>!</h3> */}
      <Link to="/">
        <h1 className="logo">ORGANELLE</h1>
      </Link>
      <ul className ="navbar-nav">
        <li className ="nav-item navibar-side">
          <a href="/calendar" className ="nav-link">Calendar</a>
          <div class="dropdown-divider"></div>
          <a href="/todo" className ="nav-link">Todo</a>
          <div class="dropdown-divider"></div>
          <a href="https://canvas.ucsd.edu" className ="nav-link">Canvas</a>
          <div class="dropdown-divider"></div>
          <a href="/profile" className ="nav-link">Profile</a>
        </li>
        <div className="logout-button">
            <Button variant="outline-danger" onClick={handelLogout}>Logout</Button>
        </div>
      </ul>
    </nav>
  );
}
