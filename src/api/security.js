import { request } from "@/utils/request";


// 数据回收列表
export function getDataRecycleListAPI(page, pageSize, filters) {
  return request({
    url: '/security/dataRecycleList',
    data: {
      page,
      pageSize,
      filters
    }
  })
}

// 敏感数据列表
export function getSensitiveDataListAPI(page, pageSize, filters) {
  return request({
    url: '/security/sensitiveDataList',
    data: {
      page,
      pageSize,
      filters
    }
  })
}