import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import SellProduct from './SellProduct';

import { makeStyles } from '@material-ui/core/styles';
import { Alert,AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import Purchase from './Purchase';
import {getProducts} from '../util/Utils.js'

  //CARD view
  const useStyles = makeStyles((theme) => ({
    
    root: {
        width: '30px',
        height: '30px',
    },
    media: {
      height: '25%',
      width: '25%',// 16:9
    },
    
  }));

class BuySellItems extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            selectedItem: {},
            isPurchaseClicked: false,
            isSellItemEnabled: false
        }
    }

    componentDidMount() {
        getProducts().then(result => {
            if(result){
                this.setState({items: result});
            }
        }).catch(error => {
            let errormessage = {message: 'UTAHub App',description: error.message || 'Sorry! Something went wrong. Please try again!'};
            <Alert severity="info" >console.log("Error while geting all products")
            <AlertTitle>INFO</AlertTitle>
            {errormessage}
            </Alert>
        });
    }

    UNSAFE_componentWillReceiveProps(newProps){
        const oldProps = this.props;
        if(oldProps.updatedItem !== newProps.updatedItem){
            this.updatedItem(newProps.updatedItem);
        }
    }

    updatedItem(updatedItem){
        this.setState({
            items: this.state.items,
            updatedItem: updatedItem
        })
    }

    handleClick=()=>{
        if(this.state.isSellItemEnabled){
            this.setState({isSellItemEnabled: false});
        } else {
            this.setState({isSellItemEnabled: true});
        }
        
    }

    handlePurchaseClick=(item)=>{
        console.log("item details: ",item);
        this.setState({isPurchaseClicked: true,
        selectedItem : item});        
    }

    changeSellItemEnabled=(event)=>{
        if(event) {
            this.setState({isSellItemEnabled: false});
        }
        
    }
    changePurchaseClicked=(event)=>{
        if(event) {
            this.setState({isPurchaseClicked: false});
        }
    }

    changeSelectedItem=(i)=>{
        this.setState({selectedItem: i});
    }

    render(){
        const style = {
            height: 32,
          };
        const classes = useStyles;
        if(this.state.isSellItemEnabled){
            return <SellProduct changeSellItemEnabled={this.changeSellItemEnabled} history={this.props.history}/>
        }
        if(this.state.isPurchaseClicked){
            return <Purchase selectedItem={this.state.selectedItem} changePurchaseClicked={this.changePurchaseClicked} history={this.props.history}/>
        }
        return(
            <div>
                <div>
                    <label>If you want to sell an item on UTAHub, please click the sell item Button.</label>
                    <Button onClick={(event) => this.handleClick(event)} >Click to Sell Item</Button>
                </div>
                    {this.state.items.map((tile) => (
                        <div>
                        <Card className={classes.root}>
                        <CardHeader
                        action={
                        <IconButton aria-label="settings">
                            {/* <MoreVertIcon /> */}

                        </IconButton>
                        }
                        title={tile.productName}
                        subheader={'By '+tile.sellerName}
                    />
                    <CardMedia 
                        style={style}
                        // className={classes.media}
                        src={tile.picture.slice(1,-1)}
                        title={tile.productName}
                    />
                    <CardContent>
                        <img src={tile.picture.slice(1,-1)} alt={tile.productName}></img>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {"Description: "+tile.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {"Quantity Available: "+tile.quantity}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {"price: $."+tile.price}
                        </Typography>
                        
                    </CardContent>
                    <CardActions disableSpacing>
                        <Button onClick={(event) => this.handlePurchaseClick(tile)}>Purchase</Button>
                    </CardActions>
                    
                    </Card>
                    
                    </div>
                    ))}
                
            </div>    
        ) 
    }
}

export default BuySellItems;