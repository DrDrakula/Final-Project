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
        <div className="row hero">

          <div className="col s6">
            <h2>Welcome to WeWatch!</h2>
            <h5>An app that you can use with your friends <br/>to watch online videos together.</h5>
            <p>Please log in or create a new user.</p>
          </div>

          <div className="col s6 hero-right">
            <div className="row">
              <div className="col s6 offset-s2">
                <div className="input-field">
                  <input type='text' value={this.state.username} onChange={this.handleUsernameInput} placeholder='Username'/><br/>
                  <input type='password' value={this.state.password} onChange={this.handlePasswordInput} placeholder='Password'/><br/>
                </div>
                <br/>
                <div>
                  <button className="waves-effect waves-light btn red darken-1" onClick={this.logIn}>Log In</button>
                  <button className="waves-effect waves-red darken-1 btn-flat" onClick={this.createUser}>Create User</button>
                </div>
              </div>
            </div>
          </div>

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


// <div className="input-field col s6">
//   <input type='password' value={this.state.password} onChange={this.handlePasswordInput} placeholder='Password'/><br/>
// </div>
