import React, {useState} from 'react';
import './App.css';
import firebase from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSVLink, CSVDownload } from 'react-csv';
import ModalReact from 'react-modal';
import { Button } from 'bootstrap';

class ReadData extends React.Component {
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
        this.study3List = [];

        this.masterMouse1 = [];
        this.masterMouse2 = [];
        this.masterMouse3 = [];

        this.masterActivity1 = [];
        this.masterActivity2 = [];
        this.masterActivity3 = [];

        this.masterResume1 = [];
        this.masterResume2 = [];
        this.masterResume3 = [];


        this.singleMouse1 = [];
        this.singleMouse2 = [];
        this.singleMouse3 = [];
        this.singleActivity1 = [];
        this.singleActivity2 = [];
        this.singleActivity3 = [];
        this.singleResume1 = [];
        this.singleResume2 = [];
        this.singleResume3 = [];
    }

    componentDidMount(){
        console.log("mounted")
        this.setState({displayingMouse: this.props.displayingMouse})
        this.setState({displayingActivity: this.props.displayingActivity})
        this.setState({displayingResume: this.props.displayingResume})
    }

    getMouseContent(itemID, studyVersion) {
        console.log("ITEM ID: " + itemID)
        let text = "masterMouse" + studyVersion
        let csvList = []
        let newObj = [];

        let singleText = "singleMouse" + studyVersion
        let newObjSingle = [];
        var snapshot1 = firebase.firestore().collection('studies').doc('study ' + studyVersion).collection('userIDs').doc(itemID).collection("mouseData_resume1").onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                //console.log(doc.data().time)
                newObj = [doc.data().time, doc.data().x, doc.data().y, 1]
                csvList = [...csvList, newObj]

                newObjSingle = [itemID, doc.data().time, doc.data().x, doc.data().y, 1]
                this[singleText] = [...this[singleText], newObjSingle]
            })
            snapshot1();
            console.log("finished r1 mouse for: " + itemID)
            var snapshot2 = firebase.firestore().collection('studies').doc('study ' + studyVersion).collection('userIDs').doc(itemID).collection("mouseData_resume2").onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    newObj = [doc.data().time, doc.data().x, doc.data().y, 2]
                    csvList = [...csvList, newObj]

                    newObjSingle = [itemID, doc.data().time, doc.data().x, doc.data().y, 2]
                    this[singleText] = [...this[singleText], newObjSingle]
                })
                let largerObj = [itemID, csvList]
                this[text] = [...this[text], largerObj]
                this.setState({loading2mouse: true})
                snapshot2();
            })
        })
    }

    getActivityContent(itemID, studyVersion) {
        console.log("getting activity for " + itemID)
        let text = "masterActivity" + studyVersion
        let csvList = []
        let newObj = [];

        let singleText = "singleActivity" + studyVersion
        let newObjSingle = [];
        var snapshot1 = firebase.firestore().collection('studies').doc('study ' + studyVersion).collection('userIDs').doc(itemID).collection("activityData_resume1").onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                //console.log(doc.data().time)
                newObj = [doc.data().time, doc.data().description, 1]
                csvList = [...csvList, newObj]

                newObjSingle = [itemID, doc.data().time, doc.data().description, 1]
                this[singleText] = [...this[singleText], newObjSingle]
            })
            snapshot1();
            var snapshot2 = firebase.firestore().collection('studies').doc('study ' + studyVersion).collection('userIDs').doc(itemID).collection("activityData_resume2").onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    newObj = [doc.data().time, doc.data().description, 2]
                    csvList = [...csvList, newObj]

                    newObjSingle = [itemID, doc.data().time, doc.data().description, 2]
                    this[singleText] = [...this[singleText], newObjSingle]
                })
                let largerObj = [itemID, csvList]
                this[text] = [...this[text], largerObj]
                this.setState({loading2activity: true})
                snapshot2();
            })
        })
    }

    getResumeContent(itemID, studyVersion) {
        let text = "masterResume" + studyVersion
        let csvList = []
        let newObj = [];
        //console.log("ID IN RESUME CONTENT: " + itemID)

        let singleText = "singleResume" + studyVersion
        let newObjSingle = [];
        const res1 = firebase.firestore().collection('userIDs').doc(itemID).collection("values shown").doc("resume 1")
        res1.get()
            .then((docSnapshot) => {
                if(docSnapshot.exists){
                    var snapshot1 = res1.onSnapshot((doc) => {
                        if(doc.data() == null){
                            console.log("doc is null for: " + itemID)
                        }
                        let parent = doc.data().parenthood
                        if(parent == false){
                            parent = "false"
                        }
                        let remote = doc.data().remote
                        if(remote == null){
                            remote = "N/A"
                        }
                        newObj = [doc.data().education, doc.data().gender, parent, remote, doc.data().work1, doc.data().work2, doc.data().name, 1]
                        csvList = [...csvList, newObj]

                        newObjSingle = [itemID, doc.data().education, doc.data().gender, parent, remote, doc.data().work1, doc.data().work2, doc.data().name, 1]
                        this[singleText] = [...this[singleText], newObjSingle]

                        this.setState({loading2resume: true})

                        console.log("got resume1 content for " + itemID);
                        snapshot1();

                        const res2 = firebase.firestore().collection('userIDs').doc(itemID).collection("values shown").doc("resume 2")
                        res2.get()
                            .then((docSnapshot) => {
                                if(docSnapshot.exists){
                                    var snapshot2 = res2.onSnapshot((doc) => {
                                        let parent = doc.data().parenthood
                                        if(parent == false){
                                            parent = "false"
                                        }
                                        let remote = doc.data().remote
                                        if(remote == null){
                                            remote = "N/A"
                                        }
                                        //console.log("resume 2 found for " + itemID)
                                        newObj = [doc.data().education, doc.data().gender, parent, remote, doc.data().work1, doc.data().work2, doc.data().name, 2]
                                        csvList = [...csvList, newObj]
                        
                                        let largerObj = [itemID, csvList]
                                        this[text] = [...this[text], largerObj]

                                        newObjSingle = [itemID, doc.data().education, doc.data().gender, parent, remote, doc.data().work1, doc.data().work2, doc.data().name, 2]
                                        this[singleText] = [...this[singleText], newObjSingle]
                        
                                        this.setState({loading2resume: true})

                                        console.log("got resume2 content for " + itemID);
                                        snapshot2();
                                    });
                                }
                                else{
                                    console.log("did not find part 2 for " + itemID)
                                    let largerObj = [itemID, csvList]
                                    this[text] = [...this[text], largerObj]
                                    this.setState({loading2resume: true})
                                }
                            })

                    })
                }
                else{
                    console.log("did not find part 1 for " + itemID)
                }
            })
    }

    getMouse1(i){
        setTimeout(() => {
            console.log("in loop func")
            console.log(this.study1List.length)
            var max = i + 8
            while(i < max && i < this.study1List.length){
                this.getMouseContent(this.study1List[i].id, 1)
                i++
            }
            this.setState({completed1: i})
            if(i < this.study1List.length){
                this.getMouse1(i)
            }
            else{
                if(this.study2List.length > 0){
                    this.getMouse2(0);
                }
            }
        }, 60000)
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
            this.setState({completed1: i})
            if(i < this.study1List.length){
                this.getActivity1(i)
            }
            else{
                if(this.study2List.length > 0){
                    this.getActivity2(0);
                }
            }
        }, 30000)
    }

    getActivity2(i){
        setTimeout(() => {
            console.log("in loop func")
            console.log(this.study2List.length)
            var max = i + 20
            while(i < max && i < this.study2List.length){
                this.getActivityContent(this.study2List[i].id, 2)
                i++
            }
            this.setState({completed2: i})
            if(i < this.study2List.length){
                this.getActivity2(i)
            }
            else{
                if(this.study3List.length > 0){
                    this.getActivity3(0);
                }
            }
        }, 30000)
    }

    getActivity3(i){
        setTimeout(() => {
            console.log("in loop func")
            console.log(this.study3List.length)
            var max = i + 20
            while(i < max && i < this.study3List.length){
                this.getActivityContent(this.study3List[i].id, 3)
                i++
            }
            this.setState({completed3: i})
            if(i < this.study3List.length){
                this.getActivity3(i)
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
            this.setState({completed1: i})
            if(i < this.study1List.length){
                this.getResume1(i)
            }
            else{
                if(this.study2List.length > 0){
                    this.getResume2(0);
                }
            }
        }, 30000)
    }

    getResume2(i){
        setTimeout(() => {
            console.log("in loop func")
            console.log(this.study2List.length)
            var max = i + 80
            while(i < max && i < this.study2List.length){
                this.getResumeContent(this.study2List[i].id, 2)
                i++
            }
            this.setState({completed2: i})
            if(i < this.study2List.length){
                this.getResume2(i)
            }
            else{
                if(this.study3List.length > 0){
                    this.getResume3(0);
                }
            }
        }, 30000)
    }

    getResume3(i){
        setTimeout(() => {
            console.log("in loop func")
            console.log(this.study3List.length)
            var max = i + 80
            while(i < max && i < this.study3List.length){
                this.getResumeContent(this.study3List[i].id, 3)
                i++
            }
            this.setState({completed3: i})
            if(i < this.study3List.length){
                this.getResume3(i)
            }
        }, 30000)
    }

    getMouse2(i){
        setTimeout(() => {
            console.log("in loop func")
            console.log(this.study2List.length)
            var max = i + 8
            while(i < max && i < this.study2List.length){
                this.getMouseContent(this.study2List[i].id, 2)
                i++
            }
            this.setState({completed2: i})
            if(i < this.study2List.length){
                this.getMouse2(i)
            }
            else{
                if(this.study3List.length > 0){
                    this.getMouse3(0);
                }
            }
        }, 60000)
    }

    getMouse3(i){
        setTimeout(() => {
            console.log("in loop func")
            console.log(this.study3List.length)
            var max = i + 8
            while(i < max && i < this.study3List.length){
                this.getMouseContent(this.study3List[i].id, 3)
                i++
            }
            this.setState({completed3: i})
            if(i < this.study3List.length){
                this.getMouse3(i)
            }
        }, 60000)
    }

    async getStudyLists(){
        const study1 = await firebase.firestore().collection("studies").doc("study 1").collection("userIDs").get()
        if(study1.docs.length > 0){
            this.study1List = [...study1.docs]

            if(this.state.displayingMouse){
                this.setState({total1: this.study1List.length})
                this.getMouse1(0);
            }
            /*else{
                this.study1List.forEach((item, index) => {
                    this.getActivityContent(item.id, 1)
                    this.getResumeContent(item.id, 1)
                })
            }*/
            //new version
            else if(this.state.displayingActivity){
                this.setState({total1: this.study1List.length})
                this.getActivity1(0);
            }
            else{
                this.setState({total1: this.study1List.length})
                this.getResume1(0);
            }

            console.log("all content should be loaded")
        }

        const study2 = await firebase.firestore().collection("studies").doc("study 2").collection("userIDs").get()
        if(study2.docs.length > 0){
            this.study2List = [...study2.docs]

            if(this.state.displayingMouse){
                this.setState({total2: this.study2List.length})
                //this.getMouse2(0);
            }
            /*else{
                this.study2List.forEach((item, index) => {
                    this.getActivityContent(item.id, 2)
                    this.getResumeContent(item.id, 2)
                })
            }*/
            //new version
            else if(this.state.displayingActivity){
                this.setState({total2: this.study2List.length})
                //this.getMouse2(0);
            }
            else{
                this.setState({total2: this.study2List.length})
                //this.getMouse2(0);
            }
        }

        const study3 = await firebase.firestore().collection("studies").doc("study 3").collection("userIDs").get()
        if(study3.docs.length > 0){
            this.study3List = [...study3.docs]

            if(this.state.displayingMouse){
                this.setState({total3: this.study3List.length})
                //this.getMouse3(0);
            }
            /*else{
                this.study3List.forEach((item, index) => {
                    this.getActivityContent(item.id, 3)
                    this.getResumeContent(item.id, 3)
                })
            }*/
            //new version
            else if(this.state.displayingActivity){
                this.setState({total3: this.study3List.length})
                //this.getMouse3(0);
            } 
            else{
                this.setState({total3: this.study3List.length})
                //this.getMouse3(0);
            }
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

    switchAdminFormat(){
        if(this.state.adminVersion == "individualCSV"){
            this.setState({adminVersion: "singleCSV"})
            this.setState({buttonText: "Switch to individual CSV format"})
        }
        else{
            this.setState({adminVersion: "individualCSV"})
            this.setState({buttonText: "Switch to single CSV format"})

        }
        console.log("switched")
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

                {/*<button onClick={() => this.switchAdminFormat()}> {this.state.buttonText} </button>*/}
                <div className="title">Download Data</div>
                {this.state.displayingMouse && 
                    <div className="horizontal" id="big">
                            <div>Mouse Data</div>
                    </div>
                }
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
                    <div id="title">Study 1: </div>
                    {this.state.adminVersion == "individualCSV" && this.state.displayingMouse &&
                        <div className="horizontal">
                            <div>{this.renderMouseData(1)}</div>
                        </div>
                    }
                    {this.state.adminVersion == "individualCSV" && this.state.displayingActivity &&
                        <div className="horizontal">
                            <div>{this.renderActivityData(1)}</div> 
                        </div>
                    }
                    {this.state.adminVersion == "individualCSV" && this.state.displayingResume &&
                        <div className="horizontal">
                            <div>{this.renderResumeData(1)}</div>
                        </div>
                    }

                    {this.state.adminVersion == "singleCSV" && this.state.displayingMouse &&
                        <div className="horizontal">
                            <div>Processed {this.state.completed1}/{this.state.total1}</div>
                            <div>{this.renderMouseSingle(1)}</div>
                        </div>
                    }
                    {this.state.adminVersion == "singleCSV" && this.state.displayingActivity &&
                        <div className="horizontal">
                            <div>Processed {this.state.completed1}/{this.state.total1}</div>
                            <div>{this.renderActivitySingle(1)}</div> 
                        </div>
                    }
                    {this.state.adminVersion == "singleCSV" && this.state.displayingResume &&
                        <div className="horizontal">
                            <div>Processed {this.state.completed1}/{this.state.total1}</div>
                            <div>{this.renderResumeSingle(1)}</div>
                        </div>
                    }
                </div>
                <hr/>
                <div className="list">
                    <div id="title">Study 2: </div>
                    {this.state.adminVersion == "individualCSV" && this.state.displayingMouse &&
                        <div className="horizontal">
                            <div>{this.renderMouseData(2)}</div>
                        </div>
                    }
                    {this.state.adminVersion == "individualCSV" && this.state.displayingActivity &&
                        <div className="horizontal">
                            <div>{this.renderActivityData(2)}</div>
                        </div>
                    }
                    {this.state.adminVersion == "individualCSV" && this.state.displayingResume &&
                        <div className="horizontal">
                            <div>{this.renderResumeData(2)}</div>
                        </div>
                    }

                    {this.state.adminVersion == "singleCSV" && this.state.displayingMouse &&
                        <div className="horizontal">
                            <div>Processed {this.state.completed2}/{this.state.total2}</div>
                            <div>{this.renderMouseSingle(2)}</div>
                        </div>
                    }
                    {this.state.adminVersion == "singleCSV" && this.state.displayingActivity &&
                        <div className="horizontal">
                            <div>Processed {this.state.completed2}/{this.state.total2}</div>     
                            <div>{this.renderActivitySingle(2)}</div> 
                        </div>
                    }
                    {this.state.adminVersion == "singleCSV" && this.state.displayingResume &&
                        <div className="horizontal">
                            <div>Processed {this.state.completed2}/{this.state.total2}</div>
                            <div>{this.renderResumeSingle(2)}</div>
                        </div>
                    }
                </div>
                <hr/>
                <div className="list">
                    <div id="title">Study 3: </div>
                    {this.state.adminVersion == "individualCSV" && this.state.displayingMouse &&
                        <div className="horizontal">
                            <div>{this.renderMouseData(3)}</div>
                        </div>
                    }
                    {this.state.adminVersion == "individualCSV" && this.state.displayingActivity &&
                        <div className="horizontal">
                            <div>{this.renderActivityData(3)}</div>
                        </div>
                    }
                    {this.state.adminVersion == "individualCSV" && this.state.displayingResume &&
                        <div className="horizontal">
                            <div>{this.renderResumeData(3)}</div>
                        </div>
                    }

                    {this.state.adminVersion == "singleCSV" && this.state.displayingMouse &&
                        <div className="horizontal">
                            <div>Processed {this.state.completed3}/{this.state.total3}</div>
                            <div>{this.renderMouseSingle(3)}</div>
                        </div>
                    }
                    {this.state.adminVersion == "singleCSV" && this.state.displayingActivity &&
                        <div className="horizontal">
                            <div>Processed {this.state.completed3}/{this.state.total3}</div>
                            <div>{this.renderActivitySingle(3)}</div> 
                        </div>
                    }
                    {this.state.adminVersion == "singleCSV" && this.state.displayingResume &&
                        <div className="horizontal">
                            <div>Processed {this.state.completed3}/{this.state.total3}</div>
                            <div>{this.renderResumeSingle(3)}</div>
                        </div>
                    }
                </div> 
            </div>
        );
    }
}

export default ReadData;
