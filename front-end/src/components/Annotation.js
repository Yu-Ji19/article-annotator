import React, { Component, Fragment } from "react"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const hostname = process.env.HOSTNAME || "http://localhost:8080";

class Annotation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			content: props.content,
			finished: props.finished
		}
		this.handleChange = this.handleChange.bind(this);
	}


	handleChange(e) {
		this.setState({
			name: this.state.name,
			content: e.target.value,
			finished: this.state.finished
		});
	}

	submitAnnotation() {
		fetch(hostname + '/api/annotation/insert', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				url_id: this.props.id,
				name: this.state.name,
				date: 'now',
				content: this.state.content
			})
		}).then((response) => {
			this.setState({
				name: this.state.name,
				content: this.state.content,
				finished: true
			})
		});
		this.props.finishAnnotation();
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