<template>
  <div>
  <!-- 筛选 -->
  <table-filtering :filterList="filterList" @search="search" />

  <div class="m-block">
    <!-- 操作区 -->
    <el-button type="danger" @click="onDelete">删除</el-button>
    <el-button type="success">回滚</el-button>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      table-layout="auto"
      class="mt-lg"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" />
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="userid" label="管理员" />
      <el-table-column prop="controller" label="控制器" />
      <el-table-column prop="dataTable" label="数据表" />
      <el-table-column prop="modified" label="修改项" />
      <el-table-column prop="beforeData" label="修改前" />
      <el-table-column prop="afterData" label="修改后" />
      <el-table-column prop="ip" label="IP" />
      <el-table-column prop="date" label="修改时间" />
      <el-table-column label="操作">
        <el-button type="primary" link>详情</el-button>
        <el-button type="success" link>回滚</el-button>
        <el-button type="danger" link>删除</el-button>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="m-pagination">
      <el-pagination 
        background layout="total, prev, pager, next, sizes" 
        :page-sizes="[10, 20, 30, 40]" 
        :total="total"
        @change="change"
      />
    </div>
  </div>
</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getSensitiveDataListAPI } from '@/api/security'

// 筛选配置
const filterList = [
{
  label: "管理员",
  key: "userid",
  placeholder: "请输入管理员",
  value: "",
  type: "input",
},
{
  label: "修改时间",
  key: "date",
  value: "",
  type: "date",
},
];

let tableData = ref([])
let selectList = ref([])

let page = ref(1)
let pageSize = ref(10)
let total = ref(0)

let filters = ref({})

// 处理表格选中项变化
const handleSelectionChange = (e) => {
selectList.value = e;
};

// 页码 / 页码大小 变化
const change = (current, size) => {
page.value = current
pageSize.value = size
getSensitiveDataLis()
}

// 筛选
const search = (filter) => {
filters.value = filter
getSensitiveDataLis()
}


// 获取用户列表
const getSensitiveDataLis = async () => {
let { data } = await getSensitiveDataListAPI(page.value, pageSize.value, filters.value)
tableData.value = data.data
total.value = data.total
}

// 删除
const onDelete = () => {
if(selectList.value.length == 0) {
  ElMessage({
    message: '请选择要删除的数据',
    type: 'warning',
  })
  return
}
ElMessageBox.confirm(
  '确认要删除吗？',
  '提示',
).then(() => {

}).catch(() => {

})
}

onMounted(() => {
  getSensitiveDataLis()
})
</script>

<style scoped>
</style>