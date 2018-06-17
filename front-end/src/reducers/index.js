import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { NEW_SELECT, REQUEST_DATA, SET_AUTH_PARAMS } from "../types";

const init = {
  getStatus: null,
  contact: [{ name: "" }],
  contactarr: [],
  selected: false
};
const initAuth = {
	status: false,
	token: localStorage.getItem("token"),
	errorMsg: ""
}

function request(state = init, action) {
  if (action.type === NEW_SELECT) {
    return {
      ...state,
      selected: true,
      contact: state.contactarr.filter(el => {
        return el.id === +action.contact;
      })
    };
  }
  if (action.type === REQUEST_DATA) {
    delete action.type;
    return {
      ...state,
      ...action
    };
  }
  return state;
}
function auth(state = initAuth, action) {
  //   console.log(action);
  if (action.type === SET_AUTH_PARAMS) {
    delete action.type;
    return {
      ...state,
      ...action
    };
  }
  return state;
}

export default combineReducers({
  routing: routerReducer,
  request,
  auth
});
