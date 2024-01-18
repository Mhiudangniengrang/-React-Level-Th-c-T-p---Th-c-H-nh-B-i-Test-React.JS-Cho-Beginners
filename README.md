- NOTE

* npm i react-bootstrap

* npm i sass

* npm i axios

* npm i react-paginate ( phan trang )

## \*npm i react-toastify

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

"page": 2, (ds tra ve o trang 2)
"per_page": 6, ( so phan tu hien thi o trang la 6)
"total": 12, (tong so item trong database)
"total_pages": 2, ( co the chia duoc bao nhieu trang )
