import React, {useState} from 'react';
import Resume from './Resume';
import PracticeResume from './PracticeResume';
import ReadData from './ReadData';
import './App.css';
import { CSVLink, CSVDownload } from 'react-csv';
import { HashRouter, Route, Link } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
            <HashRouter>
                <Route 
                    path='/v1r1m'
                    render={(props) => (
                        <Resume {...props} studyVersion={1} resumeVersion={1} gender={"male"}/>
                    )}
                />
                <Route 
                    path='/v1r1f'
                    render={(props) => (
                        <Resume {...props} studyVersion={1} resumeVersion={1} gender={"female"}/>
                    )}
                />
                <Route 
                    path='/v1r2'
                    render={(props) => (
                        <Resume {...props} studyVersion={1} resumeVersion={2}/>
                    )}
                />
                <Route 
                    path='/v2r1m'
                    render={(props) => (
                        <Resume {...props} studyVersion={2} resumeVersion={1} gender={"male"}/>
                    )}
                />
                <Route 
                    path='/v2r1f'
                    render={(props) => (
                        <Resume {...props} studyVersion={2} resumeVersion={1} gender={"female"}/>
                    )}
                />
                <Route 
                    path='/v2r2'
                    render={(props) => (
                        <Resume {...props} studyVersion={2} resumeVersion={2}/>
                    )}
                />
                <Route 
                    path='/v3r1m'
                    render={(props) => (
                        <Resume {...props} studyVersion={3} resumeVersion={1} gender={"male"}/>
                    )}
                />
                <Route 
                    path='/v3r1f'
                    render={(props) => (
                        <Resume {...props} studyVersion={3} resumeVersion={1} gender={"female"}/>
                    )}
                />
                <Route 
                    path='/v3r2'
                    render={(props) => (
                        <Resume {...props} studyVersion={3} resumeVersion={2}/>
                    )}
                />
                <Route 
                    path='/practice'
                    render={(props) => (
                        <PracticeResume {...props} />
                    )}
                />
                <Route 
                    path='/admin_activity+resume'
                    render={(props) => (
                        <ReadData {...props} displayingMouse={false}/>
                    )}
                />
                <Route 
                    path='/admin_mouse'
                    render={(props) => (
                        <ReadData {...props} displayingMouse={true}/>
                    )}
                />
            </HashRouter>
            </div>
        );
    }
}

export default App;
