import * as actionsTypes from './actionType'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => ({
    type: actionsTypes.PURCHASE_BURGER_SUCCESS,
    id,
    orderData
})

export const purchaseBurgerFailed = (error) => ({
    type: actionsTypes.PURCHASE_BURGER_FAIL,
    error
    
})


export const purchaseBurgerRequest = () => ({
    type: actionsTypes.PURCHASE_BURGER_REQUEST,
    
})



export const purchaseBurgerStart = (orderData, token) => (dispatch)=>{
    dispatch(purchaseBurgerRequest())
    axios.post( '/orders.json?auth='+ token, orderData )
    .then( response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    } )
    .catch( error => {
      dispatch(purchaseBurgerFailed(error))
    } );
}

export const purchaseInit = () => {
    return {
        type: actionsTypes.PURCHASE_INIT
    };
};


export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionsTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: actionsTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionsTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/orders.json'+ queryParams)
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            } )
            .catch( err => {
                dispatch(fetchOrdersFail(err));
            } );
    };
};