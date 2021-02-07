import React, {useState} from 'react';
import './App.css';
import woman from './female_user.png';
import Collapsible from 'react-collapsible';
import Trigger from './Trigger';
import Divider from '@material-ui/core/Divider';

class Resume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            educationOpenedCount: 0,
            workexpOpenedCount: 0,
            notesOpenedCount: 0,
        };
        this.collapsibleOpened = this.collapsibleOpened.bind(this);
    }

    collapsibleOpened(e){
        if(e == 0){
            this.state.educationOpenedCount++;
            console.log("education opened count: " + this.state.educationOpenedCount)
        }
        else if(e == 1){
            this.state.workexpOpenedCount++;
            console.log("work experience opened count: " + this.state.workexpOpenedCount)
        }
        else{
            this.state.notesOpenedCount++;
            console.log("notes opened count: " + this.state.notesOpenedCount)
        }
    }

    render() {
        return (
            <div className="resume">
                <img className="profile_image" src={woman} alt="" />
                <div className="header">Woman Name</div>

                <Collapsible onTriggerOpening={() => this.collapsibleOpened(0)} trigger={<Trigger trigger_name={"Education"}/>}>
                <div id="subtext">Stanford University
                        <div id="subinfo">Master's degree, Computer Science</div>
                        <div id="subinfogray">2021</div>
                    </div>

                    <Divider />

                    <div id="subtext">Major</div>

                    <Divider />

                    <div id="subtext">Distinction</div>
                </Collapsible>

                <Collapsible onTriggerOpening={() => this.collapsibleOpened(1)} trigger={<Trigger trigger_name={"Work Experience"}/>}>
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

                <Collapsible onTriggerOpening={() => this.collapsibleOpened(2)} trigger={<Trigger trigger_name={"Notes from Initial Phone Screen"}/>}>
                    <div id="subtext">"........"</div>
                </Collapsible>
            </div>
        );
    }
}

export default Resume;
