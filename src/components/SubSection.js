import React from 'react';
import './App.css';
import {Button} from 'react-bootstrap';

class Subsection extends React.Component {
    constructor(props) {
        super(props);
        this.callSection = this.callSection.bind(this);
    }

    parseDates = () => {
        let subSectionsArray = [];

        for(let date of Object.keys(this.props.data.time)){
            subSectionsArray.push(
                <p style={{margin: "0px"}}>{date + ": " + this.props.data.time[date]}</p>
            );
        }

        return subSectionsArray;
    }

    callSection() {
        this.props.cart(this);
    }

    render() {
        //console.log(this);
        return (
            <div className={"card-text"}>
                <p style={{margin: "0px"}}><b>{this.props.name}</b></p>
                <p style={{margin: "0px"}}>{this.props.data.location}</p>
                {this.parseDates()}
                <Button variant="primary" onClick={this.callSection}>Add to cart</Button>
                <p></p>
            </div>
        )
    }
}

export default Subsection;
