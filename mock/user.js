import Mock from 'mockjs'

import { dynamicFilter } from './utils/index'

import permission from './data/permission.json'

// 登录
Mock.mock('/api/login', 'post', (req) => {
  const { userid, password } = JSON.parse(req.body)
  if (userid === 'admin' && password === 'e10adc3949ba59abbe56e057f20f883e') {
    return {
      code: 200,
      message: '登录成功',
      token: 'f9b0d1b8be5e4d43b196d6359ef91145'
    }
  } else {
    return {
      code: 401,
      message: '用户名或密码错误',
    }
  }
})

// 后台信息 / 菜单 / 权限
Mock.mock('/api/userInfo', 'get', () => {
  return {
    code: 200,
    message: '获取成功',
    data: {
      name: "admin",
      permission
    }
  }
})

// 用户列表
const data = Mock.mock({
  'list|14': [{
    id: '@uuid',
    tx: '',
    userid: '@word(4, 6)',
    name: '@cname',
    phone: /^1[3-9]\d{9}$/,
    state: '@integer(1, 2)'
  }]
})
Mock.mock('/api/userList', 'get', (req) => {
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