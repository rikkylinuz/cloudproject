import { AppBar, Button, withStyles } from '@material-ui/core';
import { Tab, Tabs } from 'material-ui';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import BuySellItems from './BuySellItems';
import SearchLostItem from './SearchLostItem';
import UploadLostItem from './UploadLostItem';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';


const styles = theme => ({
    appbar: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#006fcf",
        height: '60px'
    }
});


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

class Dashboard extends Component {

    constructor(props){
        super(props);

        this.state = {
            redirect : false,
            updatedItem: {},
            newItem: null,
            value: 0
        }
    }

    handleChange = (event, value) => {
        this.setState({value});
    }

    updatedItem = item => {
        this.setState({
            updatedItem : item
        })
    };

    componentDidMount(){
        const sessionToken = sessionStorage.getItem("SESSION_AUTHENTICATED");
        console.log("session token", sessionToken);
        if(!sessionToken){
            this.setState({redirect: true});
        }
    }

    logout = () => {
        sessionStorage.removeItem("SESSION_AUTHENTICATED");
        sessionStorage.removeItem("SESSION_USERNAME");
        this.setState({redirect: true});
    }
    render(){
        const redirect = this.state.redirect;
        const username = sessionStorage.getItem("SESSION_USERNAME"); 
        const {classes} = this.props;
        if(redirect){
            return <Redirect to="/" />
        }
        return (
            <div>
                <div>
                    <AppBar position="static" className={classes.appbar}>
                        <Tabs value={this.state.value} onChange={this.handleChange}>
                            <Tab label="Buy/Sell Items" {...a11yProps(0)}/>
                            <Tab label="Search Lost-Item" {...a11yProps(1)}/>
                            <Tab label="Upload Lost-Item" {...a11yProps(2)}/>
                        </Tabs>
                        <Typography align="right">Welcome {username}</Typography>
                            <Button onClick={this.logout}>Logout</Button>
                    </AppBar>
                      
                 <TabPanel value={this.state.value} index={0} >
                    <BuySellItems updatedItem={this.state.updatedItem} newItem={this.state.newItem} history={this.props.history}/>
                </TabPanel>
                <TabPanel value={this.state.value} index={1} >
                    <SearchLostItem />
                </TabPanel>
                <TabPanel value={this.state.value} index={2} >
                    <UploadLostItem />
                </TabPanel> 
                </div>
            </div>
        );
    }   
}

export default withStyles(styles) (Dashboard);