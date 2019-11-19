import React, { Component } from "react"
import Container from "react-bootstrap/Container"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"
import req from "../util/req"
import jsPDF from 'jspdf'
import $ from 'jquery'
import html2canvas from 'html2canvas';
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

const hostname = process.env["REACT_APP_APIURL"] || "http://localhost:8080";


class Share extends Component {

	sendEmail(userEmail, copiedURL){
		fetch(hostname + '/api/email', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: userEmail,
				url: copiedURL
			})
		}).then((response) => {
			// add response validation
			alert("Your email was sent!");
			
		});

	}


	
	onClickHandler = event => {
		const buttonID = event.target.id;
		//copy button
		if (buttonID === 'copyButton') {
			//set what you want to copy here
			let copyContent = hostname + "/" + this.props.urlID;
			this.copyToClipboard(copyContent);
			alert("'" + copyContent + "' was copied to the clip board")

		}
		//download button
		else if (buttonID === 'downloadButton') {
			window.print();	
		}
		//email button
		else if (buttonID === 'emailButton') {
			let inputEmail = window.prompt("Enter your email","");
			let url = hostname + "/" + this.props.urlID;
			this.sendEmail(inputEmail, url);
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