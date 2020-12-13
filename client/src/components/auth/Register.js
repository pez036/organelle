import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import Welcome from "../layout/Welcome";
import "./auth.css";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const redirectBack = () => history.push('/');

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };
      const registerURL = process.env.NODE_ENV === "production"?
        "https://organelle.pzny.xyz/users/register":
        "http://localhost:8080/users/register";
      const loginURL = process.env.NODE_ENV === "production"?
        "https://organelle.pzny.xyz/users/login":
        "http://localhost:8080/users/login";
      await Axios.post(registerURL, newUser);
      const loginRes = await Axios.post(loginURL, {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="register-page">
      <Welcome />
      <div className="register-bar">
        <h2>Register</h2>
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <form className="form" onSubmit={submit}>
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Verify password"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />

          <label htmlFor="register-display-name">Display name</label>
          <input
            id="register-display-name"
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <input type="submit" value="Register" />
          <button onClick={redirectBack}>Go Back</button>
        </form>
      </div>
    </div>
  );
}