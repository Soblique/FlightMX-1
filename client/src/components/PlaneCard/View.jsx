import React from "react";
import { Card } from "react-bootstrap";

function View(props, state) {
  return (
    <div class="m-2">
      <Card border="primary" style={{ width: "18rem" }}>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Card.Title>Picture</Card.Title>
          <Card.Text>Link to Logbook</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default View;
