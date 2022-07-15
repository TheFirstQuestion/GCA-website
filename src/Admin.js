import React from "react";
import firebase from "./firebase";
import { CSVLink } from "react-csv";
import "./styles/Admin.css";
// Contains sensitive information, so you have to create this file yourself
import { adminPassword } from "./config.js";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      showErrorMessage: false,
      passwordAttempt: "",
      doneGettingUserData: false,
      doneGettingActivityData: false,
      downloadState: "",
    };

    this.DATABASE = firebase.firestore();
    this.users = [];
    this.userData = [];
    this.activityData = [];

    this.rateLimit = new RateLimit(1200, 60000, false);

    // Bind methods
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.downloadData = this.downloadData.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.getActivityData = this.getActivityData.bind(this);
    this.getActivityDataForPage = this.getActivityDataForPage.bind(this);
    this.filenameString = this.filenameString.bind(this);
  }

  // For logging in
  handlePasswordChange(event) {
    this.setState({ showErrorMessage: false });
    this.setState({ passwordAttempt: event.target.value });
  }

  // For logging in
  handlePasswordSubmit(event) {
    event.preventDefault();
    if (this.state.passwordAttempt === adminPassword) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ showErrorMessage: true });
    }
  }

  async downloadData() {
    this.setState({ downloadState: "Downloading..." });

    await this.getUserData();
    this.setState({ doneGettingUserData: true });

    const promises = this.users.map((user) => this.getActivityData(user));
    Promise.all(promises).then(() => {
      this.setState({ doneGettingActivityData: true });
      this.setState({ downloadState: "Done!" });
    });
  }

  async getUserData() {
    return this.DATABASE.collection("userIDs")
      .get()
      .then((doc) => {
        doc.docs.forEach((item, i) => {
          if (item.id.includes("TESTING")) {
            this.users.push(item.id);
            this.userData.push({
              userID: item.id,
              ...item.data(),
            });
          }
        });
      });
  }

  async getActivityData(userID) {
    const fbu = this.DATABASE.collection("userIDs").doc(userID);
    const p1 = this.rateLimit.schedule(
      this.getActivityDataForPage,
      fbu,
      userID,
      1
    );
    const p2 = this.rateLimit.schedule(
      this.getActivityDataForPage,
      fbu,
      userID,
      2
    );
    const p3 = this.rateLimit.schedule(
      this.getActivityDataForPage,
      fbu,
      userID,
      3
    );
    const p4 = this.rateLimit.schedule(
      this.getActivityDataForPage,
      fbu,
      userID,
      4
    );
    return Promise.all([p1, p2, p3, p4]);
  }

  async getActivityDataForPage(fbu, userID, pageNum) {
    return fbu
      .collection("activityData_page" + pageNum)
      .get()
      .then((pageData) => {
        pageData.docs.forEach((item, i) => {
          this.activityData.push({
            userID: userID,
            pageNum: pageNum,
            activityid: item.id,
            ...item.data(),
          });
        });
      });
  }

  filenameString() {
    const d = new Date();
    return (
      " -- " +
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      d.getDate().toString().padStart(2, "0") +
      " " +
      d.getHours().toString().padStart(2, "0") +
      ":" +
      d.getMinutes().toString().padStart(2, "0")
    );
  }

  render() {
    return (
      <div className="wholePage">
        <h1>Hi Claire!!!!!</h1>
        {this.state.isLoggedIn ? (
          <div className="loggedIn">
            <button onClick={this.downloadData}>Download Data</button>
            <div className="downloadLinks">
              <span className="listItem">{this.state.downloadState}</span>

              <br />

              {this.state.doneGettingUserData && (
                <CSVLink
                  data={this.userData}
                  filename={"userData" + this.filenameString() + ".csv"}
                  className="listItem"
                >
                  Download User Data
                </CSVLink>
              )}

              <br />

              {this.state.doneGettingActivityData && (
                <CSVLink
                  data={this.activityData}
                  filename={"activityData" + this.filenameString() + ".csv"}
                  className="listItem"
                >
                  Download Activity Data
                </CSVLink>
              )}
            </div>
          </div>
        ) : (
          <div className="loggedOut">
            <form onSubmit={this.handlePasswordSubmit}>
              <input
                onChange={this.handlePasswordChange}
                value={this.state.passwordAttempt}
                type="password"
              />
              <button type="submit">Submit</button>
            </form>
            {this.state.showErrorMessage && <span id="red">Nope.</span>}
          </div>
        )}
      </div>
    );
  }
}

// Used to call a function at a specified rate; here, to not exceed Firebase's API limit
// Adapted from https://www.matteoagosti.com/blog/2013/01/22/rate-limiting-function-calls-in-javascript/
var RateLimit = (function () {
  var RateLimit = function (maxOps, interval, allowBursts) {
    this._maxRate = allowBursts ? maxOps : maxOps / interval;
    this._interval = interval;
    this._allowBursts = allowBursts;

    this._numOps = 0;
    this._start = new Date().getTime();
    this._queue = [];
  };

  RateLimit.prototype.schedule = function (fn, param1, param2, param3) {
    var that = this,
      rate = 0,
      now = new Date().getTime(),
      elapsed = now - this._start;

    if (elapsed > this._interval) {
      this._numOps = 0;
      this._start = now;
    }

    rate = this._numOps / (this._allowBursts ? 1 : elapsed);

    if (rate < this._maxRate) {
      if (this._queue.length === 0) {
        this._numOps++;
        return fn(param1, param2, param3);
      } else {
        if (fn) this._queue.push(fn);

        this._numOps++;
        this._queue.shift()();
      }
    } else {
      if (fn) this._queue.push(fn);

      setTimeout(function () {
        that.schedule();
      }, 1 / this._maxRate);
    }
  };

  return RateLimit;
})();
