<script setup lang="ts">
import MessageBox from "@/components/Message/MessageBox.vue";
import {ref, inject} from "vue";
import type {MessageObject, TextAnimationOptions} from "@/types";
import {nanoid} from "nanoid";

// region 接收动画选项，定义动画状态
const textAnimationOptions = inject('textAnimationOptions') as TextAnimationOptions

const messageList: MessageObject[] = []    // 初始化消息列表
const ok = ref(false)
const buttonOpacity = ref(100)

// endregion

// region 动画开始与结束函数
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

// endregion

// region 根据动画选项textAnimationOptions生成渲染数据的数组，包含消息内容，id，消息文本的随机颜色
function generateMessage() {
  function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const {msgArray, msgCount, textColorList} = textAnimationOptions
  for (let i = 0; i < msgCount; i++) {
    const a = msgArray
    messageList.push({
      id: nanoid(),
      message: a[randInt(0, a.length)],
      color: textColorList[randInt(0, textColorList.length)],
    })
  }
}

generateMessage()
// endregion
</script>

<template>
  <div class="message-container">
    <button
        @click="start"
        :style="{opacity: buttonOpacity}"
    >
      开始动画
    </button>
    <MessageBox
        v-for="item in messageList"
        :message="item.message"
        :key="item.id"
        :ok="ok"
        :style="{color: item.color}"
        @close="stop"
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