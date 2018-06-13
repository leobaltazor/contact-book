import { combineReducers } from "redux";
import { NEW_SELECT, REQUEST_DATA } from "../types";

const init = {
  getStatus: null,
  contact: "",
  contactarr: []
};

export function request(state = init, action) {
	if (action.type === NEW_SELECT) {
    for (let i = 0; i < state.contactarr.length; i++) {
      const element = state.contactarr[i];
      if (element === action.contact) {
        return {
          ...state,
          contact: state.contactarr[i]
        };
      }
    }
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

export default combineReducers({
  request
});
