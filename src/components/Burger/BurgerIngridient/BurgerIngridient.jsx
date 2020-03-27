import React from "react";
import propTypes from 'prop-types'
import styles from './BurgerIngredient.module.css'

export default function BurgerIngridient(props) {
  let ingredient = null;

  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={styles.breadBottom}></div>;
      break;
    case "bread-top":
      ingredient = (
        <div className={styles.breadTop}>
          <div className={styles.seeds1}></div>
          <div className={styles.seeds2}></div>
        </div>
      );
      break;
    case "meat":
      ingredient = <div className={styles.meat}></div>;
      break;
    case "bacon":
      ingredient = <div className={styles.bacon}></div>;
      break;
    case "cheese":
      ingredient = <div className={styles.cheese}></div>;
      break;
      case "salad":
        ingredient = <div className={styles.salad}></div>;
        break;
    default:
      ingredient = null;
  }
  return ingredient;

}
BurgerIngridient.propTypes={
    type:propTypes.string.isRequired
}