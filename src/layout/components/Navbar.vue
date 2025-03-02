<template>
  <div class="nav">
    <div class="nav-row">
      <div class="icon-wrap" @click="$emit('collapseToggle')">
        <svg-icon icon="fold" className="icon"></svg-icon>
      </div>
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="nav-row">
      <div class="icon-wrap" @click="reload">
        <el-icon size="20px"><Refresh /></el-icon>
      </div>
      <el-tooltip effect="dark" :content="toolTipText" placement="bottom">
        <div class="icon-wrap" @click="onFull">
          <el-icon size="20px"><FullScreen /></el-icon>
        </div>
      </el-tooltip>
      <el-popover placement="bottom-start" trigger="click" width="200">
        <div class="popover">
          <div class="popover-info">
            <img src="@/assets/image/tx.svg" />
            <div class="popover-info-name">{{ store.getters.userid }}</div>
          </div>
          <div class="popover-cell">
            <el-button type="primary" plain>个人中心</el-button>
            <el-button type="danger" plain @click="logout">注销</el-button>
          </div>
        </div>
        <template #reference>
          <div class="user">
            <img src="@/assets/image/tx.svg" />
            <div class="user-name">admin</div>
          </div>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { tolink } from '@/utils'
import screenfull from 'screenfull'

const screenState = ref(false)

const route = useRoute()

const store = useStore()

// 刷新页面
const reload = () => {
  location.reload()
}

// 标题
const title = computed(() => {
  return route.meta.title
}) 

// 全屏按钮文字
const toolTipText = computed(() => {
  return screenState.value ? '取消全屏' : '全屏'
})

// 全屏
const onFull = () => {
  if (!screenfull.isEnabled) {
    ElMessage({
      message: '你的浏览器无法工作.',
      type: 'warning',
    })
    return false
  }
  screenfull.toggle()
  screenState.value = !screenfull.isFullscreen
}

// 退出登录
const logout = () => {
  store.dispatch('user/reset')
  tolink('/login')
}

const $emit = defineEmits(['collapseToggle'])
</script>

<style scoped>
.nav {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: lighter;
}

.nav-row {
  height: 50px;
  display: flex;
  align-items: center;
}

.icon-wrap {
  padding: 0 15px;
  height: 100%;
  display: flex;
  align-items: center;
  color: rgb(70, 66, 66);
  cursor: pointer;
}

.icon-wrap:hover {
  background-color: #F6F6F6;
}

.breadcrumb {
  margin-left: 10px;
}

.user {
  padding: 0 10px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user:hover {
  background-color: #F6F6F6;
}

.user img {
  display: block;
  width: 35px;
  height: 35px;
}

.user-name {
  margin-left: 6px;
  font-size: 14px;
}

.icon {
  width: 20px;
  height: 20px;
}

.popover-info {
  text-align: center;
}

.popover-info-name {
  margin-top: 10px;
  font-size: 16px;
}

.popover-cell {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.popover img {
  width: 50px;
}
</style>