import React, { Component } from 'react';
import './style.css';
import Pools from '../Pools';
import Auction from '../Auction'


export default class Home extends Component {
	constructor(){
		super();

		this.state = {

		}
	}


	render(){
		return(
			<div id="home-body">
				{this.props.selectedPool === null ?
				<div>
					<Pools username={this.props.username} pools={this.props.pools} totalBet={this.props.totalBet} numberOfPools={this.props.numberOfPools} viewPool={this.props.viewPool}
						createPool={this.props.createPool}
					/>
				</div>:
					<Auction selectedPool={this.props.selectedPool} createInvite={this.props.createInvite} createBid={this.props.createBid}/>
				}
			</div>
		)
	}
}