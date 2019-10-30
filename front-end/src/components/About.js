import React, { Component } from "react"
import Container from "react-bootstrap/Container"

const hostname = process.env.HOSTNAME || "127.0.0.1:8080";

class About extends Component {
	render() {
		return (
			<Container>
				<h3>This is no longer a stand-in for actual GET functionality.</h3>
				<p>Actual informational content will go here (at some point).</p>
			</Container>
		)
	}
}

export default About