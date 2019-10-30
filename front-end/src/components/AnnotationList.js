import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Annotation from "./Annotation"

class AnnotationList extends Component {
    state = {
        name: "John",
        content: "i like this sentence because it's good"
    }

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