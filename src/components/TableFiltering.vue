<template>
  <div class="filter m-block">
    <el-row :gutter="40">
      <el-col :md="8" v-for="item in list" :key="item.key">
        <div class="filter-item">
          <div class="filter-label">{{ item.label }}：</div>
          <!-- 输入框 -->
          <el-input
            v-model="item.value"
            :placeholder="item.placeholder"
            v-if="item.type === 'input'"
          />
          <!-- 选择器 -->
          <el-select
            v-model="item.value"
            :placeholder="item.placeholder"
            v-if="item.type === 'select'"
          >
            <el-option
              v-for="optionsItem in item.options"
              :key="optionsItem.value"
              :label="optionsItem.label"
              :value="optionsItem.value"
            />
          </el-select>
          <!-- 日期 -->
          <el-date-picker
            v-model="item.value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            v-if="item.type == 'date'"
          />
        </div>
      </el-col>
      <el-col :md="8">
        <div class="filter-item">
          <el-button type="primary" icon="Search" @click="search">搜索</el-button>
          <el-button type="primary" plain @click="reset">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { formatDate } from '@/utils'

const props = defineProps(["filterList"]);

const $emit = defineEmits(['search'])

let list = ref(JSON.parse(JSON.stringify(props.filterList)))

// 搜索
const search = () => {
  let filter = {}
  list.value.forEach(item => {
    // 针对日期处理
    if(item.type == 'date' && item.value) {
      filter[item.key] = [formatDate(item.value[0]), formatDate(item.value[1])]
      filter.sdate = formatDate(item.value[0])
      filter.edate = formatDate(item.value[1])
    } else {
      filter[item.key] = item.value
    }
  })
  $emit('search', filter)
}

// 重置
const reset = () => {
  list.value = props.filterList
  $emit('search', {})
}
</script> 

<style scoped>
.filter {
  margin-bottom: 15px;
}

.filter-item {
  display: flex;
  align-items: center;
}

.filter-label {
  color: gray;
  min-width: 75px;
  font-size: 14px;
}

.el-row {
  row-gap: 20px;
}
</style>
