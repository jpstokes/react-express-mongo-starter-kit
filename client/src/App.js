import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {users: []}

  componentDidMount() {
    this.getUsers()
  }

  getUsers = () => {
    fetch('/api/v1/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  saveUser = () => {
    axios.post('/api/v1/users', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email
    });
    this.getUsers();
  }

  stateHandler = (e) => {
    let key = e.target.name;
    let changeState = Object.assign({}, this.state)
    changeState[key] = e.target.value;
    this.setState(changeState);
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        <form method="POST">
          <input type="text" placeholder="First name" onChange={this.stateHandler} name="firstName"/>
          <input type="text" placeholder="Last name" onChange={this.stateHandler} name="lastName"/>
          <input type="text" placeholder="Username" onChange={this.stateHandler} name="username"/>
          <input type="email" placeholder="Email" onChange={this.stateHandler} name="email"/>
          <button type="button" onClick={this.saveUser}>Submit</button>
        </form>
        {this.state.users.map(user =>
          <div key={user._id}>{user.firstName} {user.lastName} {user.username} {user.email}</div>
        )}
      </div>
    );
  }
}

export default App;
