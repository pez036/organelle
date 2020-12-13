/**
 * Name: Login.js
 * Function: Login 
 */

import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import Welcome from "../layout/Welcome";
import "./auth.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Login() {

  const [show, setShow] = useState(false);
  function handleClose() {
      return setShow(false);
  }
  function handleShow() {
      return setShow(true);
  }
  
  const [forgotEmail, setforgotEmail] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const redirectBack = () => history.push('/');

  function resetRequestSubmit(){
    const forgotURL = process.env.NODE_ENV === "production"?
    "http://organelle.pzny.xyz/users/forgot" :
    "http://localhost:8080/users/forgot";
    const body = {"email": forgotEmail};
    Axios.post(forgotURL, body)
    .then(res => {
      window.alert(res.data.msg);
      setforgotEmail(undefined);
      return setShow(false);
    })
    .catch(err => {
      setError(err.response.data.msg);
    });
}

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginURL = process.env.NODE_ENV === "production"?
        "http://organelle.pzny.xyz/users/login":
        "http://localhost:8080/users/login";
      const loginRes = await Axios.post(loginURL
          , loginUser);
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
    <div className="login-page">
      <Welcome />
      <div className="login-bar">
        <h2>Log in</h2>
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <form className="form" onSubmit={submit}>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" value="Log in" />
          <button onClick={redirectBack}>Go Back</button>
        </form>
        <button onClick={handleShow}>Reset Password</button>
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Forget Password?</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="Email" placeholder="What is your Email?"
                onChange={(e)=> {setforgotEmail(e.target.value)}} />
                <span>Check your junk mail box if you can't find the email.</span>
                {error && (
                  <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={resetRequestSubmit}>Send An Email</Button>
          <Button variant="primary" onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}