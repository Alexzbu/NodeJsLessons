import axios from 'axios';

const apiServer = axios.create({
   baseURL: process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_API_URL
      : process.env.REACT_APP_PROD_API_URL,
   headers: {
      'Content-Type': 'application/json',
   },
});

export default apiServer;