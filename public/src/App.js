import React, { Component } from 'react';
import {Routes, Router} from 'react-router';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Login from './Login'

class App extends Component {

  state = {
    data: null
  };

  componentDidMount(){
    this.callBackendAPI()
    .then(res => this.setState({data: res.express}))
    .catch(err => console.log("ERROR: ", err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/api/test');
    const body = await response.json();
    if (response.status !== 200){
      throw Error(body.message);
    }
    return body;
  }

  render() {
    return (
      <div className="App">
        <p className ="App-intro">{this.state.data}</p>
        <Route exact path="/" component={Login} />
      </div>
    );
  }
}

export default App;
