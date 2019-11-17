import React, { Component } from "react"
import Container from "react-bootstrap/Container"

class Website extends Component {

	render() {
		const content = this.props.content;
		return (
			<div className="content" dangerouslySetInnerHTML={{__html: content}}></div>
		)
	}
}

export default Website

