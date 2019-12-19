import React from 'react';
import './App.css';
import {Card, Button} from 'react-bootstrap';
import Subsection from './Subsection';

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.callCourse = this.callCourse.bind(this);
    }
  
    parseSections = () => {
        let sectionsArray = [];

        sectionsArray.push(
            <React.Fragment>
                <p><b>Instructor: </b>{this.props.data.instructor}</p>
                <p><b>Location: </b>{this.props.data.location}</p>
                <p style={{margin: "0px"}}><b>Time: </b></p>
            </React.Fragment>   
        );

        for(let date of Object.keys(this.props.data.time)){
            sectionsArray.push(
                <p style={{margin: "0px"}}>{date + ": " + this.props.data.time[date]}</p>
            );
        }

        if(Object.getOwnPropertyNames(this.props.data.subsections).length > 0) {
            sectionsArray.push(
                <React.Fragment>
                    <p></p>
                    <p style={{margin: "0px"}}><b><i>Subsections:</i></b></p>
                </React.Fragment>
            );
        }

        for(let subsection of Object.keys(this.props.data.subsections)){
            sectionsArray.push(
                <React.Fragment>
                    <Subsection name={subsection} data={this.props.data} cart={(subSection) => this.parseSubsection(subSection)} type={"Subsection"}></Subsection>
                    <p></p>
                </React.Fragment>
            );
        }

        return sectionsArray;
    }

    parseSubsection(subSection) {
        //console.log(subSection);
        this.callCourse(subSection);
    }

    callCourse(subSection) {
        //console.log(this, subSection);
        this.props.cart(this, subSection);
    }

    render() {
        //console.log(this.props.data.subsections);
        return (
        <Card className={"m-2"} style={{width: "45%"}}>
            <Card.Header className={"text-center"}>{this.props.name}</Card.Header>
            <Card.Body>
                <div className={"card-text"}>{this.parseSections()}</div>
            </Card.Body>
            <Button variant="primary" onClick={() => this.callCourse(undefined)}>Add to cart</Button>
        </Card>
        )
    }
}

export default Section;
