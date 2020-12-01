// import logo, { ReactComponent } from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import HomePage from './components/HomePage.js';
import NotFound from './commons/NotFound';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { Grid, List } from '@material-ui/core';
import Dashboard from './components/Dashboard';


class App extends Component {

  constructor(props) {
    super(props);    
    this.state={
      isAuthenticated: false,
      user: {},
      loggedInStatus: 'NOT_LOGGED_IN'
    }
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

  render() {
    return (
      <Router>
        <Grid className="app-container">
          <List className="app-content">
            <div className="container">            
              <Switch>      
                <Route exact path={"/"} 
                  render={props => (
                    <HomePage {...props} history={this.props.history} />
                  )}
                />
                <Route path={"/dashboard"} 
                  render={props => (
                    <Dashboard {...props} isAuthenticated={this.state.isAuthenticated} />
                  )}
                />
                <Route component={NotFound} history={this.props.history}/> 
              </Switch>          
            </div>
          </List>
        </Grid>
        </Router>
    );
  }
}

export default App;
