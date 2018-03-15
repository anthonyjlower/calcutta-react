import React, { Component } from 'react';
import './style.css'


export default class Login extends Component {
	

	render(){
		return(
			<div id='login-body'>
			<div id='buffer'></div>
			<div id='title'>
				<h1>CalcuttaCoin</h1>
				<a href="https://calcutta-backend.herokuapp.com/">What is this?</a>
			</div>
			<h3>{this.props.message}</h3>
				<div className='form'>
					<form>
						<h2>Log In to Your Account</h2>
						<input type='text' placeholder='username' onChange={this.props.handleLogin}/>
						<input type='password' placeholder='password' />
						<button onClick={this.props.submitLogin}>Login</button>
					</form>
				</div>


				<div className='form'>
					<form>
						<h2> Create a New Account </h2>
						<input type='text' placeholder='username' />
						<input type='password' placeholder='password' />
						<button onClick={this.props.createAccount}>Register</button>
					</form>
				</div>
			</div>
		)
	}
}