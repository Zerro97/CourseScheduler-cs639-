import React, {Component, useState} from 'react';
import {Card, Button, Modal} from 'react-bootstrap';
import StarRating from "./StarRating";
import './index.css';

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: this.props.data.rating
    };

    this.enrolledModal = this.enrolledModal.bind(this);
    this.cutDescription = this.cutDescription.bind(this);
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
            <p className="mb-0"><b>Course Description: </b></p>
            {this.props.data.description}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

cutDescription() {
  return this.props.data.description.substring(0, 100) + "......";
}

setRating(rate){
  this.setState({rating: rate}, function(){
    //console.log(this.state.rating);
    this.props.updateRate(this);
  });
}

  /*makeSections = () => {
    let sectionsArray = [];

    for(let section of Object.keys(this.props.data.sections)) {
      sectionsArray.push(
        <Section name={section} data={this.props.data.sections[section]} cart={(section, subSection) => this.parseSection(section, subSection)} type={"Section"}></Section>
      )
    }

    return sectionsArray;
  }

  parseSection(section, subSection) {
    this.putToCart(section, subSection)
  }

  putToCart(section, subSection) {
    this.props.cart(this, section, subSection);
  }*/

  render() {
    //console.log(this);
    return (
      <Card className={"m-2"} style={{width: "calc(50% - 1rem"}}>
        <Card.Body>
          <Card.Title>{this.props.data.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{this.props.data.number} - {this.getCredits()}</Card.Subtitle>
          <Card.Text>{this.cutDescription()}</Card.Text>
          <div className={"d-flex"}>
            <this.enrolledModal />
            <StarRating rating={this.state.rating} getRate={(rate) => this.setRating(rate)}></StarRating>
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