import React, { useState } from "react";
import styles from "./BurgerBuilder.module.css";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummery/OrderSummery";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withError from "../../HOC/WithErrorHandler";
import {connect} from 'react-redux'
import {addIngredient,initIngredients, removeIngredient} from '../../store/actions/burgerBuilderAction'

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false,
    spinner: false,
    error: false
  };
  componentDidMount() {
    this.props.initIngredients()
  }

  checkPurchaseble = ingredientsForPurchase => {
    const summ = Object.keys(ingredientsForPurchase)
      .map(key => {
        return ingredientsForPurchase[key];
      })
      .reduce((arr, el) => {
        return arr + el;
      }, 0);
    return summ > 0;
  };


  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancel = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinue = () => {
    this.props.history.push("/checkout")
  };
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
    if (this.state.spinner || !this.props.ingredients) {
      orderSummery = <Spinner />;
    }

    let burger = this.props.error ? (
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
const mapStateToProps= (state) =>({
  ingredients:state.ingredients,
  totalPrice:state.totalPrice,
  error:state.error
})


export default connect(mapStateToProps, {initIngredients, addIngredient, removeIngredient})(withError(BurgerBuilder, axios));
