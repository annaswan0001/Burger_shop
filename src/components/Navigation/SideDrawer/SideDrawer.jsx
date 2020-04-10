import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./SideDrawer.module.css";

export default function SideDrawer(props) {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.handleSideDrawer} />
      <div className={ attachedClasses.join(" ")} onClick={props.handleSideDrawer}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems token ={props.token}/>
        </nav>
      </div>
    </React.Fragment>
  );
}
