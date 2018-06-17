import { store } from "../index";
import { REQUEST_DATA, SET_AUTH_PARAMS } from "../types";
import { push } from "react-router-redux";

// const URL = "https://jsonplaceholder.typicode.com/users"
const URL = "http://localhost:3001/users";

export const requestData = async () => {
  await fetch(URL, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(res => res.json())
    .then(data => {
      setTimeout(() => {
        store.dispatch({
          type: REQUEST_DATA,
          contactarr: data,
          getStatus: true
        });
      }, 1000);
    })
    .catch(e => console.log(e));
  return {
    type: REQUEST_DATA,
    getStatus: null
  };
};

export const setAuthParams = (login, pass) => {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3001/api/auth");
  xhr.setRequestHeader("Content-type", "Application/json");
  xhr.onload = function() {
    const res = JSON.parse(this.responseText);
	store.dispatch({
	  type: SET_AUTH_PARAMS,
	  status: false,
	  token: res.token,
	  errorMsg: res.message
	});
	res.token && store.dispatch(push("/"));
  };
  const body = JSON.stringify({
    login,
    password: pass
  });
//   console.log(body);

  xhr.send(body);

  return {
    type: SET_AUTH_PARAMS,
    status: true
  };
};

export const logout = () => {
	console.log(123);
	localStorage.removeItem("token");
	return {
		type: SET_AUTH_PARAMS,
		token: null
	}
}