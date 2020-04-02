import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
export default class Checkout extends React.Component {
  state = {
    ingredients: {},
    totalPrice: 0
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;
    for ( let [key,value] of query.entries() ) {
        // ['salad', '1']
        if (key === 'price') {
            totalPrice = +value;
        } else {
            ingredients[key] = +value;
        }
    }
    this.setState({ ingredients, totalPrice });
  }

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
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...this.props} //added props.history to contact data components
            />
          )}
        />
      </div>
    );
  }
}
