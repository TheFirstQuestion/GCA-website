import React, {useState} from 'react';
import Resume from './Resume';
import PracticeResume from './PracticeResume';
import './App.css';
import { CSVLink, CSVDownload } from 'react-csv';
import { HashRouter, Route, Link } from 'react-router-dom';
import Admin from './Admin';

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
                    path='/1w4m'
                    render={(props) => (
                        <Resume {...props}  page={1} women={1} men={4}/>
                    )}
                />
                <Route 
                    path='/2w3m'
                    render={(props) => (
                        <Resume {...props}  page={1} women={2} men={3}/>
                    )}
                />
                <Route 
                    path='/3w2m'
                    render={(props) => (
                        <Resume {...props}  page={1} women={3} men={2}/>
                    )}
                />
                <Route 
                    path='/4w1m'
                    render={(props) => (
                        <Resume {...props}  page={1} women={4} men={1}/>
                    )}
                />
                <Route 
                    path='/page2'
                    render={(props) => (
                        <Resume {...props} page={2}/>
                    )}
                />
                <Route 
                    path='/admin'
                    render={(props) => (
                        <Admin {...props} />
                    )}
                />
            </HashRouter>
            </div>
        );
    }
}

export default App;
