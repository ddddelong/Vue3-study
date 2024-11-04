<script setup lang="ts">
import MessageBox from "@/components/Message/MessageBox.vue";
import {ref, provide, watch, inject, type Ref} from "vue";
import type {MessageObject} from "@/types";

defineProps<{
  messageList: Array<MessageObject>
}>()

const ok = ref(false)
const buttonOpacity = ref(100)

// 开始动画
function start() {
  ok.value = true
  buttonOpacity.value = 0
}

// 停止动画
function stop() {
  ok.value = false
  buttonOpacity.value = 100
}

// 直接将按钮提供给子组件
const setupButton = ref()
provide('setupButton', setupButton)
</script>

<template>
  <div class="message-container">
    <button
        @click="start"
        :style="{opacity: buttonOpacity}"
        ref="setupButton"
    >
      开始动画
    </button>
    <MessageBox
        v-for="item in messageList"
        :message="item.message"
        :key="item.id"
        :ok="ok"
        :style="{color: item.color}"
    />
  </div>
</template>

<style scoped lang="less">
.message-container {
  margin: 0 auto;
  width: 40%;
  background-color: #f5f5f5;

  button {
    display: inline-block;
    width: 80px;
    height: 25px;
    border-radius: 10px;
    background-color: #d25656;
    border: none;

  }
}
</style>