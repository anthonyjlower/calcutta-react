import React, { Component } from 'react';
import './style.css';
import {socket} from '../index';


export default class Live extends Component{
	constructor(props) {
		super(props);

		this.state = {
			inviteName: "",
			lotsToPick: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63],
			lotsRemaining: 64 - this.props.selectedPool.number_of_bids,
			auctionStarted: false,
			teamUp: {
				name: "Team Name",
				id: '',
			},
			topBid: {
				topBidder: "Top Bidder",
				bidAmount: 0,
			}
		}
	}
	componentDidMount = () => {
		socket.on('user bid', (userBid) => {
			this.setState({topBid: userBid})
		})
		socket.on('team up', (teamUp) => {
			this.setState({teamUp: teamUp})
		})
	}

	drawTeam = () => {
		const randomIndex = Math.floor(Math.random()*this.state.lotsToPick.length);
		const teamNum = this.state.lotsToPick[randomIndex];
		const teamUp = this.props.selectedPool.teams[teamNum];
		const team = {
			name: teamUp.name,
			id: teamNum + 1
		};
		const stateLots = this.state.lotsToPick;
		stateLots.splice(randomIndex, 1);
		this.setState({
			lotsToPick: stateLots,
			lotsRemaining: this.state.lotsRemaining -+ 1,
			teamUp: team
		});
		socket.emit('team up', this.state.teamUp)
	}
	submitBid = (e) => {
		e.preventDefault();
		const bid = {
			team_id: this.state.teamUp.id,
			username: this.state.winningBid.name,
			amount: this.state.winningBid.value
		};
		this.props.createBid(bid);
	}
	startAuction = () => {
		this.props.clearModal();
		this.setState({auctionStarted: true});
	}
	placeBid = (e) => {
		e.preventDefault();
		const bidAmount = parseInt(e.currentTarget.childNodes[0].value);
		if (bidAmount > this.state.topBid.bidAmount) {
			const topBid = {
				topBidder: this.props.username,
				bidAmount: bidAmount
			};
			// this.setState({topBid: topBid});
			socket.emit('top bid', topBid)
		};
		e.currentTarget.childNodes[0].value = "";
	}


	render(){
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
						!this.state.auctionStarted ? <div onClick={this.props.createModal}>Start the Auction</div> : <div onClick={this.drawTeam}>Draw a Team</div>}
					</span>
				</div>

				<div id="bidding">
					<h3>{this.state.teamUp.name}</h3>
					<p>
						<span>{this.state.topBid.topBidder}</span>
						<span>{this.state.topBid.bidAmount}</span>
					</p>
				</div>


				<div id='messages'>
					<form onSubmit={this.placeBid}>
						<input type="number" name="Bid Amount" placeholder="Enter Bid Amount"/>
					</form>
				</div>


				
				

				<div id='team-list'>
					{teamList}
				</div>


				<div id="modal">
					<div id="auction-modal-content">
						<div id='esc' onClick={this.props.clearModal}>
							X 
						</div>
						<p>Are you sure you are ready to start the auction. Once it starts you cannot stop it.</p>
						
						<span>
							<div id='go' className='btns' onClick={this.startAuction}>
								Yeah! Let's do it!
							</div> 
							<div id='stop' className='btns' onClick={this.props.clearModal}>
								Ehhh! Let's wait
							</div>
						</span>
					</div>
				</div>

			</div>
		)
	}

}