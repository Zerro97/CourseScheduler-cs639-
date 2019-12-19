import React, { Component } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.css';

export default class LandingArea extends Component {
  render() {
    return (
      <div className={"land-page"}>
        <Container fluid={true}>
          <Row>
            <Col>
              <h1 className={"land-page__text"}>Course Scheduler</h1>
            </Col>
          </Row>
          <Row style={{display: "flex", justifyContent: "center"}}>
            <Link to="/enrolled">
              <Button>Get Started</Button>
            </Link>
          </Row>
        </Container>
      </div>
      
    )
  }
}