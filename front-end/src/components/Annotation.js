import React, { Component } from "react"
import Container from "react-bootstrap/Container"

class Annotation extends Component {
	state = {
		name: "John",
		content: "i like this sentence because it's good"
	}

	render() {
		return (
			<Container style={style}>
				Test text here!
			</Container>
		);
	}
}

const style = {
	border: "2px solid grey",
	borderRadius: "5px",
	margin: "25px"
}

export default Annotation