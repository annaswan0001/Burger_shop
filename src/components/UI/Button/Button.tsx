import React, { ReactNode } from "react";
import classes from "./Button.module.css";

type Props = {
  disabled : boolean,
  btnType : "Danger" | "Success" ,
  clicked  : ()=> void,
  children : ReactNode 
}
const Button: React.FC<Props> = (props) => {

  const {disabled,btnType,clicked,children } = props
  return(
    <button
    disabled={disabled}
    className={[classes.Button, classes[btnType]].join(" ")}
    onClick={clicked}
    >
    {children}
    </button>
  )

};

export default Button;

