// import logo, { ReactComponent } from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import HomePage from './components/HomePage.js';
import NotFound from './commons/NotFound';
import {
  Route,
  withRouter, BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { Grid, FormGroup, List } from '@material-ui/core';
import { Alert,AlertTitle } from '@material-ui/lab';
import Dashboard from './components/Dashboard';


class App extends Component {

  constructor(props) {
    super(props);    
    this.state={
      isAuthenticated: false,
      user: {},
      loggedInStatus: 'NOT_LOGGED_IN'
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    
        if (
          sessionStorage.getItem("SESSION_AUTHENTICATED")&&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            // user: response.data.user
          });
        } else if (
          // !response.data.logged_in &
          (this.state.loggedInStatus === "LOGGED_IN")
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          });
        }
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }

  render() {
    return (
      <Router>
        <Grid className="app-container">

          <List className="app-content">
            <div className="container">
              
              <Switch>      
                <Route exact path={"/"} 
                  render={props => (
                    
                    <HomePage {...props} handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout} isAuthenticated={this.state.isAuthenticated} />
                  )}
                />
                <Route path={"/dashboard"} 
                  render={props => (
                    <Dashboard {...props} isAuthenticated={this.state.isAuthenticated} />
                  )}
                />
                {/* <Route path="/authenticate" 
                  render={props => (
                    <Login {...props} isAuthenticated={this.state.isAuthenticated} />
                  )}
                />
                <Route path="/register" component={Signup} history={this.props.history}/>
                <Route component={NotFound} history={this.props.history}/> */}
              </Switch>
              
              
            </div>
          </List>
        </Grid>
        </Router>
    );
  }
}

export default App;
