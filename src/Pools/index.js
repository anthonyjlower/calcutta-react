import React, { Component } from 'react';
import './style.css'


export default class Pools extends Component {
	
	handlePool = (e) => {
		this.props.viewPool(e.currentTarget.id)
	}

	
	render(){
		const poolsList = this.props.pools.pools.map((pool, i) => {
			return <div className='pool-card' key={i} id={pool.id} onClick={this.handlePool}>{pool.name}</div>
		})

		return(
			<div id='pool-body'>
				<header className='head'>
					<h1>Calcutta Manager</h1>
					<div id="add-new-btn" onClick={this.props.createPool}>+ New Pool</div>
				</header>
				<section id='summary-holder'>
					<h3>Hello {this.props.username}</h3>
					<div id='summary'>
						<div className="summary-box">
							<p>Pools Entered In:</p>
							<p>{this.props.pools.number_of_pools}</p>
						</div>
						<div className="summary-box">
							<p>Total Amount Bid</p>
							<p>{this.props.bids.sum_of_bids}</p>
						</div>
						<div className="summary-box">
							<p>Total Amount Won</p>
						</div>
					</div>
				</section>
				<section id='pool-holder'>
					{poolsList}
				</section>
			</div>
		)
	}
}