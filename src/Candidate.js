import React from "react";
import Card from "react-bootstrap/Card";

export default class Candidate extends React.Component {
  render() {
    // Prevent crash from clicking too fast
    if (!this.props.resume) {
      return <h1>Loading...</h1>;
    }

    return (
      <Card.Body>
        <div className="candidate">
          <h1 className="name">{this.props.name}</h1>
          <hr />
          <h2 className="sectionHeader">Work Experience</h2>
          <div>
            <h3>{this.props.resume["work1_title"]}</h3>
            <h4>{this.props.resume["work1_company"]}</h4>
            <h5>{this.props.resume["work1_duration"]}</h5>
            <div className="workDescription">
              {this.props.resume["work1_description"]}
            </div>
          </div>
          <div>
            <h3>{this.props.resume["work2_title"]}</h3>
            <h4>{this.props.resume["work2_company"]}</h4>
            <h5>{this.props.resume["work2_duration"]}</h5>
            <div className="workDescription">
              {this.props.resume["work2_description"]}
            </div>
          </div>
          <div>
            <h3>{this.props.resume["work3_title"]}</h3>
            <h4>{this.props.resume["work3_company"]}</h4>
            <h5>{this.props.resume["work3_duration"]}</h5>
            <div className="workDescription">
              {this.props.resume["work3_description"]}
            </div>
          </div>
          <div>
            <h3>{this.props.resume["work4_title"]}</h3>
            <h4>{this.props.resume["work4_company"]}</h4>
            <h5>{this.props.resume["work4_duration"]}</h5>
            <div className="workDescription">
              {this.props.resume["work4_description"]}
            </div>
          </div>
          <hr />
          <h2 className="sectionHeader">Education</h2>
          <div>
            <p className="eduBasics">
              {this.props.resume["edu_degree"]},{" "}
              {this.props.resume["edu_major"]}
            </p>
            <p className="eduInfo">
              {this.props.resume["edu_university"]},{" "}
              {this.props.resume["edu_duration"]}
            </p>
          </div>
        </div>
      </Card.Body>
    );
  }
}
