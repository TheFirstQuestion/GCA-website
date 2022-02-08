import React, {useState} from 'react';
import './App.css';
import firebase from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSVLink, CSVDownload } from 'react-csv';
import ModalReact from 'react-modal';
import { Button } from 'bootstrap';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //displaying mouse or displaying activity+resume (pulled from props)
            displayingMouse: false,
            displayingResume: false,
            displayingActivity: false,
        
            generatedID: '',
            errorMessage: false,

            //all tracking outputs
            activityData: [],

            loading1: true,
            loading2: true,
            loading3: true,

            mousestate: false,

            study1: [],

            password: '',
            errorMessage: false,
            modalOpened: true,

            adminVersion: "singleCSV",
            buttonText: "Switch to individual CSV format",
        };
        this.study1List = [];
        this.study2List = [];
        this.study2bList = [];
        this.study3List = [];

        this.masterMouse1 = [];
        this.masterMouse2 = [];
        this.masterMouse2b = [];
        this.masterMouse3 = [];

        this.masterActivity1 = [];
        this.masterActivity2 = [];
        this.masterActivity2b = [];
        this.masterActivity3 = [];

        this.masterResume1 = [];
        this.masterResume2 = [];
        this.masterResume2b = [];
        this.masterResume3 = [];

        this.singleMouse1 = [];
        this.singleMouse2 = [];
        this.singleMouse2b = [];
        this.singleMouse3 = [];
        this.singleActivity1 = [];
        this.singleActivity2 = [];
        this.singleActivity2b = [];
        this.singleActivity3 = [];
        this.singleResume1 = [];
        this.singleResume2 = [];
        this.singleResume2b = [];
        this.singleResume3 = [];
    }

    componentDidMount(){
        console.log("mounted")
    }

    getActivityContent(itemID, studyVersion) {
        console.log("getting activity for " + itemID)
        let text = "masterActivity" + studyVersion
        let csvList = []
        let newObj = [];

        let singleText = "singleActivity" + studyVersion
        let newObjSingle = [];

        //get activity data - page 1
        var snapshot1 = firebase.firestore().collection('userIDs').doc(itemID).collection("activityData_page1").onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                newObj = ["page 1", doc.data().time, doc.data().description]
                csvList = [...csvList, newObj]

                newObjSingle = [itemID, "page 1", doc.data().time, doc.data().description]
                this[singleText] = [...this[singleText], newObjSingle]
            })
            snapshot1();
        })

        //get activity data - page 2
        var snapshot2 = firebase.firestore().collection('userIDs').doc(itemID).collection("activityData_page2").onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                newObj = ["page 2", doc.data().time, doc.data().description]
                csvList = [...csvList, newObj]

                newObjSingle = [itemID, "page 2", doc.data().time, doc.data().description]
                this[singleText] = [...this[singleText], newObjSingle]
            })
            snapshot2();
        })

        //get activity data - page 3
        var snapshot3 = firebase.firestore().collection('userIDs').doc(itemID).collection("activityData_page3").onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                newObj = ["page 3", doc.data().time, doc.data().description]
                csvList = [...csvList, newObj]

                newObjSingle = [itemID, "page 3", doc.data().time, doc.data().description]
                this[singleText] = [...this[singleText], newObjSingle]
            })
            snapshot3();
        })

        //get activity data - page 4
        var snapshot4 = firebase.firestore().collection('userIDs').doc(itemID).collection("activityData_page4").onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                newObj = ["page 4", doc.data().time, doc.data().description]
                csvList = [...csvList, newObj]

                newObjSingle = [itemID, "page 4", doc.data().time, doc.data().description]
                this[singleText] = [...this[singleText], newObjSingle]
            })
            snapshot4();
        })
    }

    getResumeContent(itemID, studyVersion) {
        let text = "masterResume" + studyVersion
        let csvList = []
        let newObj = [];
        //console.log("ID IN RESUME CONTENT: " + itemID)

        let singleText = "singleResume" + studyVersion
        let newObjSingle = [];
        const res1 = firebase.firestore().collection('userIDs').doc(itemID)
        res1.get()
            .then((docSnapshot) => {
                if(docSnapshot.exists){
                    var snapshot1 = res1.onSnapshot((doc) => {
                        if(doc.data() == null){
                            console.log("doc is null for: " + itemID)
                        }
                        newObj = [itemID, doc.data().candidate1_name, doc.data().candidate2_name, doc.data().candidate3_name, doc.data().candidate4_name, doc.data().candidate5_name, doc.data().candidate1_resume, doc.data().candidate2_resume, doc.data().candidate3_resume, doc.data().candidate4_resume, doc.data().candidate5_resume, doc.data().candidate1_headshot, doc.data().candidate2_headshot,doc.data().candidate3_headshot,doc.data().candidate4_headshot,doc.data().candidate5_headshot]
                        csvList = [...csvList, newObj]

                        newObjSingle = [itemID, doc.data().candidate1_name, doc.data().candidate2_name, doc.data().candidate3_name, doc.data().candidate4_name, doc.data().candidate5_name, doc.data().candidate1_resume, doc.data().candidate2_resume, doc.data().candidate3_resume, doc.data().candidate4_resume, doc.data().candidate5_resume, doc.data().candidate1_headshot, doc.data().candidate2_headshot,doc.data().candidate3_headshot,doc.data().candidate4_headshot,doc.data().candidate5_headshot]
                        this[singleText] = [...this[singleText], newObjSingle]

                        this.setState({loading2resume: true})

                        console.log("got resume1 content for " + itemID);
                        snapshot1();

                    })
                }
                else{
                    console.log("did not find part 1 for " + itemID)
                }
            })
    }

    getActivity1(i){
        setTimeout(() => {
            console.log("in loop func")
            console.log(this.study1List.length)
            var max = i + 20
            while(i < max && i < this.study1List.length){
                this.getActivityContent(this.study1List[i].id, 1)
                i++
            }
            this.setState({completedActivity: i})
            if(i < this.study1List.length){
                this.getActivity1(i)
            }
        }, 30000)
    }

    getResume1(i){
        setTimeout(() => {
            console.log("in loop func")
            console.log(this.study1List.length)
            var max = i + 80
            while(i < max && i < this.study1List.length){
                this.getResumeContent(this.study1List[i].id, 1)
                i++
            }
            this.setState({completedResume: i})
            if(i < this.study1List.length){
                this.getResume1(i)
            }
        }, 30000)
    }

    async getStudyLists(){
        const study1 = await firebase.firestore().collection("userIDs").get()
        if(study1.docs.length > 0){
            this.study1List = [...study1.docs]

            this.setState({totalResume: this.study1List.length})
            this.getResume1(0);

            this.setState({totalActivity: this.study1List.length})
            this.getActivity1(0);

            console.log("all content should be loaded")
        }
    }

    renderMouseData = (studyVersion) => {
        let text = "masterMouse" + studyVersion
        //console.log(this[text].length)
        if(this[text].length > 0){
            let viewPositionList = []
            this[text].forEach((item, index) => {
                //console.log("ITEM: " + item)

                viewPositionList.push(
                    <div>
                        <CSVLink data={item[1]} filename={item[0] + "_mouseData.csv"}>{item[0]}_mouseData</CSVLink>
                        {/*<div id="subinfogray">{item}</div>*/}
                    </div>
                )
            })
            return viewPositionList
        }
        else{
            return null
        }
    }

    renderActivityData = (studyVersion) => {
        let text = "masterActivity" + studyVersion
        //console.log(this[text].length)
        if(this[text].length > 0){
            let viewPositionList = []
            this[text].forEach((item, index) => {
                //console.log("ITEM: " + item)

                viewPositionList.push(
                    <div>
                        <CSVLink data={item[1]} filename={item[0] + "_activityData.csv"}>{item[0]}_activityData</CSVLink>
                    </div>
                )
            })
            return viewPositionList
        }
        else{
            return null
        }
    }

    handleChange(event) {
        this.setState({errorMessage: false})
        this.setState({password: event.target.value})
    }

    submitPassword(){
        if(this.state.password == "$bhMNKt8K6"){
            this.setState({modalOpened: false})
            this.getStudyLists();
        }
        else{
            this.setState({errorMessage: true})
        }
    }

    renderResumeData = (studyVersion) => {
        let text = "masterResume" + studyVersion
        //console.log(this[text].length)
        if(this[text].length > 0){
            let viewPositionList = []
            this[text].forEach((item, index) => {
                //console.log("ITEM: " + item)

                viewPositionList.push(
                    <div>
                        <CSVLink data={item[1]} filename={item[0] + "_resumeData.csv"}>{item[0]}_resumeData</CSVLink>
                        {/*<div id="subinfogray">{item}</div>*/}
                    </div>
                )
            })
            return viewPositionList
        }
        else{
            return null
        }
    }

    renderMouseSingle = (studyVersion) => {
        let text = "singleMouse" + studyVersion
        if(this[text].length > 0){
            let viewPositionList = []
            viewPositionList.push(
                <div>
                    <CSVLink data={this[text]} filename={"mouseData" + studyVersion + ".csv"}>{"mouseData" + studyVersion + ".csv"}</CSVLink>
                </div>
            )
            return viewPositionList
        }
        else{
            return null
        }
    }

    renderActivitySingle = (studyVersion) => {
        let text = "singleActivity" + studyVersion
        if(this[text].length > 0){
            let viewPositionList = []
            viewPositionList.push(
                <div>
                    <CSVLink data={this[text]} filename={"activityData" + studyVersion + ".csv"}>{"activityData" + studyVersion + ".csv"}</CSVLink>
                </div>
            )
            return viewPositionList
        }
        else{
            return null
        }
    }

    renderResumeSingle = (studyVersion) => {
        let text = "singleResume" + studyVersion
        if(this[text].length > 0){
            let viewPositionList = []
            viewPositionList.push(
                <div>
                    <CSVLink data={this[text]} filename={"resumeData" + studyVersion + ".csv"}>{"resumeData" + studyVersion + ".csv"}</CSVLink>
                </div>
            )
            return viewPositionList
        }
        else{
            return null
        }
    }

    render() {
        return (
            <div className="overall">
                <ModalReact className="modal_dtp"
                    isOpen={this.state.modalOpened}>
                    <div> Enter password: </div>
                    <input onChange={this.handleChange.bind(this)} value={this.state.password} />
                    <button onClick={() => this.submitPassword()}> Submit </button>
                    {this.state.errorMessage && <div id="red">Invalid password. Please re-enter.</div>}
                </ModalReact>

                <div className="title">Download Data</div>
                {this.state.displayingActivity && 
                    <div className="horizontal" id="big">
                            <div>Activity Data</div>
                    </div>
                }
                {this.state.displayingResume && 
                    <div className="horizontal" id="big">
                            <div>Resume Data</div>
                    </div>
                }
                <hr/>
                <div className="list">
                    <div id="title">Study Data: </div>
                    {this.state.adminVersion == "singleCSV"  &&
                        <div className="horizontal">
                            <div>Activity Data Processed {this.state.completedActivity}/{this.state.totalActivity}</div>
                            <div>{this.renderActivitySingle(1)}</div> 
                        </div>
                    }
                    {this.state.adminVersion == "singleCSV" &&
                        <div className="horizontal">
                            <div>Resume Data Processed {this.state.completedResume}/{this.state.totalResume}</div>
                            <div>{this.renderResumeSingle(1)}</div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Admin;
