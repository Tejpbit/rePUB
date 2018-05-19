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
    position: absolute;
    z-index: 3;
    margin-left: 20px;
    padding-left: 10px;
    border-radius: 12px;
    box-shadow: 4px 4px 5px 0px rgba(50, 50, 50, 0.75);
    background: #e3f4e3;

    &:after {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-right-color: #e3f4e3;
	border-left: 0;
	border-top: 0;
	margin-top: -10px;
	margin-left: -20px;
}
`;
