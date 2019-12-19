import React, {Component, useState} from 'react';
import {Card, Button, Modal, Alert} from 'react-bootstrap';
import './index.css';

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 1
    };

    this.enrolledModal = this.enrolledModal.bind(this);
    this.cutDescription = this.cutDescription.bind(this);
    this.updateCartCourses = this.updateCartCourses.bind(this);
  }

  enrolledModal() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          More Info
        </Button>
  
        <Modal show={show} onHide={handleClose} dialogClassName="my-modal">
          <Modal.Header closeButton>
            <Modal.Title>{this.props.data.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-2 text-muted" style={{display: "block"}}>{this.props.data.number} - {this.getCredits()}</div>
            <p><b>Recommendation Score: {this.props.data.score}</b></p>
            <p className="mb-0"><b>Course Description: </b></p>
            {this.props.data.description}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {this.updateCartCourses()}
          </Modal.Footer>
        </Modal>
      </>
    );
  }

cutDescription() {
  return this.props.data.description.substring(0, 100) + "......";
}

setRating(rate){
  this.setState({rating: rate});
  //console.log(rate);
}

updateCartCourses() {
  const [show, setShow] = useState(false);
  //console.log(show);

  if (show) {
    let coursesToTake = this.calculateRequisites();
    //console.log(coursesToTake);

    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>You do not meet the requisites!</Alert.Heading>
        <p>
          In order to take this course, you need to take the following courses:<br/>
          {coursesToTake}
        </p>
      </Alert>
    );
  }

  return(
    <Button variant="primary" onClick={() => setShow(this.doMeetRequisites())}>
      Add to Cart
    </Button>
  );
}

doMeetRequisites() {
  let meetRequisite = false;
  let meetAllRequisite = true;

  for(const requisite of Object.values(this.props.data.requisites)){
    for(const course of Object.keys(this.props.enrolledCourses)){
      if(course === requisite[0]) {
        meetRequisite = true;
        break;
      }
    }
    if(!meetRequisite) {
      meetAllRequisite = false;
    }
  }

  if(meetAllRequisite) {
    this.props.cart(this);
  }

  return !meetAllRequisite;
}

calculateRequisites() {
  let coursesNeeded = "";
  let coursesNeededArr = [];
  let meetRequisite = false;

  for(const requisite of Object.values(this.props.data.requisites)){
    for(const course of Object.keys(this.props.enrolledCourses)){
      if(course === requisite[0]) {
        meetRequisite = true;
        break;
      }
    }
    if(!meetRequisite) {
      coursesNeededArr.push(requisite);
    }
  }

  for(const course of Object.keys(this.props.recommendedCourses)){
    for(let i=0; i<coursesNeededArr[0].length; i++) {
      if(course === coursesNeededArr[0][i]) {
        coursesNeeded += this.props.recommendedCourses[course].number + "\n";
      }
    }
  }

  return coursesNeeded;
}

render() {
    //console.log(this);
    return (
      <Card className={"m-2"} style={{width: "calc(50% - 1rem"}}>
        <Card.Body>
          <Card.Title>{this.props.data.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.data.number} - {this.getCredits()}</Card.Subtitle>
          <Card.Text><b>Recommendation Score: </b>{this.props.data.score}</Card.Text>
          <Card.Text>{this.cutDescription()}</Card.Text>
          <div className={"d-flex"}>
            <this.enrolledModal/>
          </div>
          
        </Card.Body>
      </Card>
    )
  }

  getCredits() {
    if(this.props.data.credits === 1)
      return '1 credit';
    else
      return this.props.data.credits + ' credits';
  }
}

export default Course;