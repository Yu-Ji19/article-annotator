import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

import Collaborators from './Collaborators'
import Share from './Share'
import Website from './Website'
import AnnotationList from './AnnotationList'

class Annotate extends Component {
  state = {
    annotateOn: true
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
        <div style={{ position: 'absolute', left: '10px' }}>
          <div>
            <Share />
            <br></br>
          </div>

          <div style={{ width: '65%', borderStyle: 'solid', borderWidth: 'thin' }}>
            <Website />
          </div>
        </div>


        <div style={{ position: 'absolute', right: '0px' }}>
          <div>
            <h1>Collaborators</h1>
            <Collaborators />
            <br></br>
          </div>


          <Button
            variant="secondary"
            onClick={(e) => this.handleClick()}
          >
            Annotate On/Off
              </Button>

          <div >
            <AnnotationList />
          </div>


        </div>

      </Container>
    )
  }
}

export default Annotate