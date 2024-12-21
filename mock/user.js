import Mock from 'mockjs'

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

// 用户信息
Mock.mock('/api/userInfo', 'get', (req) => {
  return {
    code: 200,
    message: '获取成功',
    data: {
      name: "admin",
      permission: [
        {
          path: "/",
          component: "Layout",
          redirect: "/dashboard",
          children: [
            {
              name: "dashboard",
              path: "dashboard",
              component: "dashboard/index",
              meta: {
                title: "首页",
                affix: true,
                icon: "house"
              }
            }
          ]
        },
      ]
    }
  }
})