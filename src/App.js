import React, {useState} from 'react';
import Resume from './Resume';
import './App.css';
import { CSVLink, CSVDownload } from 'react-csv';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            csvData: [],
        };
    }

    _onMouseMove(e) {
        this.setState({x: e.screenX, y: e.screenY});
        let time = new Date().toLocaleString();
        console.log(time);
        let x = e.clientX;// - e.target.offsetLeft
        let y = e.clientY;// - e.target.offsetTop
        console.log("x: " + x + " y: " + y)
        let newObj = [time, x, y]
        this.setState({csvData: [...this.state.csvData, newObj]})
    }

    render() {
        return (
            <div className="App" onMouseMove={this._onMouseMove.bind(this)}> 
                <Resume/>
                {/*<CSVLink data={this.state.csvData} filename={this.state.csv_filename}>Download CSV</CSVLink>*/}
            </div>
        );
    }
}

export default App;
