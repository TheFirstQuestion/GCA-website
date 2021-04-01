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

class PracticeResume extends React.Component {
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

            educationSectionOpened: false,
            workSectionOpened: false,

            city: '',

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
            name: '',

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
        this.voteClick = this.voteClick.bind(this);
        this.renderBulletList = this.renderBulletList.bind(this);
        this.positionList = [];
    }

    componentDidMount(){
        this.selectValues();
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer)
        }
      }    

    selectValues(){
        const db = firebase.firestore();

        //select parenthood
        db.collection("resume").doc("notes from initial phone screen").get().then((doc) => {
            let gender = doc.data().practice_gender.toString();
            if(gender == "man"){
                this.setState({gender_icon: man})

                db.collection("resume").doc("candidate names").get().then((doc) => {
                    this.setState({name: doc.data().man_practice})
                })
            }
            else{
                this.setState({gender_icon: woman})

                db.collection("resume").doc("candidate names").get().then((doc) => {
                    this.setState({name: doc.data().woman_practice})
                })
            }

            let temp = doc.data().practice_notes.toString()
            if(gender == "man"){
                temp = temp.replace("[pronoun]", "his")
            }
            else{
                temp = temp.replace("[pronoun]", "her")
            }
            var split = temp.split(".")
            this.setState({bulletList: split})

            this.setState({currentUserID: doc.data().practice_userID}) 
        })

        //get misc
        db.collection("resume").doc("misc").get().then((doc) => {
            this.setState({miscellaneousText: doc.data().practice})
        })

        //select education
        db.collection("resume").doc("education practice").get().then((doc) => {
            this.setState({degree: doc.data().degree})
            this.setState({distinction: doc.data().distinction})
            this.setState({duration: doc.data().duration})
            this.setState({major: doc.data().major})
            this.setState({university: doc.data().university})
        })

        //select work experience 1
        db.collection("resume").doc("work box 1practice").get().then((doc) => {
            this.positionList.push(doc)
        })

        //select work experience 2
        db.collection("resume").doc("work box 2practice").get().then((doc) => {
            this.positionList.push(doc)
        })
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

    renderPositionList = () => {
        if(this.positionList.length > 0){
            let viewPositionList = []
            this.positionList.forEach((item, index) => {

                viewPositionList.push(
                    <div>
                        <div className="votingblock">
                            <div id="vertical">
                                <img name={"work" + (index+1) + "_up"} src={this.state["work" + (index + 1) + "_up"] ? upvote_selected : upvote} onClick={this.voteClick}/>
                                <img name={"work" + (index+1) + "_q"} src={this.state["work" + (index + 1) + "_q"] ? circle_selected : circle} onClick={this.voteClick}/>
                                <img name={"work" + (index+1) + "_down"} src={this.state["work" + (index + 1) + "_down"] ? downvote_selected : downvote} onClick={this.voteClick}/>
                            </div>
                            <div id="subtext"> {item.data().title}
                                <div id="horizontal">
                                    <div id="subinfo">{item.data().company}</div>

                                    {/*remote && study version 2*/}
                                    {this.state.studyVersion == 2 && this.state.remote && index == 0 && <div id="subinfo"><i>Remote</i></div>}
                                    {this.state.studyVersion == 2 && !this.state.remote && index == 0 && <div id="subinfo"><i>{this.state.city}</i></div>}
                                    {this.state.studyVersion == 2 && index != 0 &&
                                        <div id="subinfo"><i>{this.state.city}</i></div>}
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

    voteClick(event){
        this.setState({[event.target.name] : !this.state[event.target.name]}, () => {
            if(this.state[event.target.name]){
                //unclick the others in the same box
                if(event.target.name == "work1_up"){
                    this.setState({work1_down: false, work1_q: false})
                }
                else if(event.target.name == "work2_up"){
                    this.setState({work2_down: false, work2_q: false})
                }
                else if(event.target.name == "work3_up"){
                    this.setState({work3_down: false, work3_q: false})
                }

                else if(event.target.name == "work1_down"){
                    this.setState({work1_up: false, work1_q: false})
                }
                else if(event.target.name == "work2_down"){
                    this.setState({work2_up: false, work2_q: false})
                }
                else if(event.target.name == "work3_down"){
                    this.setState({work3_up: false, work3_q: false})
                }

                else if(event.target.name == "work1_q"){
                    this.setState({work1_up: false, work1_down: false})
                }
                else if(event.target.name == "work2_q"){
                    this.setState({work2_up: false, work2_down: false})
                }
                else if(event.target.name == "work3_q"){
                    this.setState({work3_up: false, work3_down: false})
                }

                else if(event.target.name == "education_down"){
                    this.setState({education_up: false, education_q: false})
                }
                else if(event.target.name == "education_up"){
                    this.setState({education_down: false, education_q: false})
                }
                else if(event.target.name == "education_q"){
                    this.setState({education_up: false, education_down: false})
                }

                else if(event.target.name == "notes_down"){
                    this.setState({notes_up: false, notes_q: false})
                }
                else if(event.target.name == "notes_up"){
                    this.setState({notes_down: false, notes_q: false})
                }
                else if(event.target.name == "notes_q"){
                    this.setState({notes_up: false, notes_down: false})
                }

                else if(event.target.name == "misc_down"){
                    this.setState({misc_up: false, misc_q: false})
                }
                else if(event.target.name == "misc_up"){
                    this.setState({misc_down: false, misc_q: false})
                }
                else if(event.target.name == "misc_q"){
                    this.setState({misc_up: false, misc_down: false})
                }
            }
        })
    }

    render() {
        return (
            <div className="overall">
                <div className="App">
                    <div className="resume">

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
                                        {this.state.studyVersion == 2 && this.state.remote && <li>{this.state.remoteNotesText}</li>}
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
                                        if(this.state.educationSectionOpened){
                                            this.setState({workSectionOpened: false});
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
                                        if(this.state.workSectionOpened){
                                            this.setState({educationSectionOpened: false});
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

export default PracticeResume;
