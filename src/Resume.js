import React, {useState} from 'react';
import './App.css';

class Resume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <div className="header">Woman Name</div>
                <div>
                    <div className="subheader">Education</div>
                    <div className="subtext">University</div>
                    <div className="subtext">Major</div>
                    <div className="subtext">Distinction</div>
                </div>

                <div>
                    <div className="subheader">Work Experience</div>
                    <div className="subtext">Most recent job</div>
                    <div className="subtext">Past job 1</div>
                    <div className="subtext">Past job 2</div>
                </div>

                <div>
                    <div className="subheader">Notes from Initial Phone Screen</div>
                    <div className="subtext">"........"</div>
                </div>
            </div>
        );
    }
}

export default Resume;
