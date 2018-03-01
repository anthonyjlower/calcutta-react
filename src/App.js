import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';
import request from 'superagent';

class App extends Component {
  constructor(){
    super();

    this.state = {
      username: "",
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
            username: parsedData.data.user.name,
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

  render() {
    return (
      <div className="App">
        

        {this.state.loggedIn ?
          <Home selectedPool={this.state.selectedPool} pools={this.state.pools} bids={this.state.bids} username={this.state.username} viewPool={this.viewPool}/>
          : <Login />}


      </div>
    );
  }
}

export default App;
