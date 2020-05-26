
import * as actionTypes from '../actions/actionType'
import {put, call, delay} from 'redux-saga/effects'


//первый вариант через дебаунс
export function* fetchInputValueDebounced(action) {
    const res = yield call(console.log, action.value)
    yield put({type:  actionTypes.INPUT_SET_VALUEDEBAUNCED, action:action.value})
  }

//второй вариант через делай и тейклейтест
  export function* fetchInputValueDebounced2(action) {
    // debounce by 2000ms
    yield delay(2000)
    const res = yield call(console.log, action.value)
    yield put({type:  actionTypes.INPUT_SET_VALUEDEBAUNCED, action:action.value})
  }
  
