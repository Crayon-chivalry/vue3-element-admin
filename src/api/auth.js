import { request } from "@/utils/request";

// 权限分组列表
export function getGroupSelectListAPI() {
  return request({
    url: '/auth/groupSelectList'
  })
}

// 角色组列表
export function getGroupListAPI(page, pageSize, filters) {
  return request({
    url: '/auth/groupList',
    data: {
      page,
      pageSize,
      filters
    }
  })
}

// 权限列表
export function getPermissionAPI() {
  return request({
    url: '/auth/permission'
  })
}

// 管理员列表
export function getAdminListAPI(page, pageSize, filters) {
  return request({
    url: '/auth/adminList',
    data: {
      page,
      pageSize,
      filters
    }
  })
}

// 管理员日志
export function getAdminLogAPI(page, pageSize, filters) {
  return request({
    url: '/auth/adminLog',
    data: {
      page,
      pageSize,
      filters
    }
  })
}