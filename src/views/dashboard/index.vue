<template>
  <div>
    <el-row :gutter="15">
      <el-col :sm="6" :xs="12" v-for="(item, index) in totalList" :key="index">
        <div class="m-block total-item">
          <div>
            <div class="total-text">{{ item.text }}</div>
            <div class="mt-md">
              <el-statistic group-separator="," :precision="item.precision" :value="item.value"></el-statistic>
            </div>
          </div>
          <svg-icon :icon="item.icon" className="total-icon"></svg-icon>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :sm="18" :xs="24">
        <sales-charts />
        <el-row :gutter="15">
          <el-col :sm="12" :xs="24">
            <access-charts class="mt-md" />
          </el-col>
          <el-col :sm="12" :xs="24">
            <turnover-charts class="mt-md mb-md" />
          </el-col>
        </el-row>
      </el-col>
      <el-col :sm="6" :xs="24">
        <tools />
        <message class="mt-md" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import SalesCharts from './components/SalesCharts'
import AccessCharts from './components/AccessCharts'
import TurnoverCharts from './components/TurnoverCharts'
import Tools from './components/Tools.vue'
import Message from './components/Message.vue'

let totalList = [
  { text: '今日销售额', icon: 'home-sale', value: 865400, precision: 4 },
  { text: '今日销售利润', icon: 'home-profit', value: 15420, precision: 4 },
  { text: '今日订单数', icon: 'home-order', value: 1520, precision: 0 },
  { text: '今日新增用户', icon: 'home-user', value: 153, precision: 0 },
]
</script>

<style scoped>
.total-item {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}

.total-text {
  font-size: 13px;
}

.total-icon {
  width: 40px;
  height: 40px;
}

@media (max-width: 768px) {
  .total-icon {
    display: none;
  }
}
</style>