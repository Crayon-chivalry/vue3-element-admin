<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12">
        <div class="m-block mb-md">
          <div class="user">
            <img src="@/assets/image/tx.svg" class="tx" />
            <div class="name">admin</div>
            <div class="date">上次登录于 2025-03-154</div>
          </div>
          <el-form :model="form" :rules="rules" ref="formRef" label-width="auto" style="max-width: 600px">
            <el-form-item label="用户名">
              <el-input v-model="form.userid" disabled />
            </el-form-item>
            <el-form-item label="昵称" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="邮箱地址">
              <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input v-model="form.phone" />
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="form.password" type="password" show-password />
            </el-form-item>
            <el-form-item label=" ">
              <el-button type="primary" @click="submitForm">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12">
        <div class="m-block">
          <el-timeline style="max-width: 600px">
            <el-timeline-item v-for="(item, index) in logTimes" :key="index" :timestamp="item">
              登录
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAdminInfoAPI } from '@/api/routine'

const formRef = ref(null)

const rules = {
  name: { required: true, message: '昵称不能为空', trigger: 'blur' },
}

let form = ref({
  userid: '',
  name: '',
  email: '',
  phone: '',
  password: ''
})

let logTimes = ref(generateDecreasingTimes())

function generateDecreasingTimes() {
  // 1. 获取当前时间
  const now = new Date();
  // 2. 生成 9 个逐步递减的时间
  const times = [now];
  let previousTime = now;
  for (let i = 0; i < 9; i++) {
    // 生成一个随机时间间隔（逐步递减）
    const randomInterval = Math.floor(Math.random() * 1000 * 60 * 60 * 24); // 随机间隔（0 到 1 天）
    const newTime = new Date(previousTime.getTime() - randomInterval);
    // 将新时间添加到数组中
    times.push(newTime);
    // 更新 previousTime
    previousTime = newTime;
  }
  // 3. 格式化时间
  const formattedTimes = times.map(time => {
    const year = time.getFullYear();
    const month = String(time.getMonth() + 1).padStart(2, '0');
    const day = String(time.getDate()).padStart(2, '0');
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  });
  return formattedTimes;
}

const submitForm = () => {
  formRef.value.validate(valid => {
    if (valid) {

    }
  })
}

const getAdminInfo = async () => {
  const { data } = await getAdminInfoAPI()
  form.value = {...form.value, ...data.data}
}

onMounted(() => {
  getAdminInfo()
})
</script>

<style scoped>
.user {
  margin-bottom: 30px;
  text-align: center;
}

.name {
  padding: 10px 0;
  font-size: 22px;
}

.tx {
  width: 110px;
}

.date {
  font-size: 14px;
}
</style>
