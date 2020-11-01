import { AppBar, withStyles } from '@material-ui/core';
import { Tab, Tabs } from 'material-ui';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import BuySellItems from './BuySellItems';
import SearchLostItem from './SearchLostItem';
import UploadLostItem from './UploadLostItem';
import Container from '@material-ui/core/Container';
import { TabPanel } from '@material-ui/lab';
import Login from './Login';
import Signup from './Signup';

const styles = theme => ({
    appbar: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#006fcf",
        height: '60px'
    }
});

class HomePage extends Component {
    constructor(props){
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        
    }
    handleSuccessfulAuth(data){
        this.props.handleLogin(data);
        this.props.history.push("/dashboard");
    }
    
    handleChange = (event, value) => {
        this.setState({value});
    }

    componentDidMount(){
        const sessionToken = sessionStorage.getItem("SESSION_AUTHENTICATED");
        if(!sessionToken){
            this.setState({redirect: true});
        }
    }

    logout = () => {
        sessionStorage.removeItem("SESSION_AUTHENTICATED");
        sessionStorage.removeItem("SESSION_USERNAME");
        this.setState({redirect: true});
    }

    render() {
        return (
          <div>
            <h1>Home</h1>
            <h1>Status: {this.props.loggedInStatus}</h1>
            {/* <button onClick={() => this.logout()}>Logout</button> */}
            <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
            <Signup handleSuccessfulAuth={this.handleSuccessfulAuth} />
            
          </div>
        );
      }
}

export default withStyles(styles) (HomePage);