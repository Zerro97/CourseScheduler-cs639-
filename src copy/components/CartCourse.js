import React, {useState, Component} from 'react';
import {Card, Button, Modal} from 'react-bootstrap';

export default class CartCourse extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        rating: 1
      };
  
      this.enrolledModal = this.enrolledModal.bind(this);
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
                <Modal.Title>{this.props.data.props.data.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-2 text-muted" style={{display: "block"}}>{this.props.data.props.data.number}</div>
                <p><b>Recommendation Score: {this.props.data.props.data.score}</b></p>
                <p className="mb-0"><b>Course Description: </b></p>
                {this.props.data.props.data.description}
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

    delete(courseNum) {
        this.props.cart(courseNum)
    }

    render() {
    //console.log(this);
        return (
            <Card className={"m-2"} style={{width: "calc(50% - 1rem"}} key={this.props.data.props.data.number}>
                <Card.Body>
                    <Card.Title>{this.props.data.props.data.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.data.props.data.number}</Card.Subtitle>
                    <Card.Text>{this.props.data.props.data.description.substring(0, 100)}...</Card.Text>
                    <div className={"d-flex"}>
                        <this.enrolledModal/>
                        <Button className={"ml-auto"} variant="danger" onClick={() => this.delete(this.props.data.props.data.number)}>Delete Course</Button>
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