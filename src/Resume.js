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
import circle from './circle.png';
import circle_selected from './circle_selected.png';
import Collapsible from 'react-collapsible';
import Divider from '@material-ui/core/Divider';
import ModalReact from 'react-modal';
import plus from './plus_icon.png';
import minus from './minus_icon.png';
import firebase from './firebase';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core';
import { mockComponent } from 'react-dom/test-utils';
var moment = require('moment-timezone');

class Resume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //women and men (pulled from props)
            women: 1,
            men: 1,

            //names
            names: [],
            resumes: [1, 2, 3, 4, 5],

            currentUserID: '',
            errorMessage: false,

            //all tracking outputs
            educationOpenedCount: 0,
            workexpOpenedCount: 0,
            notesOpenedCount: 0,

            //activityData: [],

            x: 0,
            y: 0,
            //mouseData: [],

            modalOpened: false,
            enterID: '',

            section1opened: false,
            section2opened: false,
            section3opened: false,

            city: '',

            initialNotes: 'Something something something. Something something',
            degree: 'BA',
            distinction: 'Honors',
            duration: '2017-2021',
            major: 'Computer Science',
            university: 'Stanford University',

            gender_icon: man,
            name: '',
            parenthood: true,
            education: 0,
            work1: 0, 
            work2: 0,
            remote: true,

            //upvote + downvote + question mark
            education_up: false,
            education_q: false,
            education_down: false,

            work1_up: false,
            work1_q: false,
            work1_down: false,

            work2_up: false,
            work2_q: false,
            work2_down: false,

            work3_up: false,
            work3_q: false,
            work3_down: false,

            notes_up: false,
            notes_q: false,
            notes_down: false,

            misc_up: false,
            misc_q: false,
            misc_down: false,

            bulletList: [],
            remoteNotesText: '',
        };
        this.selectNames = this.selectNames.bind(this);
    }

    componentDidMount(){
        console.log("men: " + this.props.men)
        console.log("women: " + this.props.women)

        const db = firebase.firestore();

        this.setState({men: this.props.men});
        this.setState({women: this.props.women}, () => {
            //select names
            this.selectNames(this.state.men, this.state.women);
        });

        //shuffle resume order
        this.shuffle(this.state.resumes)
    }

    selectNames(number_men, number_women){
        let gender = "male"
        if(number_men <= 0 && number_women <= 0){
            //shuffle names
            this.shuffle(this.state.names)
            return
        }
        else if(number_men == 0){
            gender = "female"
        }

        const db = firebase.firestore();

        let name = Math.floor(Math.random() * 4);
        db.collection("names").doc(gender).get().then((doc) => {
            let curr_name = doc.data()[gender + "_" + (name+1)]
            if(!this.state.names.includes(curr_name)){
                this.state.names.push(doc.data()[gender + "_" + (name+1)])
                if(gender == "male"){
                    this.selectNames(number_men - 1, number_women)
                }
                else{
                    this.selectNames(number_men, number_women - 1)
                }
            }
            else{
                this.selectNames(number_men, number_women)
            }
        })
    }

    shuffle(array) {
        console.log("before shuffle: " + this.state.names)
        var currentIndex = array.length, temporaryValue, randomIndex;
        
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        
        console.log("after shuffle: " + this.state.names)
        return array;
    }

    renderBulletList = () => {
        if(this.state.bulletList.length > 0){
            let viewBulletList = []
            this.state.bulletList.forEach((item, index) => {
                if(item != " " && item != "" && item != null){
                    viewBulletList.push(
                        <li>{item}</li>
                    )
                }
            })
            return viewBulletList
        }
        else{
            return null
        }
    }

    render() {
        return (
            <div className="overall">
                <div className="App">
                    <div className="resume">
                        <Accordion>
                            <Card>
                                <Card.Header style={{background:"white", paddingLeft: 0, paddingRight: 0}}>
                                <Accordion.Toggle as={Button}  
                                    style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px", alignItems: "center"}} 
                                    variant="link" 
                                    eventKey="0"
                                    onClick={() => this.setState({section1opened: !this.state.section1opened}, () => {
                                        if(this.state.section1opened){
                                            this.setState({section2opened: false});
                                            this.setState({section3opened: false});
                                    }})}>
                                    Jake <img id="toggle_icon" src={this.state.section1opened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                <div className="resume">
                                    <img className="profile_image" src={this.state.gender_icon} alt="" />
                                    <div className="header">{this.state.name}</div>

                                    <div className="votingblock_notes">
                                        <div id="vertical">
                                            <img name="notes_up" src={this.state.notes_up ? upvote_selected : upvote} onClick={this.voteClick}/>
                                            <img name="notes_q" src={this.state.notes_q ? circle_selected : circle} onClick={this.voteClick}/>
                                            <img name="notes_down" src={this.state.notes_down ? downvote_selected : downvote} onClick={this.voteClick}/>
                                        </div>
                                        <div class="notes">Notes from Initial Phone Screen:  
                                            <span id="subtext_bullet">
                                                <ul>
                                                    {(this.state.studyVersion == 2 || this.state.studyVersion == "2b") && <li>{this.state.remoteNotesText}</li>}
                                                    {this.renderBulletList()}
                                                </ul>
                                            </span>
                                            {/*<span id="subtext"> {this.state.initialNotes} {this.state.studyVersion == 2 && this.state.remote && " + working remotely"}</span>*/}
                                        </div>
                                    </div>
                                    <div className="votingblock">
                                        <div id="vertical">
                                            <img name="education_up" src={this.state.education_up ? upvote_selected : upvote} onClick={this.voteClick}/>
                                            <img name="education_q" src={this.state.education_q ? circle_selected : circle} onClick={this.voteClick}/>
                                            <img name="education_down" src={this.state.education_down ? downvote_selected : downvote} onClick={this.voteClick}/>
                                        </div>
                                        <div id="subtext">{this.state.university}
                                            <div id="subinfo">{this.state.degree}, {this.state.major}</div>
                                            <div id="subinfogray">{this.state.duration}</div>
                                        </div>
                                    </div>
                                    <div className="votingblock">
                                        <div id="vertical">
                                            <img name="misc_up" src={this.state.misc_up ? upvote_selected : upvote} onClick={this.voteClick}/>
                                            <img name="misc_q" src={this.state.misc_q ? circle_selected : circle} onClick={this.voteClick}/>
                                            <img name="misc_down" src={this.state.misc_down ? downvote_selected : downvote} onClick={this.voteClick}/>
                                        </div>
                                        <div id="vertical">
                                            misc text
                                        </div>
                                    </div>
                                    </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header style={{background:"white", paddingLeft: 0, paddingRight: 0, borderTop: "1px solid black"}}>
                                <Accordion.Toggle as={Button} 
                                    style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px", alignItems: "center"}} 
                                    variant="link" 
                                    eventKey="1"
                                    onClick={() => this.setState({section2opened: !this.state.section2opened}, () => {
                                        if(this.state.section2opened){
                                            this.setState({section1opened: false});
                                            this.setState({section3opened: false});
                                    }})}>
                                    Jordan <img img id="toggle_icon" src={this.state.section2opened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header style={{background:"white", paddingLeft: 0, paddingRight: 0, borderTop: "1px solid black"}}>
                                <Accordion.Toggle as={Button} 
                                    style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px", alignItems: "center"}} 
                                    variant="link" 
                                    eventKey="2"
                                    onClick={() => this.setState({section3opened: !this.state.section3opened}, () => {
                                        if(this.state.section3opened){
                                            this.setState({section1opened: false});
                                            this.setState({section2opened: false});
                                    }})}>
                                    Josh <img img id="toggle_icon" src={this.state.section3opened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <div>
                                        resume 1 content
                                    </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header style={{background:"white", paddingLeft: 0, paddingRight: 0, borderTop: "1px solid black"}}>
                                <Accordion.Toggle as={Button} 
                                    style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px", alignItems: "center"}} 
                                    variant="link" 
                                    eventKey="2"
                                    onClick={() => this.setState({section3opened: !this.state.section3opened}, () => {
                                        if(this.state.section3opened){
                                            this.setState({section1opened: false});
                                            this.setState({section2opened: false});
                                    }})}>
                                    Placeholder 1 <img img id="toggle_icon" src={this.state.section3opened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <div>
                                        resume 1 content
                                    </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header style={{background:"white", paddingLeft: 0, paddingRight: 0, borderTop: "1px solid black"}}>
                                <Accordion.Toggle as={Button} 
                                    style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px", alignItems: "center"}} 
                                    variant="link" 
                                    eventKey="2"
                                    onClick={() => this.setState({section3opened: !this.state.section3opened}, () => {
                                        if(this.state.section3opened){
                                            this.setState({section1opened: false});
                                            this.setState({section2opened: false});
                                    }})}>
                                    Placeholder 2 <img img id="toggle_icon" src={this.state.section3opened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <div>
                                        resume 1 content
                                    </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Resume;
