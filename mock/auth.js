import Mock from 'mockjs'

import { dynamicFilter } from './utils/index'
import permission from './data/permission.json'

// 分组列表
Mock.mock('/api/auth/groupSelectList', 'get', () => {
  return {
    code: 200,
    message: '获取成功',
    data: [
      {
        value: "0",
        label: "超级管理组",
      },
      {
        value: "1",
        label: "一级管理员",
      },
      {
        value: "2",
        label: "二级管理员",
      },
      {
        value: "3",
        label: "三级管理员",
      }
    ]
  }
})

// 权限列表
Mock.mock('/api/auth/permission', 'get', () => {
  return {
    code: 200,
    message: '获取成功',
    data: permission
  }
})

// 角色组管理
const groupList ={
  list: [
    {
      id: '1',
      name: '超级管理员',
      permission: '超级管理员',
      date: '2024-08-03 13:50:32',
      updateDate: '2025-03-16 13:21:42',
      state: 1
    },
    {
      id: '1',
      name: '一级管理员',
      permission: '控制台等20项',
      date: '2024-08-03 13:50:32',
      updateDate: '2024-11-26 19:55:29',
      state: 1
    }
  ]
} 
Mock.mock('/api/auth/groupList', 'get', (req) => {
  // 从请求参数中获取分页信息
  const { page = 1, pageSize = 10, filters = {} } = JSON.parse(req.body)
  // 计算起始索引和结束索引
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  // 筛选数据
  const list = dynamicFilter(groupList.list, filters)
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

// 管理员列表
const adminList ={
  list: [{
    id: '1',
    userid: 'admin',
    role: '超级管理员',
    date: '2024-08-03 13:50:32',
    loginDate: '2025-03-16 13:21:42',
    email: 'xxxadmin@.com',
    phone: '14120202623',
    state: 1
  }]
} 
Mock.mock('/api/auth/adminList', 'get', (req) => {
  // 从请求参数中获取分页信息
  const { page = 1, pageSize = 10, filters = {} } = JSON.parse(req.body)
  // 计算起始索引和结束索引
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  // 筛选数据
  const list = dynamicFilter(adminList.list, filters)
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

// 管理员日志
const logList = Mock.mock({
  'list|6': [{
    id: '@uuid',
    userid: 'admin',
    title: '登录',
    date: '@datetime("yyyy-MM-dd HH:mm:ss")',
    ip: '127.0.0.1',
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0"
  }]
})
Mock.mock('/api/auth/adminLog', 'get', (req) => {
  // 从请求参数中获取分页信息
  const { page = 1, pageSize = 10, filters = {} } = JSON.parse(req.body)
  // 计算起始索引和结束索引
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  // 筛选数据
  const list = dynamicFilter(logList.list, filters)
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