import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../HOC/WithErrorHandler';
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner';
import {fetchOrders} from '../../store/actions/orderAction'
import {authCheckStateOrder} from '../../store/actions/authAction'
class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentWillMount() {
        console.log("order")
        // this.props.onAuthCheckState()
        // // if(!this.props.token){
        // //     this.props.history.push('/')
        // // }
     
     this.props.onFetchOrders(this.props.token, this.props.userId)
 
    }
 
    render () {
        let redirect = null
        // if(!this.props.token){
        //     redirect=<Redirect to="/"/>
        // }
        let orders = <Spinner />;
        if ( !this.props.loading ) {
            orders = this.props.orders.map( order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ) )
        }
        return (
            <div>
                {/* {redirect} */}
                {orders}
            </div>
        );
    }
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