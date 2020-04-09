import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import WithError from '../../../HOC/WithErrorHandler'
import {connect} from 'react-redux'
import {purchaseBurgerStart} from '../../../store/actions/orderAction'
import {reseteIngredients} from '../../../store/actions/burgerBuilderAction'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false
                ,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'cheapest',
                valid: true,
                validation:{}
            }
        },
        formIsValid:false
    }

    checkValidity = (value, rules)=>{
            let isValid = true;
            if(!rules){
                return true
            }
            if(rules.required){
                isValid = value.trim() !== "" && isValid
            }
            if (rules.minLength){
                isValid = (value.length >= rules.minLength) && isValid
            }
            if (rules.maxLength){
                isValid = (value.length <= rules.maxLength) && isValid
            }
         
            return isValid
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        console.log(updatedFormElement.valid)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid});
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        
        let formData = {}
        for (let key in this.state.orderForm){
            formData[key]=this.state.orderForm[key].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        }
        if(order.ingredients){
            this.props.purchaseBurgerStart(order, this.props.token)
        }
       this.props.reseteIngredients()
            this.props.history.push('/');

    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                    invalid={!formElement.config.valid}
                        key={formElement.id}
                        name={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        shouldValidate ={formElement.config.validation}
                        touched= {formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                         />
                ))}
                <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}
const mapStateToProps = (state) =>({
    ingredients:state.burgerBuilder.ingredients,
    totalPrice:state.burgerBuilder.totalPrice,
    loading:state.order.loading,
    token: state.auth.token,
    userId:state.auth.userId
  
  })
export default connect(mapStateToProps,{purchaseBurgerStart,reseteIngredients})(WithError(ContactData,axios));