<template>
  <div>
    <!-- 筛选 -->
    <table-filtering :filterList="filterList" @search="search" />

    <div class="m-block">
      <!-- 操作区 -->
      <el-button type="danger" @click="onDelete">删除</el-button>

      <!-- 表格 -->
      <el-table :data="tableData" table-layout="auto" class="mt-lg" @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column label="订单信息">
          <template #default="scope">
            <div class="number">[订单编号：{{ scope.row.number }}]</div>
            <div class="goods">
              <img src="@/assets/image/phone.jpg" class="goods-cover" />
              <div>
                <div class="goods-name">{{ scope.row.name }}</div>
                <div class="goods-number">商品编号：{{ scope.row.shopNumber }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="单价">
          <template #default="scope">￥{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column prop="num" label="数量" />
        <el-table-column label="实付金额">
          <template #default="scope">￥{{ scope.row.totalPrice }}</template>
        </el-table-column>
        <el-table-column prop="buyer" label="买家" />
        <el-table-column prop="date" label="创建时间" />
        <el-table-column label="交易状态">
          <template #default="scope">
            <el-tag type="info" v-if="scope.row.state == 1">待付款</el-tag>
            <el-tag type="warning" v-if="scope.row.state == 2">待发货</el-tag>
            <el-tag type="primary" v-if="scope.row.state == 3">已发货</el-tag>
            <el-tag type="success" v-if="scope.row.state == 4">已完成</el-tag>
            <el-tag type="danger" v-if="scope.row.state == 5">已取消</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" link @click="tolink('shop-order-details?id=' + scope.row.id)">订单详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="m-pagination">
        <el-pagination background layout="total, prev, pager, next, sizes" :page-sizes="[10, 20, 30, 40]" :total="total"
          @change="change" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getOrderListAPI } from '@/api/shop'
import { tolink } from '@/utils/index'

const filterList = [
  {
    label: "订单编号",
    key: "number",
    placeholder: "请输入编号",
    value: "",
    type: "input",
  },
  {
    label: "交易状态",
    key: "state",
    placeholder: "请选择状态",
    value: 0,
    type: "select",
    options: [
      { label: "全部", value: 0 },
      { label: "待付款", value: 1 },
      { label: "待发货", value: 2 },
      { label: "已发货", value: 3 },
      { label: "已完成", value: 4 },
      { label: "已取消", value: 5 },
    ],
  },
  {
    label: "时间",
    key: "date",
    value: "",
    type: "date",
  },
]

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
  getOrderList()
}

// 搜索
const search = (filter) => {
  filters.value = filter
  getOrderList()
}

// 删除订单
const onDelete = () => {
  if (selectList.value.length == 0) {
    ElMessage({
      message: '请选择要删除的订单',
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

// 获取商品列表
const getOrderList = async () => {
  const { data } = await getOrderListAPI(page.value, pageSize.value, filters.value)
  tableData.value = data.data
  total.value = data.total
}

onMounted(() => {
  getOrderList()
})
</script>

<style scoped>
.goods {
  margin-top: 5px;
  display: flex;
  width: 300px;
}

.goods-cover {
  margin-right: 10px;
  width: 80px;
}

.goods-name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.goods-number {
  margin-top: 2px;
  color: gray;
  font-size: 13px;
}

.number {
  color: #409eff;
}
</style>