import React, {useState} from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";


const Layot = (props) => {

  const [showSideDrawer,sideDrawerHandle ] = useState(false)
 
  const handleSideDrawer = () => {
    sideDrawerHandle (!showSideDrawer)
  };
    return (
      <React.Fragment>
        <div>
          <Toolbar clicked={handleSideDrawer}/>
          <SideDrawer open={showSideDrawer} handleSideDrawer={handleSideDrawer} />
        </div>
        <main className={classes.Content}>{props.children}</main>
      </React.Fragment>
    );
  }

export default Layot