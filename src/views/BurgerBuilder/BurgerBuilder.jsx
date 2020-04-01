import React, { useState } from "react";
import styles from "./BurgerBuilder.module.css";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummery/OrderSummery";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withError from "../../HOC/WithErrorHandler";

const PRICES = {
  meat: 2.3,
  bacon: 2.2,
  cheese: 1,
  salad: 1
};
class BurgerBuilder extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 5,
    purchaseble: false,
    purchasing: false,
    spinner: false,
    error: false
  };
  componentDidMount() {
    console.log(this.props.history)
    axios
      .get("https://burgershop-588e7.firebaseio.com/ingredients.json")
      .then(res => {
        this.setState({ ingredients: res.data });
        console.log(res.data);
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

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
    // this.setState({ spinner: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Anna",
    //     surname: "Samoylenko",
    //     adress: {
    //       adress: "Lva Tostogo",
    //       zipCode: "09100",
    //       country: "Ukraine"
    //     },
    //     email: "annaswan@ukr.net",
    //     deliveryMrthod: "fastest"
    //   }
    // };
    // axios
    //   .post("./ordesdrs.json", order)
    //   .then(resp => {
    //     this.setState({ spinner: false, purchasing: false });
    //     console.log(resp);
    //   })
    //   .catch(err => {
    //     this.setState({ spinner: false, purchasing: false, error: true });
    //     console.log(err);
    //   });
    this.props.history.push('/checkout')
  };
  render() {
    let stateForDisabled = { ...this.state.ingredients };

    for (let key in stateForDisabled) {
      stateForDisabled[key] = stateForDisabled[key] <= 0;
    }

    let orderSummery = (
      <OrderSummary
        purchaseCanceled={this.purchaseCancel}
        purchaseContinued={this.purchaseContinue}
        price={this.state.totalPrice}
        ingredients={this.state.ingredients}
      />
    );
    if (this.state.spinner || !this.state.ingredients) {
      orderSummery = <Spinner />;
    }

    let burger = this.state.error ? (
      <div>Ingredients cant be loaded</div>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            purchaseble={this.state.purchaseble}
            price={this.state.totalPrice}
            disabled={stateForDisabled}
            add={this.addIngredientHandler}
            delete={this.deleteIngredientHandler}
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
export default withError(BurgerBuilder, axios);
