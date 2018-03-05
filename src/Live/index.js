import React, { Component } from 'react';
import './style.css';


export default class Live extends Component{
	constructor(props) {
		super(props);

		this.state = {
			inviteName: "",
			lotsRemaining: 64,
			auctionStarted: false,
			teamUp: {
				name: "Team Name",
				id: '',
			},
			topBid: {
				topBidder: "Top Bidder",
				bidAmount: "Top Bid"
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
		console.log(this.props.selectedPool.teams)
		const teamList = this.props.selectedPool.teams.map((team, i) => {
			return(
				<div className="team-card" key={i}>
					<p>{team.seed} {team.name} | {team.season_wins}-{team.season_losses} | {team.tourney_wins}</p> 
					<p> {team.bid.username} | {team.bid.amount} | Winnings</p>
				</div> 
			)
		})

		return(
			<div id='live-body'>
				<div id="pool-info">
					<div>
						<p>Pot Value</p>
						<p>{this.props.selectedPool.pot_size}</p>
					</div>

					<div>
						<p>Teams remaining</p>
						<p>{this.state.lotsRemaining}</p>
					</div>

					<span id='controls'>
						{this.state.lotsRemaining === 0 ? null :
						!this.state.auctionStarted ? <div>Start the Auction</div> : <div>Draw a Team</div>}
					</span>
				</div>

				<div id="bidding">
					<h3>{this.state.teamUp.name}</h3>
					<p>
						<span>{this.state.topBid.topBidder}</span>
						<span>{this.state.topBid.bidAmount}</span>
					</p>
				</div>


				
				

				<div id='team-list'>
					{teamList}
				</div>

			</div>
		)
	}

}