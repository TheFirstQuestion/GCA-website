import React from 'react';
import Card from 'react-bootstrap/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';
import './GlobalStyles.css';
import firebase from './firebase';
var moment = require('moment-timezone');

export default class Pool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            qualtricsUserId: '',
            namesArray: [],

            names: [],
            namesOrder: [0, 1, 2, 3, 4, 5],
            resumes: [1, 2, 3, 4, 5],
            resumeList: [],

            // TODO: make this array
            // TODO: fix this logic (if focused and click, still switches)
            section1opened: false,
            section2opened: false,
            section3opened: false,
            section4opened: false,
            section5opened: false,
        };

        this.DATABASE = firebase.firestore();

        this.activityCounter = 1;
        this.numNames = 0;

        this.getNames = this.getNames.bind(this);
        this.shuffle = this.shuffle.bind(this)
        this.renderBulletList = this.renderBulletList.bind(this);
        this.populateValues = this.populateValues.bind(this);
    }

    async componentDidMount() {
        // Get parameters from URL and store in state
        this.setState({qualtricsUserId: this.props.match.params.qualtricsUserId});
        await this.setState({pageNum: parseInt(this.props.match.params.pageNum)});
        await this.setState({
            namesArray: new URLSearchParams(this.props.location.search).getAll('name')
        });
        this.numNames = this.state.namesArray.length;

        // Pull stuff from the database
        this.getJobDescription();
        if (this.state.pageNum === 1) {
            this.getNames();
        } else {
            this.populateValues();
        }

        /*this.setState({page: this.props.page}, () => {
            this.setState({qualtricsUserId: this.props.match.params.qualtricsUserId}, () => {
                this.setState({qualtricsUserId: this.state.qualtricsUserId}, () => {
                    if (this.state.page === 2 || this.state.page === 3 || this.state.page === 4) {
                        this.getJobDescription()
                        this.populateValues();
                        //this.setState({modalOpened: true})
                    } else {
                        //this.setState({men: this.props.men});
                        //this.setState({women: this.props.women}, () => {
                            //this.generateUniqueID();
                        this.setState({namesArray: this.props.namesArray}, () => {
                            //this.setState({linkEnding: this.state.women + "w" + this.state.men + "m"}, () => {
                                this.getJobDescription();
                                this.getNames();
                            //})
                        });
                    }
                })
            })
        });*/
    }

    getJobDescription() {
        this.DATABASE.collection("job_description").doc("values").get().then((doc) => {
            this.setState({job_title: doc.data().job_title});
            this.setState({main_tasks: doc.data().main_tasks});
            this.setState({req_skills: doc.data().req_skills});
            console.log("got job description from database!");
        });
    }

    async getNames() {
        // Randomize the name order and store in the database
        this.shuffle(this.state.namesArray);
        let namesDBKV = {};
        for (let i = 0; i < this.numNames; i++) {
            namesDBKV["candidate" + (i+1) + "_name"] = this.state.namesArray[i];
        }
        await this.DATABASE.collection("userIDs").doc(this.state.qualtricsUserId).set(namesDBKV);
        console.log("randomized name order and stored in database!");

        // Randomize the resume order and store in the database
        this.shuffle(this.state.resumes);
        let resumesDBKV = {};
        for (let i = 0; i < this.numNames; i++) {
            resumesDBKV["candidate" + (i+1) + "_resume"] = this.state.resumes[i];
        }
        await this.DATABASE.collection("userIDs").doc(this.state.qualtricsUserId).set(resumesDBKV);
        console.log("randomized resume order and stored in database!");



        // TODO: make this a function
        let count = this.activityCounter.toString();
        this.activityCounter = this.activityCounter + 1;

        const time = moment().tz("America/Los_Angeles").format('MM-DD-YYYY HH:mm:ss');
        this.DATABASE.collection("userIDs").doc(this.state.qualtricsUserId).collection("activityData_page" + this.state.pageNum).doc(count).set({
            "time": time,
            "description": "website information loaded",
        });
    }

    // get values for this.state.resumes[resume_number]
    pullValues(resume_number) {
        //console.log("pulling values for resume: " + resume_number)
        if(resume_number === 5){
            return
        }

        let new_dict = {}

        let curr_resume = this.state.resumes[resume_number]   //TODO: change back to this once all resumes are in database
        //let curr_resume = 1

        //console.log("curr resume: " + curr_resume)


        this.DATABASE.collection("resumes").doc("resume_" + curr_resume).get().then((doc) => {
            new_dict["edu_degree"] = doc.data().edu_degree
            new_dict["edu_distinction"] = doc.data().edu_distinction
            new_dict["edu_duration"] = doc.data().edu_duration
            new_dict["edu_major"] = doc.data().edu_major
            new_dict["edu_university"] = doc.data().edu_university

            new_dict["work1_company"] = doc.data().work1_company
            new_dict["work1_description"] = this.renderBulletList(doc.data().work1_description)
            new_dict["work1_duration"] = doc.data().work1_duration
            new_dict["work1_location"] = doc.data().work1_location
            new_dict["work1_title"] = doc.data().work1_title

            new_dict["work2_company"] = doc.data().work2_company
            if(doc.data().work2_description != null){
                new_dict["work2_description"] = this.renderBulletList(doc.data().work2_description)
            }
            new_dict["work2_duration"] = doc.data().work2_duration
            new_dict["work2_location"] = doc.data().work2_location
            new_dict["work2_title"] = doc.data().work2_title

            new_dict["work3_company"] = doc.data().work3_company
            if(doc.data().work3_description != null){
                new_dict["work3_description"] = this.renderBulletList(doc.data().work3_description)
            }
            new_dict["work3_duration"] = doc.data().work3_duration
            new_dict["work3_location"] = doc.data().work3_location
            new_dict["work3_title"] = doc.data().work3_title
        })

        this.state.resumeList.push(new_dict)
        //console.log(this.state.resumeList.length)
        this.setState({resumeList: this.state.resumeList})
        this.pullValues(resume_number + 1)
    }

    // Shuffle an array
    shuffle(array) {
        // via https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/12646864#12646864
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    renderBulletList(workDescription) {
        let viewBulletList = []
        let bulletList = workDescription.split(".")
        bulletList.forEach((item, index) => {
            if (item && item !== " ") {
                viewBulletList.push(
                    <li key={index}>{item}</li>
                )
            }
        })
        return viewBulletList
    }

    populateValues() {
        // get resume order
        this.DATABASE.collection("userIDs").doc(this.state.qualtricsUserId).get().then((doc) => {
            console.log(doc);
            for (let i = 1; i <= 5; i++){
                let resume = doc.data()["candidate" + i + "_resume"]
                this.state.resumes[i-1] = resume
            }
            this.pullValues(0)
        });

        let count = this.activityCounter.toString();
        this.activityCounter = this.activityCounter + 1;

        let time = moment().tz("America/Los_Angeles").format('MM-DD-YYYY HH:mm:ss');

        this.DATABASE.collection("userIDs").doc(this.state.qualtricsUserId).collection("activityData_page"+this.state.pageNum).doc(count).set({
            "time": time,
            "description": "website information loaded",
        });
    }

    collapsibleOpened(tabNum) {
        let val = this.state["section" + tabNum + "opened"]
        console.log(this.state["section" + tabNum + "opened"])
        this.setState({["section" + tabNum + "opened"] : !val})
        console.log("section" + tabNum + "opened")
        console.log(this.state["section" + tabNum + "opened"])
        this.setState({reload: true})

        let count = this.activityCounter.toString();
        this.activityCounter = this.activityCounter + 1;
        let description = '';

        let time = moment().tz("America/Los_Angeles").format('MM-DD-YYYY HH:mm:ss');

        console.log("OPENED OR CLOSED: " + this.state["section" + tabNum + "opened"])
        description = "opened resume " + tabNum;
        if (tabNum === 0) {
            description = "opened job description"
        }

        this.DATABASE.collection("userIDs").doc(this.state.qualtricsUserId).collection("activityData_page"+this.state.pageNum).doc(count).set({
            "time": time,
            "description": description,
        });
    }

    render() {
        //console.log("list length: " + this.state.resumeList.length)
        return (
            <div className="overall">
                <div className="App">
                    <div className="resume_master">
                        {this.state.resumeList.length === 5 &&
                        <div>
                        <Tabs
                            defaultIndex={0}
                            onSelect={index => this.collapsibleOpened(index)}
                        >
                            <TabList>
                                <Tab>Job Description</Tab>
                                <Tab>{this.state.names[0]}</Tab>
                                <Tab>{this.state.names[1]}</Tab>
                                <Tab>{this.state.names[2]}</Tab>
                                <Tab>{this.state.names[3]}</Tab>
                                <Tab>{this.state.names[4]}</Tab>
                            </TabList>

                            <TabPanel>
                                <strong>{this.state.job_title} Job Description</strong>
                                <br/>
                                <br/><strong>Job Title: </strong>{this.state.job_title}
                                <br/>
                                <br/><strong>Main Tasks: </strong>
                                <div id="bullets">{this.state.main_tasks}</div>
                                <br/>
                                <br/><strong>Required Knowledge and Skills: </strong>
                                <div id="bullets">{this.state.req_skills}</div>
                            </TabPanel>
                            { // Create the five resumes
                                [0,1,2,3,4].map((name, index) => (
                                <TabPanel key={index}>
                                    <Card.Body>
                                        <div className="resume" id="horizontal_master">
                                            <div className="header">{this.state.names[index]}</div>
                                        </div>
                                        <div className="expand">
                                            <div className="header">Work Experience</div>
                                            <div id="subtext"> {this.state.resumeList[index]["work1_title"]}
                                                <div id="horizontal">
                                                    <div id="subinfo">{this.state.resumeList[index]["work1_company"]}</div>
                                                </div>
                                                <div id="subinfogray">{this.state.resumeList[index]["work1_duration"]}</div>
                                                <div id="subinfo">{this.state.resumeList[index]["work1_description"]}</div>
                                            </div>
                                            <div id="subtext"> {this.state.resumeList[index]["work2_title"]}
                                                <div id="horizontal">
                                                    <div id="subinfo">{this.state.resumeList[index]["work2_company"]}</div>
                                                </div>
                                                <div id="subinfogray">{this.state.resumeList[index]["work2_duration"]}</div>
                                                <div id="subinfo">{this.state.resumeList[index]["work2_description"]}</div>
                                            </div>
                                            <div id="subtext"> {this.state.resumeList[index]["work3_title"]}
                                                <div id="horizontal">
                                                    <div id="subinfo">{this.state.resumeList[index]["work3_company"]}</div>
                                                </div>
                                                <div id="subinfogray">{this.state.resumeList[index]["work3_duration"]}</div>
                                                <div id="subinfo">{this.state.resumeList[index]["work3_description"]}</div>
                                            </div>
                                            <div className="header">Education</div>
                                            <div id="subtext">{this.state.resumeList[index]["edu_degree"]}, {this.state.resumeList[index]["edu_major"]}
                                                <div id="subinfo">{this.state.resumeList[index]["edu_university"]}</div>
                                                <div id="subinfogray">{this.state.resumeList[index]["edu_duration"]}</div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </TabPanel>
                            ))}
                        </Tabs>
                        </div>
                        }
                        </div>
                    </div>
                </div>
        );
    }
}
