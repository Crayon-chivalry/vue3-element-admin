import Mock from 'mockjs'

import { dynamicFilter } from './utils/index'

// 数据回收数据
const data = {
  list: [{
    id: '1',
    userid: 'admin',
    controller: 'user/user',
    dataTable: 'user',
    data: '{"id": "3BA85694-EF5B-B1c4-02d2-9f1C2FC4D61a","tx": "","userid": "cskyyh","name": "常洋","phone": "16596783815","state": 2}',
    date: '2024-05-18 04:49:20',
    ip: '127.0.0.1'
  }]
}
Mock.mock('/api/security/dataRecycleList', 'get', (req) => {
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

// 敏感数据
const sensitiveData = Mock.mock({
  'list|4': [{
    id: '1',
    userid: 'admin',
    controller: 'user/user',
    dataTable: 'user',
    modified: '手机号',
    beforeData: /^1[3-9]\d{9}$/,
    afterData: /^1[3-9]\d{9}$/,
    date: '@datetime("yyyy-MM-dd HH:mm:ss")',
    ip: '127.0.0.1'
  }]
})
Mock.mock('/api/security/sensitiveDataList', 'get', (req) => {
  // 从请求参数中获取分页信息
  const { page = 1, pageSize = 10, filters = {} } = JSON.parse(req.body)
  // 计算起始索引和结束索引
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  // 筛选数据
  const list = dynamicFilter(sensitiveData.list, filters)
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