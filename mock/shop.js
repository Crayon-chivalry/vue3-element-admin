import Mock from 'mockjs'

import { dynamicFilter } from './utils/index'
import shopClass from './data/shopClass.json'

// 商品列表
const data = Mock.mock({
  'list|8': [{
    id: '@uuid',
    name: 'HUAWEI Mate 70鸿蒙AI红枫原色影像超可靠玄武架构华为官方旗舰店鸿蒙智能手机新品',
    number: '@integer(1000000000, 9999999999)',
    price: '@integer(1000, 10000)',
    stock: '@integer(1, 9999)',
    sales: '@integer(1, 99999)',
    state: '@integer(1, 2)',
    date: '@datetime("yyyy-MM-dd HH:mm:ss")'
  }]
})
Mock.mock('/api/goodsList', 'get', (req) => {
  // 从请求参数中获取分页信息
  const { page = 1, pageSize = 10, filters = {} } = JSON.parse(req.body)
  // 计算起始索引和结束索引
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  // 筛选数据
  const list = dynamicFilter(data.list, filters)
  // 获取当前页的数据
  const currentPageData = list.slice(start, end);
  return {
    code: 200,
    message: '获取成功',
    total: list.length, // 总数据量
    page, // 当前页码
    pageSize, // 每页数据量
    data: currentPageData
  }
})

// 商品分类
Mock.mock('/api/shopClass', 'get', () => {
  return {
    code: 200,
    message: '获取成功',
    data: shopClass
  }
})

// 订单列表
let idCounter = 1;  // ID 计数器
const orderData = Mock.mock({
  'list|16': [{
    id: () => idCounter++,
    number: '@integer(1000000000, 9999999999)',
    name: 'HUAWEI Mate 70鸿蒙AI红枫原色影像超可靠玄武架构华为官方旗舰店鸿蒙智能手机新品',
    shopNumber: '@integer(1000000000, 9999999999)',
    price: '@integer(1000, 10000)',
    num: '@integer(1, 9)',
    state: '@integer(1, 5)',
    date: '@datetime("yyyy-MM-dd HH:mm:ss")',
    buyer: '@word(4, 6)',
  }]
})
// 计算总价
orderData.list.forEach(item => {
  item.totalPrice = item.price * item.num
})
Mock.mock('/api/orderList', 'get', (req) => {
  // 从请求参数中获取分页信息
  const { page = 1, pageSize = 10, filters = {} } = JSON.parse(req.body)
  // 计算起始索引和结束索引
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  // 筛选数据
  const list = dynamicFilter(orderData.list, filters)
  // 获取当前页的数据
  const currentPageData = list.slice(start, end);
  return {
    code: 200,
    message: '获取成功',
    total: list.length, // 总数据量
    page, // 当前页码
    pageSize, // 每页数据量
    data: currentPageData
  }
})


// 订单详情
Mock.mock('/api/orderDetails', 'get', (req) => {
  const { id } = JSON.parse(req.body)
  const order = orderData.list.find(item => item.id == id)
  return {
    code: 200,
    message: '获取成功',
    data: order
  }
})