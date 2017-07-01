import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';

const UserForm = (props) => (
  <form id="userForm" method="POST">
    <Row>
      <Col xs={3}><input type="text" className="form-control" placeholder="First name" onChange={props.stateHandler} name="firstName"/></Col>
      <Col xs={3}><input type="text" className="form-control" placeholder="Last name" onChange={props.stateHandler} name="lastName"/></Col>
      <Col xs={2}><input type="text" className="form-control" placeholder="Username" onChange={props.stateHandler}  name="username"/></Col>
      <Col xs={2}><input type="email" className="form-control" placeholder="Email" onChange={props.stateHandler} name="email"/></Col>
      <Col xs={2}>
        <button type="button" className="form-control" onClick={props.saveUser}>Submit</button>
      </Col>
    </Row>
  </form>
)

const UserList = (props) => {
  const users = props.users.map(user =>
      <ul key={user._id}>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.username}</li>
        <li>{user.email}</li>
        <li onClick={props.deleteUser(user)}>Delete</li>
      </ul>
  )
  if (props.users.length !== 0) {
    return (
      <Row>
        <Col>
          <h2>User List</h2>
          <div>{users}</div>
        </Col>
      </Row>
    );
  } else {
    return null;
  }
}

class App extends Component {
  state = {users: []}

  componentDidMount() {
    this.getUsers()
  }

  clearForm = () => {
    document.getElementById('userForm').reset();
  }

  stateHandler = (e) => {
    let key = e.target.name;
    let changeState = Object.assign({}, this.state)
    changeState[key] = e.target.value;
    this.setState(changeState);
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
    })
      .then(res => {
        this.clearForm();
        this.getUsers();
      });
  }

  deleteUser = (delUser) => () => {
    axios.delete('/api/v1/users/' + delUser._id)
      .then(res => {
        this.getUsers();
      });
  }

  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <Col>
              <h1>Users</h1>
              <UserForm {...this.props} saveUser={this.saveUser} stateHandler={this.stateHandler} />
              <UserList users={this.state.users} deleteUser={this.deleteUser}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
