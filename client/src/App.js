import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/pages/Home";
import Todo from "./components/pages/Todo";
import Calendar from "./components/pages/Calendar";
import Profile from "./components/pages/Profile";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ResetPassword from "./components/auth/ResetPassword";
import UserContext from  "./context/UserContext";
import PrivateRoute from "./auth/PrivateRoute";
import Axios from "axios";
// import "./style.css";

export default function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect( () => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tivURL = process.env.NODE_ENV === "production" ?
        "http://organelle.pzny.xyz/users/tokenIsValid":
        "http://localhost:8080/users/tokenIsValid";

      const tokenRes = await Axios.post(tivURL, null, {header: {"x-auth-token": token}});

      if (tokenRes.data) {
        const usersURL = process.env.NODE_ENV === "production" ?
            "http://organelle.pzny.xyz/users/users":
            "http://localhost:8080/users/users";
        const userRes = await Axios.get(usersURL,
          {headers: {"x-auth-token": token}}
        );
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }
    checkLoggedIn();
  }, [])

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{userData, setUserData}}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/reset/:id' component={ResetPassword} />
              <PrivateRoute path='/todo' component={Todo} />
              <PrivateRoute path='/calendar' component={Calendar} />
              <PrivateRoute path='/profile' component={Profile} />
            </Switch>
        </ UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
