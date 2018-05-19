import * as React from "react";
import { ReactReader } from "react-reader";

import styled from "styled-components";

type State = {
  path: string;
  location: string;
};

export default class ReaderView extends React.Component {
  state: State = {
    path: "../Harry_Potter_and_the_Sorcerers_Stone-Rowling.epub",
    location: "epubcfi(/6/2[cover]!/4/1:0)"
  };

  updateLocation = (epubcifi: string): void => {
    this.setState({ location: epubcifi });
  };

  renditionLoaded = (rendition: any): void => {
    rendition.hooks.render.register(this.updateAnnotations);
  };

  updateAnnotations = (contents: any, view: any): void => {
    console.log(contents.contents.content);
  };

  render() {
    const { path, location } = this.state;

    return (
      <ContentView>
        <ReactReader
          url={path}
          location={location}
          locationChanged={(epubcifi: string) => this.updateLocation(epubcifi)}
          getRendition={(rendition: any) => this.renditionLoaded(rendition)}
        />
      </ContentView>
    );
  }
}

const ContentView = styled.div`
  background: white;
  color: black;
  width: 30em;
  height: 100%;
  position: relative;
`;
