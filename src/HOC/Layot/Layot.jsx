import React from "react";
import BurgerBuilder from "../../views/BurgerBuilder/BurgerBuilder";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";
import { connect } from "react-redux";

const Layot = (props) => {

  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const handleSideDrawer = () => {
    setShowSideDrawer(!showSideDrawer)
  };


    return (
      <React.Fragment>
        <div>
          <Toolbar 
          token={props.token}
          clicked={handleSideDrawer}/>
          <SideDrawer token={props.token} open={showSideDrawer} handleSideDrawer={handleSideDrawer} />
        </div>
        <main className={classes.Content}>{props.children}</main>
      </React.Fragment>
    );
  
}

const mapStateToProps = (state) =>({
token: state.auth.token !== null
})

export default connect(mapStateToProps, null)(Layot)
