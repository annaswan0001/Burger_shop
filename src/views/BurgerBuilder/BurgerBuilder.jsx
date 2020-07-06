import React, { useState , useEffect} from "react";
import styles from "./BurgerBuilder.module.css";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummery/OrderSummery";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withError from "../../HOC/WithErrorHandler";
import { connect } from "react-redux";
import {addIngredient,initIngredients,removeIngredient,
} from "../../store/actions/burgerBuilderAction.ts";
import { purchaseInit } from "../../store/actions/orderAction.ts";
import { setAuthRedirectPath} from "../../store/actions/authAction";

const BurgerBuilder = (props)=> {

  const [purchasing, setPurchasing] = useState(false)


  useEffect(() => {
    if(!props.building){
      props.initIngredients();
    }
  }, [props.initIngredients,props.building])


  const checkPurchaseble = (ingredientsForPurchase) => {
    const summ = Object.keys(ingredientsForPurchase)
      .map((key) => {
        return ingredientsForPurchase[key];
      })
      .reduce((arr, el) => {
        return arr + el;
      }, 0);
    return summ > 0;
  };

  const purchaseHandler = () => {
    if (props.token){
      setPurchasing(true)
    }else{
      props.setAuthRedirectPath("/checkout")
      props.history.push("/auth")
    }

  };

  const purchaseCancel = () => {
    setPurchasing(false)
  };

  const purchaseContinue = () => {
    props.purchaseInit();
    props.history.push("/checkout");
  };


  
    let stateForDisabled = { ...props.ingredients };

    for (let key in stateForDisabled) {
      stateForDisabled[key] = stateForDisabled[key] <= 0;
    }

    let orderSummery = (
      <OrderSummary
        purchaseCanceled={purchaseCancel}
        purchaseContinued={purchaseContinue}
        price={props.totalPrice}
        ingredients={props.ingredients}
      />
    );

    if (props.spinner || !props.ingredients) {
      orderSummery = <Spinner />;
    }

    let burger = props.spinner ? <Spinner /> : null;

    burger = props.error ? (
      <div>Ingredients cant be loaded</div>
    ) : (
      <Spinner />
    );

    if (props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={props.ingredients} />
          
        
          <BuildControls
            purchaseble={checkPurchaseble(props.ingredients)}
            price={props.totalPrice}
            disabled={stateForDisabled}
            add={props.addIngredient}
            delete={props.removeIngredient}
            purchaseHandler={purchaseHandler}
            token={props.token}
          />
        </React.Fragment>
      );
    }

    return (
      <div className={styles.content}>
      

        <Modal modalClosed={purchaseCancel} show={purchasing}>
          {orderSummery}
        </Modal>
        {burger}
      </div>
    );
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
