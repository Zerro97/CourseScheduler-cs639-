import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg" className={"fixed-top"}>
        <Link to="/" className="nav-link navbar-brand">Course Scheduler</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/enrolled" className="nav-link">Enrolled</Link>
            <Link to="/recommended" className="nav-link">Recommended</Link>
            <Link to="/cart" className="nav-link">Cart</Link>
            <Link to="/help" className="nav-link">Help</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}