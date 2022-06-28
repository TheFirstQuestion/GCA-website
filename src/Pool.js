import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./styles/react-tabs.css";
import firebase from "./firebase";
import Candidate from "./Candidate";
import JobDescription from "./JobDescription";
var moment = require("moment-timezone");

export default class Pool extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      names: shuffle(
        new URLSearchParams(this.props.location.search).getAll("name")
      ),
      resumeList: [],

      job_title: null,
      main_tasks: null,
      req_skills: null,

      // TODO: make this array
      // TODO: fix this logic (if focused and click, still switches)
      section1opened: false,
      section2opened: false,
      section3opened: false,
      section4opened: false,
      section5opened: false,
    };

    // Get from the URL
    this.qualtricsUserId = this.props.match.params.qualtricsUserId;
    this.pageNum = parseInt(this.props.match.params.pageNum);

    // These will help us later
    this.DATABASE = firebase.firestore();
    this.numNames = this.state.names.length;
    this.activityCounter = 1;
    this.resumesOrder = shuffle(makeArrayToN(this.numNames));

    // Bind methods
    this.getJobDescription = this.getJobDescription.bind(this);
    this.getNames = this.getNames.bind(this);
    this.renderBulletList = this.renderBulletList.bind(this);
    this.populateValues = this.populateValues.bind(this);
  }

  // Get data from the database
  async componentDidMount() {
    if (this.pageNum === 1) {
      await this.getNames();
    } else {
      await this.populateValues();
    }
    await this.getJobDescription();
  }

  async getJobDescription() {
    // Get job description from the database
    await this.DATABASE.collection("job_description")
      .doc("values")
      .get()
      .then((doc) => {
        this.setState({
          job_title: doc.data().job_title,
          main_tasks: this.renderBulletList(doc.data().main_tasks),
          req_skills: this.renderBulletList(doc.data().req_skills),
        });
        console.log("got job description from database!");
      });
  }

  async getNames() {
    // Store name order in the database
    let namesDBKV = {};
    for (let i = 0; i < this.numNames; i++) {
      namesDBKV["candidate" + (i + 1) + "_name"] = this.state.names[i];
    }

    await this.DATABASE.collection("userIDs")
      .doc(this.qualtricsUserId)
      .set(namesDBKV);
    console.log("name order stored in database!");

    // Store resume order in the database
    let resumesDBKV = {};
    for (let i = 0; i < this.numNames; i++) {
      resumesDBKV["candidate" + (i + 1) + "_resume"] = this.resumesOrder[i];
    }
    await this.DATABASE.collection("userIDs")
      .doc(this.qualtricsUserId)
      .set(resumesDBKV);
    console.log("resume order stored in database!");

    // TODO: make this all a function
    let count = this.activityCounter.toString();
    this.activityCounter = this.activityCounter + 1;
    const time = moment()
      .tz("America/Los_Angeles")
      .format("MM-DD-YYYY HH:mm:ss");
    this.DATABASE.collection("userIDs")
      .doc(this.qualtricsUserId)
      .collection("activityData_page" + this.pageNum)
      .doc(count)
      .set({
        time: time,
        description: "website information loaded",
      });
  }

  // For a given resume, get its info from the database
  async pullValues(resume_number) {
    let new_dict = {};
    let curr_resume = this.resumesOrder[resume_number] + 1;

    await this.DATABASE.collection("resumes")
      .doc("resume_" + curr_resume)
      .get()
      .then((doc) => {
        new_dict["edu_degree"] = doc.data().edu_degree;
        new_dict["edu_distinction"] = doc.data().edu_distinction;
        new_dict["edu_duration"] = doc.data().edu_duration;
        new_dict["edu_major"] = doc.data().edu_major;
        new_dict["edu_university"] = doc.data().edu_university;

        new_dict["work1_company"] = doc.data().work1_company;
        new_dict["work1_description"] = this.renderBulletList(
          doc.data().work1_description
        );
        new_dict["work1_duration"] = doc.data().work1_duration;
        new_dict["work1_location"] = doc.data().work1_location;
        new_dict["work1_title"] = doc.data().work1_title;

        new_dict["work2_company"] = doc.data().work2_company;
        if (doc.data().work2_description != null) {
          new_dict["work2_description"] = this.renderBulletList(
            doc.data().work2_description
          );
        }
        new_dict["work2_duration"] = doc.data().work2_duration;
        new_dict["work2_location"] = doc.data().work2_location;
        new_dict["work2_title"] = doc.data().work2_title;

        new_dict["work3_company"] = doc.data().work3_company;
        if (doc.data().work3_description != null) {
          new_dict["work3_description"] = this.renderBulletList(
            doc.data().work3_description
          );
        }
        new_dict["work3_duration"] = doc.data().work3_duration;
        new_dict["work3_location"] = doc.data().work3_location;
        new_dict["work3_title"] = doc.data().work3_title;
      });

    this.state.resumeList.push(new_dict);
  }

  renderBulletList(workDescription) {
    let viewBulletList = [];
    let bulletList = workDescription.split(".");
    bulletList.forEach((item, index) => {
      if (item && item !== " ") {
        viewBulletList.push(<li key={index}>{item}</li>);
      }
    });
    return viewBulletList;
  }

  async populateValues() {
    // get resume order
    await this.DATABASE.collection("userIDs")
      .doc(this.qualtricsUserId)
      .get()
      .then((doc) => {
        for (let i = 0; i < this.numNames; i++) {
          this.pullValues(i);
        }
      });

    // TODO: put into function
    let count = this.activityCounter.toString();
    this.activityCounter = this.activityCounter + 1;
    let time = moment().tz("America/Los_Angeles").format("MM-DD-YYYY HH:mm:ss");
    this.DATABASE.collection("userIDs")
      .doc(this.qualtricsUserId)
      .collection("activityData_page" + this.pageNum)
      .doc(count)
      .set({
        time: time,
        description: "website information loaded",
      });
  }

  collapsibleOpened(tabNum) {
    let val = this.state["section" + tabNum + "opened"];
    console.log(this.state["section" + tabNum + "opened"]);
    this.setState({ ["section" + tabNum + "opened"]: !val });
    console.log("section" + tabNum + "opened");
    console.log(this.state["section" + tabNum + "opened"]);
    this.setState({ reload: true });

    let count = this.activityCounter.toString();
    this.activityCounter = this.activityCounter + 1;
    let description = "";

    let time = moment().tz("America/Los_Angeles").format("MM-DD-YYYY HH:mm:ss");

    console.log(
      "OPENED OR CLOSED: " + this.state["section" + tabNum + "opened"]
    );
    description = "opened resume " + tabNum;
    if (tabNum === 0) {
      description = "opened job description";
    }

    this.DATABASE.collection("userIDs")
      .doc(this.qualtricsUserId)
      .collection("activityData_page" + this.pageNum)
      .doc(count)
      .set({
        time: time,
        description: description,
      });
  }

  render() {
    return (
      <div className="pool">
        {this.state.main_tasks &&
          this.state.resumeList.length === this.numNames && (
            <Tabs
              defaultIndex={0}
              onSelect={(index) => this.collapsibleOpened(index)}
            >
              <TabList>
                <Tab>Job Description</Tab>
                {
                  // Create the resume tabs
                  this.state.names.map((val, index) => (
                    <Tab key={index}>{val}</Tab>
                  ))
                }
              </TabList>

              <TabPanel>
                {
                  <JobDescription
                    job_title={this.state.job_title}
                    main_tasks={this.state.main_tasks}
                    req_skills={this.state.req_skills}
                  />
                }
              </TabPanel>
              {
                // Create the resume tabs
                this.resumesOrder.map((num, i) => (
                  <TabPanel key={i}>
                    <Candidate
                      key={i}
                      name={this.state.names[i]}
                      resume={this.state.resumeList[i]}
                    />
                  </TabPanel>
                ))
              }
            </Tabs>
          )}
      </div>
    );
  }
}

/* ############################## Helper Functions ############################# */

// Shuffle an array
function shuffle(array) {
  // via https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/12646864#12646864
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create an array [0, 1, ..., n]
function makeArrayToN(n) {
  return [...Array(n).keys()];
}
