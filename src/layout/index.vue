<template>
  <el-container>
    <el-aside class="aside">
      <sidebar ref="sidebarRef" />
    </el-aside>

    <el-container>
      <el-header class="header">
        <navbar @collapse-toggle="collapseToggle" />
        <tags-view />
      </el-header>

      <el-main class="main">
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'

import Sidebar from "./components/Sidebar/index.vue";
import Navbar from "./components/Navbar.vue";
import TagsView from "./components/TagsView/index.vue";
import AppMain from "./components/AppMain.vue";

const sidebarRef = ref(null);

// 折叠菜单面板
const collapseToggle = () => {
  sidebarRef.value.isCollapse = !sidebarRef.value.isCollapse;
};
</script>

<style scoped>
.aside {
  box-sizing: border-box;
  width: auto;
  min-height: 100vh;
  background-color: #fff;
}

.header {
  height: auto;
  padding: 0;
  border-left: 1px solid rgba(237, 238, 241, 0.6);
  background-color: #fff;
}

.main {
  height: calc(100vh - 84px);
  overflow-y: auto;
  background-color: #f0f2f5;
}
</style>
