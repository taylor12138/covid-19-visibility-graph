import { request } from './request'
export function getData() {
  return request({
    url: 'http://47.113.117.158/host/covid19'
  });
}
export function getAboard() {
  return request({
    url: 'http://47.113.117.158/host/covid19_out'
  });
}

