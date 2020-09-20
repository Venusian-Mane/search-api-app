import React, { Component } from "react";
import Advanced from "./Advanced.js";
import { Col, Form, Button } from "react-bootstrap";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdvanced: false,
      // state is used for allowing switching to advanced searching.
      search: [],
    };
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchTerm = this.handleSearchTerm.bind(this);
    // binding functions necessary for proper use
  }
  handleAdvancedSwitch = (e) => {
    if (this.state.showAdvanced === false) {
      this.setState({
        showAdvanced: true,
      });
    } else {
      this.setState({
        showAdvanced: false,
      });
      // function allows switching between normal searches and advanced searching.
    }
  };
  handleSearchTerm = (e) => {
    this.setState({ search: `term=${e.target.value}` });
  };
  handleSearch = () => {
    alert(`A search has been made ${this.state.search}`);
    var usedState = [this.state.search];
    fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usedState,
      }),
      // the body which has the list of items to search for is sent to the server for searching and fetching data.
    })
      .then((res) => res.json())
      .then((response) => alert("Success:", JSON.stringify(response)))
      .catch((error) => console.log("Error:", error));
    // errors caught and displayed for debugging.
  };
  render() {
    if (this.state.showAdvanced === true) {
      return (
        <div>
          <br />
          <Advanced handleSwitching={this.handleAdvancedSwitch} />
          {/* This displays the advanced search component if the state is true */}
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <div className="search">
            <h3>Search</h3>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Enter a search term..."
                    onChange={this.handleSearchTerm}
                    // records th search term and is sent to server
                  />
                </Col>
                <Col xs="5">
                  <Button variant="success" onClick={this.handleSearch}>
                    Search
                  </Button>
                </Col>
              </Form.Row>
            </Form>
            <Button onClick={this.handleAdvancedSwitch}>
              {/* Handles the switch to the advanced component for advanced searching */}
              Show Advanced Search
            </Button>
          </div>
        </div>
      );
    }
  }
}
