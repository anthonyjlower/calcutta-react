import React, { Component } from 'react';
import './style.css';


export default class UserView extends Component {
	render(){
		console.log(this.props)
		const userTeams = this.props.selectedUser.teams.map((team, i) => {
			return(
				<div key={i} className='team'>
					<h5>{team.name}</h5>
					<p>Paid: {team.bidAmount}</p>
					<p>Won: {team.winnings}</p>
				</div>
			)
		})
		return(
			<div id='user-view-body'>
				{this.props.selectedUser.user.name === "" ? <p>Select a member to view more info</p> : 
					<div id='user-data'>
					<section id='summary'>
						<h3>{this.props.selectedUser.user.name}</h3><p>Total Bet:{this.props.selectedUser.total_bet}</p><p>Total Won:{this.props.selectedUser.total_won}</p>
					</section>
					<section id='team-list'>
						{userTeams}
					</section>
					</div>
				}
			</div>
		)
	}
}