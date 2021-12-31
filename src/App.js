import React, {useState} from 'react';
import Resume from './Resume';
import PracticeResume from './PracticeResume';
import './App.css';
import { CSVLink, CSVDownload } from 'react-csv';
import { HashRouter, Route, Link } from 'react-router-dom';
import Admin from './Admin';
import { useParams } from "react-router-dom";

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
                {/*page 1 variations*/} 
                <Route 
                    path='/pool1/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'female_Emily R.', 'female_Sarah S.', 'male_Christopher P.']}/>
                    )}
                />
                <Route 
                    path='/pool2/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'female_Emily R.', 'female_Sarah S.', 'male_Daniel R.']}/>
                    )}
                />
                <Route 
                    path='/pool3/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'female_Emily R.', 'female_Sarah S.', 'male_Joshua F.']}/>
                    )}
                />
                <Route 
                    path='/pool4/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'female_Emily R.', 'female_Sarah S.', 'male_Matthew M.']}/>
                    )}
                />

                
                <Route 
                    path='/pool5/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'female_Emily R.', 'male_Christopher P.', 'male_Daniel R.']}/>
                    )}
                />
                <Route 
                    path='/pool6/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'female_Emily R.', 'male_Christopher P.', 'male_Joshua F.']}/>
                    )}
                />
                <Route 
                    path='/pool7/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'female_Emily R.', 'male_Christopher P.', 'male_Matthew M.']}/>
                    )}
                />

                <Route 
                    path='/pool8/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'female_Emily R.', 'male_Daniel R.', 'male_Joshua F.']}/>
                    )}
                />
                <Route 
                    path='/pool9/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'female_Emily R.', 'male_Daniel R.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool10/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'female_Emily R.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />

                <Route 
                    path='/pool11/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'female_Sarah S.', 'male_Christopher P.', 'male_Daniel R.']}/>
                    )}
                />
                <Route 
                    path='/pool12/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'female_Sarah S.', 'male_Christopher P.', 'male_Joshua F.']}/>
                    )}
                />
                <Route 
                    path='/pool13/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'female_Sarah S.', 'male_Christopher P.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool14/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'female_Sarah S.', 'male_Daniel R.', 'male_Joshua F.']}/>
                    )}
                />
                <Route 
                    path='/pool15/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'female_Sarah S.', 'male_Daniel R.', 'male_Matthew M.']}/>
                    )}
                />

                <Route 
                    path='/pool16/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'female_Sarah S.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool17/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Emily R.', 'female_Sarah S.', 'male_Christopher P.', 'male_Daniel R.']}/>
                    )}
                />
                <Route 
                    path='/pool18/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Emily R.', 'female_Sarah S.', 'male_Christopher P.', 'male_Joshua F.']}/>
                    )}
                />
                <Route 
                    path='/pool19/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Emily R.', 'female_Sarah S.', 'male_Christopher P.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool20/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Emily R.', 'female_Sarah S.', 'male_Daniel R.', 'male_Joshua F.']}/>
                    )}
                />

                <Route 
                    path='/pool21/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Emily R.', 'female_Sarah S.', 'male_Daniel R.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool22/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Emily R.', 'female_Sarah S.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool23/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Brittany L.', 'female_Emily R.', 'female_Sarah S.', 'male_Christopher P.', 'male_Daniel R.']}/>
                    )}
                />
                <Route 
                    path='/pool24/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Brittany L.', 'female_Emily R.', 'female_Sarah S.', 'male_Christopher P.', 'male_Joshua F.']}/>
                    )}
                />
                <Route 
                    path='/pool25/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Brittany L.', 'female_Emily R.', 'female_Sarah S.', 'male_Christopher P.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool26/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Brittany L.', 'female_Emily R.', 'female_Sarah S.', 'male_Daniel R.', 'male_Joshua F.']}/>
                    )}
                />
                <Route 
                    path='/pool27/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Brittany L.', 'female_Emily R.', 'female_Sarah S.', 'male_Daniel R.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool28/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Brittany L.', 'female_Emily R.', 'female_Sarah S.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />

                <Route 
                    path='/pool29/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'male_Christopher P.', 'male_Daniel R.', 'male_Joshua F.']}/>
                    )}
                />
                <Route 
                    path='/pool30/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'male_Christopher P.', 'male_Daniel R.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool31/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'male_Christopher P.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool32/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Brittany L.', 'male_Daniel R.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool33/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Emily R.', 'male_Christopher P.', 'male_Daniel R.', 'male_Joshua F.']}/>
                    )}
                />
                <Route 
                    path='/pool34/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Emily R.', 'male_Christopher P.', 'male_Daniel R.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool35/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Emily R.', 'male_Christopher P.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool36/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Emily R.', 'male_Daniel R.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />

                <Route 
                    path='/pool37/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Sarah S.', 'male_Christopher P.', 'male_Daniel R.', 'male_Joshua F.']}/>
                    )}
                />
                <Route 
                    path='/pool38/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Sarah S.', 'male_Christopher P.', 'male_Daniel R.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool39/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Sarah S.', 'male_Christopher P.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool40/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'female_Sarah S.', 'male_Daniel R.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />

                <Route 
                    path='/pool41/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Brittany L.', 'female_Emily R.', 'male_Christopher P.', 'male_Daniel R.', 'male_Joshua F.']}/>
                    )}
                />
                <Route 
                    path='/pool42/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Brittany L.', 'female_Emily R.', 'male_Christopher P.', 'male_Daniel R.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool43/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Brittany L.', 'female_Emily R.', 'male_Christopher P.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool44/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Brittany L.', 'female_Emily R.', 'male_Daniel R.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />

                <Route 
                    path='/pool45/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Brittany L.', 'female_Sarah S.', 'male_Christopher P.', 'male_Daniel R.', 'male_Joshua F.']}/>
                    )}
                />
                <Route 
                    path='/pool46/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Brittany L.', 'female_Sarah S.', 'male_Christopher P.', 'male_Daniel R.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool47/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Brittany L.', 'female_Sarah S.', 'male_Christopher P.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool48/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Brittany L.', 'female_Sarah S.', 'male_Daniel R.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />

                <Route 
                    path='/pool49/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Emily R.', 'female_Sarah S.', 'male_Christopher P.', 'male_Daniel R.', 'male_Joshua F.']}/>
                    )}
                />
                <Route 
                    path='/pool50/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Emily R.', 'female_Sarah S.', 'male_Christopher P.', 'male_Daniel R.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool51/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Emily R.', 'female_Sarah S.', 'male_Christopher P.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool52/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Emily R.', 'female_Sarah S.', 'male_Daniel R.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />

                <Route 
                    path='/pool53/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Ashley G.', 'male_Christopher P.', 'male_Daniel R.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool54/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Brittany L.', 'male_Christopher P.', 'male_Daniel R.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool55/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Emily R.', 'male_Christopher P.', 'male_Daniel R.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />
                <Route 
                    path='/pool56/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props}  page={1} namesArray={['female_Sarah S.', 'male_Christopher P.', 'male_Daniel R.', 'male_Joshua F.', 'male_Matthew M.']}/>
                    )}
                />
                
                {/*pages: 2, 3, 4 and admin*/}
                <Route 
                    path='/page2/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props} page={2}/>
                    )}
                />
                <Route 
                    path='/page3/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props} page={3}/>
                    )}
                />
                <Route 
                    path='/page4/:qualtricsUserId'
                    render={(props) => (
                        <Resume {...props} page={4}/>
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
