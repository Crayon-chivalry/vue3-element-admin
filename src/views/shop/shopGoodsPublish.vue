<template>
  <div>
    <div class="m-block">
      <!-- 基本信息 -->
      <div class="title">基本信息</div>
      <el-form :model="form" label-width="auto" class="mt-lg">
        <el-form-item label="商品标题">
          <el-input v-model="form.name" placeholder="请输入商品标题" />
        </el-form-item>
        <el-form-item label="商品标签">
          <el-input-tag v-model="form.labels" placeholder="请输入商品标签" />
        </el-form-item>
        <el-form-item label="商品分类">
          <el-cascader
            v-model="form.class"
            :options="options"
            style="width: 100%"
            placeholder="请输入商品分类"
          />
        </el-form-item>
        <el-form-item label="商品主图">
          <el-upload
            v-model:file-list="form.fileList"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            list-type="picture-card"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-divider />

        <!-- 销售信息 -->
        <div class="title">销售信息</div>
        <div class="sku">
          <div class="sku-item" v-for="item in form.sku">
            <el-form-item label="规格名称">
              <el-input v-model="item.name" />
            </el-form-item>
            <el-form-item label="规格单价">
              <el-input v-model="item.price" />
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="item.num" />
            </el-form-item>
          </div>
          <el-button type="primary" plain class="mt-sm" @click="skuAdd"
            >添加规格</el-button
          >
        </div>

        <el-divider />

        <!-- 支付/物流信息 -->
        <div class="title">支付/物流信息</div>
        <el-form-item label="物流方式" class="mt-lg">
          <el-radio-group v-model="form.deliveryType">
            <el-radio value="1">快递配送</el-radio>
            <el-radio value="2">同城闪送</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-checkbox-group v-model="form.payment">
            <el-checkbox label="银联" value="UnionPay" />
            <el-checkbox label="支付宝" value="Alipay" />
            <el-checkbox label="微信" value="WeChatPay" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="电子发票">
          <el-radio-group v-model="form.invoiceType">
            <el-radio value="1">是</el-radio>
            <el-radio value="2">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-divider />

        <!-- 详情 -->
        <div class="title">详情描述</div>
        <div class="mt-lg" style="border: 1px solid #ccc">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :defaultConfig="toolbarConfig"
            :editor="editorRef"
          />
          <Editor
            style="height: 500px; overflow-y: hidden"
            v-model="form.cotnent"
            :defaultConfig="editorConfig"
            @onCreated="handleCreated"
          />
        </div>
      </el-form>

      <div class="mt-lg justify-center">
        <el-button type="primary">确认添加</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, shallowRef, onBeforeUnmount, onMounted } from "vue";
import { getShopClassAPI } from '@/api/shop'

import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";

let form = reactive({
  name: "",
  labels: [],
  fileList: [],
  class: [],
  deliveryType: "1",
  payment: ["UnionPay", "Alipay", "WeChatPay"],
  invoiceType: "1",
  cotnent: "",
  sku: [
    {
      name: "",
      price: "",
      num: "",
    },
  ],
});
// 类别列表
let options = ref([]);

const editorRef = shallowRef(null);
const editorConfig = { placeholder: "请输入内容..." };
const toolbarConfig = {
  toolbarKeys: [
    "headerSelect", // 标题选择
    "bold", // 加粗
    "italic", // 斜体
    "through", // 删除线
    "underline", // 下划线
    "justifyCenter", // 居中对齐
    "justifyJustify", // 两端对齐
    "justifyLeft", // 左对齐
    "justifyRight", // 右对齐
    "bulletedList", // 无序列表
    "numberedList", // 有序列表
    "color", // 文字颜色
    "insertLink", // 插入链接
    "fontSize", // 字体大小
    "lineHeight", // 行高
    "delIndent", // 缩进
    "indent", // 增进
    "divider", // 分割线
    "insertTable", // 插入表格
    "undo", // 撤销
    "redo", // 重做
    "clearStyle", // 清除格式
    "fullScreen", // 全屏
    "blockquote", // 引用
    "codeBlock", // 代码块
    "insertImage", // 插入图片
    "uploadImage", // 上传图片
    "insertVideo", // 插入视频
  ],
};

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const skuAdd = () => {
  form.sku.push({
    name: "",
    price: "",
    nmu: "",
  });
};

const getShopClass = async () => {
  const { data } = await getShopClassAPI()
  options.value = data.data
}

onMounted(() => {
  getShopClass()
})

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy(); // 销毁 editor 实例
});
</script>

<style scoped>
.title {
  font-size: 16px;
  font-weight: bold;
}

.sku-item {
  margin-top: 10px;
  display: flex;
  gap: 20px;
}

.sku-item:first-child {
  margin-top: 20px;
}

.justify-center {
  display: flex;
  justify-content: center;
}
</style>
