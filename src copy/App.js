import React from 'react';
import Navigation from "./components/Navigation";
import LandingArea from "./components/LandingArea";
import EnrollPage from "./components/EnrollPage";
import RecommendPage from "./components/RecommendPage";
import HelpPage from "./components/HelpPage";
import CartPage from "./components/CartPage";
import { BrowserRouter as Router, Route} from "react-router-dom";

import './App.css';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      enrolledCourses: {},
      recommendedCourses: {},
      cartCourses: {},
      coursesRating: {},
      subjects: [],
      keywords: {}
    };

    this.rearrange = this.rearrange.bind(this);
    this.getKeywords = this.getKeywords.bind(this);
    this.calculateRating = this.calculateRating.bind(this);
    this.getRecommendedCourses = this.getRecommendedCourses.bind(this);
  }

  async componentDidMount() {
    // All Courses
    const response1 = await fetch('https://mysqlcs639.cs.wisc.edu/classes/');
    const json1 = await response1.json();
    this.setState({allCourses: json1});

    // Enrolled Courses
    const response2 = await fetch('https://mysqlcs639.cs.wisc.edu/students/5022025924/classes/completed');
    const json2 = await response2.json();
    let enrollCourse = this.getEnrolledCourses(json2);
    this.setState({enrolledCourses: enrollCourse});

    // Enrolled Courses Keywords
    let enrolledKeywords = this.getKeywords();
    this.setState({keywords: enrolledKeywords});

    // Recommended Courses
    let recommendCourse = this.getRecommendedCourses();
    this.setState({recommendedCourses: recommendCourse}, function() {
      this.calculateRating();
      this.rearrange();
    }); 
  }

  rearrange() {
    let sortable = [];

    for (let course in this.state.recommendedCourses) {
      sortable.push([course, this.state.recommendedCourses[course]]);
    }
    
    sortable.sort(function(a, b) {
        return b[1].score - a[1].score;
    });

    var objSorted = {}
    sortable.forEach(function(item){
        objSorted[item[0]]=item[1]
    });

    this.setState({recommendedCourses: objSorted});
    //console.log(this.state.recommendedCourses);
  }

  calculateRating() {
    let score = 0;
    
    for(let course of Object.values(this.state.recommendedCourses)) {
      for(let i=0; i<course.keywords.length; i++) {
        for(const key of Object.keys(this.state.keywords)) {
          if(course.keywords[i] === key) {
            score += this.state.keywords[key];
          }
        }
      }

      course.score = score;
      score = 0;
    }
  }

  /**
   * When the star rating is clicked, this function gets executed. Update the courses with new rating.
   * @param {} updatedCourses 
   */
  updateCourseRating(updatedCourses) {
    this.setState({enrolledCourses: updatedCourses});
    //console.log(this.state.enrolledCourses);

    let enrolledKeywords = this.getKeywords();
    this.setState({keywords: enrolledKeywords}, function(){
      this.calculateRating();
      this.rearrange();
    });
    
    //console.log(this.state.keywords);
  }

  updateCartCourses(course) {
    let isDuplicate = false;
    if(Object.keys(this.state.cartCourses).length === 0) {
      this.state.cartCourses[course.props.data.number] = course;
    }

    for(const cartCourse of Object.keys(this.state.cartCourses)) {
      if(cartCourse === course.props.data.number) {
        isDuplicate = true;
      }
    }

    if(!isDuplicate) {
      this.state.cartCourses[course.props.data.number] = course;
    }

    //console.log(this.state.cartCourses);
  }

  deleteCart(courseNum) {
    //console.log(courseNum);
    let tempObject = {};
    tempObject = this.state.cartCourses;

    delete tempObject[courseNum];
    this.setState({cartCourses: tempObject});
    //console.log(this.state.cartCourses);
  }

  /**
   * Substract enrolled courses from the entire course lists. Return the remaining courses
   */
  getRecommendedCourses() {
    //console.log(this.state.allCourses, this.state.enrolledCourses);
    //console.log(this.state.keywords);
    let recommended = [];
    let different = true;
    for(let allCourse of Object.keys(this.state.allCourses)) {
      for(let enrollCourse of Object.keys(this.state.enrolledCourses)) {
        if(allCourse === enrollCourse) {
          different = false;
        }
      }
      if(different) {
        recommended.push(allCourse);
      }
      different = true;
    }
    //console.log(recommended);

    let courses = {}
    for(let course of Object.keys(this.state.allCourses)) {
      for(let j=0; j<recommended.length; j++) {
        if(course === recommended[j]) {
          courses[course] = this.state.allCourses[course];
        }
      }
    }


    //console.log(courses);
    return courses;
  }


  /**
   * Get unique keywords from the entire enrolled courses and calculate rating for recommendation. 
   * Rating is based on keywords of enrolled course and the star rating of enrolled courses
   */
  getKeywords() {
    let keywords= {};

    // Make object list and initialize the key from the keywords
    for(let course of Object.values(this.state.enrolledCourses)) {
      for(let i=0; i<course.keywords.length; i++) {
        keywords[course.keywords[i]] = 0;
      }
    }

    // Initialize the value from the rating of enrolled courses
    for(const key of Object.keys(keywords)) {
      for(let course of Object.values(this.state.enrolledCourses)) {
        for(let i=0; i<course.keywords.length; i++) {
          if(key === course.keywords[i]) {
            keywords[key] += course.rating;
          }
        }
      }
    }
    //console.log(keywords);

    return keywords;
  }

  /**
   * Return the list of enrolled courses based off from the list of names fetched from json file
   * @param {} data 
   */
  getEnrolledCourses(data) {
    let courses = {};
    let names = [];

    for(const course of Object.values(data)) {
      for(const c of Object.values(course)){
        names.push(c);
      }
    }
    //console.log(names);

    for(let course of Object.keys(this.state.allCourses)) {
      for(let j=0; j<names.length; j++) {
        if(course === names[j]) {
          courses[course] = this.state.allCourses[course];
          courses[course].rating = 1;
          //console.log(courses[course]);
        }
      }
    }
    
    //console.log(courses);
    return courses;
  }
 
  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for(const course of Object.values(data)) {
      if(subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  render() {
    //console.log(this.state.enrolledCourses);
    return(
      <Router>
        <Navigation />
        <Route path="/" exact render={(props) => <LandingArea {...props}/>}/>
        <Route path="/enrolled" exact render={(props) => <EnrollPage {...props} data={this.state.enrolledCourses} updateRate={(courses) => this.updateCourseRating(courses)}/>}/>
        <Route path="/recommended" exact render={(props) => <RecommendPage {...props} enrolledCourses={this.state.enrolledCourses} data={this.state.recommendedCourses} keywordsRating={this.state.keywords} cart={(course) => this.updateCartCourses(course)}/>}/>
        <Route path="/cart" exact render={(props) => <CartPage {...props} data={this.state.cartCourses} keywordsRating={this.state.keywords} cart={(course) => this.deleteCart(course)}/>}/>
        <Route path="/help" exact render={(props) => <HelpPage {...props} data={true} />}/>
      </Router>
    )
  };
}

//this.updateCartCourses = this.updateCartCourses.bind(this);
