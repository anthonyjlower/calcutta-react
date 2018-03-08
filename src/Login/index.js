import React, { Component } from 'react';
import './style.css'


export default class Login extends Component {
	

	render(){
		return(
			<div id='login-body'>
			<div id='buffer'></div>
				<div className='form'>
					<form>
						<h2>Log In to Your Account</h2>
						<input type='text' placeholder='username' onChange={this.props.handleLogin}/>
						<button onClick={this.props.submitLogin}>Login</button>
					</form>
				</div>


				<div className='form'>
					<form>
						<h2> Create a New Account </h2>
						<input type='text' placeholder='username' />
						<button>Register</button>
					</form>
				</div>
			</div>
		)
	}
}