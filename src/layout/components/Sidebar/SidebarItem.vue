<template>
  <el-menu-item :index="item.path" v-if="hasOneShowingChild(item.children) && onlyOneChild">
    <svg-icon :icon="onlyOneChild.meta.icon" className="side-icon" v-if="onlyOneChild.meta.icon"></svg-icon>
    <span>{{ onlyOneChild.meta.title }}</span>
  </el-menu-item>

  <!-- <el-sub-menu index="1">
    <template #title>
      <el-icon><location /></el-icon>
      <span>Navigator One</span>
    </template>
    <el-menu-item-group title="Group One">
      <el-menu-item index="1-1">item one</el-menu-item>
      <el-menu-item index="1-2">item two</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Group Two">
      <el-menu-item index="1-3">item three</el-menu-item>
    </el-menu-item-group>
    <el-sub-menu index="1-4">
      <template #title>item four</template>
      <el-menu-item index="1-4-1">item one</el-menu-item>
    </el-sub-menu>
  </el-sub-menu> -->
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

let onlyOneChild = ref(null)

// 是否只显示一级菜单 / 父级路由
const hasOneShowingChild = (children = []) => {
  const showingChildren = children.filter(item => !item.hidden)
  console.log(showingChildren)

  // 当只有一个子路由器时，默认情况下会显示子路由器
  if (showingChildren.length == 1) {
    onlyOneChild.value = showingChildren[0]
    return true
  }
}
</script>

<style scoped>
.side-icon {
  margin-right: 6px;
  width: 20px;
  height: 20px;
}
</style>
