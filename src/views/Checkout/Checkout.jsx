import React from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

export default class Checkout extends React.Component {
   state={
       ingredients:[]
   }
   componentDidMount() {
       const query = new URLSearchParams(this.props.location.search)
       const ingredients={}
       for(let [key, value] of query.entries()){
            ingredients[key]= +value
       }
       this.setState({ingredients})
   }
   
    
    checkoutCancelHandler=()=>{
        this.props.history.goBack()
    }
    checkoutContinueHandler=()=>{
        this.props.history.replace('./checkout/contact-data')
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                checkoutCancelled={this.checkoutCancelHandler}
                checkoutContinued={this.checkoutContinueHandler}
                ingredients={this.state.ingredients}
                />
                
            </div>
        )
    }
}