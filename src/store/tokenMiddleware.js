import api from '../helpers/api'

export const tokenMiddleware = (store) => (next) => (action) => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }

  // // handle token expiration or invalid token
  // api.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (error) {
  //       console.log(error, "instance error ");
  //       // log user out or prompt them to log back in
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  return next(action);
};
