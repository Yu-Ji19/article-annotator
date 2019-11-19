import React, { Component } from "react"
import Container from "react-bootstrap/Container"


class Annotation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			content: props.content,
			id: props.id,
			color:props.color,
			range:props.range,
			selected:false
			// add range here for reverse pointing
		}
		
	}
	render() {
		const content = <p>{this.state.content}</p>
			

		return (
			<Container id={this.state.id} className="annotation">
				<h5>{this.state.name}</h5>
				{content}
			</Container>
		);
	}
}


export default Annotation