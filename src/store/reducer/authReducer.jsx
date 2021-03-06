import * as actionTypes from "../actions/actionType";
export const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  redirectPath: "/",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, loading: true, error: null };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        userId: action.userId,
        token: action.idToken,
      };

    case actionTypes.AUTH_FAIL:
      return { ...state, loading: false, error: action.error.message };
    case actionTypes.AUTH_LOGOUT:
      return { ...state, token: null, userId: null };
    default:
      return state;
  }
};
