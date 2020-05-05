import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
  
import AircraftList from "../pages/AircraftList";

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
            <a className="navbar-brand" href="/">
                <h2 className="text-white">FlightMX</h2>
            </a>
            <div id="navbarNav">
                <ul className="navbar-nav">
                    <Link to="/" >Thing</Link>
                    <li className="nav-item" id="login">
                        <a className="nav-link" href="/login"><button type="button" className="btn btn-info text-white">Login</button></a>
                    </li>
                    <li className="nav-item" id="Otherthing">
                        <a className="nav-link" href="/saved"><button type="button" className="btn btn-warning text-white">Other Thing</button></a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;