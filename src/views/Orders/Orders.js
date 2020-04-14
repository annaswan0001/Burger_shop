import React, { useState, useEffect } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../HOC/WithErrorHandler';
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner';
import {fetchOrders} from '../../store/actions/orderAction'
import {authCheckStateOrder} from '../../store/actions/authAction'


const Orders = (props)=> {

    useEffect(() => {
        props.onAuthCheckState()
    }, [props.onAuthCheckState])
  

        let orders = <Spinner />;
        if ( !props.loading ) {
            orders = props.orders.map( order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ) )
        }
        return (
            <div>
                {orders}
            </div>
        );

}

const mapStateToProps = state => {
    return {
        orders: state.order.order,
        loading: state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId) ),
        onAuthCheckState:()=>dispatch(authCheckStateOrder())
    };
};
export default connect(mapStateToProps,mapDispatchToProps )(withErrorHandler(Orders, axios));