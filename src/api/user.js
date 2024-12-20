import { request } from "@/utils/request";

// 登录
export function login(userid, password) {
  return request({
    method: 'post',
    url: '/login',
    data: {
      userid,
      password
    }
  })
}

export function getUserInfo() {
  return request({
    url: '/userInfo'
  })
}