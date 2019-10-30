import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

// Yu Ji put firstTime into state

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

	render() {

		let listItems = this.state.namesArray.map((data) =>
			<li key={data}>{data}</li>
		);

		if (this.state.firstTime) {
			return (
				<Container>
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

				</Container>
			)
		} else {
			return (
				<Container>
					<div style={{ width: 300, overflow: 'auto', height: 100 }}>
						<ul>
							{listItems}
							<li>Jacob</li>
							<li>Hugh</li>
							<li>Yu</li>
							<li>Todd</li>
							<li>Steve</li>
							<li>Jeff</li>
						</ul>
					</div>

				</Container>

			)
		}

	}
}

export default Collaborators