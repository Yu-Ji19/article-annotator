import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import $ from "jquery"


import Collaborators from './Collaborators'
import Share from './Share'
import Website from './Website'
import AnnotationList from './AnnotationList'
import NameInput from './NameInput'
import ColorSelection from "./ColorSelection"
import PendingAnnotation from "./PendingAnnotation"
import CreateButton from "./CreateButton"

import rangy from "../util/rangy"
import req from "../util/req"

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
			collaborators: null,
			nameSet: false,
			pending: false,
			pendingRange: null,
			color: "gray"
		}
		this.createAnnotation = this.createAnnotation.bind(this);
		this.addCollabName = this.addCollabName.bind(this);
		this.finishAnnotation = this.finishAnnotation.bind(this);
		this.setColor = this.setColor.bind(this);
	}

	componentDidMount() {
		req.get(hostname + '/api/workspace/' + this.state.workspace)
		.then((response) => response.json().then(data => {
			this.setState({
				id: this.state.id,
				date: data.date,
				original_url: data.original_url,
				content: data.content
			});
		})
		);

		req.get(hostname + '/api/annotation/all/' + this.state.workspace)
		.then((response) => response.json()
		.then(data => {
			var annotations = data.annotations;
			annotations.forEach(annotation=>{
				var range = new Range();
				var startNode = document.getElementById(annotation.range.start);
				var endNode = document.getElementById(annotation.range.end);
				range.setStart(startNode,0);
				range.setEnd(endNode,0);
				rangy.highlight(range, annotation.color);
				rangy.addTarget(range, annotation.id);
				
			})
			this.setState({
				annotations: annotations.map(v => ({...v, finished: true}))
			});
		})
		.then(()=>{
			this.state.annotations.forEach((annotation)=>{
				$("#"+annotation.id).click(this.selectAnnotation);
			})
			
			
			
			// rangy.addClick(range);
		})
		);

		req.get(hostname + '/api/collaborators/' + this.state.workspace)
		.then((response) => response.json().then(data => {
			this.setState({
				collaborators: data
			});
		})
		);
	}

	addCollabName(name){
		this.setState({
			collabName: name,
			nameSet:true
		})	
	}

	setColor(color){
		this.setState({color});
	}


	createAnnotation(annotation) {
		var selectedText;
		var range;
		if (window.getSelection) { 
			selectedText = window.getSelection(); 
		} 
		if(selectedText.rangeCount>0){
			range = selectedText.getRangeAt(0);
			if(range.collapsed){
				return;
			}
			if(range.commonAncestorContainer.id !== "content"){
				alert("Illegal Annotation Selection");
				return;
			}
			rangy.highlight(range, this.state.color);
			this.setState({
				pending:true, 
				pendingRange:range
			})
		}else{
			alert("No text selected");
		}
	}

	finishAnnotation(annotation){
		console.log(annotation);
		var range = rangy.compress(this.state.pendingRange);
		rangy.addTarget(this.state.pendingRange, annotation.id);
		// rangy.addClick(this.state.pendingRange);
		fetch(hostname + '/api/annotation/insert', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...annotation,
				range,
				workspace: this.state.workspace
			})
		}).then((response) => {
			// add response validation
			var newCollaborators = this.state.collaborators;
			var collabName = this.state.collabName;
			newCollaborators[collabName] = !this.state.collaborators || !this.state.collaborators[collabName]? 1: newCollaborators[collabName] + 1;
			
			$("#"+annotation.id).click(this.selectAnnotation);
			this.setState({
				pending:false,
				collaborators: newCollaborators,
				pendingRange: null,
				annotations: [...this.state.annotations, annotation]
			})
		});
		
	}

	selectAnnotation(){
		// console.log(this);
		var selected = this.state.selected;
		// console.log(selected);
		if(!selected){
			$("highlight").removeClass();
			console.log(this.state.range);
			rangy.highlight(this.state.range, this.state.color);
		}else{

		}
		this.setState({selected: !selected});
	}

	render() {
		var pendingAnnotation = this.state.pending? 
								<PendingAnnotation
									name={this.state.collabName}
									finishAnnotation = {this.finishAnnotation}
									color = {this.state.color}
									range={this.state.pendingRange}
								/>:null;
		
		return (
			<Container>
				<Row>
					<h1>{this.state.original_url}</h1>
					<Col xs={8}>
						<Share />
						<Website content={this.state.content}/>
					</Col>
					<Col xs={4}>
						<NameInput
							nameSet={this.state.nameSet}
							addCollabName={this.addCollabName}
						/>
						<ColorSelection
							onClick={this.setColor}
						/>
						<Collaborators 
							collaborators={this.state.collaborators}
						/>
						<CreateButton
							createAnnotation={this.createAnnotation}
						/>
						<AnnotationList 
							workspace={this.state.workspace} 
							annotations = {this.state.annotations}
						/>	
						{pendingAnnotation}
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Workspace