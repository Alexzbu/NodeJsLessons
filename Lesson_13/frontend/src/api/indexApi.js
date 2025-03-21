import axios from 'axios';

const apiServer = axios.create({
   baseURL: 'http://localhost:8080/api/',
   headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
      // 'https://euphoria-back.onrender.com/api/'
   },
});

export default apiServer;