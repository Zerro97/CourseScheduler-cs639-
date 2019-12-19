import React from 'react';
import CartCourse from "./CartCourse";
import {Container, Row, Col} from 'react-bootstrap';

export default class CartPage extends React.Component {
  delete(courseNum) {
    this.props.cart(courseNum)
  }

  parseCourses() {
    let courseArray = [];

    //console.log(this.props.data);
    for(const course of Object.entries(this.props.data)){
      courseArray.push(
        <CartCourse key={course[0]} data={course[1]} cart={(course) => this.delete(course)}/>
      );
    }

    return courseArray;
  }

  render() {
    //console.log(this);
    return (
        <Container fluid={true}>
        <Row className={"header"}>
          <Col>
              <h1 className={"header__text"}>Cart</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
              {this.parseCourses()}
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
