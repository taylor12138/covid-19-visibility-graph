import { request } from './request'
export function getData(province) {
  return request({
    url: 'https://lab.isaaclin.cn/nCoV/api/area?latest=1',
    params: {
      province
    }
  });
}
export function getData_AllCountry() {
  return request({
    url: 'https://lab.isaaclin.cn/nCoV/api/overall'
  });
}
