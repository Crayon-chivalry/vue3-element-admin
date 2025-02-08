import { request } from "@/utils/request";

// 用户列表
export function getGoodsListAPI(page, pageSize, filters) {
  return request({
    url: '/goodsList',
    data: {
      page,
      pageSize,
      filters
    }
  })
}