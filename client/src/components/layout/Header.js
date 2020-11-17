import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
import Routes from "../pages/Routes";

export default function Header() {
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">Organelle</h1>
      </Link>
      <Routes />
      <AuthOptions />
    </header>
  );
}