import * as React from "react";

import styled from "styled-components";
import { Annotation } from "../backend";

type Props = {
    x: number;
    y: number;
    annotation: Annotation;
};

type TextStyleProps = {
    x: number;
    y: number;
};

export default class AnnotationView extends React.Component<Props, any> {
    renderContentType = (annotation: Annotation) => {
        switch (annotation.type) {
            case "image":
                return <img src={annotation.resource} width="300px" />;
            default:
                return annotation.resource;
        }
    };

    render() {
        const { x, y, annotation } = this.props;
        return (
            <TextStyle x={x} y={y}>
                {this.renderContentType(annotation)}
            </TextStyle>
        );
    }
}

const TextStyle = styled.div`
    position: absolute;
    color: white;
    z-index: 3;
    padding: 3px;
    border-radius: 2px;
    margin: 4px;
    line-height: 1.2em;
    max-width: 22em;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    background: hsla(0, 0%, 15%, 0.85);
    left:  ${(props: TextStyleProps) => props.x}px;
    top: ${(props: TextStyleProps) => props.y}px;
    font-family: Lato;
    font-size: 16px;
    transition: all 500ms;
`;
