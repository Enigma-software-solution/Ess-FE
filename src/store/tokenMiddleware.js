import api from '../helpers/api'

export const tokenMiddleware = (store) => (next) => (action) => {
  // const token = localStorage.getItem("token");
  // if (token) {
  //   api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // } else {
  //   delete api.defaults.headers.common["Authorization"];
  // }

  return next(action);
};
