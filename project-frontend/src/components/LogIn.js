import React from 'react'
import { connect } from 'react-redux'
import { logIn, logOut } from '../actions'


const LOGIN = "http://localhost:3000/login"
const CREATE = "http://localhost:3000/users"

class LogIn extends React.Component {

  state = {
    username: '',
    password: '',
    error: ''
  }

  handleUsernameInput = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handlePasswordInput = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  logIn = (event) => {
    event.preventDefault()
    fetch(LOGIN, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(json => {
      if(json.error){
        this.setState({
          error: json.error
        })
      }else{
        console.log(json)
        localStorage.setItem('token',json.token)
        localStorage.setItem('username',this.state.username)
        localStorage.setItem('user_id',json.user_id)
        this.setState({
          username: '',
          password: '',
          error: ''
        }, () => this.props.logIn())
      }
    })
  }

  createUser = (event) => {
    event.preventDefault()
    fetch(CREATE, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(json => {
      if(json.error){
        this.setState({
          error: json.error
        })
      }else{
        localStorage.setItem('token',json.token)
        localStorage.setItem('username', this.state.username)
        localStorage.setItem('user_id',json.user_id)
        this.setState({
          username: '',
          password: '',
          error: ''
        }, () => this.props.logIn())
      }
    })
  }

  render () {
    return(
      <div className='container'>
        <div className='row'>
          <div className="input-field col s6">
            <input type='text' value={this.state.username} onChange={this.handleUsernameInput} placeholder='Username'/><br/>
          </div>
          <div className="input-field col s6">
            <input type='password' value={this.state.password} onChange={this.handlePasswordInput} placeholder='Password'/><br/>
          </div>
        </div>
        <div className="App">
          <button onClick={this.logIn}>Log In</button>
          <button onClick={this.createUser}>Create User</button>
        </div>
        {this.state.error ?
        <div>
          <ul>
            <li>{this.state.error}</li>
          </ul>
        </div>
        : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps, {logIn, logOut})(LogIn);;
