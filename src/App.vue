<script lang="ts" setup>
import HomePage from "@/components/Home-Page.vue";
import SkPlayer from "@/components/SkPlayer.vue";
import MessageContainer from "@/components/Message/MessageContainer.vue";
import type {MusicInfoObject, TextAnimationOptions} from "@/types"
import {provide, reactive} from "vue";
import type {Reactive} from "vue";
import '@/assets/fonts/font.css'

// region 获取音乐列表
let musicList: Reactive<[MusicInfoObject]> = reactive([
  {
    url: 'http://127.0.0.1:5000/audio/yuanshen-wish.MP3',
    author: 'b站-十壹-Eleven',
    coverUrl: 'http://127.0.0.1:5000/images/cake-1.png',
    cruMusic: true,
    title: 'best-wish'
  }
])  // 初始化为一个空的响应式数组

fetch('http://127.0.0.1:5000/api/music/info', {
  method: 'GET',
}).then(response => {
  // 确保响应成功
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}).then(data => {
  console.log(data.data);
  musicList.splice(0, musicList.length, ...data.data);
}).catch(error => {
  console.error('There has been a problem with your fetch operation:', error);
});
// endregion

// region 定义动画选项
const textAnimationOptions: TextAnimationOptions = {
  duration: 20,   // 动画持续时间，单位s
  speed: 4,    // 动画速度
  msgArray: ['666', '对对对', '哈哈哈', '6'],     // 消息数组
  msgCount: 200,    // 消息数量
  textColorList: [
    '#d25656',
    '#f5a623',
    '#f7ca18',
    '#000000',
    '#2a82c2',
    '#f5a623',
    '#f8f',
    '#82e024',
    '#41bd86'
  ]   // 消息颜色数组
}

provide('textAnimationOptions', textAnimationOptions)   // 向子组件提供动画选项
// endregion

</script>

<template>
  <HomePage/>
  <div style="position:fixed;bottom:10%;right: 3%;z-index: 999">
    <SkPlayer :musicList="musicList"/>
  </div>
  <MessageContainer/>
</template>

<style scoped>

</style>
