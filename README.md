- NOTE

* npm i react-bootstrap

* npm i sass

* npm i axios

* npm i react-paginate ( phan trang )

* npm i react-toastify

* npm i lodash (thao tac voi mang vs object)

* npm i font-awesome
* npm install --save @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons

* npm i react-csv

* npm i papaparse

* https://tailwindcss.com/docs/guides/create-react-app

Creating an instance
You can create a new instance of axios with a custom config.

axios.create([config])

import axios from "axios"

const instance = axios.create({
baseURL: 'https://some-domain.com/api/',
});

export default instance;

Interceptor
// Add a response interceptor
instance.interceptors.response.use(function (response) {
// Any status code that lie within the range of 2xx cause this function to trigger
// Do something with response data
return response.data;
}, function (error) {
// Any status codes that falls outside the range of 2xx cause this function to trigger
// Do something with response error
return Promise.reject(error);
});
export default instance;

---

customize_axios login
https://stackoverflow.com/questions/49967779/axios-handling-errors

if (error.response) {
// The request was made and the server responded with a status code
// that falls out of the range of 2xx
console.log(error.response.data);
console.log(error.response.status);
console.log(error.response.headers);
} else if (error.request) {
// The request was made but no response was received
// `error.request` is an instance of XMLHttpRequest in the browser
// and an instance of http.ClientRequest in node.js
console.log(error.request);
} else {
// Something happened in setting up the request that triggered an Error
console.log('Error', error.message);
}

---

"page": 2, (ds tra ve o trang 2)
"per_page": 6, ( so phan tu hien thi o trang la 6)
"total": 12, (tong so item trong database)
"total_pages": 2, ( co the chia duoc bao nhieu trang )

---

import React, { useCallback } from "react";
import { debounce } from "lodash";

const handler = useCallback(debounce(someFunction, 2000), []);

const onChange = (event) => {
// perform any event related action here

    handler();

};

// su dung debounce de setTimeOut khi go lien tuc thi sau 2s no se hien ra chu kh hien ra lien tuc
