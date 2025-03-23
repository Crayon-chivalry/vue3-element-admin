<template>
  <template v-if="store.getters.mode == 'md'">
    <el-menu class="menu" router :default-active="activeMenu" :collapse="isCollapse">
      <sidebar-item v-for="item in rolesList" :key="item.path" :menu-item="item" :base-path="item.path" />
    </el-menu>
  </template>
  
  <template v-else>
    <el-drawer v-model="showDrawer" direction="ltr" size="70%">
      <el-menu class="menu" router :default-active="activeMenu" :collapse="isCollapse" @select="menuSelect">
        <sidebar-item v-for="item in rolesList" :key="item.path" :menu-item="item" :base-path="item.path" />
      </el-menu>
    </el-drawer>
  </template>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import SidebarItem from './SidebarItem.vue'

const store = useStore();

const route = useRoute()

let isCollapse = ref(false);

let showDrawer = ref(false)

// 权限列表 / 菜单
const rolesList = computed(() => {
  return store.getters.roles;
});

const activeMenu = computed(() => {
  let { path } = route
  return path
})

const menuSelect = () => {
  showDrawer.value = false
}

defineExpose({
  isCollapse,
  showDrawer
});
</script>

<style scoped>
.el-menu {
  border: none;
}
</style>
