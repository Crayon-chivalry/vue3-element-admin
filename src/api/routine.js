import { request } from "@/utils/request";

// 系统配置信息
export function getSystemDataAPI() {
  return request({
    url: '/system/systemData'
  })
}

// 系统管理员信息
export function getAdminInfoAPI() {
  return request({
    url: '/system/adminInfo'
  })
}