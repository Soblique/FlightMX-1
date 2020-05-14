import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import Error from "./components/Error"
import Home from "./components/Home"
import Aircraft from "./pages/Aircraft"
import Logbook from "./pages/Logbook"
import About from "./pages/About"
import Login from "./components/Login"
import Logout from "./components/Logout"
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/logbook/:aircraftID?" component={Logbook} />
          <Route exact path="/aircraft/:aircraftID?" component={Aircraft} />
          <Route exact path="/about" component={About}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route component={Error} />
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
