import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';

const UserForm = (props) => (
  <form id="userForm" method="POST">
    <Row>
      <Col xs={6}><input type="text" className="form-control" placeholder="First name" onChange={props.stateHandler} name="firstName"/></Col>
      <Col xs={6}><input type="text" className="form-control" placeholder="Last name" onChange={props.stateHandler} name="lastName"/></Col>
    </Row>
    <Row>
      <Col xs={6}><input type="text" className="form-control" placeholder="Username" onChange={props.stateHandler}  name="username"/></Col>
      <Col xs={6}><input type="email" className="form-control" placeholder="Email" onChange={props.stateHandler} name="email"/></Col>
    </Row>
    <Row>
      <Col xs={6}>
        <button type="button" className="form-control btn btn-primary" onClick={props.saveUser}>Submit</button>
      </Col>
    </Row>
  </form>
)

const UserRow = (props) => (
  <tr key={props._id}>
    <td>{props.firstName} {props.lastName}</td>
    <td>{props.propsname}</td>
    <td>{props.email}</td>
    <td onClick={props.deleteUser(props)}>Delete</td>
  </tr>
)

const UserList = (props) => {
  const userRows = props.users.map(user =>
    <UserRow {...user} deleteUser={props.deleteUser}/>
  )
  if (props.users.length !== 0) {
    return (
      <div>
        <h2>User List</h2>
        <table className="table table-striped">
          <tbody>
            {userRows}
          </tbody>
        </table>
      </div>
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
