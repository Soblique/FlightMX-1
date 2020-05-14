import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import Error from "../../components/Error"
import Home from "./Home"
import Aircraft from "./Aircraft"
import Monitor from "./Monitor"
import Logbook from "./Logbook"
import About from "../About"
import Login from "../Login"
import Logout from "../Logout"

function AuthenticatedApp() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/logbook/:tail_number?" component={Logbook} />
          <Route exact path="/aircraft/:aircraftID?" component={Aircraft} />
          <Route exact path="/monitor/:tail_number?" component={Monitor} />
          <Route component={Error} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default AuthenticatedApp;
