import React from "react";
import Card from "react-bootstrap/Card";

export default class Candidate extends React.Component {
  constructor(props) {
    super(props);

    this.name = this.props.name;
    this.resume = this.props.resume;
  }

  render() {
    return (
      <Card.Body>
        <div className="candidate">
          <h1 className="name">{this.name}</h1>
          <hr />
          <h2 className="sectionHeader">Work Experience</h2>
          <div>
            <h3>{this.resume["work1_title"]}</h3>
            <h4>{this.resume["work1_company"]}</h4>
            <h5>{this.resume["work1_duration"]}</h5>
            <div className="workDescription">
              {this.resume["work1_description"]}
            </div>
          </div>
          <div>
            <h3>{this.resume["work2_title"]}</h3>
            <h4>{this.resume["work2_company"]}</h4>
            <h5>{this.resume["work2_duration"]}</h5>
            <div className="workDescription">
              {this.resume["work2_description"]}
            </div>
          </div>
          <div>
            <h3>{this.resume["work3_title"]}</h3>
            <h4>{this.resume["work3_company"]}</h4>
            <h5>{this.resume["work3_duration"]}</h5>
            <div className="workDescription">
              {this.resume["work3_description"]}
            </div>
          </div>
          <hr />
          <h2 className="sectionHeader">Education</h2>
          <div>
            <p className="eduBasics">
              {this.resume["edu_degree"]}, {this.resume["edu_major"]}
            </p>
            <p className="eduInfo">
              {this.resume["edu_university"]}, {this.resume["edu_duration"]}
            </p>
          </div>
        </div>
      </Card.Body>
    );
  }
}
