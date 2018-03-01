import React, { Component } from 'react';
import './style.css'


export default class Invites extends Component {
	
	render(){
		console.log(this.props.invites)
		const inviteList = this.props.invites.map((invite, i) => {
			return <li key={i}>{invite.id} </li>
		})

		return(
			
			<div>
				<ul>
					{inviteList}
				</ul>
			</div>
		)
	}
}