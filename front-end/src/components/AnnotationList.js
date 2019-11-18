import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import uuidv4 from "uuid/v4";

import Annotation from "./Annotation"


class AnnotationList extends Component {
	
	render() {
		const annotations = this.props.annotations? 
		<Container>
			{this.props.annotations.map((annotation) => 
				<Annotation 
					workspace={annotation.workspace}
					id={annotation.id}
					key={annotation.id}
					name={annotation.name}
					content={annotation.content}
					finished={annotation.finished}
					finishAnnotation={this.props.finishAnnotation}
					color={annotation.color}
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
								id: uuidv4(),
								workspace: this.props.workspace,
								name: this.props.name,
								content: "",
								finished: false,
								color: this.props.color
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