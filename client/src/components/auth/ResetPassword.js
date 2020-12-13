import React, {useState} from 'react';
import Axios from 'axios';

export default function ResetPassword(props) {
  const [password, setPassword] = useState("");
  const [passwordCheck ,setPasswordCheck] = useState("");

  const submitHandler = (e)=> {
    e.preventDefault();
    const body = {
      password,
      passwordCheck,
      id: props.match.params.id
    };
    console.log(body);
    const resetURL = process.env.NODE_ENV === "production"?
    "https://organelle.pzny.xyz/users/reset" :
    "http://localhost:8080/users/reset";
    Axios.post(resetURL, body)
    .then(() => {
      props.history.push("/login")
    })
  }

  return(
    <form className="form" onSubmit={submitHandler}>

      <label htmlFor="login-password">New Password</label>
      <input
        id="login-password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
       />

      <label htmlFor="login-password">Password Check</label>
      <input
       id="login-password"
       type="password"
        onChange={(e) => setPasswordCheck(e.target.value)}
      />

      <input type="submit" value="Submit" />
    </form>
  );
}