import React, { Component } from 'react';
import './style.css';
import Live from '../Live';


export default class Auction extends Component {
	constructor(props) {
		super(props)

		this.state = {
			
		}
	}

	createModal = () => {
		document.getElementById('invite-modal').style.display = 'block'
	}
	handleChange = (e) => {
		this.setState({inviteName: e.currentTarget.value})
	}
	submitChange = (e) => {
		e.preventDefault()
		this.props.createInvite(this.state.inviteName);
		this.setState({inviteName: ""})
		document.getElementById('invite-modal').style.display = 'none'	
	}
	
	render(){		
		const userList = this.props.selectedPool.users.map((user, i) => {
			return <li key={i}>{user.name}</li>
		})
		
		return(
			<div>
				<header className='head'>
					<h1>{this.props.selectedPool.pool.name}</h1>
					<div id="add-new-btn" onClick={this.createModal}>+ New Invite</div>
				</header>

				<Live selectedPool={this.props.selectedPool} createBid={this.props.createBid}/>

				{userList}

				<div id="invite-modal">
					<div id="invite-modal-content">
						<form>
							Pool Name: <input type="text" name="name" value={this.state.inviteName} placeholder="Username" onChange={this.handleChange}/>
							<button onClick={this.submitChange}>Send Invite</button>
						</form>
					</div>
				</div>

			</div>
		)
	}
}