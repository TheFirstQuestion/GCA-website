import React, {useState} from 'react';
import Resume from './Resume';
import './App.css';
import { CSVLink, CSVDownload } from 'react-csv';
import { HashRouter, Route, Link } from 'react-router-dom';
import { AppBar } from '@material-ui/core';

const App = () => (
    <HashRouter className="overall">
        <div className="overall">
            <div className="app">
                <Route 
                    path='/v1'
                    render={(props) => (
                        <Resume {...props} studyVersion={1} />
                    )}
                />
                <Route 
                    path='/v2'
                    render={(props) => (
                        <Resume {...props} studyVersion={2} />
                    )}
                />
                <Route 
                    path='/v3'
                    render={(props) => (
                        <Resume {...props} studyVersion={3} />
                    )}
                />
            </div>
        </div>
    </HashRouter>
);

export default App;

/*class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            mouseData: [],
        };
    }

    _onMouseMove(e) {
        var options = { hour12: false };

        this.setState({x: e.screenX, y: e.screenY});
        let time = new Date().toLocaleString('en-US', options);
        //console.log(time);
        let x = e.clientX;// - e.target.offsetLeft
        let y = e.clientY;// - e.target.offsetTop
        //console.log("x: " + x + " y: " + y)
        let newObj = [time, x, y]
        this.setState({mouseData: [...this.state.mouseData, newObj]})
    }

    render() {
        return (
            <div className="App" onMouseMove={this._onMouseMove.bind(this)}> 
                <Resume/>
            </div>
        );
    }
}

export default App;*/
