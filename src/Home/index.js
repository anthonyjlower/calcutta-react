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
					<Pools user={this.props.user} bids={this.props.bids} pools={this.props.pools} viewPool={this.props.viewPool}
						createPool={this.props.createPool}
					/>
				</div>:
					<Auction selectedPool={this.props.selectedPool}/>
				}
			</div>
		)
	}
}