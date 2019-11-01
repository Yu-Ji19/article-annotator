import React, { Component, Fragment } from "react"
import Container from "react-bootstrap/Container"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

// Yu Ji put firstTime into state
const hostname = process.env.HOSTNAME || "http://127.0.0.1:8080";

class Collaborators extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.Cid,
			name: '',
			namesArray: [],
			namesObject: {},
			firstTime: true
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	

	handleChange(e) {
		this.setState({ name: e.target.value })
	}

	handleSubmit(e) {
		this.props.addCollabName(this.state.name)


	}
	makeCollabList(){
		let list = this.state.namesArray.map((data) =>
					<li key={data}>{data[0]} {data[1]} </li>,
				);
		return list;
	}

	componentWillMount() {
		fetch(hostname + '/api/collaborators/' + this.state.id, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json().then(data => {
			console.log(data);
			this.setState({
				//returns an array of [key, value] pairs
				namesArray: Object.entries(data)	
			});
		})
		);
	}

	render() {
		let listItems = this.makeCollabList();

		const text = this.state.firstTime ?
			<Fragment>
				<InputGroup className="mb-3">
					<FormControl
						placeholder="Enter Name To Annotate"
						value={this.state.name}
						onChange={this.handleChange}
						aria-label="Website URL"
						aria-describedby="submitURL"
					/>
					<InputGroup.Append>
						<Button
							variant="secondary"
							onClick={(e) => this.handleSubmit()}
						>
							Submit
							</Button>
					</InputGroup.Append>
				</InputGroup>
				<ol>
					{listItems}
				</ol>
			</Fragment>

			:

			<Fragment>
				<ol>
					{listItems}
				</ol>
			</Fragment>

		return (
			<Container>
				{text}
			</Container>

		)

	}
}

export default Collaborators