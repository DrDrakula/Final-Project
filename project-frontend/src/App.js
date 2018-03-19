import React, { Component } from 'react';
import './App.css';
import ChatRooms from './components/ChatRooms'
import LogIn from './components/LogIn'
import NavBar from './components/NavBar'
import {Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllChatRooms,logIn, logOut } from './actions'
import ChatRoomContainer from './components/ChatRoomContainer'

const API_KEY= 'GET THE KEY'

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

  fetchVideos = () => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${'dogs'}&type=video`)
		.then(res => res.json())
		.then(videos => {
			console.log(videos)
		})
  }

  componentDidMount(){
    this.fetchAbout()
    this.checkIfLogged()
    this.props.getAllChatRooms()
    // this.fetchVideos()
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <NavBar/>
          <Switch>
            <Route exact path='/' render={() => {return this.props.loggedIn ? <ChatRooms /> : <LogIn loggedIn={this.toggleLoggedIn} />}} />
            <Route path='/chatrooms/:slug' render={(routerProps)=>
                {
                  return <ChatRoomContainer {...routerProps}/>}
                }
            />
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
