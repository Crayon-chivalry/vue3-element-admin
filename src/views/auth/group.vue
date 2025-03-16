<template>
  <div>
    <!-- 筛选 -->
    <table-filtering :filterList="filterList" @search="search" />

    <div class="m-block">
      <!-- 操作区 -->
      <el-button type="primary" @click="tolink('group-upsert')">添加</el-button>
      <el-button type="danger">删除</el-button>

      <!-- 表格 -->
      <el-table
        :data="tableData"
        table-layout="auto"
        class="mt-lg"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column prop="name" label="组别名称" />
        <el-table-column prop="permission" label="权限" />
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.state == 1">启用</el-tag>
            <el-tag type="warning" v-if="scope.row.state == 2">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updateDate" label="修改时间" />
        <el-table-column prop="date" label="创建时间" />
        <el-table-column label="操作">
          <el-button type="primary" link>编辑</el-button>
          <el-button type="danger" link>删除</el-button>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="m-pagination">
        <el-pagination
          background
          layout="total, prev, pager, next, sizes"
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
import { getGroupListAPI } from "@/api/auth";
import { tolink } from "@/utils";

// 筛选配置
const filterList = [
  {
    label: "组别名称",
    key: "name",
    placeholder: "请输入组别名称",
    value: "",
    type: "input",
  },
  {
    label: "创建时间",
    key: "date",
    value: "",
    type: "date",
  },
];

let tableData = ref([]);
let selectList = ref([]);

let page = ref(1);
let pageSize = ref(10);
let total = ref(0);

let filters = ref({});

// 处理表格选中项变化
const handleSelectionChange = (e) => {
  selectList.value = e;
};

// 页码 / 页码大小 变化
const change = (current, size) => {
  page.value = current;
  pageSize.value = size;
  getData();
};

// 筛选
const search = (filter) => {
  filters.value = filter;
  getData();
};

// 获取用户列表
const getData = async () => {
  let { data } = await getGroupListAPI(
    page.value,
    pageSize.value,
    filters.value
  );
  tableData.value = data.data;
  total.value = data.total;
};

onMounted(() => {
  getData();
});
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

.tx-icon {
  width: 40px;
  height: 40px;
}
</style>
