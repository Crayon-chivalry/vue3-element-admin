<template>
  <template v-if="!menuItem.hidden">
    <el-menu-item :index="resolvePath()" v-if="hasOneShowingChild(menuItem.children, menuItem) && onlyOneChild">
      <svg-icon :icon="onlyOneChild.meta.icon" className="side-icon" v-if="onlyOneChild.meta.icon"></svg-icon>
      <template #title>{{ onlyOneChild.meta.title }}</template>
    </el-menu-item>

      

    <el-sub-menu :index="resolvePath()" v-else>
      <template #title>
        <svg-icon :icon="menuItem.meta.icon" className="side-icon"></svg-icon>
        <span>{{ menuItem.meta.title }}</span>
      </template>
      <sidebar-item v-for="item in menuItem.children" :key="item.path" :menu-item="item" :base-path="menuItem.path" />
    </el-sub-menu>
  </template>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  menuItem: {
    type: Object,
    required: true
  },
  basePath: {
    type: String,
    default: ""
  }
})

let onlyOneChild = ref(null)

// 解析路由 path, 对 path 进行特殊处理
const resolvePath = () => {
  if(props.menuItem.redirect) {
    return props.menuItem.redirect
  }
  if(onlyOneChild.value?.path) {
    return `${props.basePath}/${onlyOneChild.value?.path}`
  }
  return props.basePath
}

// 是否只显示一级菜单 / 父级路由
const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter(item => !item.hidden)

  // 当只有一个子路由器时，默认情况下会显示子路由器
  if (showingChildren.length == 1) {
    onlyOneChild.value = showingChildren[0]
    return true
  }

  // 如果没有要显示的子路由，则显示父路由
  if(showingChildren.length == 0) {
    onlyOneChild.value = {...parent}
    return true
  }

  return false
}
</script>

<style scoped>
.side-icon {
  margin-right: 6px;
  width: 20px;
  height: 20px;
}
</style>
