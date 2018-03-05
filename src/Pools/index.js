import React, { Component } from 'react';
import './style.css'


export default class Pools extends Component {
	constructor(){
		super()

		this.state = {
			newPool: ""
		}
	}

	
	handlePool = (e) => {
		this.props.viewPool(e.currentTarget.id)
	}
	handleChange = (e) => {
		this.setState({newPool: e.currentTarget.value})
	}
	submitChange = (e) => {
		e.preventDefault()
		this.props.createPool(this.state.newPool)
		this.setState({newPool: ""});
		document.getElementById('pool-modal').style.display = 'none'
	}
	
	render(){
		const poolsList = this.props.pools.map((pool, i) => {
			return (
				<div className='pool-card' key={i} id={pool.id} onClick={this.handlePool}>
					<h3>{pool.name}</h3>
					<p>Bet Size {pool.sum_of_bids}</p>
					<p>Money Made</p>
				</div>
			)
		})

		return(
			<div id='pool-body'>
				<header className='head'>
					<h1>Calcutta Manager</h1>
					<div id="add-new-btn" onClick={this.props.createModal}>+ New Pool</div>
				</header>
				<section id='summary-holder'>
					<h2>Hello {this.props.username}</h2>
					<div id='summary'>
						<div className="summary-box">
							<h3>Pools Entered In:</h3>
							<p>{this.props.numberOfPools}</p>
						</div>
						<div className="summary-box">
							<h3>Total Amount Bid</h3>
							<p>{this.props.totalBet}</p>
						</div>
						<div className="summary-box">
							<h3>Total Amount Won</h3>
						</div>
					</div>
				</section>
				<section id='pool-holder'>
					{poolsList}
				</section>

				<div id="modal">
					<div id="pool-modal-content">
						<div id='esc' onClick={this.props.clearModal}>
							X 
						</div>
						<form>
							Pool Name: <input type="text" name="name" value={this.state.newPool} placeholder="Pool Name" onChange={this.handleChange}/>
							<button onClick={this.submitChange}>Create Pool</button>
						</form>
					</div>
				</div>

			</div>
		)
	}
}