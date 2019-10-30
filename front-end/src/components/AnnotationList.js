import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Annotation from "./Annotation"

class AnnotationList extends Component {
    render() {
        return (
            <Container>
                <Annotation />
                <Annotation />
                <Annotation />
                <Annotation />
                <Annotation />
            </Container>
        );
    }
}

export default AnnotationList