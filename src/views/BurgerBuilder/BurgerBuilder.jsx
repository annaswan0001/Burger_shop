import React, { useState } from "react";
import styles from "./BurgerBuilder.module.css";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummery/OrderSummery";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withError from "../../HOC/WithErrorHandler";
import { connect } from "react-redux";
import {
  addIngredient,
  initIngredients,
  removeIngredient,
} from "../../store/actions/burgerBuilderAction";
import { purchaseInit } from "../../store/actions/orderAction";
import { setAuthRedirectPath} from "../../store/actions/authAction";

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    if(!this.props.building){
      this.props.initIngredients();
    }
  }

  checkPurchaseble = (ingredientsForPurchase) => {
    const summ = Object.keys(ingredientsForPurchase)
      .map((key) => {
        return ingredientsForPurchase[key];
      })
      .reduce((arr, el) => {
        return arr + el;
      }, 0);
    return summ > 0;
  };

  purchaseHandler = () => {
    if (this.props.token){
      this.setState({ purchasing: true });
    }else{
      this.props.setAuthRedirectPath("/checkout")
      this.props.history.push("/auth")
    }

  };

  purchaseCancel = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinue = () => {
    this.props.purchaseInit();
    this.props.history.push("/checkout");
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let stateForDisabled = { ...this.props.ingredients };

    for (let key in stateForDisabled) {
      stateForDisabled[key] = stateForDisabled[key] <= 0;
    }

    let orderSummery = (
      <OrderSummary
        purchaseCanceled={this.purchaseCancel}
        purchaseContinued={this.purchaseContinue}
        price={this.props.totalPrice}
        ingredients={this.props.ingredients}
      />
    );

    if (this.props.spinner || !this.props.ingredients) {
      orderSummery = <Spinner />;
    }

    let burger = this.props.spinner ? <Spinner /> : null;

    burger = this.props.error ? (
      <div>Ingredients cant be loaded</div>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            purchaseble={this.checkPurchaseble(this.props.ingredients)}
            price={this.props.totalPrice}
            disabled={stateForDisabled}
            add={this.props.addIngredient}
            delete={this.props.removeIngredient}
            purchaseHandler={this.purchaseHandler}
            token={this.props.token}
          />
        </React.Fragment>
      );
    }

    return (
      <div className={styles.content}>
        {console.log(this.state.purchasing)}

        <Modal modalClosed={this.purchaseCancel} show={this.state.purchasing}>
          {orderSummery}
        </Modal>
        {burger}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  spinner: state.burgerBuilder.spinner,
  token: state.auth.token,
  redirectPath: state.auth.redirectPath,
  building:state.burgerBuilder.building
});

export default connect(mapStateToProps, {
  purchaseInit,
  initIngredients,
  addIngredient,
  removeIngredient,
  setAuthRedirectPath
})(withError(BurgerBuilder, axios));
