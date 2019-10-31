import React, { Component, Fragment } from "react"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

class Annotation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "John",
			content: "i like this sentence because it's good",
			finished: props.finished
		}

		//this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			name: this.state.name,
			content: e.target.value,
			finished: this.state.finished
		});
	}

	submitAnnotation() {
		this.setState({
			name: this.state.name,
			content: this.state.content,
			finished: true
		});
	}

	render() {
		const text = this.state.finished ?
			<p>{this.state.content}</p> :
			<Fragment>
				<Form.Control
					as="textarea"
					rows="3"
					onChange={(e) => this.handleChange(e)}
				/>
				<Button
					variant="secondary"
					onClick={(e) => this.submitAnnotation()}
				>
					Submit
				</Button>
			</Fragment>

		return (
			<Container style={style}>
				<h5>{this.state.name}</h5>
				{text}
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