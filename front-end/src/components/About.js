import React, { Component, Fragment } from "react"
import URLList from "./URLList"


class About extends Component {
  state = {
    urls: []
  }

  componentDidMount() {
    // Yu Ji fixed the call back and state setting
    fetch('http://backend-jiyu2.cloudapps.unc.edu/api/workspace/0').then((res) => {
      res.json().then((json)=>{
        this.setState({urls: json});
      });
    });
  }

  render() {
    return (
      <Fragment>
        <h3>This is a stand-in for actual GET functionality.</h3>
        <URLList urls={this.state.urls} />
      </Fragment>
    )
  }
}

export default About