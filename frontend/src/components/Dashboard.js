import { AppBar, withStyles } from '@material-ui/core';
import { Tab, Tabs } from 'material-ui';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import BuySellItems from './BuySellItems';
import SearchLostItem from './SearchLostItem';
import UploadLostItem from './UploadLostItem';
import Container from '@material-ui/core/Container';
import { TabPanel } from '@material-ui/lab';

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

        this.state = {
            redirect : false,
            value: 0
        }
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    
    }
    handleSuccessfulAuth(data){
        this.props.history.push("/");
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
        const redirect = this.state;
        const username = sessionStorage.getItem("SESSION_USERNAME"); 
        const {classes} = this.props;
        const {values} = this.state;
        if(redirect){
            return <Redirect to="/authenticate" />
        }
        return(
            
            <div><p>{this.props.isAuthenticated}</p>
                <div>
                    <AppBar position="static" className={classes.appbar}>
                        <Tabs value={this.state.value} onChange={this.handleChange}>
                            <Tab label="Buy/Sell Items" />
                            <Tab label="Search Lost-Item" />
                            <Tab label="Upload Lost-Item" />
                        </Tabs>
                    </AppBar>
                </div>
                <div>
                    <div>Welcome {username}</div>
                    <div onClick={this.logout}>Logout</div>
                </div>
                <TabPanel value={0} index={0}>
                    <BuySellItems />
                </TabPanel>
                <TabPanel value={1} index={1}>
                    <SearchLostItem />
                </TabPanel>
                <TabPanel value={2} index={2}>
                    <UploadLostItem />
                </TabPanel>
            </div>
        );
    }
}

export default withStyles(styles) (HomePage);