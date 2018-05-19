import * as React from "react";
import { RouteComponentProps } from "react-router";

import ReaderView from "../components/ReaderView";
import Home from "../components/Home";

export class HomePage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <div>
        <Home />
        <ReaderView />
      </div>
    );
  }
}

export default (HomePage as any) as React.StatelessComponent<
  RouteComponentProps<any>
>;
