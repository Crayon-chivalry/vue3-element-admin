<template>
  <div class="m-block">
    <div class="header">
      <div>销售额趋势</div>
      <div class="date">
        <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>

    <div id="salesCharts" class="chart"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, markRaw, computed, watch } from 'vue'
import { useStore } from 'vuex';
import * as echarts from 'echarts';

const store = useStore()

const screenWidth = computed(() => store.getters.screenWidth)

let myChart = ref(null)
let date = ref("")

const initChart = () => {
  myChart.value = markRaw(echarts.init(document.getElementById('salesCharts')));
  let options = {
    color: ['#80FFA5', '#00DDFF'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      top: '5%',
      data: ['Line 1', 'Line 2']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Line 1',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)'
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [140, 232, 101, 264, 90, 340, 250]
      },
      {
        name: 'Line 2',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)'
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 282, 111, 234, 220, 340, 310]
      }
    ]
  }
  myChart.value.setOption(options);
}

watch(screenWidth, () => {
  myChart.value.resize()
})


onMounted(() => {
  initChart()
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 300px;
}

.header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .date {
    margin-top: 10px;
  }

  .date :deep(.el-date-editor) {
    width: 250px;
  }
}
</style>