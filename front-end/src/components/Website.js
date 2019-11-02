import React, { Component } from "react"
import Container from "react-bootstrap/Container"

class Website extends Component {


	render() {


		return (
			<Container>
				{this.props.content}
			</Container>
		)
	}
}

export default Website

