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
        // For logging in
        // LMAO CHANGE THIS TO FALSE THIS IS FOR TESTING
        isLoggedIn: true,
        showErrorMessage: false,
        passwordAttempt: "",
        doneGettingUserData: false,
        doneGettingActivityData: false,
        downloadRunning: false,
    };

    this.DATABASE = firebase.firestore();
    this.users = [];
    this.userData = []
    this.activityData = []

    // Bind methods
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.downloadData = this.downloadData.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.getActivityData = this.getActivityData.bind(this);
    this.getActivityDataForPage = this.getActivityDataForPage.bind(this);
    this.dateAsString = this.dateAsString.bind(this);
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
      this.setState({downloadRunning: true})

      await this.getUserData();
      this.setState({doneGettingUserData: true})

      this.users.forEach(this.getActivityData)
      const promises = this.users.map(user => this.getActivityData(user));

        Promise.all(promises).then(() => {
            this.setState({doneGettingActivityData : true})
        })
  }

  async getUserData() {
      return this.DATABASE.collection("userIDs").get().then((doc) => {
          doc.docs.forEach((item, i) => {
              if (item.id.includes("TESTING")) {
                  this.users.push(item.id)
                  this.userData.push({
                      userID: item.id,
                      ...item.data()
                  })
              }
          });
      });
  }

  async getActivityData(userID) {
      const fbu = this.DATABASE.collection("userIDs").doc(userID);

      const p1 = this.getActivityDataForPage(fbu, userID, 1);
      const p2 = this.getActivityDataForPage(fbu, userID, 2);
      const p3 = this.getActivityDataForPage(fbu, userID, 3);
      const p4 = this.getActivityDataForPage(fbu, userID, 4);
      return Promise.all([p1, p2, p3, p4])
  }

  async getActivityDataForPage(fbu, userID, pageNum) {
    return fbu.collection("activityData_page" + pageNum).get().then((pageData) => {
        pageData.docs.forEach((item, i) => {
            this.activityData.push({
                userID: userID,
                pageNum: pageNum,
                activityid: item.id,
                ...item.data()
            })
        });
    });
  }

  dateAsString() {
      const d = new Date();
      return " -- " + d.getFullYear() + "-" + (d.getMonth()+1).toString().padStart(2, '0') + "-" + d.getDate().toString().padStart(2, '0') + " " + d.getHours().toString().padStart(2, '0') + "_" + d.getMinutes().toString().padStart(2, '0');
  }


  render() {
    return (
        <div className="wholePage">
            {this.state.isLoggedIn ? (
                <div className="loggedIn">
                    <button onClick={this.downloadData}>Download Data</button>
                    <div className="downloadLinks">
                        {this.state.downloadRunning && (<span>Downloading...</span>)}

                        <br />

                        {this.state.doneGettingUserData && (
                            <CSVLink
                                data={this.userData}
                                filename={"userData" + (this.dateAsString()) + ".csv"}
                            >Download User Data</CSVLink>)}

                        <br />

                        {this.state.doneGettingActivityData && (
                            <CSVLink
                                data={this.activityData}
                                filename={"activityData" + (this.dateAsString()) + ".csv"}
                            >Download Activity Data</CSVLink>)}
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
                    {this.state.showErrorMessage && (
                      <span id="red">Nope.</span>
                    )}
                </div>
            )}
        </div>
    );
  }
}
