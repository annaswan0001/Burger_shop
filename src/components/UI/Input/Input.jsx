import React from 'react';
import Select from 'react-select';
import classes from './Input.module.css';

const input = ( props ) => {
    let inputClasses = [classes.InputElement]
    let inputElement = null;
  
if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(classes.Invalid)
}
let validationError = null;
if (props.invalid && props.touched) {
    validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>;
}
    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                 />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(" ")}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        case ( 'reactSelect' ):
            console.table(props.elementConfig.options)
                inputElement = (
                 
                    <Select
                    // className={inputClasses.join(" ")}
                    defaultValue={props.value}
                    isDisabled={props.elementConfig.isDisabled}
                    isLoading={props.elementConfig.isLoading}
                    isClearable={props.elementConfig.isClearable}
                    isSearchable={props.elementConfig.isSearchable}
                    name="color"
                    options={props.elementConfig.options}
                  />
                );
                break;


        default:
            inputElement = <input
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );

};

export default input;