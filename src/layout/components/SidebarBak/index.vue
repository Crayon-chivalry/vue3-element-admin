<template>
  <el-menu class="el-menu-vertical-demo" :default-active="activeMenu" :collapse="isCollapse">
    <sidebar-item 
      v-for="item in roles" 
      :key="item.path" 
      :item="item" 
      :base-path="item.path"
    >
    </sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex' 
import { useRoute } from 'vue-router'

import SidebarItem from './SidebarItem.vue'

const store = useStore()
const route = useRoute()

let roles = ref([])

let isCollapse = ref(false)

const activeMenu = computed(() => {
  let { path } = route
  return path
})

onMounted(() => {
  roles.value = store.getters.roles
})

defineExpose({
  isCollapse
})
</script>

<style scoped>
.el-menu {
  border: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>