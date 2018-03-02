import React, { Component } from 'react';
import './style.css';


export default class Live extends Component{
	constructor(props) {
		super(props);

		this.state = {
			inviteName: "",
			teams: [...this.props.selectedPool.teams],
			teamUp: {
				id: "",
				name: "",
				seed: "",
				season_wins: '',
				season_losses: '',
				still_alive: true,
				tourney_wins: 0
			},
			winningBid: {
				name: "",
				value: ""
			}
		}
	}

	drawTeam = (e) => {
		e.preventDefault();
		const random = Math.floor(Math.random()*this.state.teams.length);
		this.setState({teamUp: this.state.teams[random]})
	}
	submitBid = (e) => {
		e.preventDefault();
		const bid = {
			team_id: this.state.teamUp.id,
			username: this.state.winningBid.name,
			amount: this.state.winningBid.value
		}
		this.props.createBid(bid)
	}


	render(){
		console.log(this.state.teams)
		const teamList = this.props.selectedPool.teams.map((team, i) => {
			return(
				<div className="team-card" key={i}>
					<p>{team.seed} {team.name} | {team.season_wins}-{team.season_losses} | {team.tourney_wins}</p> 
					<p> Username | Bid Amount | Winnings</p>
				</div> 
			)
		})

		return(
			<div>

				<div id="pool-info">
					<div>
						Pot Value
					</div>

					<div>
						Teams remaining
					</div>

					<button onClick={this.drawTeam}>Draw a Team</button>
				</div>


				<form>
					<input type='text' value={this.state.teamUp.name} placeholder="Team Name"/>
					<input type='text' value={this.state.winningBid.name} placeholder="Winning Bidder"/>
					<input type='text' value={this.state.winningBid.value}/>
					<input type='hidden' value={this.state.teamUp.id}/>
					<button onClick={this.submitBid}>Finalize Bid</button>
				</form>
				

				<div id='team-list'>
					{teamList}
				</div>

			</div>
		)
	}

}