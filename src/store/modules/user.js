import { login, getUserInfo } from "@/api/user";
import md5 from 'blueimp-md5'

const state = {
  userid: '',
  token: '',
  roles: []
}

const mutations = {
  setUserid(state, userid) {
    state.userid = userid
  },
  setToken(state, token) {
    state.token = token
  },
  setRoles(state, roles) {
    state.roles = roles
  }
}

// 异步
const actions = {
  async login({ commit }, form) {
    let  _password = md5(form.password)
    let { data } = await login(form.userid, _password)
    commit('setToken', data?.token)
    return data
  },
  async getInfo({ commit }) {
    let { data: { data } } = await getUserInfo()
    commit('setRoles', data.permission)
    return data.permission
  },
  reset({ commit }) {
    commit('setUserid', '')
    commit('setToken', '')
    commit('roles', [])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}