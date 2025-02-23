<template>
    <div>
    <!-- 筛选 -->
    <table-filtering :filterList="filterList" @search="search" />

    <div class="m-block">
      <!-- 操作区 -->
      <el-button type="primary" @click="tolink('shop-goods-publish')">添加</el-button>
      <el-button type="danger" @click="onDelete">删除</el-button>

      <!-- 表格 -->
      <el-table
        :data="tableData"
        table-layout="auto"
        class="mt-lg"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column label="商品信息">
          <template #default="scope">
            <div class="goods">
              <img src="@/assets/image/phone.jpg" class="goods-cover" />
              <div>
                <div class="goods-name">{{ scope.row.name }}</div>
                <div class="goods-number">商品编号：{{ scope.row.number }}</div>
              </div> 
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" />
        <el-table-column prop="stock" label="库存" />
        <el-table-column prop="sales" label="销量" />
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag type="primary" v-if="scope.row.state == 1">在售中</el-tag>
            <el-tag type="danger" v-if="scope.row.state == 2">已下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="创建时间" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" link>编辑</el-button>
            <el-button type="danger" link v-if="scope.row.state == 1">下架</el-button>
            <el-button type="success" link v-if="scope.row.state == 2">上架</el-button>
          </template>
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
import { ref, onMounted } from 'vue';
import { getGoodsListAPI } from '@/api/shop'
import { tolink } from '@/utils';

const filterList = [
  {
    label: "商品名称",
    key: "userid",
    placeholder: "请输入商品名称",
    value: "",
    type: "input",
    vague: true
  },
  {
    label: "商品编号",
    key: "number",
    placeholder: "请输入商品编号",
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
      { label: "在售中", value: 1 },
      { label: "已下架", value: 2 },
    ],
  },
  {
    label: "创建时间",
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
  getGoodsList()
}

// 搜索
const search = (filter) => {
  filters.value = filter
  getGoodsList()
}

// 删除商品
const onDelete = () => {
  if(selectList.value.length == 0) {
    ElMessage({
      message: '请选择要删除的商品',
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
const getGoodsList = async () => {
  let { data } = await getGoodsListAPI(page.value, pageSize.value, filters.value)
  tableData.value = data.data
  total.value = data.total
}

onMounted(() => {
  getGoodsList()
})
</script>

<style scoped>
.goods {
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
</style>