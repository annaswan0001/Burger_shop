import {put} from 'redux-saga/effects'
import {fetchIngredient, setIngredients, fetchIngredientFailed} from '../actions/burgerBuilderAction.ts'
import axios from '../../axios-orders'

export function* initIngredientsSaga(action) {
   yield put(fetchIngredient());
   try {
    const res = yield axios.get("https://burgershop-588e7.firebaseio.com/ingredients.json")
      // const res = yield axios.get("ingredients.json")
    yield put(setIngredients(res.data));
    }catch(err){
      yield put(fetchIngredientFailed())
  }
  ;
}


