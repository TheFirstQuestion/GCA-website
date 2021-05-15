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

//google drive setup
/*const { google } = require('googleapis');
const credentials = require('./credentials.json');
const scopes = [
  'https://www.googleapis.com/auth/drive'
];
const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, scopes
);
const drive = google.drive({ version: "v3", auth });*/
//google API key: AIzaSyB62kAzqYdxNXg0vWj-kqEo_Ls1BvZJ-mI

class Resume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //study and resume version (pulled from props)
            studyVersion: 1,
            resumeVersion: 1,
            gender: "male",

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

            educationSectionOpened: false,
            workSectionOpened: false,
            miscellaneousSectionOpened: false,

            city: '',

            initialNotes: '',
            degree: '',
            distinction: '',
            duration: '',
            major: '',
            university: '',

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
        this.collapsibleOpened = this.collapsibleOpened.bind(this);
        this.submitUserID = this.submitUserID.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.voteClick = this.voteClick.bind(this);
        this.updateMouseCSV = this.updateMouseCSV.bind(this);
        this.renderBulletList = this.renderBulletList.bind(this);
        this.positionList = [];
        this.mouseCounter = 0;
        this.activityCounter = 1;
        this.IDlist = ["sheep", "koala", "whale", "dolphin", "panda", "snake", "bear", "lion", "tiger", "celery", 
                        "carrot", "pizza", "salad", "chicken", "burger", "rice", "eggs", "soup", "green", "blue", 
                        "purple", "red", "orange", "yellow", "silver", "olive", "pink", "gold", "shirt", "pants", 
                        "tree", "smoke", "planet", "pencil", "pen", "cookie", "cake", "tire", "phone", "plant",
                        "north", "east", "south", "west", "right", "left", "canyon", "mountain", "park", "field", 
                        "snow", "rain", "beach", "ocean", "wind", "storm", "thunder", "hill", "road", "traffic", 
                        "cliff", "waves", "shell", "island", "sand", "umbrella", "swim", "climb", "dive", "surf", 

                        "hike", "run", "walk", "bike", "canoe", "boat", "ice", "air", "river", "pond", 
                        "lake", "stream", "canal", "street", "coffee", "tea", "soda", "lunch", "dinner", "snack", 
                        "eat", "drink", "sleep", "wake", "jump", "fall", "alaska", "florida", "idaho", "ohio",
                    ];
    }

    componentDidMount(){
    }

    componentWillUnmount() {
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
                <div className="App" onMouseMove={this._onMouseMove.bind(this)}>
                    <div className="resume">
                        <ModalReact className="modal_dtp"
                            isOpen={this.state.modalOpened}>
                            <div>enter code: </div>
                            <input onChange={this.handleChange.bind(this)} value={this.state.enterID} />
                            <button onClick={() => this.submitUserID()}> Submit </button>
                            {this.state.errorMessage && <div id="red">Invalid ID. Please re-enter.</div>}
                        </ModalReact>

                        {!this.state.modalOpened && 
                        <div>
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

                        <Accordion>
                            <Card>
                                <Card.Header style={{background:"white", paddingLeft: 0, paddingRight: 0}}>
                                <Accordion.Toggle as={Button}  
                                    style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px", alignItems: "center"}} 
                                    variant="link" 
                                    eventKey="0"
                                    onClick={() => this.setState({educationSectionOpened: !this.state.educationSectionOpened}, () => {
                                        this.collapsibleOpened(0);
                                        if(this.state.educationSectionOpened){
                                            this.setState({workSectionOpened: false});
                                            this.setState({miscellaneousSectionOpened: false});
                                    }})}>
                                    Education <img id="toggle_icon" src={this.state.educationSectionOpened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body>
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
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header style={{background:"white", paddingLeft: 0, paddingRight: 0, borderTop: "1px solid black"}}>
                                <Accordion.Toggle as={Button} 
                                    style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px", alignItems: "center"}} 
                                    variant="link" 
                                    eventKey="1"
                                    onClick={() => this.setState({workSectionOpened: !this.state.workSectionOpened}, () => {
                                        this.collapsibleOpened(1);
                                        if(this.state.workSectionOpened){
                                            this.setState({educationSectionOpened: false});
                                            this.setState({miscellaneousSectionOpened: false});
                                    }})}>
                                    Work Experience <img img id="toggle_icon" src={this.state.workSectionOpened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    {this.renderPositionList()}
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            {this.state.studyVersion != "2b" &&
                            <Card>
                                <Card.Header style={{background:"white", paddingLeft: 0, paddingRight: 0, borderTop: "1px solid black"}}>
                                <Accordion.Toggle as={Button} 
                                    style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px", alignItems: "center"}} 
                                    variant="link" 
                                    eventKey="2"
                                    onClick={() => this.setState({miscellaneousSectionOpened: !this.state.miscellaneousSectionOpened}, () => {
                                        this.collapsibleOpened(2);
                                        if(this.state.miscellaneousSectionOpened){
                                            this.setState({educationSectionOpened: false});
                                            this.setState({workSectionOpened: false});
                                    }})}>
                                    Miscellaneous <img img id="toggle_icon" src={this.state.miscellaneousSectionOpened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <div className="votingblock">
                                        <div id="vertical">
                                            <img name="misc_up" src={this.state.misc_up ? upvote_selected : upvote} onClick={this.voteClick}/>
                                            <img name="misc_q" src={this.state.misc_q ? circle_selected : circle} onClick={this.voteClick}/>
                                            <img name="misc_down" src={this.state.misc_down ? downvote_selected : downvote} onClick={this.voteClick}/>
                                        </div>
                                        <div id="vertical">
                                            {this.state.miscellaneousText}
                                        </div>
                                    </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>}
                        </Accordion>

                        <Accordion>
                            <Card>
                                <Card.Header style={{background:"white", paddingLeft: 0, paddingRight: 0}}>
                                <Accordion.Toggle as={Button}  
                                    style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px", alignItems: "center"}} 
                                    variant="link" 
                                    eventKey="0"
                                    onClick={() => this.setState({educationSectionOpened: !this.state.educationSectionOpened}, () => {
                                        this.collapsibleOpened(0);
                                        if(this.state.educationSectionOpened){
                                            this.setState({workSectionOpened: false});
                                            this.setState({miscellaneousSectionOpened: false});
                                    }})}>
                                    Education <img id="toggle_icon" src={this.state.educationSectionOpened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body>
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
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header style={{background:"white", paddingLeft: 0, paddingRight: 0, borderTop: "1px solid black"}}>
                                <Accordion.Toggle as={Button} 
                                    style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px", alignItems: "center"}} 
                                    variant="link" 
                                    eventKey="1"
                                    onClick={() => this.setState({workSectionOpened: !this.state.workSectionOpened}, () => {
                                        this.collapsibleOpened(1);
                                        if(this.state.workSectionOpened){
                                            this.setState({educationSectionOpened: false});
                                            this.setState({miscellaneousSectionOpened: false});
                                    }})}>
                                    Work Experience <img img id="toggle_icon" src={this.state.workSectionOpened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    {this.renderPositionList()}
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header style={{background:"white", paddingLeft: 0, paddingRight: 0, borderTop: "1px solid black"}}>
                                <Accordion.Toggle as={Button} 
                                    style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px", alignItems: "center"}} 
                                    variant="link" 
                                    eventKey="2"
                                    onClick={() => this.setState({miscellaneousSectionOpened: !this.state.miscellaneousSectionOpened}, () => {
                                        this.collapsibleOpened(2);
                                        if(this.state.miscellaneousSectionOpened){
                                            this.setState({educationSectionOpened: false});
                                            this.setState({workSectionOpened: false});
                                    }})}>
                                    resume 1 name <img img id="toggle_icon" src={this.state.miscellaneousSectionOpened ? minus : plus}/>
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
                        </div>}
                    </div>
                </div>
                {this.state.resumeVersion == 1 && <div className="userID"><strong>{this.state.currentUserID}</strong></div>}
            </div>
        );
    }
}

export default Resume;
