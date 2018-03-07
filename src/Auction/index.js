import React, { Component } from 'react';
import './style.css';
import Live from '../Live';


export default class Auction extends Component {
	constructor(props) {
		super(props)

		this.state = {
			inviteName: ""
		}
	}

	handleChange = (e) => {
		this.setState({inviteName: e.currentTarget.value})
	}
	submitChange = (e) => {
		e.preventDefault()
		this.props.createInvite(this.state.inviteName);
		this.setState({inviteName: ""})
		document.getElementById('modal').style.display = 'none'	
	}
	
	render(){		
		const userList = this.props.selectedPool.pool_members.map((user, i) => {
			return <div key={i}>{user.name}</div>
		})
		
		return(
			<div id='auction-body'>
				<header className='head'>
					<h1>{this.props.selectedPool.pool.name}</h1>
					<div id="add-new-btn" onClick={this.props.clearPool}>Home</div>
					<div id="add-new-btn" onClick={this.props.createModal}>+ New Invite</div>
				</header>

				<Live userId={this.props.userId} username={this.props.username} selectedPool={this.props.selectedPool} createBid={this.props.createBid} createModal={this.props.createModal} clearModal={this.props.clearModal}/>

				{userList}

				<div id="modal">
					<div id="invite-modal-content">
						<div id='esc' onClick={this.props.clearModal}>
							X 
						</div>
						<form>
							Invite User: <input type="text" name="name" value={this.state.inviteName} placeholder="Username" onChange={this.handleChange}/>
							<button onClick={this.submitChange}>Send Invite</button>
						</form>
					</div>
				</div>

			</div>
		)
	}
}