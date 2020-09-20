import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Row, Col, Form, Button } from "react-bootstrap";
import parameterValues from "./parameterValues.json";

export default class Advanced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      filterState: " ",
      term: " ",
      country: " ",
      media: " ",
      entity: " ",
      attribute: " ",
      // all of thee above state records the data needed for an approprite search.
    };
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.handleEntityChange = this.handleEntityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // function binding for proper function use for the "this" keyword.
  }
  handleSwitch = (e) => {
    this.props.handleSwitching(e);
    // used for switching to advanced search component
  };
  handleTermChange = (e) => {
    this.setState({ term: "term=" + e.target.value });
    // this sets the term of the search
  };
  handleMediaChange = (e) => {
    this.setState({
      media: `media=${e.target.name}`,
    });
    // sets the media type for the search.
  };
  handleCountryChange = (e) => {
    this.setState({ country: `country=${e.target.value}` });
    // sets the country for the searches.
  };
  handleEntityChange = (e) => {
    this.setState({ entity: `entity=${e.target.value}` });
    // sets the entity state for the search
  };
  handleAttributeChange = (e) => {
    this.setState({ attribute: `attribute=${e.target.name}` });
  };
  handleSubmit(e) {
    alert("An item was submitted:");
    var usedState = []; // used state is needed for the body sent to the server
    var stateList = [
      this.state.term,
      this.state.media,
      this.state.country,
      this.state.entity,
    ];
    for (var elem of stateList) {
      if (elem !== " ") {
        usedState.push(elem);
      }
    }
    fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usedState,
      }),
      // the server recieves the usedState list and uses its data to create the search.
    })
      .then((res) => res.json())
      .then((response) => alert("Success:", JSON.stringify(response)))
      .catch((error) => console.log("Error:", error));
  }

  render() {
    const paramVals = parameterValues;
    return (
      <div className="search">
        <h3>Advanced Search</h3>
        <div className="searchDiv">
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter a search term..."
                  onChange={this.handleTermChange}
                />
              </Col>
              <Col>
                <Button type="submit" variant="success">
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
          <Button onClick={this.handleSwitch}>Hide Advanced Search</Button>
        </div>
        <br />
        <Table>
          <thead>
            <tr>
              <td colSpan="11">
                <h4>Search Specifications</h4>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h5>Media Type</h5>
              </td>
              {paramVals.media.map((type) => (
                <td key={type}>
                  <input
                    value="media"
                    name={type}
                    type="checkbox"
                    onChange={this.handleMediaChange}
                  />
                  <br />
                  {type}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <h5>Country</h5>
              </td>
              <td colSpan="10">
                <input
                  className="inputClass"
                  placeholder="Enter 2-letter country code"
                  onChange={this.handleCountryChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <h5>Media Entity</h5>
              </td>
              <td colSpan="20">
                <select onChange={this.handleEntityChange}>
                  {parameterValues.entity.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
