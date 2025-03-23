<template>
  <div class="m-block">
    <div>消息动态</div>
    <div class="msg-list">
      <div class="msg-item" v-for="item in 10" :key="item">
        <el-tag type="warning">订单</el-tag>
        <div class="msg-content">订单号<span class="number">D2155111233</span>已签收</div>
        <div class="msg-date">03-23 17:23</div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.msg-item {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  cursor: pointer;
  gap: 10px;
}

.msg-item:first-child {
  margin-top: 20px;
}

.msg-item .number {
  color: var(--main-color);
}

.msg-date {
  color: gray;
}

.msg-content {
  flex: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>