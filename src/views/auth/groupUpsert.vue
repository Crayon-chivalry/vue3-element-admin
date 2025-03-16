<template>
  <div class="m-block">
    <div class="title">添加角色</div>

    <el-form :model="form" :rules="rules" label-width="auto" class="mt-lg">
      <el-form-item label="上级分组" prop="group">
        <el-cascader
          v-model="form.group"
          :options="options"
          style="width: 100%"
          placeholder="点击选择"
        />
      </el-form-item>
      <el-form-item label="组别名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入组别名称" />
      </el-form-item>
      <el-form-item label="权限" prop="permission">
        <el-tree
          style="max-width: 600px"
          :data="permissionList"
          show-checkbox
          default-expand-all
          node-key="path"
          ref="treeRef"
          v-if="permissionList.length > 0"
        />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="form.state">
          <el-radio value="1">启用</el-radio>
          <el-radio value="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="onSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getPermissionAPI, getGroupSelectListAPI } from "@/api/auth";

const treeRef = ref(null)

let options = ref([])

const rules = {
  group: { required: true, message: '上级分组不能为空', trigger: 'blur' },
  name: { required: true, message: '组别名称不能为空', trigger: 'blur' },
  permission: { required: true, message: '权限不能为空', trigger: 'blur' },
  state: { required: true, message: '状态不能为空', trigger: 'blur' },
}

let form = reactive({
  group: "",
  name: "",
  state: "1",
  permission: []
});

let permissionList = ref([]);

const processItem = (item) => {
  if (item.meta) {
    item.label = item.meta.title;
  }
  if (item.children && item.children.length > 0) {
    if (item.children.length === 1) {
      item.label = item.children[0].meta.title;
    }
    item.children.forEach((child) => {
      processItem(child);
    });
  }
};

const getPermissionList = async () => {
  const { data } = await getPermissionAPI();
  data.data.forEach((item) => {
    processItem(item);
  });
  permissionList.value = data.data;
};

const getGroupSelectList = async () => {
  const { data } = await getGroupSelectListAPI();
  options.value = data.data;
};

const onSave = () => {
  console.log(treeRef.value.getCheckedNodes())
}

onMounted(() => {
  getPermissionList();
  getGroupSelectList()
});
</script>

<style scoped>
.title {
  font-size: 16px;
  font-weight: bold;
}
</style>
