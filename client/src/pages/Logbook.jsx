import React, { Component } from "react";
import {
  Modal,
  Form,
  Table,
  Jumbotron,
  Container,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import DatePicker from "react-datepicker";
import API from "../utils/API";

import "react-datepicker/dist/react-datepicker.css";

class Logbook extends Component {
  state = {
    showModal: false,
    tail_number: "",
    entry_note: "",
    type: "Airframe",
    entry_date: new Date(),
    entries: [],
  };

  componentDidMount() {
    const { tail_number } = this.props.match.params;
    this.setState({ tail_number: tail_number });

    API.getLogEntries(tail_number)
      .then((res) => this.setState({ entries: res.data }))
      .catch((err) => console.log(err));
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  formUpdate = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  submitForm = (event) => {
    event.preventDefault();
    console.log(this.state);
    let data = {
      entry_date: this.state.entry_date,
      entry_note: this.state.entry_note,
      tail_number: this.state.tail_number,
      type: this.state.type,
    };
    API.addLogEntry(data)
      .then((res) => {
        console.log(res);
        this.setState((prevState) => ({
          entries: [...prevState.entries, res.data],
        }));
      })
      .catch((err) => console.log(err));
    this.handleClose();
  };

  renderTableData() {
    return this.state.entries.map((entry, index) => {
      const {
        _id,
        aircraft_id,
        type,
        entry_date,
        entry_note,
        tail_number,
      } = entry; //destructuring
      return (
        <tr key={_id}>
          <td>{type}</td>
          <td>{entry_date}</td>
          <td>{entry_note}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Container fluid>
        <Row md={12}>
          <Col md={1}>
            <Sidebar />
          </Col>
          <Col>
            <div class="mr-5 ml-5 ">
              <h1 class="mt-2">Logbook Entries for {this.state.tail_number}</h1>
              <Button onClick={this.handleShow} className="mb-3 mt-1">
                Add Entry
              </Button>
              <Modal show={this.state.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Logbook Entry</Modal.Title>
                </Modal.Header>
                <Form className="p-4">
                  <Form.Group controlId="tail_number">
                    <Form.Label>Tail Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter tail"
                      value={this.state.tail_number}
                      onChange={this.formUpdate}
                    />
                  </Form.Group>
                  <Form.Group controlId="type">
                    <Form.Label>Entry Type</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={this.formUpdate}
                      value={this.state.type}
                    >
                      <option>Airframe</option>
                      <option>Engine</option>
                      <option>Propeller</option>
                      <option>Other</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="entry_date">
                    <Form.Label className="mr-2">Date</Form.Label>
                    <DatePicker
                      selected={this.state.entry_date}
                      onChange={(date) => this.setState({ entry_date: date })}
                    />
                  </Form.Group>
                  <Form.Group controlId="entry_note">
                    <Form.Label>Entry Text</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      placeholder="Enter entry"
                      onChange={this.formUpdate}
                    />
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
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Logbook;
