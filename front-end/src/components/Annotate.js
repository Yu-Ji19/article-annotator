import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import Collaborators from './Collaborators'
import Share from './Share'
import Website from './Website'
import AnnotationList from './AnnotationList'

class Annotate extends Component {
  state = {
    annotateOn: true,
    legacy: false,
  }

  handleClick(e) {
    if (this.state.annotateOn === true) {
      this.setState({ annotateOn: false })
    } else {
      this.setState({ annotateOn: true })
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={8}>
            <Share />
          </Col>
          <Col xs={4}>
            <Collaborators />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <Website />
          </Col>
          <Col xs={4}>
            <AnnotationList />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Annotate