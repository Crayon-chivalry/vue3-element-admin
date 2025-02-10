import { request } from "@/utils/request";

// 订单列表
export function getOrderListAPI(page, pageSize, filters) {
  return request({
    url: '/orderList',
    data: {
      page,
      pageSize,
      filters
    }
  })
}

// 订单详情
export function getOrderDetailsAPI(id) {
  return request({
    url: '/orderDetails',
    data: {
      id
    }
  })
}