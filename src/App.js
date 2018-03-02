import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';
import request from 'superagent';

class App extends Component {
  constructor(){
    super();

    this.state = {
      loggedIn: true,
      selectedPool: null,
      username: "",
      userId: "",
      totalBet: "",
      numberOfPools: "",
      pools: []
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
            username: parsedData.data.user.name,
            userId: parsedData.data.user.id,
            totalBet: parsedData.data.total_bet,
            numberOfPools: parsedData.data.number_of_pools,
            pools: [...parsedData.data.pools]
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
          // console.log('this.state.selectedPool => ', parsedData.data)
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
    console.log(bid)
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
          console.log(parsedData)
          this.setState({selectedPool: parsedData.data})
        }
      })

  }
  

  render() {
    return (
      <div className="App">

        {this.state.loggedIn ?
          <Home selectedPool={this.state.selectedPool} pools={this.state.pools} username={this.state.username}
          totalBet={this.state.totalBet} numberOfPools={this.state.numberOfPools}
          viewPool={this.viewPool} createPool={this.createPool} createInvite={this.createInvite}
          createBid={this.createBid}
          />
          : <Login />}
        
          
      </div>
    );
  }
}

export default App;
