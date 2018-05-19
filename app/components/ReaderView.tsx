import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactReader, ReactReaderStyle } from "react-reader";
import backend, { Annotation, Collection } from "../backend";
import { NewAnnotationView } from "./NewAnnotationView";

import TextAnnotation from "./Text";

type ReaderState = {
  path: string;
  location: string;
  collectionID: string;
  collection: Collection;
  currentId: string;
  x: number;
  y: number;
  newAnnotationProps: NewAnnotationProps;
  bookContents: any;
};

type NewAnnotationProps = {
  location: string;
  word: string;
};

function getCollectionId(): any {
  var lastSlash = window.location.href.lastIndexOf("/");
  if (lastSlash == -1) {
    return null;
  }

  return window.location.href.substr(lastSlash + 1);
}

type ReaderProps = {
  annotations: Annotation[];
};

type EpubcifiParse = {
  node: Node;
  wordIndex: number;
};

export class ReaderView extends React.Component<ReaderProps, ReaderState> {
  state: ReaderState = {
    path: "../Harry_Potter_and_the_Sorcerers_Stone-Rowling.epub",
    location: "epubcfi(/6/14[text6]!/4/4/1:0)", // epubcfi(/6/2[cover]!/4/1:0)",
    collectionID: getCollectionId(),
    collection: { id: "", title: "Empty collection", annotations: [] },
    currentId: "",
    x: 0,
    y: 0,
    newAnnotationProps: { location: "", word: "" },
    bookContents: null
  };

  componentWillMount() {
    backend
      .getCollection(this.state.collectionID)
      .then((collection: Collection) => {
        this.setState({
          collection
        });
      });
  }

  updateLocation = (epubcifi: string): void => {
    this.setState({ location: epubcifi });
  };

  renditionLoaded = (rendition: any): void => {
    rendition.hooks.content.register((content: any, view: any) => this.updateAnnotations(content, view, true));
  };

  onHover = (id: string, event: PointerEvent): void => {
    let text: string = this.state.collection.annotations[parseInt(id, 10) - 1]
      .resource;
    this.setState({
      currentId: text,
      x: event.pageX + 55,
      y: event.pageY + 70
    });
  };

  onCreateAnnotation = (location: string, content: string) => {
    const { collection } = this.state;

    const newAnnotation = {
      id: collection.annotations.length + 1 + "",
      type: "text",
      resource: content,
      location: {
        start: location,
        end: ""
      }
    };
    collection.annotations.push(newAnnotation);
    this.setState({
      newAnnotationProps: { location: "", word: "" }
    });
    this.updateAnnotations(this.state.bookContents, null, false);
  };

  onNewAnnotation = (wordCfi: string, word: string) => {
    const newAnnotationProps = {
      location: wordCfi,
      word
    };
    this.setState({
      newAnnotationProps: newAnnotationProps
    });
  };

  updateAnnotations = (contents: any, view: any, contentChanged: boolean): void => {
    const annotations = this.state.collection.annotations;
    const cfiBase: string = contents.cfiBase;

    if(contentChanged) {
        this.divvifyContent(contents.content, cfiBase);
        this.setState({bookContents: contents});
    }

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
      const loc: string = epubcifi.replace(cfiBase, "");
      const indicies: string[] = loc
        .split("/")
        .filter(s => s !== "" && s !== "!");

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
    annotationChild.onpointerleave = () => {
      this.setState({ currentId: "", x: 0, y: 0 });
    };
  };

  divvifyContent = (node: Node, cfi: string): void => {
    for (let i = 0; i < node.childNodes.length; i++) {
      const childNode = node.childNodes[i];
      const newCfi = cfi + "/" + i;
      if (childNode.nodeName === "#text") {
        this.divvifyText(childNode, node, newCfi);
      } else {
        this.divvifyContent(childNode, newCfi);
      }
    }
  };

  divvifyText = (node: Node, parent: Node, cfi: string): void => {
    let newNode: Node = document.createElement("div");
    const data = node.nodeValue;
    if (data === null) {
      return;
    }
    const words = data.split(" ");
    for (let i = 0; i < words.length; i++) {
      const wordCfi = cfi + "/" + i;
      const word = words[i];
      let childNode: Element = document.createElement("div");
      childNode.setAttribute("style", "display: inline; cursor: pointer;");
      childNode.onpointerdown = () => this.onNewAnnotation(wordCfi, word);
      childNode.innerHTML = word + " ";
      newNode.appendChild(childNode);
    }

    parent.replaceChild(newNode, node);
  };

  render() {
    const {
      path,
      location,
      newAnnotationProps,
      currentId,
      x,
      y
    } = this.state;
    return (
      <ReaderContainer>
        <div>
          {currentId.length > 0 &&
            <TextAnnotation content={currentId} x={x} y={y} />}
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
          <ContentView>
            <ReactReader
              url={path}
              location={location}
              styles={ReactReaderStyle}
              locationChanged={(epubcifi: string) =>
                this.updateLocation(epubcifi)}
              getRendition={(rendition: any) => this.renditionLoaded(rendition)}
            />
          </ContentView>
        </div>
        <NewAnnotationView
          location={newAnnotationProps.location}
          word={newAnnotationProps.word}
          onCreateAnnotation={this.onCreateAnnotation}
        />
      </ReaderContainer>
    );
  }
}

export default ReaderView;

const ReaderContainer = styled.div`
  display: flex;
  flex-flow: row;
  height: 100%;
  width: 50em;
`;

const ContentView = styled.div`
  background: white;
  color: black;
  width: 60em;
  height: 100%;
  position: relative;
`;
