import React from 'react'

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
    }).then(res => res.json()).then(json => console.log(json))
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
        console.log(json)
        localStorage.setItem('token',json.token)
        this.setState({
          username: '',
          password: '',
          error: ''
        })
      }
    })
  }

  render () {
    return(
      <div>
        <input type='text' value={this.state.username} onChange={this.handleUsernameInput} placeholder='Username'/><br/>
        <input type='password' value={this.state.password} onChange={this.handlePasswordInput} placeholder='Password'/><br/>
        <button onClick={this.logIn}>Log In</button>
        <button onClick={this.createUser}>Create User</button>
      </div>
    )
  }
}

export default LogIn;
