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
//import Modal from 'react-bootstrap/Modal'
import plus from './plus_icon.png';
import minus from './minus_icon.png';
import firebase from './firebase';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core';

class Resume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //TODO: automate this
            //study version
            studyVersion: 1,

            //which resume are they seeing (first or second)? update this in componentDidUpdate
            resumeVersion: 1,

            //all tracking outputs
            educationOpenedCount: 0,
            workexpOpenedCount: 0,
            notesOpenedCount: 0,

            activityData: [],

            modalOpened: true,
            participant_number: '',

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
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.voteClick = this.voteClick.bind(this);
        this.positionList = [];
    }

    componentDidMount(){
        console.log(this.props.studyVersion)
        this.setState({studyVersion: this.props.studyVersion}, () => {
            console.log("study version: " + this.state.studyVersion)
        })
        //TODO: get resume version

        const db = firebase.firestore();

        //select gender
        let gender = Math.random();
        if(gender < 0.5){
            this.setState({gender_icon: man})
        }
        else{
            this.setState({gender_icon: woman})
        }

        //select parenthood
        let parenthood = Math.random();
        if(parenthood < 0.5){
            this.setState({parenthood: true}, () => {
                db.collection("resume").doc("notes from initial phone screen").get().then((doc) => {
                    this.setState({initialNotes: doc.data().parent})
                })
            })
        }
        else{
            this.setState({parenthood: false}, () => {
                db.collection("resume").doc("notes from initial phone screen").get().then((doc) => {
                    this.setState({initialNotes: doc.data().nonparent})
                })
            })
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
        }

        //select work experience 1
        let work1 = Math.random();
        if(work1 < 0.5){
            this.setState({work1: 0}, () => {
                db.collection("resume").doc("work box 1a").get().then((doc) => {
                    this.positionList.push(doc)
                    console.log(this.positionList)
                })
            })
        }
        else{
            this.setState({work1: 1}, () => {
                db.collection("resume").doc("work box 1b").get().then((doc) => {
                    this.positionList.push(doc)
                    console.log(this.positionList)
                })
            })
        }

        //select work experience 2
        let work2 = Math.random();
        if(work2 < 0.5){
            this.setState({work2: 0}, () => {
                db.collection("resume").doc("work box 2a").get().then((doc) => {
                    this.positionList.push(doc)
                    console.log(this.positionList)
                })
            })
        }
        else{
            this.setState({work2: 1}, () => {
                db.collection("resume").doc("work box 2b").get().then((doc) => {
                    this.positionList.push(doc)
                    console.log(this.positionList)
                })
            })
        }

        //select work experience 3
        let work3 = Math.random();
        if(work3 < 0.5){
            this.setState({work3: 0}, () => {
                db.collection("resume").doc("work box 3a").get().then((doc) => {
                    this.positionList.push(doc)
                    console.log(this.positionList)
                })
            })
        }
        else{
            this.setState({work3: 1}, () => {
                db.collection("resume").doc("work box 3b").get().then((doc) => {
                    this.positionList.push(doc)
                    console.log(this.positionList)
                })
            })
        }

        //JUST FOR STUDY 2:
        //select remote or not remote
        if(this.state.studyVersion == 2){
            let remote = Math.random();
            if(remote < 0.5){
                this.setState({remote: true})
            }
            else{
                this.setState({remote: false})
            }
        }
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
        var options = { hour12: false };
        let time = new Date().toLocaleString('en-US', options);
        let newObj = []
        if(e == 0){
            console.log(time + " education");
            this.state.educationOpenedCount++;
            newObj = [time, "opened education section"]
        }
        else if(e == 1){ 
            console.log(time + " work");
            this.state.workexpOpenedCount++;
            newObj = [time, "opened work section"]
        }
        console.log(newObj)
        this.setState({activityData: [...this.state.activityData, newObj]})
    }

    toggleModal(){
        this.setState({modalOpened: false});
    }

    handleChange(event) {
        this.setState({participant_number: event.target.value})
    }

    voteClick(event){
        var options = { hour12: false };
        let time = new Date().toLocaleString('en-US', options);
        let newObj = []

        this.setState({[event.target.name] : !this.state[event.target.name]}, () => {
            if(this.state[event.target.name]){
                newObj = [time, "clicked " + event.target.name + " button"]
                console.log(newObj)
                this.setState({activityData: [...this.state.activityData, newObj]})
            }
            else{
                newObj = [time, "unclicked " + event.target.name + " button"]
                console.log(newObj)
                this.setState({activityData: [...this.state.activityData, newObj]})
            }
        })
    }

    render() {
        return (
            <div className="resume">
                <ModalReact className="modal_dtp"
                    isOpen={this.state.modalOpened}>
                    <div> Enter Participant Number: </div>
                    <input onChange={this.handleChange.bind(this)} value={this.state.participant_number} />
                    <button onClick={() => this.toggleModal()}> Submit </button>
                </ModalReact>

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
            </div>
        );
    }
}

export default Resume;
