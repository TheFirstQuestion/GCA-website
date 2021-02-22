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
import Collapsible from 'react-collapsible';
import Trigger from './Trigger';
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

            initialNotes: '',
            degree: '',
            distinction: '',
            duration: '',
            major: '',
            university: '',

            gender_icon: man,
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
        };
        this.collapsibleOpened = this.collapsibleOpened.bind(this);
        this.submitUserID = this.submitUserID.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.voteClick = this.voteClick.bind(this);
        this.updateMouseCSV = this.updateMouseCSV.bind(this);
        this.positionList = [];
        this.mouseCounter = 0;
        this.activityCounter = 1;
        this.IDlist = ["sheep", "koala", "whale", "dolphin", "panda", "snake", "bear", "lion", "tiger", "celery", 
                        "carrot", "pizza", "salad", "chicken", "burger", "rice", "eggs", "soup", "green", "blue", 
                        "purple", "red", "orange", "yellow", "silver", "olive", "pink", "gold", "shirt", "pants", 
                        "tree", "smoke", "planet", "pencil", "pen", "cookie", "cake", "tire", "phone", "plant"];
    }

    componentDidMount(){
        console.log(this.props.studyVersion)
        const db = firebase.firestore();

        this.setState({studyVersion: this.props.studyVersion}, () => {
            console.log("study version: " + this.state.studyVersion)
        })
        
        console.log(this.props.resumeVersion)
        this.setState({resumeVersion: this.props.resumeVersion}, () => {
            if(this.state.resumeVersion == 1){
                this.generateUniqueID();
            }
            else{
                this.setState({modalOpened: true})
            }
            console.log("resume version: " + this.state.resumeVersion)
        })
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer)
        }
      }    

    //called from generateUniqueID function (so only called for resume 1)
    selectValues(){
        console.log("IN HERE")
        const db = firebase.firestore();

        //select gender
        let gender = Math.random();
        if(gender < 0.5){
            this.setState({gender_icon: man})
            gender = "man"
        }
        else{
            this.setState({gender_icon: woman})
            gender = "woman"
        }

        //select parenthood
        let parenthood = Math.random();
        if(parenthood < 0.5){
            this.setState({parenthood: true}, () => {
                db.collection("resume").doc("notes from initial phone screen").get().then((doc) => {
                    this.setState({initialNotes: doc.data().parent})
                })
            })
            parenthood = true;
        }
        else{
            this.setState({parenthood: false}, () => {
                db.collection("resume").doc("notes from initial phone screen").get().then((doc) => {
                    this.setState({initialNotes: doc.data().nonparent})
                })
            })
            parenthood = false;
        }

        //select education
        let education = Math.random();
        if(education < 0.5){
            this.setState({education: 0}, () => {
                db.collection("resume").doc("education a").get().then((doc) => {
                    this.setState({degree: doc.data().degree})
                    this.setState({distinction: doc.data().distinction})
                    this.setState({duration: doc.data().duration})
                    this.setState({major: doc.data().major})
                    this.setState({university: doc.data().university})
                })
            })
            education = "a";
        }
        else{
            this.setState({education: 1}, () => {
                db.collection("resume").doc("education b").get().then((doc) => {
                    this.setState({degree: doc.data().degree})
                    this.setState({distinction: doc.data().distinction})
                    this.setState({duration: doc.data().duration})
                    this.setState({major: doc.data().major})
                    this.setState({university: doc.data().university})
                })
            })
            education = "b";
        }

        //select work experience 1
        let work1 = Math.random();
        if(work1 < 0.5){
            this.setState({work1: 0}, () => {
                db.collection("resume").doc("work box 1a").get().then((doc) => {
                    this.positionList.push(doc)
                })
            })
            work1 = "a";
        }
        else{
            this.setState({work1: 1}, () => {
                db.collection("resume").doc("work box 1b").get().then((doc) => {
                    this.positionList.push(doc)
                })
            })
            work1 = "b"
        }

        //select work experience 2
        let work2 = Math.random();
        if(work2 < 0.5){
            this.setState({work2: 0}, () => {
                db.collection("resume").doc("work box 2a").get().then((doc) => {
                    this.positionList.push(doc)
                })
            })
            work2 = "a"
        }
        else{
            this.setState({work2: 1}, () => {
                db.collection("resume").doc("work box 2b").get().then((doc) => {
                    this.positionList.push(doc)
                })
            })
            work2 = "b"
        }

        //select work experience 3
        let work3 = Math.random();
        if(work3 < 0.5){
            this.setState({work3: 0}, () => {
                db.collection("resume").doc("work box 3a").get().then((doc) => {
                    this.positionList.push(doc)
                })
            })
            work3 = "a"
        }
        else{
            this.setState({work3: 1}, () => {
                db.collection("resume").doc("work box 3b").get().then((doc) => {
                    this.positionList.push(doc)
                })
            })
            work3 = "b"
        }

        //JUST FOR STUDY 2:
        //select remote or not remote
        let remote = Math.random();
        if(this.state.studyVersion == 2){
            if(remote < 0.5){
                this.setState({remote: true})
                remote = true
            }
            else{
                this.setState({remote: false})
                remote = false
            }
        }
        else{
            remote = null
        }

        //initialize resume 1 values
        const addDoc = db.collection("userIDs").doc(this.state.currentUserID).collection("values shown").doc("resume 1").set({
            "gender": gender,
            "parenthood": parenthood,
            "education": education,
            "work1": work1,
            "work2": work2,
            "work3": work3,
            "remote": remote,
        });
    }

    populateValues(){
        const db = firebase.firestore();

        db.collection("userIDs").doc(this.state.currentUserID).collection("values shown").doc("resume 1").get().then((doc) => {
            let gender = null;
            let parenthood = null;
            let education = null;
            let work1 = null;
            let work2 = null;
            let work3 = null;
            let remote = null;

            //gender - show the same
            if(doc.data().gender == "man"){
                this.setState({gender_icon: man})
                gender = "man"
            }
            else{
                this.setState({gender_icon: woman})
                gender = "woman"
            }

            //parenthood - show the opposite
            if(doc.data().parenthood == true){
                db.collection("resume").doc("notes from initial phone screen").get().then((doc) => {
                    this.setState({initialNotes: doc.data().nonparent})
                })
                parenthood = false;
            }
            else{
                db.collection("resume").doc("notes from initial phone screen").get().then((doc) => {
                    this.setState({initialNotes: doc.data().parent})
                })
                parenthood = true;
            }
            
            //education - show the opposite
            if(doc.data().education == "a"){
                db.collection("resume").doc("education b").get().then((doc) => {
                    this.setState({degree: doc.data().degree})
                    this.setState({distinction: doc.data().distinction})
                    this.setState({duration: doc.data().duration})
                    this.setState({major: doc.data().major})
                    this.setState({university: doc.data().university})
                })
                education = "b"
            }
            else{
                db.collection("resume").doc("education a").get().then((doc) => {
                    this.setState({degree: doc.data().degree})
                    this.setState({distinction: doc.data().distinction})
                    this.setState({duration: doc.data().duration})
                    this.setState({major: doc.data().major})
                    this.setState({university: doc.data().university})
                })
                education = "a"
            }

            //work1 - show the opposite
            if(doc.data().work1 == "a"){
                db.collection("resume").doc("work box 1b").get().then((doc) => {
                    this.positionList.push(doc)
                })
                work1 = "b"
            }
            else{
                db.collection("resume").doc("work box 1a").get().then((doc) => {
                    this.positionList.push(doc)
                })
                work1 = "a"
            }

            //work2 - show the opposite
            if(doc.data().work2 == "a"){
                db.collection("resume").doc("work box 2b").get().then((doc) => {
                    this.positionList.push(doc)
                })
                work2 = "b"
            }
            else{
                db.collection("resume").doc("work box 2a").get().then((doc) => {
                    this.positionList.push(doc)
                })
                work2 = "a"
            }

            //work3 - show the opposite
            if(doc.data().work3 == "a"){
                db.collection("resume").doc("work box 3b").get().then((doc) => {
                    this.positionList.push(doc)
                })
                work3 = "b"
            }
            else{
                db.collection("resume").doc("work box 3a").get().then((doc) => {
                    this.positionList.push(doc)
                })
                work3 = "a"
            }

            //remote - show the opposite (JUST FOR STUDY 2)
            if(this.state.studyVersion == 2){
                if(doc.data().remote == true){
                    this.setState({remote: false})
                    remote = false
                }
                else{
                    this.setState({remote: true})
                    remote = true
                }
            }

            //initialize resume 2 values
            const addDoc = db.collection("userIDs").doc(this.state.currentUserID).collection("values shown").doc("resume 2").set({
                "gender": gender,
                "parenthood": parenthood,
                "education": education,
                "work1": work1,
                "work2": work2,
                "work3": work3,
                "remote": remote,
            });
        })
    }

    generateUniqueID = () => {
        //TODO: not sure if it is worth it but maybe prevent concurrent reads 

        //generate ID
        //let userID = '_' + Math.random().toString(36).substr(2, 9);
        var rand = Math.floor(Math.random() * 100) + 1;
        let r = Math.floor(((Math.random() * 100) + 1) % 40);
        if(r < 0 || r > 40){
            //TODO: is this correct?
            this.generateUniqueID();
            return
        }
        let userID = this.IDlist[r] + "" + rand;
        console.log("user ID: " + userID)

        //check database to make sure it hasnt already been generated
        const db = firebase.firestore();
        const idRef = db.collection("studies").doc("study " + this.state.studyVersion).collection("userIDs").doc(userID)
        idRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    idRef.onSnapshot((doc) => {
                        console.log("ALREADY EXISTS")
                        this.generateUniqueID();
                    });
                } 
                else {
                    console.log("DOES NOT EXIST")
                    
                    //add userID to database 
                    const addDoc = db.collection("studies").doc("study " + this.state.studyVersion).collection("userIDs").doc(userID).set({
                        //initialized: true,
                    });
                    
                    //display ID to user
                    this.setState({currentUserID: userID}, () => {
                        this.selectValues();
                        db.collection("settings").doc("mouse tracking").get().then((doc) => {
                            this.timer = setInterval(this.updateMouseCSV, doc.data().interval);
                        })
                    })
                }
            });
    }

    renderPositionList = () => {
        if(this.positionList.length > 0){
            let viewPositionList = []
            this.positionList.forEach((item, index) => {

                viewPositionList.push(
                    <div>
                        <div className="votingblock">
                            <div id="vertical">
                                <img name={"work" + (index+1) + "_up"} src={this.state["work" + (index + 1) + "_up"] ? upvote_selected : upvote} onClick={this.voteClick}/>
                                <img name={"work" + (index+1) + "_q"} src={this.state["work" + (index + 1) + "_q"] ? question_selected : question} onClick={this.voteClick}/>
                                <img name={"work" + (index+1) + "_down"} src={this.state["work" + (index + 1) + "_down"] ? downvote_selected : downvote} onClick={this.voteClick}/>
                            </div>
                            <div id="subtext"> {item.data().title}
                                <div id="horizontal">
                                    <div id="subinfo">{item.data().company}</div>

                                    {/*remote && study version 2*/}
                                    {this.state.studyVersion == 2 && this.state.remote && index == 0 && <div id="subinfo"><i>Remote</i></div>}
                                    {this.state.studyVersion == 2 && !this.state.remote && index == 0 && <div id="subinfo"><i>City</i></div>}
                                    {this.state.studyVersion == 2 && index != 0 &&
                                        <div id="subinfo"><i>City</i></div>}
                                </div>
                                <div id="subinfogray">{item.data().duration}</div>
                                <div id="subinfo">{item.data().description}</div>
                            </div>
                        </div>
                        <Divider />
                    </div>
                )
            })
            return viewPositionList
        }
        else{
            return null
        }
    }

    collapsibleOpened(e){
        const db = firebase.firestore();

        this.activityCounter = this.activityCounter + 1;
        let count = this.activityCounter.toString();
        let description = '';

        var options = { hour12: false };
        let time = new Date().toLocaleString('en-US', options);
        //let newObj = []
        if(e == 0){
            console.log(time + " education");
            this.state.educationOpenedCount++;
            description = "opened education section"
            //newObj = [time, "opened education section"]
        }
        else if(e == 1){ 
            console.log(time + " work");
            this.state.workexpOpenedCount++;
            description = "opened work section"
            //newObj = [time, "opened work section"]
        }
        //console.log(newObj)
        //this.setState({activityData: [...this.state.activityData, newObj]})

        const addDoc = db.collection("studies").doc("study " + this.state.studyVersion).collection("userIDs").doc(this.state.currentUserID).collection("activityData_resume" + this.state.resumeVersion.toString()).doc(count).set({
            "time": time,
            "description": description,
        });
    }

    submitUserID(){
        if(this.state.enterID == null || this.state.enterID == ''){
            this.setState({errorMessage: true})
            return;
        }

        //read database to see if this ID exists
        const db = firebase.firestore();
        const idRef = db.collection("studies").doc("study " + this.state.studyVersion).collection("userIDs").doc(this.state.enterID)
        idRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    idRef.onSnapshot((doc) => {
                        console.log("VALID: THIS DOES EXIST")
                        this.setState({errorMessage: false})
                        this.setState({currentUserID: this.state.enterID}, () => {
                            this.populateValues();
                            db.collection("settings").doc("mouse tracking").get().then((doc) => {
                                this.timer = setInterval(this.updateMouseCSV, doc.data().interval);
                            })
                            this.setState({modalOpened: false})
                        })
                    });
                } 
                else {
                    console.log("INVALID: DOES NOT EXIST")
            
                    //prompt them to re-enter
                    this.setState({errorMessage: true})
                }
            });
    }

    handleChange(event) {
        this.setState({enterID: event.target.value})
    }

    voteClick(event){
        const db = firebase.firestore();

        this.activityCounter = this.activityCounter + 1;
        let count = this.activityCounter.toString();

        var options = { hour12: false };
        let time = new Date().toLocaleString('en-US', options);

        this.setState({[event.target.name] : !this.state[event.target.name]}, () => {
            if(this.state[event.target.name]){
                const addDoc = db.collection("studies").doc("study " + this.state.studyVersion).collection("userIDs").doc(this.state.currentUserID).collection("activityData_resume" + this.state.resumeVersion.toString()).doc(count).set({
                    "time": time,
                    "description": "clicked " + event.target.name + " button",
                });
            }
            else{
                const addDoc = db.collection("studies").doc("study " + this.state.studyVersion).collection("userIDs").doc(this.state.currentUserID).collection("activityData_resume" + this.state.resumeVersion.toString()).doc(count).set({
                    "time": time,
                    "description": "unclicked " + event.target.name + " button",
                });
            }
        })
    }

    _onMouseMove(e) {
        //let x = e.clientX;// - e.target.offsetLeft
        this.state.x = e.clientX;
        //let y = e.clientY;// - e.target.offsetTop
        this.state.y = e.clientY;
    }

    updateMouseCSV(){
        const db = firebase.firestore();
        this.mouseCounter = this.mouseCounter + 1;
        let count = this.mouseCounter.toString();
        if(count == 1){
            var options = { hour12: false };
            let time = new Date().toLocaleString('en-US', options);
            const addDoc = db.collection("studies").doc("study " + this.state.studyVersion).collection("userIDs").doc(this.state.currentUserID).collection("activityData_resume" + this.state.resumeVersion.toString()).doc("1").set({
                "time": time,
                "description": "entered website",
            });
        }

        //set upper limit of 30 min per participant
        if(count <= 1200){
            var options = { hour12: false };
            let time = new Date().toLocaleString('en-US', options);
            let x = this.state.x;
            let y = this.state.y;
            console.log("RESUME VERSION: " + this.state.resumeVersion)
            
            //remove mouse tracking for now
            /*const addDoc = db.collection("studies").doc("study " + this.state.studyVersion).collection("userIDs").doc(this.state.currentUserID).collection("mouseData_resume" + this.state.resumeVersion.toString()).doc(count).set({
                "time": time,
                "x": x,
                "y": y,
            });*/
        }
    }

    render() {
        return (
            <div className="overall">
                <div className="App" onMouseMove={this._onMouseMove.bind(this)}>
                    <div className="resume">
                        <ModalReact className="modal_dtp"
                            isOpen={this.state.modalOpened}>
                            <div> Enter User ID: </div>
                            <input onChange={this.handleChange.bind(this)} value={this.state.enterID} />
                            <button onClick={() => this.submitUserID()}> Submit </button>
                            {this.state.errorMessage && <div id="red">Invalid ID. Please re-enter.</div>}
                        </ModalReact>

                        {!this.state.modalOpened && 
                        <div>
                        <img className="profile_image" src={this.state.gender_icon} alt="" />
                        <div className="header">Candidate {this.state.resumeVersion == 1 ? "A" : "B"}</div>

                        <div>Notes from Initial Phone Screen:  
                        <span id="subtext"> {this.state.initialNotes} {this.state.studyVersion == 2 && this.state.remote && " + working remotely"}</span>
                        </div>

                        <Accordion>
                            <Card>
                                <Card.Header style={{background:"white", paddingLeft: 0, paddingRight: 0}}>
                                <Accordion.Toggle as={Button}  
                                    style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px"}} 
                                    variant="link" 
                                    eventKey="0"
                                    onClick={() => this.setState({educationSectionOpened: !this.state.educationSectionOpened}, () => {
                                        this.collapsibleOpened(0);
                                        if(this.state.educationSectionOpened){
                                            this.setState({workSectionOpened: false});
                                    }})}>
                                    Education <img src={this.state.educationSectionOpened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <div className="votingblock">
                                        <div id="vertical">
                                            <img name="education_up" src={this.state.education_up ? upvote_selected : upvote} onClick={this.voteClick}/>
                                            <img name="education_q" src={this.state.education_q ? question_selected : question} onClick={this.voteClick}/>
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
                                    style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px"}} 
                                    variant="link" 
                                    eventKey="1"
                                    onClick={() => this.setState({workSectionOpened: !this.state.workSectionOpened}, () => {
                                        this.collapsibleOpened(1);
                                        if(this.state.workSectionOpened){
                                            this.setState({educationSectionOpened: false});
                                    }})}>
                                    Work Experience <img src={this.state.workSectionOpened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    {this.renderPositionList()}
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
