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

// 后台管理员用户信息
export function getUserInfoAPI() {
  return request({
    url: '/userInfo'
  })
}

// 用户列表
export function getUserListAPI(page, pageSize, filters) {
  return request({
    url: '/userList',
    data: {
      page,
      pageSize,
      filters
    }
  })
}