import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatRooms from './components/ChatRooms'
import LogIn from './components/LogIn'
class App extends Component {

  state = {
    loggedIn: false
  }

  fetchAbout = () => {
    fetch('http://localhost:3000')
    .then(res => res.json())
    .then(json => console.log(json))
  }

  componentDidMount(){
    this.fetchAbout()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <LogIn />
      </div>
    );
  }
}

export default App;
