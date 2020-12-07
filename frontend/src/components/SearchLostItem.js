import { Button } from '@material-ui/core';
import React, { Component } from 'react';

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


import {getlostProducts} from '../util/Utils.js'

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


class SearchLostItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            selectedItem: {}
        }
    }

    componentDidMount() {
        getlostProducts().then(result => {
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

    handlePurchaseClick=(item)=>{
        console.log("item details: ",item);
        this.setState({isPurchaseClicked: true,
        selectedItem : item});        
    }


    render(){
        const style = {
            height: 32,
          };
        const classes = useStyles;
        return(
            <div>
                <div>
                    <label>If you want to list a lost item on UTAHub, please click the Upload-lost item tab on the top</label>
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
                        title={tile.lostitemName}
                        subheader={'By '+tile.sellerName}
                    />
                    <CardMedia 
                        style={style}
                        // className={classes.media}
                        src={tile.picture.slice(1,-1)}
                        title={tile.lostitemName}
                    />
                    <CardContent>
                        <img src={tile.picture.slice(1,-1)} alt={tile.lostitemName}></img>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {"Description: "+tile.Lostitemdescription}
                        </Typography>
                        
                    </CardContent>
                    <CardActions disableSpacing>
                        <Button onClick={(event) => this.handlePurchaseClick(tile)}>CLaim</Button>
                    </CardActions>
                    
                    </Card>
                    
                    </div>
                    ))}
                
            </div>    
        )    
    }
}

export default SearchLostItem;