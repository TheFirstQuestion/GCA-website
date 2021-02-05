import React, {useState} from 'react';
import './App.css';
import woman from './female_user.png';
import Collapsible from 'react-collapsible';
import Trigger from './Trigger';

class Resume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="resume">
                <img className="profile_image" src={woman} alt="" />
                <div className="header">Woman Name</div>

                <Collapsible trigger={<Trigger trigger_name={"Education"}/>}>
                    <div id="subtext">University</div>
                    <div id="subtext">Major</div>
                    <div id="subtext">Distinction</div>
                </Collapsible>

                <Collapsible trigger={<Trigger trigger_name={"Work Experience"}/>}>
                    <div id="subtext">Most recent job</div>
                    <div id="subtext">Past job 1</div>
                    <div id="subtext">Past job 2</div>
                </Collapsible>

                <Collapsible trigger={<Trigger trigger_name={"Notes from Initial Phone Screen"}/>}>
                    <div id="subtext">"........"</div>
                </Collapsible>
            </div>
        );
    }
}

export default Resume;
