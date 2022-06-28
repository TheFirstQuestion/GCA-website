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
        <div className="resume" id="horizontal_master">
          <div className="header">{this.name}</div>
        </div>
        <div className="expand">
          <div className="header">Work Experience</div>
          <div id="subtext">
            {" "}
            {this.resume["work1_title"]}
            <div id="horizontal">
              <div id="subinfo">{this.resume["work1_company"]}</div>
            </div>
            <div id="subinfogray">{this.resume["work1_duration"]}</div>
            <div id="subinfo">{this.resume["work1_description"]}</div>
          </div>
          <div id="subtext">
            {" "}
            {this.resume["work2_title"]}
            <div id="horizontal">
              <div id="subinfo">{this.resume["work2_company"]}</div>
            </div>
            <div id="subinfogray">{this.resume["work2_duration"]}</div>
            <div id="subinfo">{this.resume["work2_description"]}</div>
          </div>
          <div id="subtext">
            {" "}
            {this.resume["work3_title"]}
            <div id="horizontal">
              <div id="subinfo">{this.resume["work3_company"]}</div>
            </div>
            <div id="subinfogray">{this.resume["work3_duration"]}</div>
            <div id="subinfo">{this.resume["work3_description"]}</div>
          </div>
          <div className="header">Education</div>
          <div id="subtext">
            {this.resume["edu_degree"]}, {this.resume["edu_major"]}
            <div id="subinfo">{this.resume["edu_university"]}</div>
            <div id="subinfogray">{this.resume["edu_duration"]}</div>
          </div>
        </div>
      </Card.Body>
    );
  }
}
