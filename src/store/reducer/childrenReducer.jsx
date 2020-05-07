import * as actionTypes from "../actions/actionType";

const initialState = {
  name: "",
  surname: "",
  documenttype: [1,2],
  gender: 2,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHILD_NAME:
      return { ...state, name: action.payload };
    case actionTypes.CHILD_SURNAME:
      return { ...state, surname: action.payload };
    case actionTypes.CHILD_GENDER:
      return { ...state, gender: action.payload };
    case actionTypes.CHILD_DOCUMENT_TYPE:
      return { ...state, documenttype: action.payload };
    default:
      return state;
  }
};
