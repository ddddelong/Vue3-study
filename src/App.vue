<script lang="ts" setup>
import HomePage from "@/components/Home-Page.vue";
import SkPlayer from "@/components/SkPlayer.vue";
import type {MusicInfo, ReactiveArray} from "@/types"
import {reactive} from "vue";

let musicList: ReactiveArray<MusicInfo> = reactive([
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


</script>

<template>
  <HomePage/>
  <div style="position:fixed;bottom:10%;right: 3%;z-index: 999">
    <SkPlayer :musicList="musicList"/>
  </div>

</template>

<style scoped>

</style>
