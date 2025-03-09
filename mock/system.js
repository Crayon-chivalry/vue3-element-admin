import Mock from 'mockjs'

// 系统配置数据
Mock.mock('/api/system/systemData', 'get', (req) => {
  return {
    code: 200,
    message: '获取成功',
    data: {
      title: 'SYSTEM',
      stageDoor: '/',
      recordNumber: '',
      vetsion: '1.0.0',
      prohibitIp: ''
    }
  }
})

// 系统管理员数据
Mock.mock('/api/system/adminInfo', 'get', (req) => {
  return {
    code: 200,
    message: '获取成功',
    data: {
      userid: 'admin',
      name: '123',
      email: 'admin@system.com',
      phone: '18000000000',
    }
  }
})
