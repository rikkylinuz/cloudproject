import React, { Component } from 'react';
import { postProduct } from '../util/Utils';
import '../css/Signup.css';
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

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  }

class SellProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: {
                value: ''
            },
            description: {
                value: ''
            },
            price: {
                value: ''
            },
            quantity: {
                value: ''
            },
            sellerName: {
                value: ''
            },
            picture: {
                value: ''
            },
            selectedFile: null,
            isPosted: false
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
        const postProductRequest = {
            productname: this.state.productName.value,
            price: this.state.price.value,
            description: this.state.description.value,
            quantity: this.state.quantity.value,
            sellername: this.state.sellerName.value,
            picture: this.state.selectedFile
        };
        postProduct(postProductRequest)
        .then(response => {
            console.log("response",response);
            let successmessage = {message: 'UTAHub App',description: "Thank you! You're successfully registered. Please Login to continue!"};
            <Alert severity="info" >console.log("Thank you! You're successfully registered.");
            <AlertTitle>INFO</AlertTitle>
            {successmessage}
            </Alert>         
            this.setState({isPosted : true});
        }).catch(error => {
            let errormessage = {message: 'UTAHub App',description: error.message || 'Sorry! Something went wrong. Please try again!'};
            <Alert severity="info" >console.log("Error while registering")
            <AlertTitle>INFO</AlertTitle>
            {errormessage}
            </Alert>
        });
    }

    isFormInvalid() {
        return !(this.state.productName.validateStatus === 'success' &&
            this.state.description.validateStatus === 'success' &&
            this.state.price.validateStatus === 'success' &&
            this.state.quantity.validateStatus === 'success' && 
            this.state.sellerName.validateStatus === 'success' 
        );
    }

    render() {
        if(this.state.isPosted){
            console.log("Inside auth",this.state.isPosted);
            this.props.changeSellItemEnabled(true);
            return <Redirect to="/dashboard"/>;
            // this.props.history.push("/dashboard");
        }
        return (
            <div className="signup-container">
                <h1 className="page-title">Enter the details of the product you want to sell.</h1>
                <div className="signup-content">
                    <FormGroup onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem 
                            label="Product Name"
                            validateStatus={this.state.productName.validateStatus}
                            help={this.state.productName.errorMsg}>
                            <TextField 
                                name="productName"
                                autoComplete="off"
                                placeholder="Your product name"
                                value={this.state.productName.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateProductName)} 
                                />    
                        </FormItem>
                        <FormItem label="Description"
                            hasFeedback
                            validateStatus={this.state.description.validateStatus}
                            help={this.state.description.errorMsg}>
                            <TextField 
                                name="description" 
                                autoComplete="off"
                                placeholder="product description"
                                value={this.state.description.value} 
                                // onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateDescription)} 
                                />    
                        </FormItem>
                        <FormItem 
                            hasFeedback
                            validateStatus={this.state.price.validateStatus}
                            help={this.state.price.errorMsg}>
                            <TextField 
                                name="price"  
                                autoComplete="off"
                                placeholder="Your product price"
                                value={this.state.price.value} 
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                                onChange={(event) => this.handleInputChange(event, this.validatePrice)} 
                                />    
                        </FormItem>
                        <FormItem 
                            label="Quantity"
                            validateStatus={this.state.quantity.validateStatus}
                            help={this.state.quantity.errorMsg}>
                            <TextField
                                name="quantity" 
                                type="number"
                                placeholder="Number of quantity available to sell." 
                                value={this.state.quantity.value} 
                                // InputLabelProps={{
                                //     shrink: false,
                                //   }}
                                onChange={(event) => this.handleInputChange(event, this.validateQuantity)} />    
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
                                className="signup-form-button"
                                /* disabled={this.isFormInvalid()}*/ onClick={(event) => this.handleSubmit(event)}>Post Product</Button>
                            {/* Already registed? <Link to="/authenticate">Login now!</Link> */}
                        </FormItem>
                    </FormGroup>
                </div>
            </div>
        );
    }

    // Validation Functions
    validateProductName = (productName) => {
        if(productName.length < PRODUCT_NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Product name is too short (Minimum ${PRODUCT_NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (productName.length > PRODUCT_NAME_MAX_LENGTH) {
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

    validateDescription = (description) => {
        if(description.length < PRODUCT_DESCRIPTION_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Description is too short (Minimum ${PRODUCT_DESCRIPTION_MIN_LENGTH} characters needed.)`
            }
        } else if (description.length > PRODUCT_DESCRIPTION_MAX_LENGTH) {
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

    validatePrice = (price) => {
        if(price.length < PRODUCT_PRICE_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Price is too short (Minimum ${PRODUCT_PRICE_MIN_LENGTH} characters needed, ex.(1.00).)`
            }
        } else if (price.length > PRODUCT_PRICE_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Price is too long (Maximum ${PRODUCT_PRICE_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    validateQuantity = (quantity) => {
        if(quantity.length < PRODUCT_QUANTITY_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `QUANTITY is too short (Minimum ${PRODUCT_QUANTITY_MIN_LENGTH} characters needed.)`
            }
        } else if (quantity.length > PRODUCT_DESCRIPTION_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `QUANTITY is too long (Maximum ${PRODUCT_QUANTITY_MAX_LENGTH} characters allowed.)`
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

export default SellProduct;