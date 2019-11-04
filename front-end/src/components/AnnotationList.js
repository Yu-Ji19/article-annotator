import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

import Annotation from "./Annotation"


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
		const annotations = this.props.annotations? 
		<Container>
			{this.props.annotations.map((annotation) => 
				<Annotation 
					id={this.props.id}
					key={annotation._id}
					name={annotation.name}
					content={annotation.content}
					finished={annotation.finished}
					finishAnnotation={this.props.finishAnnotation}
				/>
			)}
		</Container> 
		:
		<Container/>
		return (
			
			<Container>
				<Button
					variant="secondary"
					
					onClick={this.props.pendingAnnotation? 
						null
						:
						(e) => {
							this.props.createAnnotation({
								id: this.props.id,
								key: "temporary",
								name: this.props.name,
								content: "",
								finished: false,
							})
						}}
				>
					Create Annotation
				</Button>
				{annotations}
			</Container>
		);
	}
}

export default AnnotationList