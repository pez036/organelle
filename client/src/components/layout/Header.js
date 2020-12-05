import React from "react";
import { Link } from "react-router-dom";
import Routes from "../pages/Routes";
import logo from "../../images/logo2.png";
import organelle from "../../images/ORGANELLE.png";
import "./Header.css"
//import { Container } from "react-bootstrap";

export default function Header() {
  return (
    <header className="bg-dark" id="header">
      <Link to="/">
        {/* <img src={logo} style={{width: 74, height: 74}} alt="Logo" />
        <img src={organelle} style={{height: 37}} alt="Logo" /> */}
        <h1>ORGANELLE</h1>
      </Link>
      <Routes />
    </header>
  );
}