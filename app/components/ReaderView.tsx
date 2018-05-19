import * as React from "react";
import styled from "styled-components";
import { ReactReader, ReactReaderStyle } from "react-reader";
import { IState } from "../reducers";
import { bindActionCreators } from "redux";
import { connect, Dispatch } from "react-redux";
import * as CounterActions from "../actions/counter";
import { Annotation } from "../backend";

type ReaderState = {
  path: string;
  location: string;
};

type ReaderProps = {
  annotations: Annotation[];
};

type EpubcifiParse = {
  node: Node;
  wordIndex: number;
};

function mapStateToProps(state: IState): Partial<any> {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<any> {
  return bindActionCreators(CounterActions as any, dispatch);
}

class ReaderView extends React.Component<ReaderProps, ReaderState> {
  state: ReaderState = {
    path: "../Harry_Potter_and_the_Sorcerers_Stone-Rowling.epub",
    location: "epubcfi(/6/14[text6]!/4/4/1:0)" // epubcfi(/6/2[cover]!/4/1:0)"
  };

  updateLocation = (epubcifi: string): void => {
    this.setState({ location: epubcifi });
  };

  renditionLoaded = (rendition: any): void => {
    rendition.hooks.content.register(this.updateAnnotations);
  };

  onHover = (id: string): void => {
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
    annotationChild.onpointerenter = () => this.onHover(id);
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
    const { path, location } = this.state;

    // ReactReaderStyle;
    ReactReaderStyle["annotation:hover"] = {
      transform: "scale(1.1)"
    };
    ReactReaderStyle["inline"] = {
      display: "inline"
    };
    ReactReaderStyle["height"] = "5em";

    return (
      <ContentView>
        <ReactReader
          url={path}
          location={location}
          styles={ReactReaderStyle}
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

export default (connect(mapStateToProps, mapDispatchToProps)(
  ReaderView
) as any) as React.StatelessComponent<any>;
