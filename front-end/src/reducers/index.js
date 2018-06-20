import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { NEW_SELECT, REQUEST_DATA, SET_AUTH_PARAMS, REMOVE_SELECT, ADD_CONTACT } from "../types";

const init = {
    getStatus: null,
    contact: [{ name: "" }],
    contactarr: [],
    selected: false
};
const initAuth = {
    status: false,
    token: sessionStorage.getItem("token"),
    errorMsg: "",
    uid: sessionStorage.getItem("uid")
};

function request(state = init, action) {
    if (action.type === NEW_SELECT) {
        return {
            ...state,
            selected: true,
            contact: Object.entries(state.contactarr).filter(el => {
                return el[0] === action.contact;
            })
        };
    }
    if (action.type === ADD_CONTACT) {
        return {
            ...state,
            selected: false,
            contact: [{ name: "" }]
        };
    }
    if (action.type === REMOVE_SELECT) {
        delete action.type;
        return {
            ...state,
            ...action
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
