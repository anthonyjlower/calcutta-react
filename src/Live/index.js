import React, { Component } from 'react';
import './style.css';
import {socket} from '../index';


export default class Live extends Component{
	constructor(props) {
		super(props);

		this.state = {
			inviteName: "",
			lotsToPick: [],
			lotsRemaining: "",
			auctionStarted: "",
			teamUp: {
				name: "Team Name",
				id: ''
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
		});

		socket.on('joined', (currentBid, currentTeam, startedBool, toPick, remaining) => {
			this.setState({
				topBid: currentBid,
				teamUp: currentTeam,
				auctionStarted: startedBool,
				lotsToPick: [...toPick],
				lotsRemaining: remaining
			})
		});

		socket.on('team up', (teamUp, toPick, remaining) => {
			this.setState({
				teamUp: teamUp,
				lotsToPick: [...toPick],
				lotsRemaining: remaining
			})
		});

		socket.on('auctionStarted', (startedBool) => {
			this.setState({auctionStarted: startedBool})
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
		console.log(stateLots)
		socket.emit('team up', team, stateLots)
	}
	submitWinningBid = () => {
		const bid = {
			team_id: this.state.teamUp.id,
			username: this.state.topBid.topBidder,
			amount: this.state.topBid.bidAmount
		};
		console.log('submittedBid')
		this.props.createBid(bid);
	}
	startAuction = () => {
		this.props.clearModal();
		const auctionStarted = true
		socket.emit('auctionStarted', auctionStarted)
	}
	placeBid = (e) => {
		e.preventDefault();
		const bidAmount = parseInt(e.currentTarget.childNodes[0].value, 10);
		if (bidAmount > this.state.topBid.bidAmount) {
			const topBid = {
				topBidder: this.props.username,
				bidAmount: bidAmount
			};
			socket.emit('top bid', topBid)
		};
		e.currentTarget.childNodes[0].value = "";
	}


	render(){
		const teamList = this.props.selectedPool.teams.map((team, i) => {
			return(
				<div className="team-card" key={i}>
					<p>{team.seed}. {team.name} | {team.season_wins}-{team.season_losses} </p> 
					<p> {team.bid.username} | {team.bid.amount} | {team.winnings}</p>
				</div> 
			)
		})

		return(
			<div id='live-body'>
				<div id="pool-info">
					<div>
						<h3>Pot Value</h3>
						<p>{this.props.selectedPool.pot_size}</p>
					</div>

					<div>
						<h3>Teams remaining</h3>
						<p>{this.state.lotsRemaining}</p>
					</div>

					
						{this.state.lotsRemaining === 0 || this.props.userId !== this.props.selectedPool.pool.owner ? null :
						<span id='controls'>
						{!this.state.auctionStarted ? 
							<div onClick={this.props.createModal}>Start the Auction</div> : 
							<div onClick={this.drawTeam}>Draw a Team</div>}
						</span>}
				</div>

				{this.state.lotRemaining === 0 || !this.state.auctionStarted ? null :
				<div id='bid-holder'>
					<div id="bidding">
						<h3>{'Price to Beat'}</h3>
						<p>
							<span>{this.state.teamUp.name}</span>
							<span>{this.state.topBid.topBidder}</span>
							<span>{this.state.topBid.bidAmount}</span>
						</p>
						{this.props.userId !== this.props.selectedPool.pool.owner ? null :
						<div onClick={this.submitWinningBid}>
							Finalize Bid
						</div>}
					</div>

					
					<div id='messages'>
						<h3>Place Bid</h3>
						<form onSubmit={this.placeBid}>
							<input type="number" name="Bid Amount" placeholder="Enter Bid Amount"/>
						</form>
					</div>					
				</div>
				}

				
				

				<div id='team-list'>
					{teamList}
				</div>


				<div id="modal">
					<div id="auction-modal-content">
						<div id='esc' onClick={this.props.clearModal}>
							X 
						</div>
						<p>Are you sure you are ready to start the auction. Once it starts you need to finish it before leaving.</p>
						
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