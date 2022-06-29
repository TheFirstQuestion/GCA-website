import React from "react";
import Card from "react-bootstrap/Card";

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
      <Card.Body>
        <div className="jobDescription">
          <h1>Job Description: {this.state.job_title}</h1>
          <hr />
          <h2>Main Tasks: </h2>
          <div>{this.state.main_tasks}</div>
          <h2>Required Knowledge and Skills: </h2>
          <div>{this.state.req_skills}</div>
        </div>
      </Card.Body>
    );
  }
}
