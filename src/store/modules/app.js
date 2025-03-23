const state = {
  // md 电脑,  xs 手机
  mode: 'md',
  // 屏幕宽度
  screenWidth: ""
}

const mutations = {
  setScreenWidth(state, width) {
    state.screenWidth = width
    if(width > 768) state.mode = 'md'
    if(width < 768) state.mode = 'xs'
  }
}


const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}