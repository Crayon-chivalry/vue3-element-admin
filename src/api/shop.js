import { request } from "@/utils/request";

// 商品列表
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

// 商品分类
export function getShopClassAPI() {
  return request({
    url: '/shopClass'
  })
}

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