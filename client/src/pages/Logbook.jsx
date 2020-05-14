import React, { Component } from "react";
import {
  Modal,
  Form,
  Table,
  Jumbotron,
  Container,
  Button,
  Row,
} from "react-bootstrap";
import DatePicker from "react-date-picker";
import API from "../utils/API";

class Logbook extends Component {
  state = {
    showModal: false,
    tail_number: "",
    entry_date: "",
    entry_note: "",
    aircraftID: "",
    entries: [],
  };

  componentDidMount() {
    const { aircraftID } = this.props.match.params;
    this.setState({ aircraftID: aircraftID });

    API.getLogEntries(aircraftID)
      .then((res) => this.setState({ entries: res.data }))
      .catch((err) => console.log(err));
  }

  handleClose = () => {
    console.log(this.state);
    this.setState({ showModal: false });
  };

  handleShow = () => {
    console.log(this.state);
    this.setState({ showModal: true });
  };

  formUpdate = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  submitForm = () => {
    console.log(this.state);
  };

  renderTableData() {
    return this.state.entries.map((entry, index) => {
      const { aircraft_id, type, entry_date, entry_note, tail_number } = entry; //destructuring
      return (
        <tr key={aircraft_id}>
          <td>{type}</td>
          <td>{entry_date}</td>
          <td>{entry_note}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Logbook Entries for {this.state.aircraftID}</h1>
        <Button onClick={this.handleShow}>Add Entry</Button>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Logbook Entry</Modal.Title>
          </Modal.Header>
          <Form>
            <Form.Group controlId="tail_number">
              <Form.Label>Tail Number</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter tail"
                onChange={this.formUpdate}
              />
            </Form.Group>
            <Form.Group controlId="entry_date">
              <Form.Label>Date</Form.Label>
              <DatePicker id="example-datepicker" />
            </Form.Group>
            <Form.Group controlId="entry_note">
              <Form.Label>Tail Number</Form.Label>
              <Form.Control type="email" placeholder="Enter entry" />
            </Form.Group>
          </Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.submitForm}>
              Submit Entry
            </Button>
          </Modal.Footer>
        </Modal>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Entry</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </Table>
      </div>
    );
  }
}

export default Logbook;
