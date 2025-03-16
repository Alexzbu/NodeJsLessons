import axios from 'axios';

const apiServer = axios.create({
   baseURL: 'https://euphoria-back.onrender.com/api/',
   headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
   },
});

export default apiServer;