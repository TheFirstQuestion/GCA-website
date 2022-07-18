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
    // used for scroll tracking
    this.prevPercent = 0;

    // Bind methods
    this.getJobDescription = this.getJobDescription.bind(this);
    this.recordOrder = this.recordOrder.bind(this);
    this.populateValues = this.populateValues.bind(this);
  }

  async componentDidMount() {
    // Start fetching the data
    let promises = [];
    promises.push(this.getJobDescription());
    // Order is assigned when visiting page 1, and followed on subsequent pages
    if (this.pageNum === 1) {
      this.recordOrder().then(() => {
        promises.push(this.populateValues());
      });
    } else {
      promises.push(this.populateValues());
    }

    // DTD
    Promise.all(promises).then(() => {
      this.recordActivity("loading", "ready", "data loaded");
    });

    // Scroll tracking
    this.myInterval = setInterval(() => {
      const docRect = document
        .getElementsByClassName("pool")[0]
        .getBoundingClientRect();

      const contentHeight = docRect.height;
      const viewHeight = window.innerHeight;
      const maxPosition = contentHeight - viewHeight;

      const scrollPosition = Math.abs(contentHeight - docRect.bottom);
      const scrollPercent = Math.round((scrollPosition / maxPosition) * 100);

      if (Math.abs(scrollPercent - this.prevPercent) > 5) {
        this.recordActivity(
          "scroll",
          scrollPercent,
          "scrolled to " + scrollPercent + "%"
        );
        this.prevPercent = scrollPercent;
      }
    }, 1000);
  }

  componentWillUnmount() {
    // Stop tracking scroll data when leaving the page
    clearInterval(this.myInterval);
  }

  async recordOrder() {
    let promises = [];

    // Store name order in the database
    let namesDBKV = {};
    for (let i = 0; i < this.numNames; i++) {
      namesDBKV["candidate" + (i + 1) + "_name"] = this.state.names[i];
    }

    promises.push(
      this.DATABASE.collection("userIDs")
        .doc(this.qualtricsUserId)
        .set(namesDBKV)
        .then(() => {
          this.recordActivity("log", "name_order_stored", "name order stored");
        })
    );

    // Store resume order in the database
    let resumesDBKV = {};
    this.state.resumesOrder = shuffle(makeArrayToN(this.numNames));
    for (let i = 0; i < this.numNames; i++) {
      resumesDBKV["candidate" + (i + 1) + "_resume"] =
        this.state.resumesOrder[i] + 1;
    }

    promises.push(
      this.DATABASE.collection("userIDs")
        .doc(this.qualtricsUserId)
        .set(resumesDBKV)
        .then(() => {
          this.recordActivity(
            "log",
            "resume_order_stored",
            "resume order stored"
          );
        })
    );

    return Promise.all(promises);
  }

  // Get job description from the database
  async getJobDescription() {
    return this.DATABASE.collection("job_description")
      .doc("values")
      .get()
      .then((doc) => {
        this.setState({
          job_title: doc.data().job_title,
          main_tasks: renderBulletList(doc.data().main_tasks),
          req_skills: renderBulletList(doc.data().req_skills),
        });
        this.recordActivity(
          "log",
          "job_description_fetched",
          "job description loaded"
        );
      });
  }

  async populateValues() {
    // Get resume order from the database
    let newOrder = [...this.state.resumesOrder];
    this.DATABASE.collection("userIDs")
      .doc(this.qualtricsUserId)
      .get()
      .then((doc2) => {
        let kvp = doc2.data();
        for (let i = 0; i < this.numNames; i++) {
          // Save the resume order
          newOrder[i] = kvp["candidate" + (i + 1) + "_resume"];
          // Get the resume info from the database
          this.getCandidateResume(i);
        }
        this.setState({
          resumesOrder: [...newOrder],
        });
      });
  }

  // For a given candidate index, get their resume from the database
  async getCandidateResume(candidateNum) {
    let new_dict = {};
    this.DATABASE.collection("resumes")
      .doc("resume_" + (this.state.resumesOrder[candidateNum] + 1))
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

        let newOrder = [...this.state.resumeList];
        newOrder[candidateNum] = new_dict;
        this.setState({ resumeList: [...newOrder] });
      });
  }

  onClick(tabNum) {
    this.recordActivity("click", tabNum, "clicked on tab " + tabNum);
  }

  render() {
    // this.recordActivity("loading", "render", "Pool has rendered");
    return (
      <div className="pool">
        {this.state.job_title ? (
          <Tabs defaultIndex={0} onSelect={(index) => this.onClick(index)}>
            <TabList>
              <Tab>Job Description</Tab>
              {
                // Create the resume tabs
                this.state.names.map((name, index) => (
                  <Tab key={index}>{name}</Tab>
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
              this.state.names.map((name, index) => (
                <TabPanel key={index}>
                  <Candidate
                    key={index}
                    name={name}
                    resume={this.state.resumeList[index]}
                  />
                </TabPanel>
              ))
            }
          </Tabs>
        ) : (
          <h1>Loading...</h1>
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
