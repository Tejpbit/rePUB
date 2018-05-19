import * as React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";

import ReaderView from "../components/ReaderView";

export class HomePage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <Full>
        <ReaderView />
      </Full>
    );
  }
}

export default (HomePage as any) as React.StatelessComponent<
  RouteComponentProps<any>
>;

const Full = styled.div`
  height: 100%;
`;
