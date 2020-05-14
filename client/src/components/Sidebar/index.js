import React, { Component } from "react";
import View from "./View";

export default class extends Component {
  state = {};
  
  render() {
    return <View {...this.props} {...this.state} />;
  }
}
