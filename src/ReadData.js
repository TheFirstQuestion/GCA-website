import React, {useState} from 'react';
import './App.css';
import firebase from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSVLink, CSVDownload } from 'react-csv';


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
        this.getStudyLists();
    }

    getMouseContent(itemID, studyVersion) {
        let text = "masterMouse" + studyVersion
        let csvList = []
        let newObj = [];
        firebase.firestore().collection('studies').doc('study ' + studyVersion).collection('userIDs').doc(itemID).collection("mouseData_resume1").onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                newObj = [doc.data().time, doc.data().x, doc.data().y, 1]
                csvList = [...csvList, newObj]
            })
            firebase.firestore().collection('studies').doc('study ' + studyVersion).collection('userIDs').doc(itemID).collection("mouseData_resume2").onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    newObj = [doc.data().time, doc.data().x, doc.data().y, 2]
                    csvList = [...csvList, newObj]
                })
                let largerObj = [itemID, csvList]
                this[text] = [...this[text], largerObj]
                this.setState({loading2mouse: true})
            })
        })
    }

    getActivityContent(itemID, studyVersion) {
        let text = "masterActivity" + studyVersion
        let csvList = []
        let newObj = [];
        firebase.firestore().collection('studies').doc('study ' + studyVersion).collection('userIDs').doc(itemID).collection("activityData_resume1").onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                newObj = [doc.data().time, doc.data().description, 1]
                csvList = [...csvList, newObj]
            })
            firebase.firestore().collection('studies').doc('study ' + studyVersion).collection('userIDs').doc(itemID).collection("activityData_resume2").onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    newObj = [doc.data().time, doc.data().description, 2]
                    csvList = [...csvList, newObj]
                })
                let largerObj = [itemID, csvList]
                this[text] = [...this[text], largerObj]
                this.setState({loading2activity: true})
            })
        })
    }

    getResumeContent(itemID, studyVersion) {
        let text = "masterResume" + studyVersion
        let csvList = []
        let newObj = [];
        console.log("ID IN RESUME CONTENT: " + itemID)
        const res1 = firebase.firestore().collection('userIDs').doc(itemID).collection("values shown").doc("resume 1")
        res1.get()
            .then((docSnapshot) => {
                if(docSnapshot.exists){
                    res1.onSnapshot((doc) => {
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



                        const res2 = firebase.firestore().collection('userIDs').doc(itemID).collection("values shown").doc("resume 2")
                        res2.get()
                            .then((docSnapshot) => {
                                if(docSnapshot.exists){
                                    res2.onSnapshot((doc) => {
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
                //this.getMouseContent(item.id, 1)
                this.getActivityContent(item.id, 1)
                this.getResumeContent(item.id, 1)
            })

            this.setState({loading1mouse: false})
        }

        const study2 = await firebase.firestore().collection("studies").doc("study 2").collection("userIDs").get()
        if(study2.docs.length > 0){
            this.study2List = [...study2.docs]

            this.study2List.forEach((item, index) => {
                //this.getMouseContent(item.id, 2)
                this.getActivityContent(item.id, 2)
                this.getResumeContent(item.id, 2)
            })

            this.setState({loading2mouse: false})
        }

        const study3 = await firebase.firestore().collection("studies").doc("study 3").collection("userIDs").get()
        if(study3.docs.length > 0){
            this.study3List = [...study3.docs]

            this.study3List.forEach((item, index) => {
                //this.getMouseContent(item.id, 3)
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

    render() {
        return (
            <div className="overall">
                <div className="title">Download Data</div>
                <div className="horizontal" id="big">
                        {/*<div>Mouse Data</div>*/}
                        <div>Activity Data</div>
                        <div>Resume Data</div>
                    </div>
                <hr/>
                <div className="list">
                    <div id="title">Study 1: </div>
                    <div className="horizontal">
                        {/*<div>{this.renderMouseData(1)}</div>*/}
                        <div>{this.renderActivityData(1)}</div> 
                        <div>{this.renderResumeData(1)}</div>
                    </div>
                </div>
                <hr/>
                <div className="list">
                    <div id="title">Study 2: </div>
                    <div className="horizontal">
                        {/*<div>{this.renderMouseData(2)}</div>*/}
                        <div>{this.renderActivityData(2)}</div>
                        <div>{this.renderResumeData(2)}</div>
                    </div>
                </div>
                <hr/>
                <div className="list">
                    <div id="title">Study 3: </div>
                    <div className="horizontal">
                        {/*<div>{this.renderMouseData(3)}</div>*/}
                        <div>{this.renderActivityData(3)}</div>
                        <div>{this.renderResumeData(3)}</div>
                    </div>
                </div> 
            </div>
        );
    }
}

export default ReadData;
