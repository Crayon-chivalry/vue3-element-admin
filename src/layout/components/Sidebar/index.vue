<template>
  <el-menu class="menu" router :default-active="activeMenu" :collapse="isCollapse">
    <sidebar-item v-for="item in rolesList" :key="item.path" :menu-item="item" :base-path="item.path" />
  </el-menu>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import SidebarItem from './SidebarItem.vue'

const store = useStore();

const route = useRoute()

let isCollapse = ref(false);

// 权限列表 / 菜单
const rolesList = computed(() => {
  return store.getters.roles;
});

const activeMenu = computed(() => {
  let { path } = route
  return path
})

defineExpose({
  isCollapse,
});
</script>

<style scoped>
.el-menu {
  border: none;
}

.menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
