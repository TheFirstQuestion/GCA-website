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
          <Route
            path="/page/:pageNum/:qualtricsUserId/"
            render={(props) => <Pool {...props} />}
          />
          <Route path="/admin" render={(props) => <Admin {...props} />} />
        </HashRouter>
      </div>
    );
  }
}
