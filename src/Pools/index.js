import React, { Component } from 'react';
import './style.css'


export default class Pools extends Component {
	

	
	render(){
		const poolsList = this.props.pools.map((pool, i) => {
			return <li key={i}>{pool.name}</li>
		})
		// console.log("Inside Pools.js ", this.props)

		return(
			<div>
				<ul>
					{poolsList}	
				</ul>
			</div>
		)
	}
}