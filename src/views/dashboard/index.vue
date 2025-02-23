<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="6" v-for="(item, index) in totalList" :key="index">
        <div class="m-block total-item">
          <div class="total-text">{{ item.text }}</div>
          <div class="mt-md">
            <el-statistic group-separator="," :precision="item.precision" :value="item.value"></el-statistic>
          </div>
          <svg-icon :icon="item.icon" className="total-icon"></svg-icon>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="15" class="mt-md">
      <el-col :span="18">
        <sales-charts />
        <el-row :gutter="15" class="mt-md">
          <el-col :span="12">
            <access-charts />
          </el-col>
          <el-col :span="12">
            <turnover-charts />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <tools />
        <message />
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
  position: relative;
}

.total-text {
  font-size: 13px;
}

.total-icon {
  position: absolute;
  right: 15px;
  top: 15px;
  width: 40px;
  height: 40px;
}
</style>