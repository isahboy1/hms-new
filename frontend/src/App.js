import React, { Component } from 'react';
import PatientClarking from './components/Doctor Module/PatientClarking';
import Pharmacy from './components/Pharmacy Module/Pharmacy';
import Account from './components/Account Module/Account';
import  Admin from './components/AdminModule/Admin';
import Patientlist from './components/Records Module/Patientlist';
import Lab from './components/Lab Module/Lab';
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './Style/App.css';
// import Login from './components/login';
import Login from './components/Login/Login2';
import {Button} from 'reactstrap';
import logo from './images/logo.png';
import { _fetchData } from './components/helpers';


class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      msg: "",
      loggedIn: localStorage.getItem('username') ? true : false,
      username: "",
      password: "",
      records: 1,
      doctors: 1,
      pharmacy: 1,
      lab: 1,
      admin: 1,
      users: []
    }
  }

  componentDidMount(){
    this.fetchUsers();
  }
  
  //Get all the users from the database
  fetchUsers = () => {
    const cb = (data) => this.setState({ users: data })
    _fetchData({ route: 'users/usersList', callback: cb })
  }

  /**
   * The username and password validation for the login
   * is done with the handleLogin method 
   */
  handleLogin = (e) => {
    e.preventDefault();
 
    if(this.state.username==="" || this.state.password===""){
      return this.setState({ msg: "Please enter your username and password!" })
    } else {
        const users = this.state.users;
        const username = this.state.username.trim();
        const password = this.state.password.trim();
        for(let user of users){
          if(user.username === username && user.password === password){
          const { records, doctors, pharmacy, admin } = user;
          this.setState({ 
            loggedIn: true,
            records,
            doctors,
            pharmacy,
            admin 
          });
          localStorage.setItem('username', this.state.username);
          } else {
            this.setState({ 
              msg: "You have entered wrong username or password",
            });
          }
      }
    }
  }

  /**
   * These two methods handleUsernameChange and handlePasswordChange handle the onChange event
   * of the username and password text fields. They are passed down to the child form
   * which implements them
   */
  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
    this.setState({msg: ""});
  }
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
    this.setState({msg: ""});
  }

  logout = () => {
    // const user = localStorage.getItem('username');
    this.setState({ loggedIn: false, username: '' })
  }


  
  render() {
    return (
      <div>
        {/* Conditional rendering which check if the user is a valid user or not */}
        { 
          !this.state.loggedIn && 
            <Login 
              handleLogin={this.handleLogin} 
              message={this.state.msg} 
              username={this.state.username} 
              handleUsernameChange={this.handleUsernameChange}
              password={this.state.password} 
              handlePasswordChange={this.handlePasswordChange}
            /> 
        }
        { 
          this.state.loggedIn 
          && 
          <Router>
            <div>
              <div>
                {/* The header goes here */}
                <ul className="header">
                  {this.state.records===1 && <li><NavLink to="/patientlist">Record Module</NavLink></li>}
                  {this.state.doctors===1 && <li><NavLink to="/patient_clarking">Doctors Module</NavLink></li>}
                  {this.state.pharmacy===1 && <li><NavLink to="/pharmacy">Pharmacy Module</NavLink></li>}
                  {this.state.account===1 && <li><NavLink to="/account">Account Module</NavLink></li>}
                  {this.state.lab===1 && <li><NavLink to="/lab">Laboratory Module</NavLink></li>}
                  {this.state.admin===1 && <li><NavLink to="/admin">Admin</NavLink></li>}
                  <li style={{color: 'white'}}>User: <b><em>{this.state.username.toUpperCase()}</em></b></li>
                  <Button color="danger" onClick={this.logout}>Logout</Button>                  
                  <img src={logo} alt="logo" height="60em" width="80em" style={{float: 'right'}}/>
                </ul>
              </div>
              {/* ... and the contents go here */}
              <div className="content">
                {this.state.records===1 && <Route className="active" path="/patientlist" component={Patientlist}/>}
                {this.state.doctors===1 && <Route path="/patient_clarking" component={PatientClarking}/>}
                {this.state.pharmacy===1 &&<Route path="/pharmacy" component={Pharmacy}/>}
                {this.state.lab===1 &&<Route path="/lab" component={Lab}/>}
                {this.state.account===1 && <Route path="/account" component={Account}/>}
                {this.state.admin===1 && <Route path="/admin" component={Admin}/>}
              </div>
            </div>
          </Router>
        }
      </div>
    );
  }
}

export default App;