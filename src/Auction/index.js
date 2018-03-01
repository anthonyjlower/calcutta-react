import React, { Component } from 'react';
import './style.css'


export default class Auction extends Component {
	constructor(props) {
		super(props)

		this.state = {
			teams: [...this.props.selectedPool.teams],
			teamUp: {},
			winningBid: {}
		}
	}
	
	render(){
		console.log(this.props)

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
					<div id="add-new-btn">+ New Invite</div>
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
			</div>
		)
	}
}