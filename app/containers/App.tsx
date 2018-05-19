import * as React from "react";
import styled from "styled-components";

export default class App extends React.Component {
  render() {
    return <Full>{this.props.children}</Full>;
  }
}

const Full = styled.div`
  height: 100%;
`;
