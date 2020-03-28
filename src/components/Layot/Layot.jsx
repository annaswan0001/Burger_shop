import React from "react";
import BurgerBuilder from "../../views/BurgerBuilder/BurgerBuilder";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";

export default class Layot extends React.Component {
  state = {
    showSideDrawer: false
  };

  handleSideDrawer = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
//   sideDrawerCloseHandler=()=>{
//     this.setState({showSideDrawer:false})
//   }

  render() {
    const { props } = this;

    return (
      <React.Fragment>
        <div>
          <Toolbar clicked={this.handleSideDrawer}/>
          <SideDrawer open={this.state.showSideDrawer} handleSideDrawer={this.handleSideDrawer} />
        </div>
        <main className={classes.Content}>{props.children}</main>
      </React.Fragment>
    );
  }
}
