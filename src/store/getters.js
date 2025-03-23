const getters = {
  token: state => state.user.token,
  userid: state => state.user.userid,
  roles: state => state.user.roles,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  mode: state => state.app.mode,
  screenWidth: state => state.app.screenWidth,
}

export default getters