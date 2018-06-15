import { combineReducers } from "redux";
import { NEW_SELECT, REQUEST_DATA } from "../types";

const init = {
  getStatus: null,
  contact: [{ name: "" }],
  contactarr: [],
  selected: false
};

export function request(state = init, action) {
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

export default combineReducers({
  request
});
