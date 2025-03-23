<template>
  <div class="m-block">
    <div>平台成交统计</div>

    <div id="turnoverCharts" class="chart"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, markRaw, computed, watch } from 'vue'
import { useStore } from 'vuex';
import * as echarts from 'echarts';

const store = useStore()

const screenWidth = computed(() => store.getters.screenWidth)

let myChart = ref(null)

const initChart = () => {
  myChart.value = markRaw(echarts.init(document.getElementById('turnoverCharts')));
  let options = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        top: 40,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
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
</style>