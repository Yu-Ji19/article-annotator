import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"

class Share extends Component {
	onClickHandler = event => {
		const buttonID = event.target.id;
		//copy button
		if (buttonID === 'copyButton') {
			//set what you want to copy here
			let copyContent = "monkeys "
			this.copyToClipboard(copyContent);
			alert("'" + copyContent + "' was copied to the clip board")

		}
		//download button
		else if (buttonID === 'downloadButton') {
			alert("download clicked")
		}
		//email button
		else if (buttonID === 'emailButton') {
			alert("Email clicked")
		}
	}


	copyToClipboard = text => {
		var dummy = document.createElement("textarea");
		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		document.execCommand("copy");
		document.body.removeChild(dummy);
	}

	render() {


		return (
			<Container>

				<DropdownButton id="dropdown-basic-button" title="Share" size="lg">
					<Dropdown.Item id="copyButton" href="#/action-1" onClick={this.onClickHandler}>Copy URL</Dropdown.Item>
					<Dropdown.Item id="downloadButton" href="#/action-2" onClick={this.onClickHandler}>Download PDF</Dropdown.Item>
					<Dropdown.Item id="emailButton" href="#/action-3" onClick={this.onClickHandler}>Email</Dropdown.Item>
				</DropdownButton>

			</Container>
		)
	}
}

export default Share