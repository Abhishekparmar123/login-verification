import React from "react";
import ReactDOM from "react-dom";
// react library for routing
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
import 'bulma/css/bulma.min.css';

import IndexView from './App';
import Dashboard from './pages/Dashboard'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/dashboard" render={(props) => <Dashboard {...props} />} />
      <Route path="/" render={(props) => <IndexView {...props} />} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);