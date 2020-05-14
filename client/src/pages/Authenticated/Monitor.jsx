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
import Sidebar from "../../components/Sidebar";
import { XYPlot, LineSeries, XAxis, YAxis } from "react-vis";
import data from "./flight.json";
import "../../../node_modules/react-vis/dist/style.css";
import "react-datepicker/dist/react-datepicker.css";

class Monitor extends Component {
  state = {};

  componentDidMount() {}

  render() {
    let cht = { cht1: [], cht2: [], cht3: [], cht4: [] };
    let egt = { egt1: [], egt2: [], egt3: [], egt4: [] };
    let oil = { oilp: [], oilt: [] };
    data.forEach(function (element, index) {
      cht.cht1.push({ x: index, y: element.C1 });
      cht.cht2.push({ x: index, y: element.C2 });
      cht.cht3.push({ x: index, y: element.C3 });
      cht.cht4.push({ x: index, y: element.C4 });
      egt.egt1.push({ x: index, y: element.E1 });
      egt.egt2.push({ x: index, y: element.E2 });
      egt.egt3.push({ x: index, y: element.E3 });
      egt.egt4.push({ x: index, y: element.E4 });
      oil.oilp.push({ x: index, y: element.OILP });
      oil.oilt.push({ x: index, y: element.OILT });
    });
    console.log(egt);
    return (
      <Container fluid>
        <Row md={12}>
          <Col md={1}>
            <Sidebar />
          </Col>
          <Col>
            <div class="mr-5 ml-5 ">
              <div class="cht-chart">
                <h1>CHT</h1>
                <XYPlot height={400} width={980}>
                  <LineSeries data={cht.cht1} />
                  <LineSeries data={cht.cht2} />
                  <LineSeries data={cht.cht3} />
                  <LineSeries data={cht.cht4} />
                  <XAxis title="CHT" />
                  <YAxis title="Time"/>
                </XYPlot>
              </div>
              <h1>EGT</h1>
              <div class="egt-chart">
                <XYPlot height={400} width={980}>
                  <LineSeries data={egt.egt1} />
                  <LineSeries data={egt.egt2} />
                  <LineSeries data={egt.egt3} />
                  <LineSeries data={egt.egt4} />
                  <XAxis title="EGT" />
                  <YAxis title="Time"/>
                </XYPlot>
              </div>
              <h1>Oil</h1>
              <div class="oil-chart">
                <XYPlot height={400} width={980}>
                  <LineSeries data={oil.oilp} />
                  <LineSeries data={oil.oilt} />
                </XYPlot>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Monitor;
