import * as React from "react";

const fs = require("fs");

import styled from 'styled-components';

type State = {
  content: string;
}

export default class ReaderView extends React.Component {
  state: State = {
    content: ""
  };

  componentDidMount() {
    fs.readFile("/Users/tejp/headers", {encoding: "UTF-8"},(err: Error, data: Buffer) => {
      if (err) {
        throw err;
      } else {
        this.setState({
          content: data
        });
      }
    });
  }

  render() {
    const { content } = this.state;

    return <ContentView>{content}</ContentView>;
  }
}

const ContentView = styled.div`
  background: white;
  color: black;
  width: 30em;
  height
`;