import React, { Component } from 'react';
import { purchaseProduct } from '../util/Utils';
import { Alert,AlertTitle } from '@material-ui/lab';
import { Redirect } from "react-router-dom";

class Purchase extends Component {

    constructor(props){
        super(props);
        this.state={
            isPurchased: false,
            selectedQuantity : null
        }
    }

    handleClick=(event)=>{
        event.preventDefault();
        console.log("Inside Purchase Product handle click!")
        console.log("e",event.value);
        console.log("this.state.selectedQuantity",this.state.selectedQuantity);
        const postPurchaseRequest = {
            productId: this.props.selectedItem.productId,
            productname: this.props.selectedItem.productName,
            quantity: this.state.selectedQuantity,
            sellername: this.props.selectedItem.sellerName
        };
        console.log("prod name: ", this.props.selectedItem.productName);

        purchaseProduct(postPurchaseRequest).then(response=>{
            console.log("response",response);
            let successmessage = {message: 'UTAHub App',description: "Thank you! You're successfully registered. Please Login to continue!"};
            <Alert severity="info" >console.log("Thank you! You're successfully registered.");
            <AlertTitle>INFO</AlertTitle>
            {successmessage}
            </Alert>         
            this.setState({isPurchased : true});
        }).catch(error => {
            let errormessage = {message: 'UTAHub App',description: error.message || 'Sorry! Something went wrong. Please try again!'};
            <Alert severity="info" >console.log("Error while purchasing")
            <AlertTitle>INFO</AlertTitle>
            {errormessage}
            </Alert>
        });
    }

    handleChange=(e)=>{
        console.log("e val: ",e.target.value);
        this.setState({selectedQuantity: e.target.value});
    }

    render(){
        if(this.state.isPurchased){
            console.log("Inside auth",this.state.isPosted);
            this.props.changePurchaseClicked(true);
            return <Redirect to="/dashboard"/>;
        }
        return (
            <div>
                <form onSubmit={this.handleClick}>
                <label>
                Quantity:
                <input type="number" value={this.state.selectedQuantity} onChange={this.handleChange} min="1" max={this.props.selectedItem.quantity}/>
                </label>
                <label>
                Price:
                <input type="text" value={this.state.selectedQuantity * parseFloat(this.props.selectedItem.price)}/> 
                </label>
                <input type="submit" value="Submit" />
            </form>
            </div>
        )
    }
}

export default Purchase;