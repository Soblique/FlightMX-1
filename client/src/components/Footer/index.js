import React from "react";
import { Navbar, Nav, Container, FormControl, Button } from "react-bootstrap";

import "./style.css";

const Footer = () => (
	<Container>
  		<Navbar expand="sm" variant="light" bg="light" fixed="bottom">
    		<Navbar.Brand href="#">Bottom Bar</Navbar.Brand>
  		</Navbar>
	</Container>
);

export default Footer;