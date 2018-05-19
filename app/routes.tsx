import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import ReaderView from "./components/ReaderView";

export default () => (
  <App>
    <Switch>
      <Route path="/counter" component={CounterPage} />
      <Route path="/readerView" component={ReaderView} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
