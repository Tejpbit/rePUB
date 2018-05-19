import * as React from "react";
import styled from "styled-components";

type State = {
  content: string;
};

type Props = {
  location: string;
  word: string;
  onCreateAnnotation: (location: string, content: string) => void;
};

export class NewAnnotationView extends React.Component<Props, State> {
  state: State = {
    content: ""
  };

  handleAnnotationEdit = (event: any): void => {
    this.setState({ content: event.target.value });
  };

  handleSaveAnnotation = (
    location: string,
    content: string,
    word: string
  ): void => {
    console.log(location);
    console.log(content);
    console.log(word);
    this.setState({ content: "" });
    this.props.onCreateAnnotation(location, content);
  };

  render() {
    const { location, word } = this.props;
    const { content } = this.state;

    const opacity = word === "" ? 0 : 1;
    return (
      <Container opacity={opacity}>
        <TextField>{"Annotate"} <Cursive>{word}</Cursive></TextField>
        <InputField
          onKeyPress={this.handleAnnotationEdit}
          onChange={this.handleAnnotationEdit}
          value={content}
        />
        <SaveButton
          onClick={() => this.handleSaveAnnotation(location, content, word)}
        >
          {"Save annotation"}
        </SaveButton>
      </Container>
    );
  }
}

export default NewAnnotationView;

type ContainerProps = {
  opacity: number;
};

const Container = styled.div`
  height: 16em;
  background: #ffffff;
  margin: 1em;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);

  display: flex;
  flex-flow: column;
  transition: opacity 500ms;

  opacity: ${(props: ContainerProps) => props.opacity};
  margin-top: 3em;
`;

const InputField = styled.textarea`
  font-size: 1em;
  flex: 1;
  padding: 1rem;

  &:focus {
    outline: 0;
  }
`;

const TextField = styled.div`
  font-size: 1.25em;
  font-weight: bold;
  color: #333333;
  padding-top: 0.5em;
  padding-left: 1em;
  margin-bottom: 0.4em;
`;

const SaveButton = styled.div`
  height: 1em;
  border-radius: 1px;
  background: #09ac09;
  margin: 0.4em;
  padding: 0.5em;
  cursor: pointer;
  font-weight: 800;
  color: #ffffff;

  display: flex;
  justify-content: center;
`;

const Cursive = styled.div`
  font-family: Lato;
  font-style: italic;
  display: inline;
`;
