import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"


import Collaborators from './Collaborators'
import Share from './Share'
import Website from './Website'
import AnnotationList from './AnnotationList'

const hostname = process.env["REACT_APP_APIURL"] || "http://localhost:8080";

class Workspace extends Component {
	constructor(props) {
		super(props);
		this.state = {
			workspace: this.props.match.params.id,
			date: null,
			original_url: null,
			content: "",
			collabName: "stupidFish",
			annotations: null,
			collaborators: undefined,
			nameSet: false,
			pendingAnnotation: false
		}
		this.createAnnotation = this.createAnnotation.bind(this);
		this.addCollabName = this.addCollabName.bind(this);
		this.finishAnnotation = this.finishAnnotation.bind(this);
	}

	componentDidMount() {
		fetch(hostname + '/api/workspace/' + this.state.workspace, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json().then(data => {
			this.setState({
				id: this.state.id,
				date: data.date,
				original_url: data.original_url,
				content: data.content
			});
		})
		);

		fetch(hostname + '/api/annotation/all/' + this.state.workspace, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}).then((response) => response.json().then(data => {
			this.setState({
				annotations: data.annotations.map(v => ({...v, finished: true}))
			});
		})
		);

		fetch(hostname + '/api/collaborators/' + this.state.workspace, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json().then(data => {
			this.setState({
				collaborators: Object.entries(data)
			});
		})
		);

		//random name generate here

	}

	addCollabName(name){
		this.setState({
			collabName: name,
			nameSet:true
		})	
	}

	createAnnotation(annotation) {
		var selectedText;
		if (window.getSelection) { 
			selectedText = window.getSelection(); 
		} 
		if(selectedText.rangeCount>0){
			document.execCommand("backColor", true, "green");
		}
	

		this.setState({
			annotations: [...this.state.annotations, annotation],
			pendingAnnotation:true
		})
	}

	finishAnnotation(){
		var newCollaborators = [];
		var collabName = this.state.collabName;
		if(!this.state.collaborators || !this.state.collaborators[this.state.collabName]){
			newCollaborators = this.state.collaborators;
			newCollaborators.push([collabName,1]);
		}
		else{
			newCollaborators = this.state.collaborators.map(([name, freq])=>{
				if(name === this.state.collabName){
					return [name, freq+1];
				}
				return [name, freq];
			});
		}
		this.setState({
			pendingAnnotation:false,
			collaborators: newCollaborators
		})
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
						<Collaborators 
							Cid={this.state.id}
							addCollabName={this.addCollabName}
							collaborators={this.state.collaborators}
							nameSet={this.state.nameSet}
						/>
					</Col>
				</Row>
				<Row>
					<Col xs={8}>
						<Website content={this.state.content}/>
					</Col>
					<Col xs={4}>
						<AnnotationList 
							workspace={this.state.workspace} 
							name={this.state.collabName}
							createAnnotation = {this.createAnnotation}
							finishAnnotation = {this.finishAnnotation}
							annotations = {this.state.annotations}
							pendingAnnotation = {this.state.pendingAnnotation}
						/>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Workspace