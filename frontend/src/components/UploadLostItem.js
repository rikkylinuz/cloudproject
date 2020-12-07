import React, { Component } from 'react';
import { postItem } from '../util/Utils';
import '../css/Lostitempost.css';
import NumberFormat from 'react-number-format';
import { 
    PRODUCT_NAME_MIN_LENGTH, PRODUCT_NAME_MAX_LENGTH, 
    PRODUCT_DESCRIPTION_MIN_LENGTH, PRODUCT_DESCRIPTION_MAX_LENGTH,
    PRODUCT_PRICE_MIN_LENGTH, PRODUCT_PRICE_MAX_LENGTH,
    PRODUCT_QUANTITY_MIN_LENGTH, PRODUCT_QUANTITY_MAX_LENGTH,
    PRODUCT_SELLERNAME_MIN_LENGTH, PRODUCT_SELLERNAME_MAX_LENGTH,
} from '../util/Constants';
import { Alert,AlertTitle } from '@material-ui/lab';
import { FormGroup, Button , FormControl, TextField, Input} from '@material-ui/core';
import { useHistory,Redirect } from "react-router-dom";
const FormItem = FormControl;

class UploadLostItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LostitemName: {
                value: ''
            },
            Lostitemdescription: {
                value: ''
            },
            picture: {
                value: ''
            },
            sellerName: {
                value: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleUploadClick = this.handleUploadClick.bind(this);

    }
    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }
    handleUploadClick = event => {
        event.preventDefault();
        console.log("Inside handle click.");
        var file = event.target.files[0];
        console.log("file: ",file);
        const preview = document.querySelector('img');
        const reader = new FileReader();
        

        reader.addEventListener('load', function(e) {
            preview.src = reader.result;
        },false);
        console.log("reader.result",reader.result);
        
        reader.onloadend = function(e) {
          this.setState({
            selectedFile: [reader.result],
            value : [reader.result]
          }, () => { console.log(this.state.selectedFile) });
        }.bind(this);
        //  // Would see a path?
        console.log('state electedFile', this.state.selectedFile);
        if(file){
            var url = reader.readAsDataURL(file);
            this.setState({
                picture : url
              }, () => { console.log("106 picture ",url) });
        }
        console.log("url: ",url);
        console.log('state electedFile 1: ', this.state.selectedFile);
      };
      handleSubmit(event) {
        event.preventDefault();
        console.log("Inside Post Product!")
        console.log("this.state.picture.value: ", this.state.selectedFile);
        const postItemRequest = {
            LostitemName: this.state.LostitemName.value,
            Lostitemdescription: this.state.Lostitemdescription.value,
            picture: this.state.selectedFile,
            sellerName: this.state.sellerName.value,
        };
        postItem(postItemRequest)
        .then(response => {
            console.log("response",response);
            let successmessage = {message: 'UTAHub App',description: "Thank you! You're gonna make someone happy :) "};
            <Alert severity="info" >console.log("Lost Item uploaded");
            <AlertTitle>INFO</AlertTitle>
            {successmessage}
            </Alert>         
            this.setState({isPosted : true});
        }).catch(error => {
            let errormessage = {message: 'UTAHub App',description: error.message || 'Sorry! Something went wrong. Please try again!'};
            <Alert severity="info" >console.log("Error while uploading")
            <AlertTitle>INFO</AlertTitle>
            {errormessage}
            </Alert>
        });
    }
    isFormInvalid() {
        return !(this.state.LostitemName.validateStatus === 'success' &&
            this.state.Lostitemdescription.validateStatus === 'success' &&
            this.state.sellerName.validateStatus === 'success'
        );
    }

    render(){
        if(this.state.isPosted){
            console.log("Inside auth",this.state.isPosted);
            return <Redirect to="/dashboard"/>;
            // this.props.history.push("/dashboard");
        }
        return (
            <div className="lostitem-container">
                <h1 className="page-title">Enter the details of the item  you want to upload.</h1>
                <div className="lostitem-content">
                    <FormGroup onSubmit={this.handleSubmit} className="postitem-form">
                        <FormItem 
                            label="Item Name"
                            validateStatus={this.state.LostitemName.validateStatus}
                            help={this.state.LostitemName.errorMsg}>
                            <TextField 
                                name="LostitemName"
                                autoComplete="off"
                                placeholder="Your item name"
                                value={this.state.LostitemName.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateProductName)} 
                                />    
                        </FormItem>
                        <FormItem label="Description"
                            hasFeedback
                            validateStatus={this.state.Lostitemdescription.validateStatus}
                            help={this.state.Lostitemdescription.errorMsg}>
                            <TextField 
                                name="Lostitemdescription" 
                                autoComplete="off"
                                placeholder="product description"
                                value={this.state.Lostitemdescription.value} 
                                // onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateDescription)} 
                                />    
                        </FormItem>
                        <FormItem 
                            label="Seller Name"
                            validateStatus={this.state.sellerName.validateStatus}
                            help={this.state.sellerName.errorMsg}>
                            <TextField
                                name="sellerName" 
                                placeholder="Seller Name." 
                                value={this.state.sellerName.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateSellerName)} />    
                        </FormItem>
                        <FormItem 
                            label="Picture" placeholder="Choose your product picture">
                            <input
                                        accept="image/*"
                                        // className={classes.input}
                                        name="picture"
                                        id="contained-button-file"
                                        // multiple
                                        type="file"
                                        onChange={this.handleUploadClick}
                                        />
                                        
                            <img src="" height="200" alt="Image preview..."></img>
                        </FormItem>
                            {/* // validateStatus={this.state.picture.validateStatus}> */}
                                
                        
                        <FormItem>
                            <Button type="primary" 
                                size="large" 
                                className="postitem-form-button"
                                /* disabled={this.isFormInvalid()}*/ onClick={(event) => this.handleSubmit(event)}>Post Item</Button>
                            {/* Already registed? <Link to="/authenticate">Login now!</Link> */}
                        </FormItem>
                    </FormGroup>
                </div>
            </div>
        );
    }

    // Validation Functions
    validateProductName = (LostitemName) => {
        if(LostitemName.length < PRODUCT_NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Product name is too short (Minimum ${PRODUCT_NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (LostitemName.length > PRODUCT_NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Product name is too long (Maximum ${PRODUCT_NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    validateDescription = (Lostitemdescription) => {
        if(Lostitemdescription.length < PRODUCT_DESCRIPTION_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Description is too short (Minimum ${PRODUCT_DESCRIPTION_MIN_LENGTH} characters needed.)`
            }
        } else if (Lostitemdescription.length > PRODUCT_DESCRIPTION_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Description is too long (Maximum ${PRODUCT_DESCRIPTION_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }



    validateSellerName = (sellerName) => {
        if(sellerName.length < PRODUCT_SELLERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `SELLERNAME is too short (Minimum ${PRODUCT_SELLERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (sellerName.length > PRODUCT_SELLERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `SELLERNAME is too long (Maximum ${PRODUCT_SELLERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }
}

export default UploadLostItem;