import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Admin from "./Admin";
import Pool from "./Pool";
import "./styles/GlobalStyles.css";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          {/* my new format */}
          <Route
            path="/page/:pageNum/:qualtricsUserId/"
            render={(props) => <Pool {...props} />}
          />

          {/*pages: 2, 3, 4 and admin*/}
          <Route
            path="/page2/:qualtricsUserId"
            render={(props) => <Pool {...props} page={2} />}
          />
          <Route
            path="/page3/:qualtricsUserId"
            render={(props) => <Pool {...props} page={3} />}
          />
          <Route
            path="/page4/:qualtricsUserId"
            render={(props) => <Pool {...props} page={4} />}
          />
          <Route path="/admin" render={(props) => <Admin {...props} />} />
        </HashRouter>
      </div>
    );
  }
}
