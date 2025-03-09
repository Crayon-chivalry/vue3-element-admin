<template>
  <div>
    <div class="m-block">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="auto" style="max-width: 600px">
        <el-form-item label="站点名称" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="自定义后台入口" prop="stageDoor">
          <el-input v-model="form.stageDoor" />
        </el-form-item>
        <el-form-item label="备案号">
          <el-input v-model="form.recordNumber" />
        </el-form-item>
        <el-form-item label="版本号" prop="vetsion">
          <el-input v-model="form.vetsion" />
        </el-form-item>
        <el-form-item label="禁止访问IP">
          <el-input v-model="form.prohibitIp" :rows="4" type="textarea" />
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitForm">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getSystemDataAPI } from '@/api/routine'

const formRef = ref(null)

const rules = {
  title: { required: true, message: '站点名称不能为空', trigger: 'blur' },
  stageDoor: { required: true, message: '自定义后台入口不能为空', trigger: 'blur' },
  vetsion: { required: true, message: '版本号不能为空', trigger: 'blur' },
}

let form = ref({
  title: '',
  stageDoor: '',
  recordNumber: '',
  vetsion: '',
  prohibitIp: '',
})

const submitForm = () => {
  formRef.value.validate(valid => {
    if (valid) {

    }
  })
}

const getSystemData = async () => {
  const { data } = await getSystemDataAPI()
  form.value = data.data
}

onMounted(() => {
  getSystemData()
})
</script>

<style scoped>
</style>