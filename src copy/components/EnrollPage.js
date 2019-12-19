import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import EnrolledCourse from "./EnrolledCourse";
import './index.css';

export default class EnrollPage extends Component {
  getCourses() {
    let courses = [];

    for(const course of Object.entries(this.props.data)) {
      courses.push (
        <EnrolledCourse key={course[0]} data={course[1]} updateRate={(updatingCourse) => this.setRating(updatingCourse)}/>
      )
    }

    return courses;
  }

  setRating(updatingCourse) {
    let updatedCourses = {};


    for(let course of Object.keys(this.props.data)) {
      updatedCourses[course] = this.props.data[course];
      if(this.props.data[course].number === updatingCourse.props.data.number){
        updatedCourses[course].rating = Object.values(updatingCourse.state)[0];
        //console.log(Object.values(updatingCourse.state));
      }
    }

    //console.log(updatedCourses);
    this.props.updateRate(updatedCourses);
  }

  render() {
    //console.log(this);
    return (
      <Container fluid={true}>
        <Row className={"header"}>
          <Col>
              <h1 className={"header__text"}>Enrolled Courses</h1>
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