import * as React from "react";

import styled from "styled-components";
import {Annotation} from "../backend";

type Props = {
    x: number;
    y: number;
    annotation: Annotation;
}

type TextStyleProps = {
    x: number;
    y: number;
}

export default class AnnotationView extends React.Component<Props, any> {

    renderContentType = (annotation: Annotation) =>  {
        switch (annotation.type) {

            case "image": return <img src={annotation.resource}/>;
            default: return <p>{annotation.resource}</p>;

        }
    };

  render() {
    const {x, y, annotation} = this.props;
    return (
        <TextStyle x = {x} y = {y}>
            {this.renderContentType(annotation)}
        </TextStyle>
    );
  }
}



const TextStyle = styled.div`
    position: absolute;
    color: black;
    z-index: 3;
    margin-left: 20px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 12px;
    box-shadow: 4px 4px 5px 0px rgba(50, 50, 50, 0.75);
    background: #e3f4e3;
    left:  ${(props: TextStyleProps) => props.x}px;
    top: ${(props: TextStyleProps)=> props.y}px;

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
