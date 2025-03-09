<template>
    <div>
    <!-- 筛选 -->
    <table-filtering :filterList="filterList" @search="search" />

    <div class="m-block">
      <!-- 操作区 -->
      <el-button type="danger" @click="onDelete">删除</el-button>
      <el-button type="success">还原</el-button>

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
        <el-table-column label="被删数据">
          <template #default="scope">
            <el-tooltip :content="scope.row.data " placement="top">
              <div class="w-150px text-hidden">{{ scope.row.data }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="IP" />
        <el-table-column prop="date" label="被删时间" />
        <el-table-column label="操作">
          <el-button type="primary" link>详情</el-button>
          <el-button type="success" link>还原</el-button>
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
import { getDataRecycleListAPI } from '@/api/security'

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
    label: "删除时间",
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
  getDataRecycleList()
}

// 筛选
const search = (filter) => {
  filters.value = filter
  getDataRecycleList()
}


// 获取用户列表
const getDataRecycleList = async () => {
  let { data } = await getDataRecycleListAPI(page.value, pageSize.value, filters.value)
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
  getDataRecycleList()
})
</script>

<style scoped>
.w-150px {
  width: 150px;
}

.text-hidden {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>