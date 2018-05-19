import * as React from "react";
import styled from "styled-components";

type State = {
  content: string;
};

type Props = {
  location: string;
  word: string;
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
  };

  render() {
    const { location, word } = this.props;
    const { content } = this.state;
    return (
      <Container>
        <TextField>{word}</TextField>
        <InputField onChange={this.handleAnnotationEdit} value={content} />
        <SaveButton
          onClick={() => this.handleSaveAnnotation(location, content, word)}
        >
          {"Save the annotation"}
        </SaveButton>
      </Container>
    );
  }
}

export default NewAnnotationView;

const Container = styled.div`
  height: 16em;
  background: #ffffff;
  margin: 1em;
  border-radius: 2em;

  display: flex;
  flex-flow: column;
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
`;

const SaveButton = styled.div`
  height: 1em;
  border-radius: 1px;
  background: #09ac09;
  margin: 1em;
  padding: 0.5em;
  cursor: pointer;
`;
