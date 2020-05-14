import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

function View() {
  return (
    <div class="mt-2">
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link eventKey="link-1">Aircraft Logbook</Nav.Link>
        <Nav.Link eventKey="link-2">Engine Monitor</Nav.Link>
        <Nav.Link eventKey="disabled" disabled>
          Next Link (Disabled)
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default View;
