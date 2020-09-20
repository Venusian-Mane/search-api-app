import React, { Component } from "react";
import appleLogos from "../icons.png";
import { Nav, Navbar } from "react-bootstrap";

export default class Header extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <div className="header">
          <h1 className="title">iTunes Search App</h1>
          <br />
          <p className="headPara">
            Find and list all your favourite content here. From Music and Books,
            to Movies, Audio Books Podcasts and more.
          </p>
          <img className="appleLogo" src={appleLogos} />
        </div>
        <div className="nav-bar">
          <Navbar sticky="top" bg="dark" variant="dark">
            {/* Navigation bar for switching to other components of the app. */}
            <Navbar.Brand>Navigate</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/search">Search</Nav.Link>
              <Nav.Link href="/favourites">Favourites</Nav.Link>
              <Nav.Link href="/results">Results</Nav.Link>
            </Nav>
          </Navbar>
        </div>
      </div>
    );
  }
}
