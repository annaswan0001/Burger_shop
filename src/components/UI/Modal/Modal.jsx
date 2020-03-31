import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";


export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
shouldComponentUpdate(nextProps,nexState){
    return nextProps.show != this.props.show || nextProps.children !== this.props.children
}

  render() {
    const {
      props,
    } = this;

    return (
      

      <React.Fragment>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: props.show ? "1" : "0"
          }}
        >
          {props.children}
        </div>
      </React.Fragment>
    );
  }
}
