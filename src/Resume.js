import React, {useState} from 'react';
import './App.css';
import woman from './female_user.png';
import Collapsible from 'react-collapsible';
import Trigger from './Trigger';
import Divider from '@material-ui/core/Divider';
import Modal from 'react-modal';
import plus from './plus_icon.png';
import minus from './minus_icon.png';

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
        };
        this.collapsibleOpened = this.collapsibleOpened.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
                <Modal className="modal"
                    isOpen={this.state.modalOpened}>
                    <div> Enter Participant Number: </div>
                    <input onChange={this.handleChange.bind(this)} value={this.state.participant_number} />
                    <button onClick={() => this.toggleModal()}> Submit </button>
                </Modal>

                <img className="profile_image" src={woman} alt="" />
                <div className="header">Woman Name</div>

                <div>Notes from Initial Phone Screen:  
                <span id="subtext"> ........</span>
                </div>

                <Collapsible onTriggerOpening={() => this.collapsibleOpened(0)} 
                    accordionPosition={"0"}
                    trigger={<Trigger trigger_name={"Education"} trigger_icon={plus}/>}
                    triggerWhenOpen={<Trigger trigger_name={"Education"} trigger_icon={minus}/>}>
                    <div id="subtext">Stanford University
                        <div id="subinfo">Master's degree, Computer Science</div>
                        <div id="subinfogray">2021</div>
                    </div>

                    <Divider />

                    <div id="subtext">Major</div>

                    <Divider />

                    <div id="subtext">Distinction</div>
                </Collapsible>

                <Collapsible onTriggerOpening={() => this.collapsibleOpened(1)} 
                    accordionPosition={"1"}
                    trigger={<Trigger trigger_name={"Work Experience"} trigger_icon={plus}/>}
                    triggerWhenOpen={<Trigger trigger_name={"Work Experience"} trigger_icon={minus}/>}>
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
                </Collapsible>
            </div>
        );
    }
}

export default Resume;
