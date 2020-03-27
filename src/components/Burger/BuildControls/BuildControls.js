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
    {controls.map(cntrl => (
      <BuildControl
        disabled= {props.disabled[cntrl.type]}
        add={() => props.add(cntrl.type)}
        delete={() => props.delete(cntrl.type)}
        label={cntrl.label}
        key={cntrl.type}
      />
    ))}
  </div>
);

export default buildControls;
