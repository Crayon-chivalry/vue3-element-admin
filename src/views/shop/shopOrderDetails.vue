<template>
  <div class="m-block" v-if="order">
    <div class="title">订单详情</div>

    <!-- 订单基本信息 -->
    <div class="mt-lg">
      <div class="text-row">
        <span>订单编号：</span>
        <div>{{ order.number }}</div>
      </div>
      <div class="text-row mt-sm">
        <span>下单时间：</span>
        <div>{{ order.date }}</div>
      </div>
      <div class="text-row mt-sm">
        <span>实付金额：</span>
        <div>￥{{ order.totalPrice }}</div>
      </div>
    </div>

    <el-divider />

    <!-- 订单当前步骤 -->
    <div class="steps">
      <div class="steps-state">
        <el-icon><Box /></el-icon>
        <div class="steps-state-text">待发货</div>
      </div>
      <div class="steps-label">买家已付款，等待发货</div>
      <el-steps :active="2" align-center class="steps-list">
        <el-step title="待付款" />
        <el-step title="待发货" />
        <el-step title="已发货" />
        <el-step title="已签收" />
        <el-step title="已完成" />
      </el-steps>
    </div>

    <el-divider />

    <!-- 商品 -->
    <div class="title">商品清单</div>
    <div class="table mt-lg">
      <el-row class="th">
        <el-col :span="12">商品</el-col>
        <el-col :span="4" class="text-right">单价</el-col>
        <el-col :span="4" class="text-right">数量</el-col>
        <el-col :span="4" class="text-right">小计</el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="12">
          <div class="goods">
            <img src="@/assets/image/phone.jpg" class="goods-cover" />
            <div class="goods-name">{{ order.name }}</div>
          </div>
        </el-col>
        <el-col :span="4" class="text-right">￥{{ order.price }}</el-col>
        <el-col :span="4" class="text-right">{{ order.num }}</el-col>
        <el-col :span="4" class="text-right">￥{{ order.totalPrice }}</el-col>
      </el-row>
    </div>

    <el-divider />

    <!-- 配送信息 -->
    <div class="cell">
      <div class="title">配送信息</div>
      <el-button type="primary">发货</el-button>
    </div>
    <div class="mt-lg">
      <div class="text-row">
        <span>收件人：</span>
        <div>{{ order.buyer }}</div>
      </div>
      <div class="text-row mt-sm">
        <span>联系方式：</span>
        <div>14152526363</div>
      </div>
      <div class="text-row mt-sm">
        <span>配送地址：</span>
        <div>北京市西城区复兴门内大街</div>
      </div>
      <div class="text-row mt-sm">
        <span>快递名称：</span>
        <div>-</div>
      </div>
      <div class="text-row mt-sm">
        <span>快递单号：</span>
        <div>-</div>
      </div>
    </div>

    <el-divider />

    <!-- 支付信息 -->
    <div class="title">支付信息</div>
    <div class="mt-lg">
      <div class="text-row">
        <span>支付方式：</span>
        <div>支付宝</div>
      </div>
      <div class="text-row mt-sm">
        <span>支付编号：</span>
        <div>8932757195129851712390</div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getOrderDetailsAPI } from '@/api/order'

const route = useRoute()
const id = route.query.id

let order = ref(null)

const getOrder = async () => {
  const { data } = await getOrderDetailsAPI(id)
  order.value = data.data
  console.log(data)
}

onMounted(() => {
  getOrder()
})
</script>

<style scoped>
.text-row {
  display: flex;
  font-size: 14px;
}

.text-row span {
  color: gray;
  width: 100px;
}

.steps-state {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.steps-state-text {
  margin-left: 10px;
  font-weight: bold;
}

.steps-label {
  margin-top: 25px;
  color: #e02020;
  text-align: center;
  font-size: 14px;
}

.steps-list {
  margin-top: 30px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.table {
  font-size: 14px;
}

.th {
  padding: 10px;
  background-color: #f2f3f5;
  color: gray;
}

.goods {
  padding-right: 20px;
  display: flex;
  align-items: center;
}

.goods-cover {
  margin-right: 10px;
  width: 80px;
}

.goods-name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: gray;
}

.text-right {
  text-align: right;
}

.cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>