import React, { Component, Fragment } from "react"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

class Annotation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			content: props.content,
			finished: props.finished,
			workspace: props.workspace,
			id: props.id,
			color:props.color
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
		this.props.finishAnnotation(this.state);
		this.setState({
			finished: true
		})
	}

	render() {
		const content = this.state.finished ?
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
			<Container style={style} id={this.state.id}>
				<h5>{this.state.name}</h5>
				{content}
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