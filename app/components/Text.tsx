import * as React from "react";

import styled from "styled-components";

type State = {
    id: String;
    content: string;
};

type Props = {
    id: string
}

export default class Text extends React.Component<Props, any> {
    state: State = {
        id: "",
        content: ""
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            id: props.id,
            content: "Hello I am text annotation, pleased to meet you."
        }
    }

    componentDidMount() {

    }


  render() {
    const { content } = this.state;

    return (
        <TextStyle>
            <p>{content}</p>
        </TextStyle>
    );
  }
}

const TextStyle = styled.div`
    background: white;
    position: absolute;
    z-index: 3;
    border: solid;
    border-radius: 12px;
`;
