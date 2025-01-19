<template>
  <div>
    <table-filtering :formList="formList" />

    <div class="m-block">
      <el-button type="danger">删除</el-button>

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
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tableData = [
  {
    tx: "",
    userid: "123",
    name: "王五",
    phone: "14152526363",
    state: 1,
  },
  {
    tx: "",
    userid: "lisi",
    name: "李四",
    phone: "17252556250",
    state: 2,
  },
];

const formList = [
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
    value: "",
    type: "select",
    options: [
      { label: "正常", value: 1 },
      { label: "冻结", value: 2 },
    ],
  },
];

let selectList = ref([]);

const handleSelectionChange = (e) => {
  selectList.value = e;
};
</script>

<style scoped>
.tx-icon {
  width: 40px;
  height: 40px;
}
</style>
