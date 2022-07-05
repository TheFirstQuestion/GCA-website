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
      // as per https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState
      if (document.visibilityState === "hidden") {
        // The page content is not visible to the user. In practice this means that the document is either a background tab or part of a minimized window, or the OS screen lock is active.
        this.recordActivity("visibility hidden", "move_away");
      } else {
        // The page content may be at least partially visible. In practice this means that the page is the foreground tab of a non-minimized window.
        if (document.visibilityState === "visible") {
          this.recordActivity("visibility visible", "site_loaded");
        }
      }
    };
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
        timeReadable: now.tz("America/Los_Angeles").format("M-D-YY h:mm:ssa"),
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
