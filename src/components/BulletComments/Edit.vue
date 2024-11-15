<template>
  <NavButton
      text="编辑弹幕"
      color="#f1afc9"
      @click="edit"
  />
  <el-dialog v-model="dialogFormVisible" title="编辑弹幕" width="500" @open="handleOpen">
    <el-form :model="form">
      <el-form-item label="弹幕内容" :label-width="formLabelWidth">
        <el-input
            ref="inputRef"
            v-model="form.content"
            style="width: 240px"
            :rows="2"
            type="textarea"
            placeholder="发弹幕见证当下"
            @keydown.enter="send"
        />
      </el-form-item>
      <el-form-item label="弹幕模式" :label-width="formLabelWidth">
        <el-select
            v-model="form.type"
            label="选择弹幕模式"
            style="width: 240px;">
          <el-option v-for="t in form.types" :label="t.name" :value="t.name"/>
        </el-select>
      </el-form-item>
      <el-form-item label="弹幕颜色" :label-width="formLabelWidth">
        <el-color-picker v-model="form.color" size="small"></el-color-picker>
      </el-form-item>
    </el-form>
    <div class="alter">
      <el-alert title="弹幕不能为空！！" type="warning" v-show="isEmpty" :closable="false"/>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="send">
          发送
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import NavButton from "@/components/NavButton.vue";
import type {Danmu1} from "@/types/danmu";

// 标注类型
interface Emits {
  (event: 'add', bullet: Danmu1): void;
}

const emit = defineEmits<Emits>();

const isEmpty = ref(false)   // 输入的弹幕内容是否为空
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  content: '',
  color: '#f5a623',
  types: [{
    name: '滚动',
    value: 'roll'
  }, {
    name: '顶部',
    value: 'top'
  }, {
    name: '底部',
    value: 'bottom'
  }],
  type: '滚动',
})

// 编辑弹幕
function edit() {
  dialogFormVisible.value = true
}

// 发送弹幕
function send() {
  if (!form.content) {
    isEmpty.value = true
    return
  }

  dialogFormVisible.value = false
  const bullet = {
    content: form.content,
    color: form.color,
    type: form.type,
  }
  console.log(bullet)
  form.content = ''   // 清空输入框内容
  emit('add', bullet)
  closeDialog()
}

// 关闭对话框
function closeDialog() {
  dialogFormVisible.value = false
  form.content = ''   // 清空输入框内容
  isEmpty.value = false   // 重置警告信息
}

// 处理弹框打开事件
const inputRef = ref<HTMLElement>()

function handleOpen() {
  setTimeout(() => {
    inputRef.value?.focus()
  }, 100);
}

</script>
<style scoped>
.alter {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
</style>