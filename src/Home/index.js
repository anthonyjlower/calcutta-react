import React, { Component } from 'react';
import './style.css';
import Pools from '../Pools';
import Auction from '../Auction'


export default class Home extends Component {

	componentDidMount = () => {
		this.props.getUserInfo()
	}

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
						createPool={this.props.createPool} createModal={this.createModal} clearModal={this.clearModal} totalWon={this.props.totalWon}
					/>
				</div>:
					<Auction selectedPool={this.props.selectedPool} createInvite={this.props.createInvite} createBid={this.props.createBid} 
					userId={this.props.userId} createModal={this.createModal} clearModal={this.clearModal} clearPool={this.props.clearPool} 
					username={this.props.username} viewUser={this.props.viewUser} selectedUser={this.props.selectedUser}/>
					}
			</div>
		)
	}
}