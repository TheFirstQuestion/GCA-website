import React from "react";
import Resume from "./Resume";
import ReadData from "./ReadData";
import "./App.css";
import { HashRouter, Route } from "react-router-dom";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<HashRouter>
					<Route
						path="/v1r1"
						render={(props) => (
							<Resume {...props} studyVersion={1} resumeVersion={1} />
						)}
					/>
					<Route
						path="/v1r2"
						render={(props) => (
							<Resume {...props} studyVersion={1} resumeVersion={2} />
						)}
					/>
					<Route
						path="/v2r1"
						render={(props) => (
							<Resume {...props} studyVersion={2} resumeVersion={1} />
						)}
					/>
					<Route
						path="/v2r2"
						render={(props) => (
							<Resume {...props} studyVersion={2} resumeVersion={2} />
						)}
					/>
					<Route
						path="/v3r1"
						render={(props) => (
							<Resume {...props} studyVersion={3} resumeVersion={1} />
						)}
					/>
					<Route
						path="/v3r2"
						render={(props) => (
							<Resume {...props} studyVersion={3} resumeVersion={2} />
						)}
					/>

					<Route path="/admin" render={(props) => <ReadData />} />
				</HashRouter>
			</div>
		);
	}
}

export default App;
