import React, { Component } from 'react';
import './App.css';
import ChatRooms from './components/ChatRooms'
import LogIn from './components/LogIn'
import NavBar from './components/NavBar'
import { connect } from 'react-redux'
import { logIn, logOut } from './actions'

class App extends Component {


  toggleLoggedIn = () => {
    this.props.logIn()
  }

  checkIfLogged = () => {
    const token = localStorage.getItem('token')
    if(token){
      this.props.logIn()
    }
  }

  fetchAbout = () => {
    fetch('http://localhost:3000')
    .then(res => res.json())
    .then(json => console.log(json))
  }

  componentDidMount(){
    this.fetchAbout()
    this.checkIfLogged()
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <NavBar/>
        {this.props.loggedIn ? <ChatRooms /> : <LogIn loggedIn={this.toggleLoggedIn}/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps, {logIn, logOut})(App);
