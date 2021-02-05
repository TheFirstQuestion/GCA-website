import React, {useState} from 'react';
import Resume from './Resume';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="App">
                <Resume/>
            </div>
        );
    }
}

export default App;
