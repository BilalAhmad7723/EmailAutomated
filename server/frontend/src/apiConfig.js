import axios from 'axios';

const http = axios.create({
  baseURL: 'https://email-temp.herokuapp.com',
  //baseURL: 'http://localhost:5050', //Release Base URL
  headers: {'Content-Type': 'application/json'},
});

http.interceptors.request.use(
  async config => { config.headers = { }; return config; },
  err => { return Promise.reject(err); },
);

export default http;