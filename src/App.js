import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';
import request from 'superagent';
import {socket} from './index'

class App extends Component {
  constructor(){
    super();

    this.state = {
      loggedIn: false,
      selectedPool: null,
      selectedUser: {
        user: {
          id: "",
          name: ''
        },
        total_bet: '',
        total_won: '',
        teams: []
      },
      username: "",
      userId: "",
      totalBet: "",
      totalWon: '',
      numberOfPools: "",
      pools: [],
      message: ""
    }
  }
  componentDidMount(){
    socket.on('updatedPool', (currentPool) => {
      this.setState({selectedPool: currentPool})
    }) 
  }

  getUserInfo = () => {
    // Get all of the data for the logged in user
    request
      .get('http://localhost:9292/users/' + this.state.userId)
      .withCredentials()
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          const parsedData = JSON.parse(res.text)
          this.setState({
            totalBet: parsedData.data.total_bet,
            totalWon: parsedData.data.total_won,
            numberOfPools: parsedData.data.number_of_pools,
            pools: [...parsedData.data.pools]
          })
        }
      })  
  }
  viewPool = (id) =>{
    // View all of the info for the selected pool
    request
      .get('http://localhost:9292/pools/' + id)
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          const parsedData = JSON.parse(res.text)
          this.setState({selectedPool: parsedData.data})
          socket.emit('addUser', this.state.selectedPool.pool.name)
        }
      })
  }
  viewUser = (e) => {
    // Get all of the selected User info in a pool
    console.log(e.currentTarget.id)
    console.log(this.state.selectedPool.pool.id)
    request
      .get('http://localhost:9292/users/' + e.currentTarget.id  + '/pool/' + this.state.selectedPool.pool.id)
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          const parsedData = JSON.parse(res.text)
          this.setState({selectedUser: parsedData.data})
        }
      })
  }
  clearPool = () => {
    this.setState({
      selectedPool: null,
      selectedUser: {
        user: {
          id: "",
          name: ''
        },
        total_bet: '',
        total_won: '',
        teams: []
      }
    })
  }
  createPool = (poolName) => {
    // Create a new pool
    request
      .post('http://localhost:9292/pools')
      .type('form')
      .send({name: poolName})
      .send({user_id: this.state.userId})
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          const parsedData = JSON.parse(res.text)
          this.setState({
            username: parsedData.data.user.name,
            userId: parsedData.data.user.id,
            totalBet: parsedData.data.total_bet,
            numberOfPools: parsedData.data.number_of_pools,
            pools: [...parsedData.data.pools]
          })
        }
      })
  }
  createInvite = (username) => {
    // Invite Users to a selected Pool
    request
      .post('http://localhost:9292/pools/invite')
      .type('form')
      .send({pool_id: this.state.selectedPool.pool.id})
      .send({username: username})
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          const parsedData = JSON.parse(res.text)
          this.setState({selectedPool: parsedData.data})
        }
      })
  }
  createBid = (bid) => {
    // Finalize a bid for a team
    request
      .post('http://localhost:9292/pools/bid')
      .type('form')
      .send({pool_id: this.state.selectedPool.pool.id})
      .send({team_id: bid.team_id})
      .send({username: bid.username})
      .send({amount: bid.amount})
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          const parsedData = JSON.parse(res.text)
          socket.emit('selectedPool', parsedData.data)
        }
      })
  }
  handleLogin = (e) => {
    this.setState({username: e.currentTarget.value})
  }
  submitLogin = (e) => {
    e.preventDefault();
    request
      .post('http://localhost:9292/users/login')
      .type('form')
      .send({username: this.state.username})
      .send({password: e.currentTarget.parentNode.childNodes[2].value})
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          const parsedData = JSON.parse(res.text)
          this.setState({
            userId: parsedData.data.userId,
            loggedIn: parsedData.data.loggedIn,
            message: parsedData.data.message
          })
        }
      })
  }
  createAccount = (e) => {
    e.preventDefault();
    request
      .post('http://localhost:9292/users/')
      .type('form')
      .send({username: e.currentTarget.previousSibling.previousSibling.value})
      .send({password: e.currentTarget.previousSibling.value})
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          const parsedData = JSON.parse(res.text)
          this.setState({
            userId: parsedData.data.userId,
            username: parsedData.data.userName,
            loggedIn: parsedData.data.loggedIn,
            message: parsedData.data.message
          })
        }
      })
  }
  

  render() {
    return (
      <div className="App">

        {this.state.loggedIn ?
          <Home selectedPool={this.state.selectedPool} pools={this.state.pools} username={this.state.username} userId={this.state.userId}
          totalBet={this.state.totalBet} numberOfPools={this.state.numberOfPools} totalWon={this.state.totalWon} selectedUser={this.state.selectedUser}
          viewPool={this.viewPool} createPool={this.createPool} createInvite={this.createInvite}
          createBid={this.createBid} clearPool={this.clearPool} getUserInfo={this.getUserInfo} viewUser={this.viewUser}
          />
          : <Login createAccount={this.createAccount} submitLogin={this.submitLogin} handleLogin={this.handleLogin} message={this.state.message}/>}
          
      </div>
    );
  }
}

export default App;
