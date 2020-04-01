import React from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

export default class Checkout extends React.Component {
    constructor(props) {
        super(props);
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
                checkoutContinued={this.checkoutContinueHandler}/>
            </div>
        )
    }
}