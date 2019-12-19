import React, {Component} from 'react';
import './index.css';

class StarRating extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            rating: this.props.rating || null,
            temp_rating: null
        };

        this.rate = this.rate.bind(this);
        this.star_out = this.star_out.bind(this);
        this.star_over = this.star_over.bind(this);
    }

    rate(rating) {
        this.setState({
            rating: rating,
            temp_rating: rating
        });
        this.props.getRate(rating);
    }

    star_over(rating) {
        this.state.temp_rating = this.state.rating;
        this.state.rating = rating;
        
        this.setState({
            rating: this.state.rating,
            temp_rating: this.state.temp_rating
        });
    }

    star_out() {
        this.state.rating = this.state.temp_rating;
        this.setState({ rating: this.state.rating });
    }

    displayStar() {
        var stars = [];
            
        for(var i = 1; i < 6; i++) {
            var klass = 'star-rating';
            
            if (this.state.rating >= i && this.state.rating != null) {
                klass += ' is-selected';
            }

            // Put Star Rating at left
            if(i===1) {
                klass += ' ml-auto';
            }
    
            stars.push(
                <label
                key={i}
                className={klass}
                onClick={this.rate.bind(this, i)}
                onMouseOver={this.star_over.bind(this, i)}
                onMouseOut={this.star_out}>
                ★
                </label>
            );
        }

        return stars;
    }

    render() {
        return(
            <>
                {this.displayStar()}
            </>
        )
    }
}

export default StarRating;