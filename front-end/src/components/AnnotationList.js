import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

import Annotation from "./Annotation"

const hostname = process.env.HOSTNAME || "http://127.0.0.1:8080";

class AnnotationList extends Component {
	state = {
		annotations: []
	}

	componentDidMount() {
		fetch(hostname + '/api/annotation/all/' + this.props.id, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json().then(data => {
			console.log(data);
			this.setState({
				annotations: data.map(v => ({...v, finished: true}))
			});
		})
		);
	}

	createAnnotation() {
		this.setState({
			annotations: [...this.state.annotations, {
				id: this.props.id,
				key: "temporary",
				name: "Mysterio",
				content: "",
				finished: false
			}]
		})
	}

	render() {
		return (
			<Container>
				<Button
					variant="secondary"
					onClick={(e) => this.createAnnotation()}
				>
					Create Annotation
				</Button>
				{this.state.annotations.map((annotation) => 
					<Annotation 
						id={this.props.id}
						key={annotation._id}
						name={annotation.name}
						content={annotation.content}
						finished={annotation.finished}
					/>
				)}
			</Container>
		);
	}
}

export default AnnotationList