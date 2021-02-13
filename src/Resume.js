import React, {useState} from 'react';
import './App.css';
import woman from './female_user.png';
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

class Resume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            educationOpenedCount: 0,
            workexpOpenedCount: 0,
            notesOpenedCount: 0,

            x: 0,
            y: 0,
            csvData: [],

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
        };
        this.collapsibleOpened = this.collapsibleOpened.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.positionList = [];
    }

    componentDidMount(){
        console.log("hello")
        const db = firebase.firestore();

        //add values 
        /*const blah = db.collection("test").add({
            test: "test",
        });*/

        db.collection("resume").doc("notes from initial phone screen").get().then((doc) => {
            this.setState({initialNotes: doc.data().nonparent})
        })
        db.collection("resume").doc("resume variations").collection("variation a").doc("education").get().then((doc) => {
            this.setState({degree: doc.data().degree})
            this.setState({distinction: doc.data().distinction})
            this.setState({duration: doc.data().duration})
            this.setState({major: doc.data().major})
            this.setState({university: doc.data().university})
        })
        this.getPositionList();
    }

    getPositionList = async() => {
        const db = firebase.firestore();
        const result = await db.collection("resume").doc("resume variations").collection("variation a").doc("work experience").collection("positions").get();//.then(snapshot => {

        if(result.docs.length > 0){
            this.positionList = [...result.docs]
        }
            /*snapshot.docs.forEach(doc => {
                console.log(doc.data().company)
                console.log(doc.data().description)
            })*/
        //});
    }

    renderPositionList = () => {
        if(this.positionList.length > 0){
            let viewPositionList = []
            this.positionList.forEach((item, index) => {
                let company = item.data().company;
                let description = item.data().description;
                let title = item.data().title;
                let duration = item.data().duration;

                viewPositionList.push(
                    <div>
                        <div id="subtext"> {item.data().title}
                            <div id="subinfo">{item.data().company}</div>
                            <div id="subinfogray">{item.data().duration}</div>
                            <div id="subinfo">{item.data().description}</div>
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
        if(e == 0){
            this.state.educationOpenedCount++;
            console.log("education opened count: " + this.state.educationOpenedCount)
            this.setState({workSectionOpened: false});
        }
        else if(e == 1){
            this.state.workexpOpenedCount++;
            console.log("work experience opened count: " + this.state.workexpOpenedCount)
            this.setState({educationSectionOpened: false})
        }
    }

    toggleModal(){
        this.setState({modalOpened: false});
    }

    handleChange(event) {
        this.setState({participant_number: event.target.value})
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

                <img className="profile_image" src={woman} alt="" />
                <div className="header">Name</div>

                <div>Notes from Initial Phone Screen:  
                <span id="subtext"> {this.state.initialNotes}</span>
                </div>

                {/*<Collapsible onTriggerOpening={() => this.collapsibleOpened(0)} 
                    accordionPosition={"0"}
                    trigger={<Trigger trigger_name={"Education"} trigger_icon={plus}/>}
                    triggerWhenOpen={<Trigger trigger_name={"Education"} trigger_icon={minus}/>}>
                    <div id="subtext">{this.state.university}
                        <div id="subinfo">{this.state.degree}, {this.state.major}</div>
                        <div id="subinfogray">{this.state.duration}</div>
                    </div>

                    {/*<Divider />

                    <div id="subtext">Major</div>

                    <Divider />

                    <div id="subtext">Distinction</div>
                </Collapsible>

                <Collapsible onTriggerOpening={() => this.collapsibleOpened(1)} 
                    accordionPosition={"1"}
                    trigger={<Trigger trigger_name={"Work Experience"} trigger_icon={plus}/>}
                    triggerWhenOpen={<Trigger trigger_name={"Work Experience"} trigger_icon={minus}/>}>
                    
                    {this.renderPositionList()}

                    <div id="subtext">Software Engineer
                        <div id="subinfo">Unity Technologies * Internship</div>
                        <div id="subinfogray">June 2020 - Present * 9 mos</div>
                        <div id="subinfo">AI, Unity Simulation</div>
                    </div>

                    <Divider />
                    
                    <div id="subtext">Research Intern
                        <div id="subinfo">Stanford HCI Group</div>
                        <div id="subinfogray">Mar 2019 - Present * 2 years</div>
                        <div id="subinfogray">Stanford, California</div>
                        <div id="subinfo">Working on project: An Augmented Reality Interface for Autonomous Robots, in which we investigate the use of spatial information visualization techniques through an AR interface for programming, understanding, and debugging human-robot interactions. With the use of AR, our tool aims to make the internal states of the robot and its relation to people, objects, and the environment visible to programmers.</div>
                    </div>

                    <Divider />

                    <div id="subtext">Sofware Engineer
                        <div id="subinfo">Facebook</div>
                        <div id="subinfogray">June 2020 - Present</div>
                        <div id="subinfo">Filler filler filler filler</div>
                    </div>
                </Collapsible>*/}

                <Accordion>
                    <Card>
                        <Card.Header style={{background:"white", paddingLeft: 0, paddingRight: 0}}>
                        <Accordion.Toggle as={Button}  
                            style={{color:"black", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "18px"}} 
                            variant="link" 
                            eventKey="0"
                            onClick={() => this.setState({educationSectionOpened: !this.state.educationSectionOpened}, () => {
                                if(this.state.educationSectionOpened){
                                    this.setState({workSectionOpened: false});
                            }})}>
                            Education <img src={this.state.educationSectionOpened ? minus : plus}/>
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        <div id="subtext">{this.state.university}
                            <div id="subinfo">{this.state.degree}, {this.state.major}</div>
                            <div id="subinfogray">{this.state.duration}</div>
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
