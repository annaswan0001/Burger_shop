import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
import { connect } from "react-redux";


const Checkout =(props)=>{


  const checkoutCancelHandler = () => {
    props.history.goBack();
  };
  const checkoutContinueHandler = () => {
    props.history.replace(`${props.match.url}/contact-data`);
  };



    let summary = <Redirect to="/" />
        if ( props.ingredients) {
            const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={props.ingredients}
                        checkoutCancelled={checkoutCancelHandler}
                        checkoutContinued={checkoutContinueHandler} />
                    <Route
                        path={props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }
        return summary;
}

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  purchased:state.order.purchased
});

export default connect(mapStateToProps, null)(Checkout);
