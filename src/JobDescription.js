import React from "react";
import Card from "react-bootstrap/Card";

export default class JobDescription extends React.Component {
  render() {
    return (
      <Card.Body>
        <div className="jobDescription">
          <h1>Job Description: {this.props.job_title}</h1>
          <hr />
          <h2>Main Tasks: </h2>
          <div>{this.props.main_tasks}</div>
          <h2>Required Knowledge and Skills: </h2>
          <div>{this.props.req_skills}</div>
        </div>
      </Card.Body>
    );
  }
}
