import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import { auth, setAuthRedirectPath } from "../../store/actions/authAction";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import withError from "../../HOC/WithErrorHandler";
import axios from "../../axios-login";
import Validator from "validator";

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Mail Address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      error: "",
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      error: "",
      valid: false,
      touched: false,
    },
  });
  const [isValidForm, setIsValid] = useState(true);
  const [isSignUp, setisSignUp] = useState(true);

  useEffect(() => {
    if (!props.buildingBuilder && props.redirectPath !== "/") {
      setAuthRedirectPath("/");
    }
  }, [props.buildingBuilder, props.redirectPath, setAuthRedirectPath]);

  const checkValidity = (value, rules) => {
    let isValid = true;
    let errorMessage = "";
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
      errorMessage = "too small";
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      // const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      // isValid = pattern.test(value) && isValid;
      isValid = Validator.isEmail(value) && isValid;
      errorMessage = "incorrect email";
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return { isValid, errorMessage };
  };

  const inputChangedHandler = (event, controlName) => {
    let { isValid, errorMessage } = checkValidity(
      event.target.value,
      controls[controlName].validation
    );

    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: isValid,
        error: errorMessage,
        touched: true,
      },
    };
    setControls(updatedControls);
    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }
    setIsValid(formIsValid);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  const switchModeHandler = () => {
    setisSignUp(!isSignUp);
  };

  let authRedirect = null;
  if (props.token) {
    authRedirect = <Redirect to={props.redirectPath} />;
  }

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      errorMessage = {formElement.config.error}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));
  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message.split("_").join(" ")}</p>;
  }
  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}

      <form onSubmit={submitHandler}>
        {form}
        <Button disabled={!isValidForm} btnType="Success">SUBMIT</Button>
      </form>
      <Button clicked={switchModeHandler} btnType="Danger">
        SWITCH TO {isSignUp ? "SIGN IN" : "SIGN UP"}
      </Button>
    </div>
  );
};
const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  token: state.auth.token !== null,
  buildingBuilder: state.burgerBuilder.building,
  redirectPath: state.auth.redirectPath,
});
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(auth(email, password, isSignUp)),
    settingAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(Auth);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(Auth, axios));
