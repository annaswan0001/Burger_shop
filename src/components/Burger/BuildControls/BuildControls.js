import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Total price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(cntrl => (
      <BuildControl
        disabled={props.disabled[cntrl.type]}
        add={() => props.add(cntrl.type)}
        delete={() => props.delete(cntrl.type)}
        label={cntrl.label}
        key={cntrl.type}
      />
    ))}
    <button
      onClick={props.purchaseHandler}
      disabled={!props.purchaseble}
      className={classes.OrderButton}
    >
      {props.token? "Order": "Sign Up to order"}
    </button>
  
  </div>
);

export default buildControls;
