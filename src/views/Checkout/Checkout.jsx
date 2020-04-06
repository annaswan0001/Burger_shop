import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
import {connect} from 'react-redux'


 class Checkout extends React.Component {

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinueHandler = () => {
    this.props.history.replace(`${this.props.match.url}/contact-data`);
  };
  render() {
    return (
      <div>
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
}

const mapStateToProps = (state) =>({
  ingredients:state.ingredients,

})

export default connect(mapStateToProps,null)(Checkout)