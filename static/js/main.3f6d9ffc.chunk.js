(this["webpackJsonpgca-website"]=this["webpackJsonpgca-website"]||[]).push([[0],{48:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){},65:function(e,t,a){"use strict";a.r(t);var r=a(2),s=a(1),n=a.n(s),i=a(40),c=a.n(i),o=(a(48),a(23)),d=a(7),u=a.n(d),l=a(20),h=a(16),p=a(17),j=a(9),m=a(19),b=a(18),v=a(41),O=a(5),f=a(31);a(66);f.a.initializeApp({apiKey:"AIzaSyBARurBcuPfg3SWhuI1Ry1WqPFn7IgORN0",authDomain:"claire-dtp-project.firebaseapp.com",projectId:"claire-dtp-project",storageBucket:"claire-dtp-project.appspot.com",messagingSenderId:"348955792385",appId:"1:348955792385:web:a9aecc0cf1a7539bb85c00",measurementId:"G-G2YTZ3QEG3"});var w=f.a,g=a(33),k=(a(56),function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(e){var r;return Object(h.a)(this,a),(r=t.call(this,e)).state={isLoggedIn:!1,showErrorMessage:!1,passwordAttempt:"",doneGettingUserData:!1,doneGettingActivityData:!1,downloadState:""},r.NUM_PAGES=7,r.userCSVheaders=["userID","candidate1_resume","candidate2_resume","candidate3_resume","candidate4_resume","candidate5_resume","candidate6_resume"],r.DATABASE=w.firestore(),r.users=[],r.userData=[],r.activityData=[],r.handlePasswordChange=r.handlePasswordChange.bind(Object(j.a)(r)),r.handlePasswordSubmit=r.handlePasswordSubmit.bind(Object(j.a)(r)),r.downloadData=r.downloadData.bind(Object(j.a)(r)),r.filenameString=r.filenameString.bind(Object(j.a)(r)),r}return Object(p.a)(a,[{key:"handlePasswordChange",value:function(e){this.setState({showErrorMessage:!1}),this.setState({passwordAttempt:e.target.value})}},{key:"handlePasswordSubmit",value:function(e){e.preventDefault(),"Purchase-Unfair-Dribble-Scavenger3-Capacity"===this.state.passwordAttempt?this.setState({isLoggedIn:!0}):this.setState({showErrorMessage:!0})}},{key:"downloadData",value:function(){var e=Object(l.a)(u.a.mark((function e(){var t,a,r,s,n=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({downloadState:"Downloading..."}),e.next=3,this.DATABASE.collection("userIDs").get();case 3:t=e.sent,a=t.docs,r=u.a.mark((function e(t){var r,s,i,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(r=a[t],n.setState({downloadState:"Downloading #"+(t+1)+" of "+a.length+"..."}),n.users.push(r.id),n.userData.push(Object(o.a)({userID:r.id},r.data())),s=[],i=function(e){s.push(n.DATABASE.collection("userIDs").doc(r.id).collection("activityData_page"+e).get().then((function(t){t.forEach((function(t,a){n.activityData.push(Object(o.a)({userID:r.id,pageNum:e,activityid:t.id},t.data()))}))})))},c=1;c<=n.NUM_PAGES;c++)i(c);return e.next=9,Promise.all(s);case 9:case"end":return e.stop()}}),e)})),s=0;case 7:if(!(s<a.length)){e.next=12;break}return e.delegateYield(r(s),"t0",9);case 9:s++,e.next=7;break;case 12:this.setState({doneGettingUserData:!0}),this.setState({doneGettingActivityData:!0}),this.setState({downloadState:"Done!"});case 15:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"filenameString",value:function(){var e=new Date;return" -- "+e.getFullYear()+"-"+(e.getMonth()+1).toString().padStart(2,"0")+"-"+e.getDate().toString().padStart(2,"0")+" "+e.getHours().toString().padStart(2,"0")+":"+e.getMinutes().toString().padStart(2,"0")}},{key:"render",value:function(){return Object(r.jsxs)("div",{className:"wholePage",children:[Object(r.jsx)("h1",{children:"Hi Claire!!!!!"}),this.state.isLoggedIn?Object(r.jsxs)("div",{className:"loggedIn",children:[Object(r.jsx)("button",{onClick:this.downloadData,children:"Download Data"}),Object(r.jsxs)("div",{className:"downloadLinks",children:[Object(r.jsx)("span",{className:"listItem",children:this.state.downloadState}),Object(r.jsx)("br",{}),this.state.doneGettingUserData&&Object(r.jsx)(g.CSVLink,{data:this.userData,headers:this.userCSVheaders,filename:"userData"+this.filenameString()+".csv",className:"listItem",children:"Download User Data"}),Object(r.jsx)("br",{}),this.state.doneGettingActivityData&&Object(r.jsx)(g.CSVLink,{data:this.activityData,filename:"activityData"+this.filenameString()+".csv",className:"listItem",children:"Download Activity Data"})]})]}):Object(r.jsxs)("div",{className:"loggedOut",children:[Object(r.jsxs)("form",{onSubmit:this.handlePasswordSubmit,children:[Object(r.jsx)("input",{onChange:this.handlePasswordChange,value:this.state.passwordAttempt,type:"password"}),Object(r.jsx)("button",{type:"submit",children:"Submit"})]}),this.state.showErrorMessage&&Object(r.jsx)("span",{id:"red",children:"Nope."})]})]})}}]),a}(n.a.Component)),_=a(27),y=a(25),x=(a(57),a(26)),D=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(){return Object(h.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){return this.props.resume?Object(r.jsx)(x.a.Body,{children:Object(r.jsxs)("div",{className:"candidate",children:[Object(r.jsx)("h1",{className:"name",children:this.props.name}),Object(r.jsx)("hr",{}),Object(r.jsx)("h2",{className:"sectionHeader",children:"Work Experience"}),Object(r.jsxs)("div",{children:[Object(r.jsx)("h3",{children:this.props.resume.work1_title}),Object(r.jsx)("h4",{children:this.props.resume.work1_company}),Object(r.jsx)("h5",{children:this.props.resume.work1_duration}),Object(r.jsx)("div",{className:"workDescription",children:this.props.resume.work1_description})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("h3",{children:this.props.resume.work2_title}),Object(r.jsx)("h4",{children:this.props.resume.work2_company}),Object(r.jsx)("h5",{children:this.props.resume.work2_duration}),Object(r.jsx)("div",{className:"workDescription",children:this.props.resume.work2_description})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("h3",{children:this.props.resume.work3_title}),Object(r.jsx)("h4",{children:this.props.resume.work3_company}),Object(r.jsx)("h5",{children:this.props.resume.work3_duration}),Object(r.jsx)("div",{className:"workDescription",children:this.props.resume.work3_description})]}),Object(r.jsx)("hr",{}),Object(r.jsx)("h2",{className:"sectionHeader",children:"Education"}),Object(r.jsxs)("div",{children:[Object(r.jsxs)("p",{className:"eduBasics",children:[this.props.resume.edu_degree,","," ",this.props.resume.edu_major]}),Object(r.jsxs)("p",{className:"eduInfo",children:[this.props.resume.edu_university,","," ",this.props.resume.edu_duration]})]})]})}):Object(r.jsx)("h1",{children:"Loading..."})}}]),a}(n.a.Component),S=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(){return Object(h.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){return Object(r.jsx)(x.a.Body,{children:Object(r.jsxs)("div",{className:"jobDescription",children:[Object(r.jsxs)("h1",{children:["Job Description: ",this.props.job_title]}),Object(r.jsx)("hr",{}),Object(r.jsx)("h2",{children:"Main Tasks: "}),Object(r.jsx)("div",{children:this.props.main_tasks}),Object(r.jsx)("h2",{children:"Required Knowledge and Skills: "}),Object(r.jsx)("div",{children:this.props.req_skills})]})})}}]),a}(n.a.Component),A=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(e){var r;return Object(h.a)(this,a),(r=t.call(this,e)).state={names:[new URLSearchParams(r.props.location.search).get("name1"),new URLSearchParams(r.props.location.search).get("name2"),new URLSearchParams(r.props.location.search).get("name3"),new URLSearchParams(r.props.location.search).get("name4"),new URLSearchParams(r.props.location.search).get("name5"),new URLSearchParams(r.props.location.search).get("name6")],resumeList:[],resumesOrder:[],job_title:null,main_tasks:null,req_skills:null},r.qualtricsUserId=r.props.match.params.qualtricsUserId,r.pageNum=parseInt(r.props.match.params.pageNum),r.recordActivity=r.props.recordActivity.bind(Object(j.a)(r)),r.DATABASE=w.firestore(),r.numNames=r.state.names.length,r.prevPercent=0,r.getJobDescription=r.getJobDescription.bind(Object(j.a)(r)),r.recordOrder=r.recordOrder.bind(Object(j.a)(r)),r.populateValues=r.populateValues.bind(Object(j.a)(r)),r}return Object(p.a)(a,[{key:"componentDidMount",value:function(){var e=Object(l.a)(u.a.mark((function e(){var t,a=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(t=[]).push(this.getJobDescription()),1===this.pageNum?this.recordOrder().then((function(){t.push(a.populateValues())})):t.push(this.populateValues()),Promise.all(t).then((function(){a.recordActivity("loading","ready","data loaded")})),this.myInterval=setInterval((function(){var e=document.getElementsByClassName("pool")[0].getBoundingClientRect(),t=e.height,r=t-window.innerHeight,s=Math.abs(t-e.bottom),n=Math.round(s/r*100);Math.abs(n-a.prevPercent)>5&&(a.recordActivity("scroll",n,"scrolled to "+n+"%"),a.prevPercent=n)}),1e3);case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){clearInterval(this.myInterval)}},{key:"recordOrder",value:function(){var e=Object(l.a)(u.a.mark((function e(){var t,a,r,s,n,i=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(t=[],a={},r=0;r<this.numNames;r++)a["candidate"+(r+1)+"_name"]=this.state.names[r];for(t.push(this.DATABASE.collection("userIDs").doc(this.qualtricsUserId).set(a).then((function(){i.recordActivity("log","name_order_stored","name order stored")}))),s={},this.state.resumesOrder=I((c=this.numNames,Object(_.a)(Array(c).keys()))),n=0;n<this.numNames;n++)s["candidate"+(n+1)+"_resume"]=this.state.resumesOrder[n]+1;return t.push(this.DATABASE.collection("userIDs").doc(this.qualtricsUserId).set(s).then((function(){i.recordActivity("log","resume_order_stored","resume order stored")}))),e.abrupt("return",Promise.all(t));case 9:case"end":return e.stop()}var c}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getJobDescription",value:function(){var e=Object(l.a)(u.a.mark((function e(){var t=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.DATABASE.collection("job_description").doc("values").get().then((function(e){t.setState({job_title:e.data().job_title,main_tasks:N(e.data().main_tasks),req_skills:N(e.data().req_skills)}),t.recordActivity("log","job_description_fetched","job description loaded")})));case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"populateValues",value:function(){var e=Object(l.a)(u.a.mark((function e(){var t,a=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.abrupt("return",this.DATABASE.collection("userIDs").doc(this.qualtricsUserId).get().then((function(e){for(var r=e.data(),s=0;s<a.numNames;s++){var n=r["candidate"+(s+1)+"_resume"];t[s]=n,a.setState({resumesOrder:[].concat(t)}),a.getCandidateResume(n,s)}})));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getCandidateResume",value:function(){var e=Object(l.a)(u.a.mark((function e(t,a){var r,s=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r={},this.DATABASE.collection("resumes").doc("resume_"+t).get().then((function(e){r.edu_degree=e.data().edu_degree,r.edu_distinction=e.data().edu_distinction,r.edu_duration=e.data().edu_duration,r.edu_major=e.data().edu_major,r.edu_university=e.data().edu_university,r.work1_company=e.data().work1_company,r.work1_description=N(e.data().work1_description),r.work1_duration=e.data().work1_duration,r.work1_location=e.data().work1_location,r.work1_title=e.data().work1_title,r.work2_company=e.data().work2_company,null!=e.data().work2_description&&(r.work2_description=N(e.data().work2_description)),r.work2_duration=e.data().work2_duration,r.work2_location=e.data().work2_location,r.work2_title=e.data().work2_title,r.work3_company=e.data().work3_company,null!=e.data().work3_description&&(r.work3_description=N(e.data().work3_description)),r.work3_duration=e.data().work3_duration,r.work3_location=e.data().work3_location,r.work3_title=e.data().work3_title;var t=Object(_.a)(s.state.resumeList);t[a]=r,s.setState({resumeList:Object(_.a)(t)})}));case 2:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"onClick",value:function(e){this.recordActivity("click",e,"clicked on tab "+e)}},{key:"render",value:function(){var e=this;return Object(r.jsx)("div",{className:"pool",children:this.state.job_title?Object(r.jsxs)(y.d,{defaultIndex:0,onSelect:function(t){return e.onClick(t)},children:[Object(r.jsxs)(y.b,{children:[Object(r.jsx)(y.a,{children:"Job Description"}),this.state.names.map((function(e,t){return Object(r.jsx)(y.a,{children:e},t)}))]}),Object(r.jsx)(y.c,{children:Object(r.jsx)(S,{job_title:this.state.job_title,main_tasks:this.state.main_tasks,req_skills:this.state.req_skills})}),this.state.names.map((function(t,a){return Object(r.jsx)(y.c,{children:Object(r.jsx)(D,{name:t,resume:e.state.resumeList[a]},a)},a)}))]}):Object(r.jsx)("h1",{children:"Loading..."})})}}]),a}(n.a.Component);function I(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),r=[e[a],e[t]];e[t]=r[0],e[a]=r[1]}return e}function N(e){var t=[];return e.split(".").forEach((function(e,a){e&&" "!==e&&t.push(Object(r.jsx)("li",{children:e},a))})),t}a(58);var C=a(59),P=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(e){var r;Object(h.a)(this,a),(r=t.call(this,e)).DATABASE=w.firestore(),r.activityCounter=1,r.recordActivity=r.recordActivity.bind(Object(j.a)(r));var s=document.location.hash;return r.pageNum=s.split("/")[2],r.qualtricsUserId=s.split("/")[3],console.log("qualtricsUserId: "+r.qualtricsUserId),console.log("pageNum: "+r.pageNum),r}return Object(p.a)(a,[{key:"componentDidMount",value:function(){this.recordActivity("loading","accessed","App mounted")}},{key:"recordActivity",value:function(){var e=Object(l.a)(u.a.mark((function e(t,a,r){var s,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s=this.activityCounter.toString().padStart(5,"0"),this.activityCounter=this.activityCounter+1,n=C(),this.DATABASE.collection("userIDs").doc(this.qualtricsUserId).collection("activityData_page"+this.pageNum).doc(s).set({category:t,description:r,value:a,timestamp:new Date(n),timeEpoch:Number(n.format("x")),timeReadable:n.tz("America/Los_Angeles").format("M-D-YY h:mm:ssa")}),console.log(s+" "+t+": "+a+" -- "+r);case 5:case"end":return e.stop()}}),e,this)})));return function(t,a,r){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(r.jsx)("div",{className:"App",children:Object(r.jsxs)(v.a,{children:[Object(r.jsx)(O.a,{path:"/page/:pageNum/:qualtricsUserId/",render:function(t){return Object(r.jsx)(A,Object(o.a)(Object(o.a)({},t),{},{recordActivity:e.recordActivity,activityCounter:e.activityCounter}))}}),Object(r.jsx)(O.a,{path:"/admin",render:function(e){return Object(r.jsx)(k,Object(o.a)({},e))}})]})})}}]),a}(n.a.Component);c.a.render(Object(r.jsx)(n.a.StrictMode,{children:Object(r.jsx)(P,{})}),document.getElementById("root"))}},[[65,1,2]]]);
//# sourceMappingURL=main.3f6d9ffc.chunk.js.map