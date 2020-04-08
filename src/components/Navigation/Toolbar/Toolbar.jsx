import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

export default function Toolbar(props) {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.clicked}/>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems token={props.token}/>
      </nav>
    </header>
  );
}
