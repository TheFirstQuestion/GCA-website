import React from "react";

export default class JobDescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      job_title: this.props.job_title,
      main_tasks: this.props.main_tasks,
      req_skills: this.props.req_skills,
    };
  }

  render() {
    return (
      <>
        <strong>{this.state.job_title} Job Description</strong>
        <br />
        <br />
        <strong>Job Title: </strong>
        {this.state.job_title}
        <br />
        <br />
        <strong>Main Tasks: </strong>
        <div id="bullets">{this.state.main_tasks}</div>
        <br />
        <br />
        <strong>Required Knowledge and Skills: </strong>
        <div id="bullets">{this.state.req_skills}</div>
      </>
    );
  }
}
