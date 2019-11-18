import React, { Component, Fragment } from "react"
import Container from "react-bootstrap/Container"



class Collaborators extends Component {

	render() {
		var collaborators = this.props.collaborators? Object.keys(this.props.collaborators).map((name, i)=>{
			return <li>{name}:{this.props.collaborators[name]}</li>
		}):null;
		return (
			<Container>
				<Fragment>
					<ol>
						{collaborators}
					</ol>
				</Fragment>
			</Container>
		)
	}
}


export default Collaborators