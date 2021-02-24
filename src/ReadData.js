import React, {useState} from 'react';
import './App.css';
import firebase from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSVLink, CSVDownload } from 'react-csv';
import New_CSV_Link from './ReactCSV_New.js'
import ModalReact from 'react-modal';

class ReadData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //study and resume version (pulled from props)
            studyVersion: 1,
            resumeVersion: 1,

            generatedID: '',
            errorMessage: false,

            //all tracking outputs
            activityData: [],

            loading1mouse: true,
            loading2mouse: true,
            loading3mouse: true,

            loading1activity: true,
            loading2activity: true,
            loading3activity: true,

            loading1resume: true,
            loading2resume: true,
            loading3resume: true,

            mousestate: false,

            study1: [],

            password: '',
            errorMessage: false,
            modalOpened: true,
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
    }

    componentDidMount(){
        console.log("mounted")
    }

    getMouseContent(itemID, studyVersion) {
        let text = "masterMouse" + studyVersion
        let csvList = []
        let newObj = [];
        var snapshot1 = firebase.firestore().collection('studies').doc('study ' + studyVersion).collection('userIDs').doc(itemID).collection("mouseData_resume1").onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                //console.log(doc.data().time)
                newObj = [doc.data().time, doc.data().x, doc.data().y, 1]
                csvList = [...csvList, newObj]
            })
            snapshot1();
            var snapshot2 = firebase.firestore().collection('studies').doc('study ' + studyVersion).collection('userIDs').doc(itemID).collection("mouseData_resume2").onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    newObj = [doc.data().time, doc.data().x, doc.data().y, 2]
                    csvList = [...csvList, newObj]
                })
                let largerObj = [itemID, csvList]
                this[text] = [...this[text], largerObj]
                this.setState({loading2mouse: true})
                snapshot2();
            })
        })
    }

    getActivityContent(itemID, studyVersion) {
        let text = "masterActivity" + studyVersion
        let csvList = []
        let newObj = [];
        //console.log(itemID)
        var snapshot1 = firebase.firestore().collection('studies').doc('study ' + studyVersion).collection('userIDs').doc(itemID).collection("activityData_resume1").onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                //console.log(doc.data().time)
                newObj = [doc.data().time, doc.data().description, 1]
                csvList = [...csvList, newObj]
            })
            snapshot1();
            var snapshot2 = firebase.firestore().collection('studies').doc('study ' + studyVersion).collection('userIDs').doc(itemID).collection("activityData_resume2").onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    newObj = [doc.data().time, doc.data().description, 2]
                    csvList = [...csvList, newObj]
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
        const res1 = firebase.firestore().collection('userIDs').doc(itemID).collection("values shown").doc("resume 1")
        res1.get()
            .then((docSnapshot) => {
                if(docSnapshot.exists){
                    var snapshot1 = res1.onSnapshot((doc) => {
                        let parent = doc.data().parenthood
                        if(parent == false){
                            parent = "false"
                        }
                        let remote = doc.data().remote
                        if(remote == null){
                            remote = "N/A"
                        }
                        newObj = [doc.data().education, doc.data().gender, parent, remote, doc.data().work1, doc.data().work2, doc.data().work3, 1]
                        csvList = [...csvList, newObj]
                        this.setState({loading2resume: true})

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
                                        newObj = [doc.data().education, doc.data().gender, parent, remote, doc.data().work1, doc.data().work2, doc.data().work3, 2]
                                        csvList = [...csvList, newObj]
                        
                                        let largerObj = [itemID, csvList]
                                        this[text] = [...this[text], largerObj]
                                        this.setState({loading2resume: true})

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

    async getStudyLists(){
        const study1 = await firebase.firestore().collection("studies").doc("study 1").collection("userIDs").get()
        if(study1.docs.length > 0){
            this.study1List = [...study1.docs]

            this.study1List.forEach((item, index) => {
                this.getMouseContent(item.id, 1)
                this.getActivityContent(item.id, 1)
                this.getResumeContent(item.id, 1)
            })

            this.setState({loading1mouse: false})
        }

        const study2 = await firebase.firestore().collection("studies").doc("study 2").collection("userIDs").get()
        if(study2.docs.length > 0){
            this.study2List = [...study2.docs]

            this.study2List.forEach((item, index) => {
                this.getMouseContent(item.id, 2)
                this.getActivityContent(item.id, 2)
                this.getResumeContent(item.id, 2)
            })

            this.setState({loading2mouse: false})
        }

        const study3 = await firebase.firestore().collection("studies").doc("study 3").collection("userIDs").get()
        if(study3.docs.length > 0){
            this.study3List = [...study3.docs]

            this.study3List.forEach((item, index) => {
                this.getMouseContent(item.id, 3)
                this.getActivityContent(item.id, 3)
                this.getResumeContent(item.id, 3)
            })

            this.setState({loading3mouse: false})
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
                        <New_CSV_Link data={item[1]} filename={item[0] + "_mouseData.csv"}>{item[0]}_mouseData</New_CSV_Link>
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
                        <New_CSV_Link data={item[1]} filename={item[0] + "_activityData.csv"}>{item[0]}_activityData</New_CSV_Link>
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
                        <New_CSV_Link data={item[1]} filename={item[0] + "_resumeData.csv"}>{item[0]}_resumeData</New_CSV_Link>
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
                <div className="horizontal" id="big">
                        <div>Mouse Data</div>
                        <div>Activity Data</div>
                        <div>Resume Data</div>
                    </div>
                <hr/>
                <div className="list">
                    <div id="title">Study 1: </div>
                    <div className="horizontal">
                        <div>{this.renderMouseData(1)}</div>
                        <div>{this.renderActivityData(1)}</div> 
                        <div>{this.renderResumeData(1)}</div>
                    </div>
                </div>
                <hr/>
                <div className="list">
                    <div id="title">Study 2: </div>
                    <div className="horizontal">
                        <div>{this.renderMouseData(2)}</div>
                        <div>{this.renderActivityData(2)}</div>
                        <div>{this.renderResumeData(2)}</div>
                    </div>
                </div>
                <hr/>
                <div className="list">
                    <div id="title">Study 3: </div>
                    <div className="horizontal">
                        <div>{this.renderMouseData(3)}</div>
                        <div>{this.renderActivityData(3)}</div>
                        <div>{this.renderResumeData(3)}</div>
                    </div>
                </div> 
            </div>
        );
    }
}

export default ReadData;
