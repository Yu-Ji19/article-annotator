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
		}

		
	}


	render() {
		return (
			<Container id={this.state.id} className="annotation" onClick={()=>{this.props.selectAnnotation(this.state)}}>
				<h5>{this.state.name}</h5>
				<p>{this.state.content}</p>
			</Container>
		);
	}
}


export default Annotation