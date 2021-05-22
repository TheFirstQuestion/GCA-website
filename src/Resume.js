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
            //resumeList: [{"edu_degree": "temp", "edu_distinction": "temp", "edu_duration": "temp", "edu_major": "temp", "edu_university": "temp",}],
            resumeList: [],

            currentUserID: '',
            errorMessage: false,

            //all tracking outputs
            educationOpenedCount: 0,
            workexpOpenedCount: 0,
            notesOpenedCount: 0,

            //activityData: [],

            modalOpened: false,
            enterID: '',

            section1opened: false,
            section2opened: false,
            section3opened: false,
            section4opened: false,
            section4opened: false,

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
        this.activityCounter = 1;
        this.selectNames = this.selectNames.bind(this);
        this.shuffle = this.shuffle.bind(this)
        this.generateUniqueID = this.generateUniqueID.bind(this)
    }

    componentDidMount(){
        console.log("men: " + this.props.men)
        console.log("women: " + this.props.women)

        const db = firebase.firestore();

        this.setState({men: this.props.men});
        this.setState({women: this.props.women}, () => {
            this.generateUniqueID();
        });
    }

    generateUniqueID = () => {
        const db = firebase.firestore();
        //TODO: not sure if it is worth it but maybe prevent concurrent reads 

        //console.log(this.IDlist.length)
        var rand = Math.floor(Math.random() * 100) + 1;
        let r = Math.floor(((Math.random() * 100) + 1) % this.IDlist.length);
        if(r < 10 || r > this.IDlist.length){
            this.generateUniqueID();
            return
        }
        let userID = this.IDlist[r] + "" + rand;
        console.log("user ID: " + userID)

        const idRef = db.collection("userIDs").doc(userID)
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
                    
                    //display ID to user
                    this.setState({currentUserID: userID}, () => {
                        console.log("set currentUserID to: " + this.state.currentUserID)
                        
                        //select names
                        this.selectNames(this.state.men, this.state.women);
                    })
                }
            });
    }

    selectNames(number_men, number_women){
        let gender = "male"
        if(number_men <= 0 && number_women <= 0){
            const db = firebase.firestore();

            //shuffle names
            this.shuffle(this.state.names, function() {
                console.log("finished shuffling name order")
                const addDoc = db.collection("userIDs").doc(this.state.currentUserID).set({
                    "candidate1_name": this.state.names[0],
                    "candidate2_name": this.state.names[1],
                    "candidate3_name": this.state.names[2],
                    "candidate4_name": this.state.names[3],
                    "candidate5_name": this.state.names[4],
                }).then(() => {
                    console.log("about to start shuffling")
                    //shuffle resume order
                    this.shuffle(this.state.resumes, function() {
                        console.log("finished shuffling resume order")
                        const addDoc = db.collection("userIDs").doc(this.state.currentUserID).update({
                            "candidate1_resume": this.state.resumes[0],
                            "candidate2_resume": this.state.resumes[1],
                            "candidate3_resume": this.state.resumes[2],
                            "candidate4_resume": this.state.resumes[3],
                            "candidate5_resume": this.state.resumes[4],
                        }).then(() => {
                            let count = this.activityCounter.toString();

                            let time = moment().tz("America/Los_Angeles").format('MM-DD-YYYY HH:mm:ss');

                            const addDoc = db.collection("userIDs").doc(this.state.currentUserID).collection("activityData").doc(count).set({
                                "time": time,
                                "description": "website information loaded",
                            });
                        })
                    })
                })
            })
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

    //get values for this.state.resumes[resume_number]
    pullValues(resume_number){
        console.log("pulling values for resume: " + resume_number)
        if(resume_number == 5){
            return
        }

        let new_dict = {}

        let curr_resume = this.state.resumes[resume_number]   //TODO: change back to this once all resumes are in database
        //let curr_resume = 1

        console.log("curr resume: " + curr_resume)
        
        const db = firebase.firestore();

        db.collection("resumes").doc("resume_" + curr_resume).get().then((doc) => {
            new_dict["edu_degree"] = doc.data().edu_degree
            new_dict["edu_distinction"] = doc.data().edu_distinction
            new_dict["edu_duration"] = doc.data().edu_duration
            new_dict["edu_major"] = doc.data().edu_major
            new_dict["edu_university"] = doc.data().edu_university

            new_dict["work1_company"] = doc.data().work1_company
            new_dict["work1_description"] = doc.data().work1_description
            new_dict["work1_duration"] = doc.data().work1_duration
            new_dict["work1_location"] = doc.data().work1_location
            new_dict["work1_title"] = doc.data().work1_title
        })

        this.state.resumeList.push(new_dict)
        console.log(this.state.resumeList.length)
        this.setState({resumeList: this.state.resumeList})
        this.pullValues(resume_number + 1)
    }

    shuffle(array, callback) {
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
        
        this.setState({[array] : array}, () => {
            if(array == this.state.resumes){
                this.pullValues(0)
            }
        })
        
        let boundCallback = callback.bind(this)
        boundCallback()
        console.log("exit shuffle")
        //return array;
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

    collapsibleOpened(e){
        const db = firebase.firestore();

        this.activityCounter = this.activityCounter + 1;
        let count = this.activityCounter.toString();
        let description = '';

        var options = { hour12: false };
        let time = moment().tz("America/Los_Angeles").format('MM-DD-YYYY HH:mm:ss');

        console.log("OPENED OR CLOSED: " + this.state["section" + (e + 1) + "opened"])
        if(!this.state["section" + (e + 1) + "opened"]){
            description = "closed resume " + (e + 1);
        }
        else{
            description = "opened resume " + (e + 1);
        }
    
        const addDoc = db.collection("userIDs").doc(this.state.currentUserID).collection("activityData").doc(count).set({
            "time": time,
            "description": description,
        });
    }

    render() {
        console.log("list length: " + this.state.resumeList.length)
        /*if(this.state.resumeList.length == 5){
            console.log(this.state.resumeList[0]["edu_degree"])
        }*/
        return (
            <div className="overall">
                <div className="App">
                    <div className="resume">
                        {this.state.resumeList.length == 5 && 
                        <Accordion>
                            <Card>
                                <Card.Header style={{background:"white", paddingLeft: 0, paddingRight: 0}}>
                                <Accordion.Toggle as={Button}  
                                    style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px", alignItems: "center"}} 
                                    variant="link" 
                                    eventKey="0"
                                    onClick={() => this.setState({section1opened: !this.state.section1opened}, () => {
                                        this.collapsibleOpened(0);
                                        if(this.state.section1opened){
                                            this.setState({section2opened: false});
                                            this.setState({section3opened: false});
                                            this.setState({section4opened: false});
                                            this.setState({section5opened: false});
                                    }})}>
                                    {this.state.names[0]} <img id="toggle_icon" src={this.state.section1opened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                <div className="resume">
                                    <img className="profile_image" src={this.state.gender_icon} alt="" />
                                    <div className="header">{this.state.name}</div>

                                    <div class="notes">Notes from Initial Phone Screen:  
                                        <span id="subtext_bullet">
                                            <ul>
                                                {(this.state.studyVersion == 2 || this.state.studyVersion == "2b") && <li>{this.state.remoteNotesText}</li>}
                                                {this.renderBulletList()}
                                            </ul>
                                        </span>
                                        {/*<span id="subtext"> {this.state.initialNotes} {this.state.studyVersion == 2 && this.state.remote && " + working remotely"}</span>*/}
                                    </div>
                                    <div id="subtext">{this.state.resumeList[0]["edu_university"]}
                                        <div id="subinfo">{this.state.resumeList[0]["edu_degree"]}, {this.state.resumeList[0]["edu_major"]}</div>
                                        <div id="subinfogray">{this.state.resumeList[0]["edu_duration"]}</div>
                                    </div>
                                    <div id="subtext"> {this.state.resumeList[0]["work1_title"]}
                                        <div id="horizontal">
                                            <div id="subinfo">{this.state.resumeList[0]["work1_company"]}</div>
                                            <div id="subinfo"><i>{this.state.resumeList[0]["work1_location"]}</i></div>
                                        </div>
                                        <div id="subinfogray">{this.state.resumeList[0]["work1_duration"]}</div>
                                        <div id="subinfo">{this.state.resumeList[0]["work1_description"]}</div>
                                    </div>
                                    <Divider />
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
                                        this.collapsibleOpened(1);
                                        if(this.state.section2opened){
                                            this.setState({section1opened: false});
                                            this.setState({section3opened: false});
                                            this.setState({section4opened: false});
                                            this.setState({section5opened: false});
                                    }})}>
                                    {this.state.names[1]} <img img id="toggle_icon" src={this.state.section2opened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                <div className="resume">
                                    <img className="profile_image" src={this.state.gender_icon} alt="" />
                                    <div className="header">{this.state.name}</div>

                                    <div class="notes">Notes from Initial Phone Screen:  
                                        <span id="subtext_bullet">
                                            <ul>
                                                {(this.state.studyVersion == 2 || this.state.studyVersion == "2b") && <li>{this.state.remoteNotesText}</li>}
                                                {this.renderBulletList()}
                                            </ul>
                                        </span>
                                        {/*<span id="subtext"> {this.state.initialNotes} {this.state.studyVersion == 2 && this.state.remote && " + working remotely"}</span>*/}
                                    </div>
                                    <div id="subtext">{this.state.resumeList[1]["edu_university"]}
                                        <div id="subinfo">{this.state.resumeList[1]["edu_degree"]}, {this.state.resumeList[1]["edu_major"]}</div>
                                        <div id="subinfogray">{this.state.resumeList[1]["edu_duration"]}</div>
                                    </div>
                                    <div id="subtext"> {this.state.resumeList[1]["work1_title"]}
                                        <div id="horizontal">
                                            <div id="subinfo">{this.state.resumeList[1]["work1_company"]}</div>
                                            <div id="subinfo"><i>{this.state.resumeList[1]["work1_location"]}</i></div>
                                        </div>
                                        <div id="subinfogray">{this.state.resumeList[1]["work1_duration"]}</div>
                                        <div id="subinfo">{this.state.resumeList[1]["work1_description"]}</div>
                                    </div>
                                    <Divider />
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
                                        this.collapsibleOpened(2);
                                        if(this.state.section3opened){
                                            this.setState({section1opened: false});
                                            this.setState({section2opened: false});
                                            this.setState({section4opened: false});
                                            this.setState({section5opened: false});
                                    }})}>
                                    {this.state.names[2]} <img img id="toggle_icon" src={this.state.section3opened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                <div className="resume">
                                    <img className="profile_image" src={this.state.gender_icon} alt="" />
                                    <div className="header">{this.state.name}</div>

                                    <div class="notes">Notes from Initial Phone Screen:  
                                        <span id="subtext_bullet">
                                            <ul>
                                                {(this.state.studyVersion == 2 || this.state.studyVersion == "2b") && <li>{this.state.remoteNotesText}</li>}
                                                {this.renderBulletList()}
                                            </ul>
                                        </span>
                                        {/*<span id="subtext"> {this.state.initialNotes} {this.state.studyVersion == 2 && this.state.remote && " + working remotely"}</span>*/}
                                    </div>

                                    <div id="subtext">{this.state.resumeList[2]["edu_university"]}
                                        <div id="subinfo">{this.state.resumeList[2]["edu_degree"]}, {this.state.resumeList[2]["edu_major"]}</div>
                                        <div id="subinfogray">{this.state.resumeList[2]["edu_duration"]}</div>
                                    </div>

                                    <div id="subtext"> {this.state.resumeList[2]["work1_title"]}
                                        <div id="horizontal">
                                            <div id="subinfo">{this.state.resumeList[2]["work1_company"]}</div>
                                            <div id="subinfo"><i>{this.state.resumeList[2]["work1_location"]}</i></div>
                                        </div>
                                        <div id="subinfogray">{this.state.resumeList[2]["work1_duration"]}</div>
                                        <div id="subinfo">{this.state.resumeList[2]["work1_description"]}</div>
                                    </div>
                                    <Divider />
                                </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header style={{background:"white", paddingLeft: 0, paddingRight: 0, borderTop: "1px solid black"}}>
                                <Accordion.Toggle as={Button} 
                                    style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px", alignItems: "center"}} 
                                    variant="link" 
                                    eventKey="3"
                                    onClick={() => this.setState({section4opened: !this.state.section4opened}, () => {
                                        this.collapsibleOpened(3);
                                        if(this.state.section4opened){
                                            this.setState({section1opened: false});
                                            this.setState({section2opened: false});
                                            this.setState({section3opened: false});
                                            this.setState({section5opened: false});
                                    }})}>
                                    {this.state.names[3]} <img img id="toggle_icon" src={this.state.section4opened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                <div className="resume">
                                    <img className="profile_image" src={this.state.gender_icon} alt="" />
                                    <div className="header">{this.state.name}</div>

                                    <div class="notes">Notes from Initial Phone Screen:  
                                        <span id="subtext_bullet">
                                            <ul>
                                                {(this.state.studyVersion == 2 || this.state.studyVersion == "2b") && <li>{this.state.remoteNotesText}</li>}
                                                {this.renderBulletList()}
                                            </ul>
                                        </span>
                                        {/*<span id="subtext"> {this.state.initialNotes} {this.state.studyVersion == 2 && this.state.remote && " + working remotely"}</span>*/}
                                    </div>
                                    <div id="subtext">{this.state.resumeList[3]["edu_university"]}
                                        <div id="subinfo">{this.state.resumeList[3]["edu_degree"]}, {this.state.resumeList[3]["edu_major"]}</div>
                                        <div id="subinfogray">{this.state.resumeList[3]["edu_duration"]}</div>
                                    </div>
                                    <div id="subtext"> {this.state.resumeList[3]["work1_title"]}
                                        <div id="horizontal">
                                            <div id="subinfo">{this.state.resumeList[3]["work1_company"]}</div>
                                            <div id="subinfo"><i>{this.state.resumeList[3]["work1_location"]}</i></div>
                                        </div>
                                        <div id="subinfogray">{this.state.resumeList[3]["work1_duration"]}</div>
                                        <div id="subinfo">{this.state.resumeList[3]["work1_description"]}</div>
                                    </div>
                                    <Divider />
                                </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header style={{background:"white", paddingLeft: 0, paddingRight: 0, borderTop: "1px solid black"}}>
                                <Accordion.Toggle as={Button} 
                                    style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px", alignItems: "center"}} 
                                    variant="link" 
                                    eventKey="4"
                                    onClick={() => this.setState({section5opened: !this.state.section5opened}, () => {
                                        this.collapsibleOpened(4);
                                        if(this.state.section5opened){
                                            this.setState({section1opened: false});
                                            this.setState({section2opened: false});
                                            this.setState({section3opened: false});
                                            this.setState({section4opened: false});
                                    }})}>
                                    {this.state.names[4]} <img img id="toggle_icon" src={this.state.section5opened ? minus : plus}/>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="4">
                                <Card.Body>
                                <div className="resume">
                                    <img className="profile_image" src={this.state.gender_icon} alt="" />
                                    <div className="header">{this.state.name}</div>

                                    <div class="notes">Notes from Initial Phone Screen:  
                                        <span id="subtext_bullet">
                                            <ul>
                                                {(this.state.studyVersion == 2 || this.state.studyVersion == "2b") && <li>{this.state.remoteNotesText}</li>}
                                                {this.renderBulletList()}
                                            </ul>
                                        </span>
                                        {/*<span id="subtext"> {this.state.initialNotes} {this.state.studyVersion == 2 && this.state.remote && " + working remotely"}</span>*/}
                                    </div>
                                    <div id="subtext">{this.state.resumeList[4]["edu_university"]}
                                        <div id="subinfo">{this.state.resumeList[4]["edu_degree"]}, {this.state.resumeList[4]["edu_major"]}</div>
                                        <div id="subinfogray">{this.state.resumeList[4]["edu_duration"]}</div>
                                    </div>
                                    <div id="subtext"> {this.state.resumeList[4]["work1_title"]}
                                        <div id="horizontal">
                                            <div id="subinfo">{this.state.resumeList[4]["work1_company"]}</div>
                                            <div id="subinfo"><i>{this.state.resumeList[4]["work1_location"]}</i></div>
                                        </div>
                                        <div id="subinfogray">{this.state.resumeList[4]["work1_duration"]}</div>
                                        <div id="subinfo">{this.state.resumeList[4]["work1_description"]}</div>
                                    </div>
                                    <Divider />
                                </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        }               
                        </div>
                    </div>
                    <div className="userID"><strong>{this.state.currentUserID}</strong></div>
                </div>
        );
    }
}

export default Resume;
