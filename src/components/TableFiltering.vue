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

const props = defineProps(["formList"]);

let list = ref(props.formList)

// 搜索
const search = () => {
  console.log(list.value)
}

// 重置
const reset = () => {
  console.log(props.formList)
  list.value = props.formList
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
  min-width: 60px;
  font-size: 14px;
}

.el-row {
  row-gap: 20px;
}
</style>
