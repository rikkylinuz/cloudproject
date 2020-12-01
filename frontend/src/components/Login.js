import React, { Component } from 'react';
import { login } from '../util/Utils';
import '../css/Login.css';
import { withRouter } from 'react-router-dom';
import { Alert,AlertTitle } from '@material-ui/lab';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormGroup, Button, FormControl } from '@material-ui/core';

const FormItem = FormControl;
class Login extends Component {
    constructor(props){
        super(props);
        this.state={
          username:  '',
          password: '',
          loginErr: '',
          isAuthenticated: false
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
      const target = event.target;
      const inputName = target.name;        
      const inputValue = target.value;
      this.setState({
          [inputName] : inputValue
          
      });
  }
       handleClick=()=>{
        var payload={
        "username":this.state.username,
        "password":this.state.password
        }
            
        const loginRequest = Object.assign(payload);
        console.log("login req: ",loginRequest);
        login(loginRequest)
        .then(response => {
            console.log("response: ",response);
            if(response.authentication === true){
              sessionStorage.setItem("SESSION_AUTHENTICATED",true);
              sessionStorage.setItem("SESSION_USERNAME",response.username);
              console.log("session: ",sessionStorage.getItem("SESSION_AUTHENTICATED"));
              console.log("session: ",sessionStorage.getItem("SESSION_USERNAME"));
              this.setState({isAuthenticated : true});
            } else{
                  <Alert severity="info" >
                    <AlertTitle>INFO</AlertTitle>
                    {response.message}
                  </Alert>   
            }
            
        })
        .catch(error => {
                        if(error.status === 401) {
                            let unauthmessage = {message: 'UTAHub App',description: "Your Username or Password is incorrect. Please try again!"};
                            console.log("login msg:", "Your Username or Password is incorrect. Please try again!");
                            <Alert severity="info" >
                            <AlertTitle>INFO</AlertTitle>
                            {unauthmessage}
                            </Alert>              
                        } else {
                            let errormessage = {message: 'UTAHub App',description: error.message || 'Sorry! Something went wrong. Please try again!'};
                            console.log("login msg:", error);
                            <Alert severity="info" >
                            <AlertTitle>INFO</AlertTitle>
                            {errormessage}
                            </Alert>                                               
                        }
                    });
        }
    
      render() {
          if(this.state.isAuthenticated){
            console.log("Inside auth",this.state.isAuthenticated);
            // return <Redirect to="/dashboard" />;
            this.props.history.push("/dashboard");
          }
          return (
            <div className="login-container">
              <MuiThemeProvider>
                <div>
                <h1 className="page-title">Login</h1>
                 
                 <div className="login-content">
                 <FormGroup onSubmit={this.handleClick} className="login-form">
                        <FormItem label="Username"
                            hasFeedback
                            // validateStatus={this.state.username.validateStatus}
                            help={this.state.username.errorMsg}>
                            <TextField 
                                size="large"
                                name="username" 
                                autoComplete="off"
                                placeholder="A unique username"
                                value={this.state.username} 
                                // onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleChange(event, this.validateUsername)} 
                                />    
                        </FormItem>
                        <FormItem 
                            label="Password"
                            // validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <TextField
                                size="large"
                                name="password" 
                                type="password"
                                autoComplete="off"
                                placeholder="A password between 6 to 20 characters" 
                                value={this.state.password} 
                                onChange={(event) => this.handleChange(event, this.validatePassword)} />    
                        </FormItem>
                        <FormItem>
                            <Button type="primary" 
                                // htmlType="submit" 
                                size="large" 
                                className="signup-form-button"
                                /* disabled={this.isFormInvalid()}*/ onClick={(event) => this.handleClick(event)}>Sign In</Button>
                            {/* Or <Link to="/register">register now!</Link> */}
                        </FormItem>
                    </FormGroup>
               </div> 
              </div>
              </MuiThemeProvider>
            </div>
          );
        }
      }

export default withRouter(Login);