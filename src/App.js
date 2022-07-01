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

    // Add event listeners for DTD
    window.addEventListener("DOMContentLoaded", () => {
      this.recordActivity("DOMContentLoaded", "site_loaded");
    });
    window.addEventListener("onload", () => {
      this.recordActivity("onload", "site_loaded");
    });

    window.addEventListener("beforeunload", () => {
      this.recordActivity("beforeunload", "move_away");
    });
    window.addEventListener("pagehide", () => {
      this.recordActivity("pagehide", "move_away");
    });

    document.onvisibilitychange = () => {
      if (document.visibilityState === "hidden") {
        this.recordActivity("visibility hidden", "move_away");
      } else {
        if (document.visibilityState === "hidden") {
          this.recordActivity("unhidden", "site_loaded");
        }
      }
    };

    let prevPosition = 0;

    window.addEventListener("scroll", function (event) {
      // use the time since the previous value was stored to "debounce"
      // compare to a ratio of the total height? or to boundaries defined by content?
      const windowHeight = document.documentElement.getBoundingClientRect()
        .height;
      const scrollPosition = this.scrollY;
      if (scrollPosition - prevPosition >= 100) {
        console.log(scrollPosition);
        prevPosition = scrollPosition;
      }
    });
  }

  // Send the digital trace data to firebase
  async recordActivity(msg, type) {
    // This will be the ID of the activity in firebase -- a string, padded to 5 digits
    const id = this.activityCounter.toString().padStart(5, "0");
    this.activityCounter = this.activityCounter + 1;

    const now = moment();

    this.DATABASE.collection("userIDs")
      .doc(this.qualtricsUserId)
      .collection("activityData_page" + this.pageNum)
      .doc(id)
      .set({
        timestamp: new Date(now),
        timeEpoch: Number(now.format("x")),
        timeReadable: now.tz("America/Los_Angeles").format("M-D-YYYY h:mm:ssa"),
        description: msg,
        type: type,
      });
    console.log(id + " " + type + ": " + msg);
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
