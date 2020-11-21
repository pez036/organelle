import React from 'react';
import "./welcome.css";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
import Routes from "../pages/Routes";

export default function Welcome() {
return (
    <div class="fullscreen">
        <h3>welcome to</h3>
        <h1>Organelle</h1>
        <h3>The next-gen web class organizer</h3>
        {/* <Link to="/">
        </Link> */}
        <AuthOptions />
        <Routes />
    </div>
);
}