import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

class Annotation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			content: props.content,
			id: props.id,
			color: props.color,
			range: props.range,
			collapsed: props.collapsed
		}
	}

	render() {
		console.log(this.state.collapsed);
		var content = this.state.collapsed ? this.state.content.substr(0,20) : this.state.content;
		return (
			<Container id={this.state.id} className="annotation" onClick={()=>{this.props.selectAnnotation(this.state)}}>
				<h5>{this.state.name}</h5>
				<p>{content}</p>
				<Button variant="secondary" onClick={()=>{this.props.collapseAnnotation(this.state)}}>Collapse</Button>
			</Container>
		);
	}
}


export default Annotation