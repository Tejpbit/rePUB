import * as React from "react";
import {RouteComponentProps} from "react-router";
import styled from "styled-components";
import backend, {Collection} from '../backend';

import Home from "../components/Home";
import {chain} from "lodash";

const fs = require("fs");

export type BookEntry = {
    path: string;
    title: string;
}


type State = {
  collections: Collection[]
  books: BookEntry[]
}

export class HomePage extends React.Component<RouteComponentProps<any>, any> {

  state: State = {
    collections: [],
    books: []
  };

  componentWillMount() {
    backend.getAllCollections().then((collections: Collection[]) => {
      this.setState({
          collections
      })
    });
      fs.readdir("./HarryPotter", (err: any, files: any) => {
          const books: BookEntry[] = chain(files)
              .filter((file: string) => file.split(".").pop() == "epub")
              .map((file: string) => ({
                  path: "../" + file,
                  title: file.split(".")[0]
              }))
              .value();

          this.setState({ books })
      });
  }



  render() {
    const {collections, books} = this.state;
    console.log("plz collections", collections);
    return (
      <Full>
        <Home collections={collections} books={books} />

      </Full>
    );
  }
}

export default (HomePage as any) as React.StatelessComponent<
  RouteComponentProps<any>
>;

export const Full = styled.div`
  height: 100%;
  width: 100%;
`;
