import * as React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";

import Home from "../components/Home";

export class HomePage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <Full>
        <Home />
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
