// axiosWithAuth.js

import axios from 'axios';

const ApiCall = () => {

  // Create a new instance of Axios
  const instance = axios.create({
    baseURL: 'www.themealdb.com/api/json/v1/1/', // Replace with your API base URL=
  });

  return instance;
};

export default ApiCall;
