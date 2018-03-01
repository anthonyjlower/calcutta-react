import React, { Component } from 'react';
import './style.css';
import Invites from '../Invites';
import Pools from '../Pools';
import Auction from '../Auction'


export default class Home extends Component {
	constructor(){
		super();

		this.state = {
			selectedPool: ""
		}

	}


	render(){
		return(
			<div className="home">
				<p>Home</p>

				{this.state.selectedPool === "" ?
				<div>
					<Pools pools={this.props.pools}/>
					<Invites invites={this.props.invites}/> 
				</div>:
					<Auction />
				}
			</div>
		)
	}
}