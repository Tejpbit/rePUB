import * as React from "react";
import {RouteComponentProps} from "react-router";
import styled from "styled-components";
import backend, {Collection} from '../backend';

import Home from "../components/Home";

type State = {
  collections: Collection[]
}

export class HomePage extends React.Component<RouteComponentProps<any>, any> {

  state: State = {
    collections: []
  };

  componentWillMount() {
    backend.getAllCollections().then((collections: Collection[]) => {
      this.setState({
          collections
      })
    });
  }



  render() {
    const {collections} = this.state;
    console.log("plz collections", collections);
    return (
      <Full>
        <Home collections={collections} />

      </Full>
    );
  }
}

export default (HomePage as any) as React.StatelessComponent<
  RouteComponentProps<any>
>;

export const Full = styled.div`
  height: 100%;
`;
