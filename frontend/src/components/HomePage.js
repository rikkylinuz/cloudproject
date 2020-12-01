import {withStyles } from '@material-ui/core';
import React, { Component } from 'react';
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
            <Login handleSuccessfulAuth={this.handleSuccessfulAuth} history={this.props.history} />
            <Signup handleSuccessfulAuth={this.handleSuccessfulAuth} />            
          </div>
        );
      }
}

export default withStyles(styles) (HomePage);