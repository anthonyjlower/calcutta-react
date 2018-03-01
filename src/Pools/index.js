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
	createModal = () => {
		document.getElementById('pool-modal').style.display = 'block'
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
		const poolsList = this.props.pools.pools.map((pool, i) => {
			return <div className='pool-card' key={i} id={pool.id} onClick={this.handlePool}>{pool.name}</div>
		})

		return(
			<div id='pool-body'>
				<header className='head'>
					<h1>Calcutta Manager</h1>
					<div id="add-new-btn" onClick={this.createModal}>+ New Pool</div>
				</header>
				<section id='summary-holder'>
					<h3>Hello {this.props.user.username}</h3>
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

				<div id="pool-modal">
					<div id="pool-modal-content">
						<form>
							Pool Name: <input type="text" name="name" value={this.state.newPool} placeholder="Pool Name" onChange={this.handleChange}/>
							<button onClick={this.submitChange}>submit</button>
						</form>
					</div>
				</div>

			</div>
		)
	}
}