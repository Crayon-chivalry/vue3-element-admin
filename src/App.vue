<template>
  <router-view />
</template>

<style>
:root {
  --main-color: #4966DF; /* 主题色 */
}

body {
  background-color: #f0f2f5;
}

.m-block {
  padding: 20px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
}

.m-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.mt-sm {
  margin-top: 10px;
}

.mt-md {
  margin-top: 15px;
}

.mt-lg {
  margin-top: 20px;
}
</style>
