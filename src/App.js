import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';
import request from 'superagent';

class App extends Component {
  constructor(){
    super();

    this.state = {
      user: {},
      loggedIn: true,
      pools: {
        pools: [],
        number_of_pools: ''
      },
      bids: {},
      selectedPool: null
    }
  }
  componentDidMount(){
    request
      .get('http://localhost:9292/users/')
      // .withCredentials() will use when tracking sessions
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          const parsedData = JSON.parse(res.text)
          this.setState({
            user: parsedData.data.user,
            pools: parsedData.data.pools,
            bids: parsedData.data.bids
          })
        }
      })  
  }

  viewPool = (id) =>{
    request
      .get('http://localhost:9292/pools/' + id)
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          const parsedData = JSON.parse(res.text)
          this.setState({selectedPool: parsedData.data})
        }
      })
  }
  createPool = (poolName) => {
    request
      .post('http://localhost:9292/pools')
      .type('form')
      .send({name: poolName})
      .send({user_id: this.state.user.id})
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          const parsedData = JSON.parse(res.text)
          this.setState({pools: parsedData.data})
        }
      })
  }
  createInvite = (username) => {
    console.log("User name to invite -> ", username)
    console.log('Pool to invite the to -> ', this.state.selectedPool.pool.id)
    request
      .post('http://localhost:9292/pools/invite')
      .type('form')
      .send({pool_id: this.state.selectedPool.pool.id})
      .send({username: username})
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log(res.text)
        }
      })
  }
  

  render() {
    return (
      <div className="App">
        

        {this.state.loggedIn ?
          <Home selectedPool={this.state.selectedPool} pools={this.state.pools} bids={this.state.bids} 
          user={this.state.user} viewPool={this.viewPool} createPool={this.createPool} createInvite={this.createInvite}
          />
          : <Login />}


      </div>
    );
  }
}

export default App;
