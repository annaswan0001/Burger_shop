import React, { useState } from "react";
import styles from "./BurgerBuilder.module.css";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummery/OrderSummery";
import axios from "../../axios-orders";

const PRICES = {
  meat: 2.3,
  bacon: 2.2,
  cheese: 1,
  salad: 1
};
export default class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      meat: 0,
      bacon: 0,
      cheese: 0,
      salad: 0
    },
    totalPrice: 5,
    purchaseble: false,
    purchasing: false
  };
  checkPurchaseble = ingredientsForPurchase => {
    const summ = Object.keys(ingredientsForPurchase)
      .map(key => {
        return ingredientsForPurchase[key];
      })
      .reduce((arr, el) => {
        return arr + el;
      }, 0);
    console.log(summ);

    this.setState({ purchaseble: summ > 0 });
  };
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const newState = { ...this.state.ingredients };
    newState[type] = newCount;
    const newPrice = this.state.totalPrice + PRICES[type];
    this.setState({ ingredients: newState, totalPrice: newPrice });
    this.checkPurchaseble(newState);
  };
  deleteIngredientHandler = type => {
    if (this.state.ingredients[type] > 0) {
      const oldCount = this.state.ingredients[type];
      const newCount = oldCount - 1;
      let newState = { ...this.state.ingredients };
      newState[type] = newCount;
      const newPrice = this.state.totalPrice - PRICES[type];
      this.setState({ ingredients: newState, totalPrice: newPrice });
      this.checkPurchaseble(newState);
    }
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancel = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinue = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Anna",
        surname: "Samoylenko",
        adress: {
          adress: "Lva Tostogo",
          zipCode: "09100",
          country: "Ukraine"
        },
        email: "annaswan@ukr.net",
        deliveryMrthod: "fastest"
      }
    };
    axios.post("./orders.json", order)
    .then(resp=>console.log(resp))
    .catch(err=>console.log(err))
  };
  render() {
    let stateForDisabled = { ...this.state.ingredients };

    for (let key in stateForDisabled) {
      stateForDisabled[key] = stateForDisabled[key] <= 0;
    }

    return (
      <div className={styles.content}>
        {console.log(this.state.purchasing)}

        <Modal modalClosed={this.purchaseCancel} show={this.state.purchasing}>
          <OrderSummary
            purchaseCanceled={this.purchaseCancel}
            purchaseContinued={this.purchaseContinue}
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
          />
        </Modal>

        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          purchaseble={this.state.purchaseble}
          price={this.state.totalPrice}
          disabled={stateForDisabled}
          add={this.addIngredientHandler}
          delete={this.deleteIngredientHandler}
          purchaseHandler={this.purchaseHandler}
        />
      </div>
    );
  }
}
