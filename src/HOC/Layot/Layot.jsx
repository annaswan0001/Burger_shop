import React from "react";
import BurgerBuilder from "../../views/BurgerBuilder/BurgerBuilder";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";
import { connect } from "react-redux";

class Layot extends React.Component {
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
          <Toolbar 
          token={this.props.token}
          clicked={this.handleSideDrawer}/>
          <SideDrawer token={this.props.token} open={this.state.showSideDrawer} handleSideDrawer={this.handleSideDrawer} />
        </div>
        <main className={classes.Content}>{props.children}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) =>({
token: state.auth.token !== null
})

export default connect(mapStateToProps, null)(Layot)
