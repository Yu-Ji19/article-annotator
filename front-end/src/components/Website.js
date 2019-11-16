import React, { Component } from "react"
import Container from "react-bootstrap/Container"

class Website extends Component {

	render() {
		return (
			<Container>	
				<p>{this.props.content}</p>
			</Container>
		)
	}
}

export default Website

