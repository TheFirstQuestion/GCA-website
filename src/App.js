import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Admin from "./Admin";
import Pool from "./Pool";
import firebase from "./firebase";
import "./styles/GlobalStyles.css";
var moment = require("moment-timezone");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.DATABASE = firebase.firestore();
    this.activityCounter = 1;
    this.recordActivity = this.recordActivity.bind(this);

    // This is hacky, but ReactRouter can't parse params unless inside a Route
    const loc = document.location.hash;
    this.pageNum = loc.split("/")[2];
    this.qualtricsUserId = loc.split("/")[3];
    // Print for debugging purposes within Qualtrics
    console.log("qualtricsUserId: " + this.qualtricsUserId);
    console.log("pageNum: " + this.pageNum);
  }

  componentDidMount() {
    this.recordActivity("loading", "accessed", "App mounted");
  }

  // Send the digital trace data to firebase
  async recordActivity(cat, val, desc) {
    // This will be the ID of the activity in firebase -- a string, padded to 5 digits
    const id = this.activityCounter.toString().padStart(5, "0");
    this.activityCounter = this.activityCounter + 1;

    const now = moment();

    this.DATABASE.collection("userIDs")
      .doc(this.qualtricsUserId)
      .collection("activityData_page" + this.pageNum)
      .doc(id)
      .set({
        category: cat,
        description: desc,
        value: val,
        timestamp: new Date(now),
        timeEpoch: Number(now.format("x")),
        timeReadable: now.tz("America/Los_Angeles").format("M-D-YY h:mm:ssa"),
      });
    console.log(id + " " + cat + ": " + val + " -- " + desc);
  }

  render() {
    return (
      <div className="App">
        <HashRouter>
          <Route
            path="/page/:pageNum/:qualtricsUserId/"
            render={(props) => (
              <Pool
                {...props}
                recordActivity={this.recordActivity}
                activityCounter={this.activityCounter}
              />
            )}
          />
          <Route path="/admin" render={(props) => <Admin {...props} />} />
        </HashRouter>
      </div>
    );
  }
}
