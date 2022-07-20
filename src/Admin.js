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

    // !! This is hardcoded!!
    this.NUM_PAGES = 7;
    this.userCSVheaders = [
      "userID",
      "candidate1_resume",
      "candidate2_resume",
      "candidate3_resume",
      "candidate4_resume",
      "candidate5_resume",
      "candidate6_resume",
    ];

    this.DATABASE = firebase.firestore();
    this.users = [];
    this.userData = [];
    this.activityData = [];
    // Bind methods
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.downloadData = this.downloadData.bind(this);
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
    this.setState({
      downloadState: "Downloading...",
    });

    let tmp = await this.DATABASE.collection("userIDs").get();
    let users = tmp.docs;
    for (let i = 0; i < users.length; i++) {
      let thisUser = users[i];
      this.setState({
        downloadState:
          "Downloading #" + (i + 1) + " of " + users.length + "...",
      });
      // Add user data
      this.users.push(thisUser.id);
      this.userData.push({
        userID: thisUser.id,
        ...thisUser.data(),
      });
      // Add page data
      let promises = [];
      for (let k = 1; k <= this.NUM_PAGES; k++) {
        promises.push(
          this.DATABASE.collection("userIDs")
            .doc(thisUser.id)
            .collection("activityData_page" + k)
            .get()
            .then((pageData) => {
              pageData.forEach((item, idx) => {
                this.activityData.push({
                  userID: thisUser.id,
                  pageNum: k,
                  activityid: item.id,
                  ...item.data(),
                });
              });
            })
        );
      }
      await Promise.all(promises);
    }
    this.setState({ doneGettingUserData: true });
    this.setState({ doneGettingActivityData: true });
    this.setState({ downloadState: "Done!" });
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
                  headers={this.userCSVheaders}
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
