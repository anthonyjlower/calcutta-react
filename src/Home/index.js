import React, { Component } from 'react';
import './style.css';
import Pools from '../Pools';
import Auction from '../Auction'


export default class Home extends Component {

	clearModal = () => {
		this.setState({newPool: ''})
		document.getElementById('modal').style.display = 'none'
	}
	createModal = () => {
		document.getElementById('modal').style.display = 'block'
	}

	render(){
		return(
			<div id="home-body">
				{this.props.selectedPool === null ?
				<div>
					<Pools username={this.props.username} pools={this.props.pools} totalBet={this.props.totalBet} numberOfPools={this.props.numberOfPools} viewPool={this.props.viewPool}
						createPool={this.props.createPool} createModal={this.createModal} clearModal={this.clearModal}
					/>
				</div>:
					<Auction selectedPool={this.props.selectedPool} createInvite={this.props.createInvite} createBid={this.props.createBid} 
						createModal={this.createModal} clearModal={this.clearModal} clearPool={this.props.clearPool}/>
				}
			</div>
		)
	}
}