import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import RecommendedCourse from "./RecommendedCourse";
import './index.css';

export default class RecommendPage extends Component {
  constructor(props) {
    super(props);

    this.updateCartCourses = this.updateCartCourses.bind(this);
  }

  getCourses() {
    let courses = [];

    for(const course of Object.entries(this.props.data)) {
      courses.push (
        <RecommendedCourse enrolledCourses={this.props.enrolledCourses} recommendedCourses={this.props.data} name={course[0]} key={course[0]} data={course[1]} cart={(course) => this.updateCartCourses(course)}/>
      )
    }

    return courses;
  }

  updateCartCourses(course) {
    this.props.cart(course);
  }
  
  render() {
    //console.log(this);
    return (
      <Container fluid={true}>
        <Row className={"header"}>
          <Col>
              <h1 className={"header__text"}>Recommended Courses</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
              {this.getCourses()}
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}