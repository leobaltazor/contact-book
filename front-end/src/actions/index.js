import { store } from "../index";
import { REQUEST_DATA } from "../types";

export const requestData = async () => {
  await fetch("https://jsonplaceholder.typicode.com/users", {
	method: 'GET',
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

