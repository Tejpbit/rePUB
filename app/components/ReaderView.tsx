import * as React from "react";
import {Link} from "react-router-dom";
import {Full} from "../containers/HomePage";
import styled from "styled-components";
import { ReactReader, ReactReaderStyle } from "react-reader";
import { Annotation } from "../backend";

import TextAnnotation from "./Text";

type ReaderState = {
  path: string;
  location: string;
  collectionID?: string;
  currentId: string;
  x: number;
  y: number;
};

function getCollectionId(): any {
  let lastSlash = window.location.href.lastIndexOf('/');
  if (lastSlash == -1) {
    return null
  }

  return window.location.href.substr(lastSlash+1);
};

type ReaderProps = {
  annotations: Annotation[];
};

type EpubcifiParse = {
  node: Node;
  wordIndex: number;
};


export default class ReaderView extends React.Component<ReaderProps, ReaderState> {
  state: ReaderState = {
    path: "../Harry_Potter_and_the_Sorcerers_Stone-Rowling.epub",
    location: "epubcfi(/6/14[text6]!/4/4/1:0)", // epubcfi(/6/2[cover]!/4/1:0)",
    collectionID: getCollectionId(),
    currentId: "",
    x: 0,
    y: 0
  };



  updateLocation = (epubcifi: string): void => {
    this.setState({ location: epubcifi });
  };

  renditionLoaded = (rendition: any): void => {
    rendition.hooks.content.register(this.updateAnnotations);
  };

  onHover = (id: string, event: PointerEvent): void => {
    this.setState({currentId: id, x: event.pageX + 55, y: event.pageY + 70});
    console.log(id);
  };

  updateAnnotations = (contents: any, view: any): void => {
    // const { annotations } = this.props;
    const annotations: Annotation[] = [
      {
        id: "1",
        type: "text",
        resource: "",
        location: {
          start: "/6/14[text6]!/9/1/4",
          end: ""
        }
      }
    ];

    const cfiBase: string = contents.cfiBase;

    this.divvifyContent(contents.content);

    for (let annotation of annotations) {
      const epubcifiParse = this.parseEpubcfiToData(
        cfiBase,
        annotation.location.start,
        contents.content
      );
      if (epubcifiParse === null) {
        continue;
      }
      this.createAnnotation(epubcifiParse, annotation.id);
    }
  };

  parseEpubcfiToData = (
    cfiBase: string,
    epubcifi: string,
    content: Node
  ): EpubcifiParse | null => {
    if (epubcifi.includes(cfiBase)) {
      const loc: string = epubcifi.replace(cfiBase + "!", "");
      const indicies: string[] = loc.split("/");

      let currentNode: Node = content;
      for (let i = 0; i < indicies.length - 1; i++) {
        if (indicies[i] == "") {
          continue;
        }
        const index: number = parseInt(indicies[i]);
        if (currentNode.childNodes.length > index) {
          currentNode = currentNode.childNodes[index];
        }
      }

      const wordIndex = parseInt(indicies[indicies.length - 1]);

      const parsed: EpubcifiParse = {
        node: currentNode,
        wordIndex
      };
      return parsed;
    } else {
      return null;
    }
  };

  createAnnotation = (epubcifiParse: EpubcifiParse, id: string): void => {
    const { node, wordIndex } = epubcifiParse;

    const annotationChild: Element = node.childNodes[wordIndex] as Element;
    annotationChild.setAttribute(
      "style",
      "display: inline; background: #dccccc; cursor: pointer;"
    );
    annotationChild.onpointerenter = (event: any) => this.onHover(id, event);
    annotationChild.onpointerleave = () => {this.setState({currentId: "", x: 0, y: 0})};
  };

  divvifyContent = (node: Node): void => {
    for (let i = 0; i < node.childNodes.length; i++) {
      const childNode = node.childNodes[i];
      if (childNode.nodeName === "#text") {
        this.divvifyText(childNode, node);
      } else {
        this.divvifyContent(childNode);
      }
    }
  };

  divvifyText = (node: Node, parent: Node): void => {
    let newNode: Node = document.createElement("div");
    const data = node.nodeValue;
    if (data === null) {
      return;
    }
    const words = data.split(" ");
    for (let word of words) {
      let childNode: Element = document.createElement("div");
      childNode.setAttribute("style", "display: inline");
      childNode.innerHTML = word + " ";
      newNode.appendChild(childNode);
    }

    parent.replaceChild(newNode, node);
  };

  render() {
    // ReactReaderStyle;
    ReactReaderStyle["annotation:hover"] = {
      transform: "scale(1.1)"
    };
    ReactReaderStyle["inline"] = {
      display: "inline"
    };
    ReactReaderStyle["height"] = "5em";

    console.log(collectionID);
    const { path, location, collectionID, currentId, x, y} = this.state;
    return (
      <Full>
          {currentId.length > 0 && <TextAnnotation id = {currentId } x = {x} y = {y}/>}
        <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
        </Link>
        <ContentView>
          <ReactReader
            url={path}
            location={location}
            styles={ReactReaderStyle}
            locationChanged={(epubcifi: string) => this.updateLocation(epubcifi)}
            getRendition={(rendition: any) => this.renditionLoaded(rendition)}
          />
        </ContentView>
      </Full>
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