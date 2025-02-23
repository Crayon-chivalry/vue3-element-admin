<template>
  <div>
    <!-- 筛选 -->
    <table-filtering :filterList="filterList" @search="search" />

    <div class="m-block">
      <!-- 操作区 -->
      <el-button type="danger" @click="onDelete">删除</el-button>

      <!-- 表格 -->
      <el-table
        :data="tableData"
        table-layout="auto"
        class="mt-lg"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column label="头像">
          <template #default>
            <img src="@/assets/image/tx.svg" class="tx-icon" />
          </template>
        </el-table-column>
        <el-table-column prop="userid" label="用户名" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag type="primary" v-if="scope.row.state == 1">正常</el-tag>
            <el-tag type="warning" v-if="scope.row.state == 2">冻结</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" link>编辑</el-button>
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
import { getUserListAPI } from '@/api/user'

// 筛选配置
const filterList = [
  {
    label: "用户名",
    key: "userid",
    placeholder: "请输入用户名",
    value: "",
    type: "input",
  },
  {
    label: "姓名",
    key: "name",
    placeholder: "请输入姓名",
    value: "",
    type: "input",
  },
  {
    label: "手机号",
    key: "phone",
    placeholder: "请输入手机号",
    value: "",
    type: "input",
  },
  {
    label: "状态",
    key: "state",
    placeholder: "请选择状态",
    value: 0,
    type: "select",
    options: [
      { label: "全部", value: 0 },
      { label: "正常", value: 1 },
      { label: "冻结", value: 2 },
    ],
  }
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
  getUserList()
}

// 筛选
const search = (filter) => {
  filters.value = filter
  getUserList()
}

// 获取用户列表
const getUserList = async () => {
  let { data } = await getUserListAPI(page.value, pageSize.value, filters.value)
  tableData.value = data.data
  total.value = data.total
}

// 删除
const onDelete = () => {
  if(selectList.value.length == 0) {
    ElMessage({
      message: '请选择要删除的用户',
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
  getUserList()
})
</script>

<style scoped>
.tx-icon {
  width: 40px;
  height: 40px;
}
</style>
