import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./styles/react-tabs.css";
import firebase from "./firebase";
import Candidate from "./Candidate";
import JobDescription from "./JobDescription";

export default class Pool extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      names: [
        new URLSearchParams(this.props.location.search).get("name1"),
        new URLSearchParams(this.props.location.search).get("name2"),
        new URLSearchParams(this.props.location.search).get("name3"),
        new URLSearchParams(this.props.location.search).get("name4"),
        new URLSearchParams(this.props.location.search).get("name5"),
        new URLSearchParams(this.props.location.search).get("name6"),
      ],
      resumeList: [],
      resumesOrder: [],

      job_title: null,
      main_tasks: null,
      req_skills: null,
    };

    // Get from the URL
    this.qualtricsUserId = this.props.match.params.qualtricsUserId;
    this.pageNum = parseInt(this.props.match.params.pageNum);

    // Get from App
    this.recordActivity = this.props.recordActivity.bind(this);

    // These will help us later
    this.DATABASE = firebase.firestore();
    this.numNames = this.state.names.length;

    // Bind methods
    this.getJobDescription = this.getJobDescription.bind(this);
    this.recordOrder = this.recordOrder.bind(this);
    this.populateValues = this.populateValues.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  // Get data from the database
  async componentDidMount() {
    if (this.pageNum === 1) {
      await this.recordOrder();
    }
    await this.populateValues();
    await this.getJobDescription();
    this._isMounted = true;
    this.recordActivity("component mounted", "site_loaded");
  }

  componentWillUnmount() {
    this.recordActivity("component unmounted", "move_away");
  }

  async recordOrder() {
    // Store name order in the database
    let namesDBKV = {};
    for (let i = 0; i < this.numNames; i++) {
      namesDBKV["candidate" + (i + 1) + "_name"] = this.state.names[i];
    }

    await this.DATABASE.collection("userIDs")
      .doc(this.qualtricsUserId)
      .set(namesDBKV)
      .then(() => {
        this.recordActivity("name order stored", "order_stored");
      });

    // Store resume order in the database
    let resumesDBKV = {};
    this.state.resumesOrder = shuffle(makeArrayToN(this.numNames));
    for (let i = 0; i < this.numNames; i++) {
      resumesDBKV["candidate" + (i + 1) + "_resume"] =
        this.state.resumesOrder[i] + 1;
    }
    await this.DATABASE.collection("userIDs")
      .doc(this.qualtricsUserId)
      .set(resumesDBKV)
      .then(() => {
        this.recordActivity("resume order stored", "order_stored");
      });
  }

  async getJobDescription() {
    // Get job description from the database
    await this.DATABASE.collection("job_description")
      .doc("values")
      .get()
      .then((doc) => {
        this.setState({
          job_title: doc.data().job_title,
          main_tasks: renderBulletList(doc.data().main_tasks),
          req_skills: renderBulletList(doc.data().req_skills),
        });
      });
  }

  async populateValues() {
    // Get resume order from the database
    await this.DATABASE.collection("userIDs")
      .doc(this.qualtricsUserId)
      .get()
      .then((doc2) => {
        let kvp = doc2.data();
        for (let i = 0; i < this.numNames; i++) {
          // Save the resume order, and get the resume info
          this.state.resumesOrder[i] = kvp["candidate" + (i + 1) + "_resume"];
          this.getCandidateResume(i);
        }
      })
      .then(() => {
        this.recordActivity("website information loaded", "site_loaded");
      });
  }

  // For a given candidate index, get their resume from the database
  async getCandidateResume(candidateNum) {
    let new_dict = {};
    await this.DATABASE.collection("resumes")
      .doc("resume_" + this.state.resumesOrder[candidateNum])
      .get()
      .then((doc) => {
        new_dict["edu_degree"] = doc.data().edu_degree;
        new_dict["edu_distinction"] = doc.data().edu_distinction;
        new_dict["edu_duration"] = doc.data().edu_duration;
        new_dict["edu_major"] = doc.data().edu_major;
        new_dict["edu_university"] = doc.data().edu_university;

        new_dict["work1_company"] = doc.data().work1_company;
        new_dict["work1_description"] = renderBulletList(
          doc.data().work1_description
        );
        new_dict["work1_duration"] = doc.data().work1_duration;
        new_dict["work1_location"] = doc.data().work1_location;
        new_dict["work1_title"] = doc.data().work1_title;

        new_dict["work2_company"] = doc.data().work2_company;
        if (doc.data().work2_description != null) {
          new_dict["work2_description"] = renderBulletList(
            doc.data().work2_description
          );
        }
        new_dict["work2_duration"] = doc.data().work2_duration;
        new_dict["work2_location"] = doc.data().work2_location;
        new_dict["work2_title"] = doc.data().work2_title;

        new_dict["work3_company"] = doc.data().work3_company;
        if (doc.data().work3_description != null) {
          new_dict["work3_description"] = renderBulletList(
            doc.data().work3_description
          );
        }
        new_dict["work3_duration"] = doc.data().work3_duration;
        new_dict["work3_location"] = doc.data().work3_location;
        new_dict["work3_title"] = doc.data().work3_title;
      });

    this.state.resumeList[candidateNum] = new_dict;
  }

  onClick(tabNum) {
    if (tabNum === 0) {
      this.recordActivity("clicked job description", "job_description");
    } else {
      this.recordActivity(
        "clicked resume " + tabNum,
        "click_candidate" + tabNum
      );
    }
  }

  render() {
    return (
      <div className="pool">
        {this.state.main_tasks &&
          this.state.resumeList.length === this.numNames && (
            <Tabs defaultIndex={0} onSelect={(index) => this.onClick(index)}>
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
                // Create the resume content
                this.state.resumesOrder.map((num, i) => (
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

// Create an array [0, 1, 2, ..., n]
function makeArrayToN(n) {
  return [...Array(n).keys()];
}

// Turn a paragraph into bullet points
function renderBulletList(txt) {
  let viewBulletList = [];
  let bulletList = txt.split(".");
  bulletList.forEach((item, index) => {
    if (item && item !== " ") {
      viewBulletList.push(<li key={index}>{item}</li>);
    }
  });
  return viewBulletList;
}
