import React, { Component } from 'react';
import './style.css'


export default class Login extends Component {

	render(){
		return(
			<div>
				<form>
					<h2>Log In to Your Account</h2>
					<input type='text' placeholder='username' />
					<input type='password' placeholder='password' />
					<button>Login</button>
				</form>


				<form>
					<h2> Create a New Account </h2>
					<input type='text' placeholder='username' />
					<input type='password' placeholder='password' />
					<button>Register</button>
				</form>
			</div>
		)
	}
}