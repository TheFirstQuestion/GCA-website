import React, {useState} from 'react';
import './App.css';
import woman from './female_user.png';
import man from './male_user.png';
import upvote from './upvote.png';
import upvote_selected from './upvote_selected.png';
import downvote from './downvote.png';
import downvote_selected from './downvote_selected.png';
import question from './question.png';
import question_selected from './question_selected.png';
import Divider from '@material-ui/core/Divider';
import ModalReact from 'react-modal';
import plus from './plus_icon.png';
import minus from './minus_icon.png';
import firebase from './firebase';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

class ReadData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //study and resume version (pulled from props)
            studyVersion: 1,
            resumeVersion: 1,

            generatedID: '',
            errorMessage: false,

            //all tracking outputs
            educationOpenedCount: 0,
            workexpOpenedCount: 0,
            notesOpenedCount: 0,

            activityData: [],

            x: 0,
            y: 0,
            mouseData: [],
        };
        this.temp = [];
    }

    componentDidMount(){
        const db = firebase.firestore();

        //select work experience 1
        db.collection("userIDs").doc("test").collection("resumes").doc("r2").collection("activityData").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                this.temp.push(doc.data());
                console.log(doc.id, " => ", doc.data());
            });
        });
    }

    loadActivityData(){
        
    }

    _onMouseMove(e) {
        var options = { hour12: false };

        this.setState({x: e.screenX, y: e.screenY});
        let time = new Date().toLocaleString('en-US', options);
        //console.log(time);
        let x = e.clientX;// - e.target.offsetLeft
        let y = e.clientY;// - e.target.offsetTop
        //console.log("x: " + x + " y: " + y)
        let newObj = [time, x, y]
        this.setState({mouseData: [...this.state.mouseData, newObj]})
    }

    render() {
        return (
            <div className="overall">
            </div>
        );
    }
}

export default ReadData;
