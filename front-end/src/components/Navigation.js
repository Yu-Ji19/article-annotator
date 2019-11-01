import React, { Component } from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"

class Navigation extends Component {
  render() {
    return (
      <Navbar bg="light" expand="sm">
        <Navbar.Brand href="/">Article Annotator</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            
            <NavDropdown title="About" id="nav-dropdown">
              <NavDropdown.Item eventKey="4.1">Project-Based Learning</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">Developer Bio's</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.3">User Agreement</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Resources" id="nav-dropdown">
              <NavDropdown.Item eventKey="4.1">Video Overview</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">Strategies</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.3">eManual</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/b1bc855b-eec2-44ab-8492-a7080ca25e45">Annotate</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navigation