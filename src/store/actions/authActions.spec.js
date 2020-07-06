import * as actions from "./authAction";
import * as actionTypes from "./actionType";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
// import expect from 'expect' // You can use any testing library

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("testing auth actions", () => {
  it("should request auth", () => {
    const expectedAction = {
      type: actionTypes.AUTH_START,
    };
    expect(actions.authStart()).toEqual(expectedAction);
  });

  it("should create an action for authSucces", () => {
    const idToken = "12345";
    const userId = 1;
    const expectedAction = {
      type: actionTypes.AUTH_SUCCESS,
      idToken,
      userId,
    };
    expect(actions.authSuccess(idToken, userId)).toEqual(expectedAction);
  });

  it("should create an action when auth fail", () => {
    const error = {
      message: "ERROR",
    };
    const expectedAction = {
      type: actionTypes.AUTH_FAIL,
      error,
    };
    expect(actions.authFail(error)).toEqual(expectedAction);
  });

  it("should create logout action fro saga", () => {
    const expectedAction = {
      type: actionTypes.AUTH_LOGOUT_SAGA,
    };
    expect(actions.authLogout()).toEqual(expectedAction);
  });

  it("should create an actions for auth request(saga)", () => {
    const email = "annaswan@ukr.net";
    const password = 122342;
    const isSignUp = true;

    const expectedAction = {
      type: actionTypes.AUTH_START_SAGA,
      email,
      password,
      isSignUp,
    };
    expect(actions.auth(email, password, isSignUp)).toEqual(expectedAction);
  });

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

//   describe("asynk auth actions", () => {
//     afterEach(() => {
//       fetchMock.restore();
//       fetchMock.reset();
//     });

//     it("creates AUTH_SUCCESS, when fetching has been done", ()=>{
//         fetchMock.getOnce()
//     })
//   });
});
