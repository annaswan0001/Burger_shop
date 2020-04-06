import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
import { connect } from "react-redux";
import {purchaseInit} from '../../store/actions/orderAction'

class Checkout extends React.Component {

  
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinueHandler = () => {
    this.props.history.replace(`${this.props.match.url}/contact-data`);
  };
  render() {

    const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
    let summary = <Redirect to="/"/>;

    if (this.props.ingredients) {
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            checkoutCancelled={this.checkoutCancelHandler}
            checkoutContinued={this.checkoutContinueHandler}
            ingredients={this.props.ingredients}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  purchased:state.order.purchased
});

export default connect(mapStateToProps, null)(Checkout);
