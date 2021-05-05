import axios from 'axios'
export function request(config) {
  const instance = axios.create({
    baseURL: 'https://lab.isaaclin.cn/nCoV',
    timeout: 10000
  })
  return instance(config);
}