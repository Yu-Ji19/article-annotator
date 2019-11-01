import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import Collaborators from './Collaborators'
import Share from './Share'
import Website from './Website'
import AnnotationList from './AnnotationList'

const hostname = process.env.HOSTNAME || "http://127.0.0.1:8080";

class Workspace extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			date: null,
			original_url: null,
			collab_name: null,
		}
	}

	componentDidMount() {
		fetch(hostname + '/api/workspace/' + this.state.id, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json().then(data => {
			console.log(data);
			this.setState({
				id: this.state.id,
				date: data.date,
				original_url: data.original_url
			});
		})
		);
	}

	handleClick(e) {
		if (this.state.annotateOn === true) {
			this.setState({ annotateOn: false })
		} else {
			this.setState({ annotateOn: true })
		}
	}

	addCollabName(name){
		this.setState({collab_name: name})	
	}

	render() {
		return (
			<Container>
				<h1>{this.state.original_url}</h1>
				<Row>
					<Col xs={8}>
						<Share />
					</Col>
					<Col xs={4}>
						<Collaborators Cid={this.state.id}
						 addCollabName={(name) => this.addCollabName(name)}/>
					</Col>
				</Row>
				<Row>
					<Col xs={8}>
						<Website />
					</Col>
					<Col xs={4}>
						<AnnotationList id={this.state.id} name={this.state.collab_name}/>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Workspace