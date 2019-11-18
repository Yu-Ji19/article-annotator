import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"

const hostname = process.env["REACT_APP_APIURL"] || "http://localhost:8080";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({ value: e.target.value })
	}

	handleSubmit(e) {
		console.log(process.env);
		console.log("this is the hostname" + hostname);
		console.log("this is apiURL" + process.env["APIURL"]);
		fetch(hostname + '/api/create', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				date: "outside of time",
				original_url: this.state.value
			})
		}).then((response) => response.json().then(data => {
				//console.log(data);

				//change route to url_id from response
				window.location.pathname = data.id;
			})
		);
	}

	render() {
		return (
			<Container>
				<InputGroup className="mb-3">
					<FormControl
						placeholder="lorem-ipsum.demo"
						value={this.state.value}
						onChange={this.handleChange}
						aria-label="Website URL"
						aria-describedby="submitURL"
					/>
					<InputGroup.Append>
						<Button
							variant="secondary"
							onClick={(e) => this.handleSubmit()}
						>
							Annotate
            </Button>
					</InputGroup.Append>
				</InputGroup>
			</Container>
		)
	}
}

export default Home