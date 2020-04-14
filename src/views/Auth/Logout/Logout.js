import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { authLogout } from "../../../store/actions/authAction";

const Logout = (props) => {
  useEffect(() => {
    props.authLogout();
  }, [props.authLogout]);

  return <Redirect to="/" />;
};

export default connect(null, { authLogout })(Logout);
