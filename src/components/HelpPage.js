import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './index.css';

export default class HelpPage extends Component {
  render() {
    return (
        <Container fluid={true}>
            <Row className={"header"}>
                <Col>
                    <h1 className={"header__text"}>HELP</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Pages</h3>
                    <p>There are three pages for course scheduler, “enrolled”, “recommended” and “cart” page.<br/><br/>
                    
                        Enrolled page displays all the previously taken courses. The user can set the rating of each courses by clicking on the star.<br/><br/>

                        Recommended page displays all the recommended courses based on the rating of the previously taken courses. User can add the course to cart by clicking "more info" and "add to cart"<br/><br/>

                        Cart displays all the courses added to cart. User can remove the courses from cart
                    </p>
                </Col>
                <Col>
                    <h3>Course Information</h3>
                    <p>Course card display a course information<br/><br/>

                        There are two types of course cards, enrolled and recommended<br/><br/>

                        Enrolled courses contains star rating system which the user can use to rate previously enrolled courses. The rating is from 1 to 5 points represented by the number of yellow stars<br/><br/>

                        Recommended courses are courses that  are not taken by the user and are recommended based on the rating given by the user
                    </p>
                </Col>
                <Col>
                    <h3>Recommendation Score</h3>
                    <p>Inside "recommended" page, courses are sorted based on the recommendation score<br/><br/>
                    
                        Course with high score is displayed on top, whereas course with low score is displayed on bottom<br/><br/>

                        Recommendation score is calculated by the summation of the same keywords as enrolled courses which has a rating score to them.<br/><br/>

                        <i>Score = sum(matched_keywords.score)</i>
                    </p>
                </Col>
            </Row>
        </Container>
    )
  }
}

/*<Card style={{margin: "1rem"}}>
            <Card.Body style={{display: "flex", justifyContent: "center"}}>
                <Card.Title style={{}}>Help</Card.Title>

                <Card className={"mt-2 mb-2"}>
                    <Card.Header>Navigation</Card.Header>
                    <Card.Body>
                        <Card.Title>Navigation</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">First Help</Card.Subtitle>
                        <Card.Text></Card.Text>
                    </Card.Body>
                </Card>

            </Card.Body>
        </Card>*/