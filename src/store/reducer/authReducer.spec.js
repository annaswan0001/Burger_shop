import authReducer from "./authReducer";
import { initialState } from "./authReducer";
import * as actionsType from "./../actions/actionType";

describe("authReducer", () => {
  const actionRequest = {
    type: actionsType.AUTH_START,
  };


  // AUTH REQUEST
  it("auth request without error", () => {
    expect(authReducer(initialState, actionRequest)).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("auth request after error", () => {
    const initialStateAfterError = {
      ...initialState,
      error: "Something go wrong",
    };
    expect(authReducer(initialStateAfterError, actionRequest)).toEqual({
      ...initialStateAfterError,
      error: null,
      loading: true,
    });
  });


  //AUTH SUCCESS
  const actionSuccess = {
    type: actionsType.AUTH_SUCCESS,
    userId: "1",
    idToken: "12345",
  };
  const initialStateAfterRequest = {
    ...initialState,
    loading: true,
  };

  it("auth success", () => {
    
    expect(authReducer(initialStateAfterRequest, actionSuccess)).toEqual({
      ...initialStateAfterRequest,
      loading: false,
      userId: actionSuccess.userId,
      token: actionSuccess.idToken,
    });
  });


  //AUTH ERROR 
     const actionError = {
         type: actionsType.AUTH_FAIL,
         error:  {message:"something go wrong"}
     }
     it("authFail", ()=>{
         expect(authReducer(initialStateAfterRequest, actionError)).toEqual({
             ...initialStateAfterRequest,
             loading:false,
             error: actionError.error.message
         })
     })

     it("shoukd return inititalValue",()=>{
         expect(authReducer(undefined, {})).toEqual({
             ...initialState
         })
     })
});



