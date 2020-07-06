import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducer/index'

import createSagaMiddleware from 'redux-saga'
import {watchAuth, watchBurgerBuilder,watchMakeOrder, watchSetInputValueDebounced,watchSetInputValueDebounced2} from './store/sagas/index'

import './index.css';
import App from './App';


// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const sagaMiddleware = createSagaMiddleware()
//1) const sagaMiddleware = createSagaMiddleware()
//2) added to applyMiddleware
//3) sagaMiddleware.run(rootSaga)

const store = createStore(rootReducer, 
    // composeEnhancers(
    applyMiddleware(thunk,sagaMiddleware )
// )
);

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)
sagaMiddleware.run(watchMakeOrder)
sagaMiddleware.run(watchSetInputValueDebounced)
sagaMiddleware.run(watchSetInputValueDebounced2)




const app = (
    <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
