import React, { useState } from "react";
import styles from "./BurgerBuilder.module.css";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const PRICES = {
    meat: 2,
    bacon: 2,
    cheese: 1,
    salad: 1
}
export default class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      meat: 0,
      bacon: 0,
      cheese: 0,
      salad: 0
    },
    totalPrice:5
  };

  addIngredientHandler = (type)=>{
      if(this.state.ingredients[type]>=0){
        const oldCount = this.state.ingredients[type]
        const newCount = oldCount+1;
        const newState = {...this.state.ingredients}
        newState[type] = newCount
        const newPrice = this.state.totalPrice + PRICES[type]
        this.setState({ingredients:newState, totalPrice:newPrice})
      }

  }
  deleteIngredientHandler = (type)=>{
    if(this.state.ingredients[type]>0){ 
        const oldCount = this.state.ingredients[type]
        const newCount = oldCount-1;
        let newState = {...this.state.ingredients}
        newState[type] = newCount
        const newPrice = this.state.totalPrice - PRICES[type]
        this.setState({ingredients:newState, totalPrice:newPrice})}
    
}

  render() {
      let stateForDisabled = {...this.state.ingredients}

      for(let key in stateForDisabled){
        stateForDisabled[key] = stateForDisabled[key]<=0
      }

    return (
      <div className={styles.content}>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
        disabled={stateForDisabled}
        add={this.addIngredientHandler} 
        delete={this.deleteIngredientHandler} />

      </div>
    );
  }
}
