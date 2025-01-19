import { request } from "@/utils/request";

// 登录
export function loginAPI(userid, password) {
  return request({
    method: 'post',
    url: '/login',
    data: {
      userid,
      password
    }
  })
}

export function getUserInfoAPI() {
  return request({
    url: '/userInfo'
  })
}