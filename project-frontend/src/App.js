import React, { Component } from 'react';
import './App.css';
import ChatRooms from './components/ChatRooms'
import LogIn from './components/LogIn'
import NavBar from './components/NavBar'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllChatRooms,logIn, logOut } from './actions'
import ChatRoomContainer from './components/ChatRoomContainer'

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
    this.props.getAllChatRooms()

  }
  render() {
    console.log(this.props)
    return (
      <div>
        <NavBar/>
          <Switch>
            <Route path='/chatrooms/:slug' render={(routerProps)=>
                {
                  return this.props.loggedIn ? <ChatRoomContainer {...routerProps}/> : <Redirect to='/'/>}
                }
            />
            <Route path='/chatrooms' render={() => {return this.props.loggedIn ? <ChatRooms/> : <Redirect to='/'/>}}/>
            <Route exact path='/' render={() => {return this.props.loggedIn ? <Redirect to='/chatrooms'/> : <LogIn/>}} />
          </Switch>
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

export default withRouter(connect(mapStateToProps, {logIn, logOut, getAllChatRooms})(App));
