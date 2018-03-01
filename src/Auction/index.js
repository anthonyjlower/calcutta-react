import React, { Component } from 'react';
import './style.css'


export default class Auction extends Component {
	constructor(props) {
		super(props)

		this.state = {
			inviteName: "",
			teams: [...this.props.selectedPool.teams],
			teamUp: {},
			winningBid: {}
		}
	}

	createModal = () => {
		document.getElementById('invite-modal').style.display = 'block'
	}
	handleChange = (e) => {
		this.setState({inviteName: e.currentTarget.value})
	}
	submitChange = (e) => {
		e.preventDefault()
		this.props.createInvite(this.state.inviteName);
		this.setState({inviteName: ""})
		document.getElementById('invite-modal').style.display = 'none'	
	}
	
	render(){

		const teamList = this.props.selectedPool.teams.map((team, i) => {
			return <li key={i}>{team.seed} {team.name}</li> 
		})
		const userList = this.props.selectedPool.users.map((user, i) => {
			return <li key={i}>{user.name}</li>
		})
		
		return(
			<div>
				<header className='head'>
					<h1>{this.props.selectedPool.pool.name}</h1>
					<div id="add-new-btn" onClick={this.createModal}>+ New Invite</div>
				</header>
				
				<div id='team-list'>
					<ul>
						{teamList}
					</ul>
				</div>
				<div id='user-list'>
					<ul>
						{userList}
					</ul>
				</div>

				<div id="invite-modal">
					<div id="invite-modal-content">
						<form>
							Pool Name: <input type="text" name="name" value={this.state.inviteName} placeholder="Username" onChange={this.handleChange}/>
							<button onClick={this.submitChange}>Send Invite</button>
						</form>
					</div>
				</div>

			</div>
		)
	}
}