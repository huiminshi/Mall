import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/w1'
    // baseURL: 'http://106.54.54.237:8000/api/w1'
  });
  return instance(config)
}
