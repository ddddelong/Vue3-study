<script setup lang="ts">
import HomePage from "@/components/Home-Page.vue";
import SkPlayer from "@/components/SkPlayer.vue";
import type {ReactiveArray, MusicInfo} from "@/types"
import {reactive} from "vue";

const musicList:ReactiveArray<MusicInfo> = reactive([
  {
    title: 'best-wish',
    author: 'b站-十壹-Eleven',
    url: new URL('./assets/audio/yuanshen-wish.mp3', import.meta.url).href,
    coverUrl: new URL('./assets/images/cake-1.png', import.meta.url).href,
    cruMusic: true
  },
  {
    title: '祝你生日快乐呀',
    author: 'b站-许里xurry',
    url: new URL('./assets/audio/xl_xurry-Happy-Birthday.mp4', import.meta.url).href,
    coverUrl: new URL('./assets/images/cover-许里xurry-如果你也在今天生日_那也祝你生日快乐呀_原神生日祝福.jpg', import.meta.url).href,
    cruMusic: false
  }
]);
const musicList1:ReactiveArray<MusicInfo> = reactive([
  {
    title: 'best-wish',
    author: 'b站-十壹-Eleven',
    url: new URL('./assets/audio/yuanshen-wish.mp3', import.meta.url).href,
    coverUrl: new URL('./assets/images/cake-1.png', import.meta.url).href,
    cruMusic: true
  }
]);
</script>

<template>
  <HomePage />
  <div style="position:fixed;bottom:10%;right: 3%;z-index: 999">
    <SkPlayer :musicList="musicList"/>
  </div>
  <div style="position:fixed;bottom:30%;right: 3%;z-index: 999; background-color: #efc43c;">
    <SkPlayer :musicList="musicList1"/>
  </div>
</template>

<style scoped>

</style>
