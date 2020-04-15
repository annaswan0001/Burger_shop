import React, { useState } from 'react';
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import WithError from '../../../HOC/WithErrorHandler'
import {connect} from 'react-redux'
import {purchaseBurgerStart} from '../../../store/actions/orderAction.ts'
import {reseteIngredients} from '../../../store/actions/burgerBuilderAction.ts'

const  ContactData =(props)=> {

const [orderForm, setOrderForm] = useState({
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
},)

const [formIsValid, setFormIsValid] = useState(false)


    const checkValidity = (value, rules)=>{
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
    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid=checkValidity(updatedFormElement.value, updatedFormElement.validation)
        console.log(updatedFormElement.valid)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm)
        setFormIsValid(formIsValid)
     
    }

    const orderHandler = ( event ) => {
        event.preventDefault();
        
        let formData = {}
        for (let key in orderForm){
            formData[key]=orderForm[key].value
        }
        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData,
            userId: props.userId
        }
        if(order.ingredients){
            props.purchaseBurgerStart(order, props.token)
        }
       props.reseteIngredients()
            props.history.push('/');

    }


        const formElementsArray = [];
        for (let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            });
        }
        
        let form = (
            <form onSubmit={orderHandler}>
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
                        changed={(event) => inputChangedHandler(event, formElement.id)}
                         />
                ))}
                <Button disabled={!formIsValid} btnType="Success">ORDER</Button>
            </form>
        );
        if ( props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    
}
const mapStateToProps = (state) =>({
    ingredients:state.burgerBuilder.ingredients,
    totalPrice:state.burgerBuilder.totalPrice,
    loading:state.order.loading,
    token: state.auth.token,
    userId:state.auth.userId
  
  })
export default connect(mapStateToProps,{purchaseBurgerStart,reseteIngredients})(WithError(ContactData,axios));