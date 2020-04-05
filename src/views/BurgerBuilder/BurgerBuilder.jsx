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
import {addIngredient, removeIngredient} from '../../store/actions/action'

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
    console.log(this.props.history);
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
  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const newCount = oldCount + 1;
  //   const newState = { ...this.state.ingredients };
  //   newState[type] = newCount;
  //   const newPrice = this.state.totalPrice + PRICES[type];
  //   this.setState({ ingredients: newState, totalPrice: newPrice });
  //   this.checkPurchaseble(newState);
  // };
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
    const queryParams = [];
    for (let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push("price="+this.state.totalPrice)
    const queryString = queryParams.join("&")
    this.props.history.push({
      pathname:"/checkout",
      search:"?" + queryString
    })
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
        price={this.state.totalPrice}
        ingredients={this.props.ingredients}
      />
    );
    if (this.state.spinner || !this.props.ingredients) {
      orderSummery = <Spinner />;
    }

    let burger = this.state.error ? (
      <div>Ingredients cant be loaded</div>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            purchaseble={this.state.purchaseble}
            price={this.state.totalPrice}
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
  ingredients:state.ingredients
})


export default connect(mapStateToProps, {addIngredient, removeIngredient})(withError(BurgerBuilder, axios));
