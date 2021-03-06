import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.token ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {props.token ? <NavigationItem link="/select">Select</NavigationItem> : null}
        {props.token ? <NavigationItem link="/asynkselect">AsynkSelect</NavigationItem> : null}
        {props.token ? <NavigationItem link="/relatedselect">Related Select</NavigationItem> : null}
        {props.token ? <NavigationItem link="/fetchData">fetchData</NavigationItem> : null}
        {props.token ? <NavigationItem link="/inputDebounced">inputDebounced</NavigationItem> : null}
        {props.token ? <NavigationItem link="/logout">Log out</NavigationItem>:
        <NavigationItem link="/auth">Auth</NavigationItem> }

    </ul>
);

export default navigationItems;