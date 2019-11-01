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
			name: '',
			namesArray: [],
			firstTime: true
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({ name: e.target.value })

	}

	handleSubmit(e) {
		let currentName = this.state.name
		this.setState(previousState => ({
			namesArray: [...previousState.namesArray, currentName],
			firstTime: false
		}));

	}

	getCollaborators() {
		return;
		fetch(hostname + '/api/collaborators', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(
			function (response) {
				console.log(response);
				//this.setState({ namesArray: response });
			}
		);
	}

	render() {
		this.getCollaborators();

		let listItems = this.state.namesArray.map((data) =>
			<li key={data}>{data}</li>
		);

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
				<ul>
					{listItems}
				</ul>
			</Fragment>

			:

			<Fragment>
				<ul>
					{listItems}
				</ul>
			</Fragment>

		return (
			<Container>
				{text}
			</Container>

		)

	}
}

export default Collaborators