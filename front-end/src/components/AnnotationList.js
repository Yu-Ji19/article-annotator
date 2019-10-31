import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

import Annotation from "./Annotation"

class AnnotationList extends Component {
	state = {
		annotations: [
			<Annotation finished={true}/>,
			<Annotation finished={true}/>,
			<Annotation finished={true}/>
		]
	}

	createAnnotation(){
		this.setState({
			annotations: [...this.state.annotations, <Annotation finished={false}/>]
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
				{this.state.annotations.map((annotation) => (annotation))}
			</Container>
		);
	}
}

export default AnnotationList