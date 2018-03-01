import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';
import request from 'superagent';

class App extends Component {
  constructor(){
    super();

    this.state = {
      username: "AJL",
      loggedIn: true,
      invites: [],
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
          this.setState({invites: [...parsedData.invites.invites]})
          this.setState({pools: [...parsedData.pools.pools]})
        }
      })  
  }

  render() {
    return (
      <div className="App">
        

        {this.state.loggedIn ? <Home invites={this.state.invites} pools={this.state.pools}/> : <Login />}


      </div>
    );
  }
}

export default App;
