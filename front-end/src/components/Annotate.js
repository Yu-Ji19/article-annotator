import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

import Collaborators from './Collaborators'
import Share from './Share'
import Website from './Website'

class Annotate extends Component {
  state= {
    annotateOn: true
  }

  handleClick(e) {
    if(this.state.annotateOn === true){
      this.setState({annotateOn: false})
    }else{
      this.setState({annotateOn: true})
    }
  }


  render() {

    if(this.state.annotateOn === true){
      return (
        <Container>
          <div style={{position:'absolute',left:'10px'}}>
            <div>
              <Share  />
              <br></br>
            </div>
            
            <div style={{width: 1100, height: 1000, borderStyle: 'solid', borderWidth: 'thin'}}>
              <Website />
            </div>
          </div>
  
          
          <div style={{position: 'absolute', right: '0px'}}>
            <div>
              <h1>Collaborators</h1>
              <Collaborators  />
              <br></br>
            </div>
          
            
            <Button
                variant="secondary"
                onClick={(e) => this.handleClick()}
              >
                Annotate On/Off
              </Button>
            
            <div >
              <h1>Annotations</h1>
              <div style={{width: 300, height: 800, borderStyle: 'solid', borderWidth: 'thin'}}>
                  Annotations go here
              </div>
            </div>
          
  
          </div>
          
        </Container>
      )
    }  
    else{
      return (
        <Container>
  
          <div style={{position:'absolute',left:'10px'}}>
            <div>
              <Share  />
              <br></br>
            </div>
            
            <div style={{width: 1100, height: 1000, borderStyle: 'solid', borderWidth: 'thin'}}>
              <Website />
            </div>
          </div>
  
          
          <div style={{position: 'absolute', right: '0px'}}>
            <div>
              <h1>Collaborators</h1>
              <Collaborators  />
              <br></br>
            </div>
  
            <Button
                variant="secondary"
                onClick={(e) => this.handleClick()}
              >
                Annotate On/Off
              </Button>
  
          </div>   
        </Container>
      )
    }
  }
}

export default Annotate