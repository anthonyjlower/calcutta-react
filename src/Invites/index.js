import React, { Component } from 'react';
import './style.css'


export default class Invites extends Component {
	
	render(){
		console.log(this.props.invites)
		const inviteList = this.props.invites.map((invite, i) => {
			return(invite.accepted ? null : <li key={i}>{invite.id} <button>Accept</button></li>)
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