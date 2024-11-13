<script lang="ts" setup>
import HomePage from "@/components/HomePage.vue";
import SkPlayer from "@/components/SkPlayer.vue";
import MessageContainer from "@/components/Message/MessageContainer.vue";
import NavBar from "@/components/NavBar.vue";
import type {TextAnimationOptions} from "@/types"
import {provide, reactive} from "vue";
import '@/assets/fonts/font.css'

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
  <!--  <HomePage/>-->
  <!--  <div style="position:fixed;bottom:10%;right: 3%;z-index: 999">-->
  <!--    <SkPlayer :musicList="musicList"/>-->
  <!--  </div>-->
  <!--  <MessageContainer/>-->
  <NavBar/>

</template>

<style scoped>

</style>
<style>
.el-tabs__header {
  margin: 0;
}
</style>