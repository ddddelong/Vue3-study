<script lang="ts" setup>
import HomePage from "@/components/Home-Page.vue";
import SkPlayer from "@/components/SkPlayer.vue";
import MessageContainer from "@/components/Message/MessageContainer.vue";
import type {MusicInfo, ReactiveArray, MessageObject} from "@/types"
import {reactive, ref} from "vue";
import '@/assets/fonts/font.css'
import {nanoid} from 'nanoid'

let musicList: ReactiveArray<MusicInfo> = reactive([
  {
    url: 'http://127.0.0.1:5000/audio/yuanshen-wish.MP3',
    author: 'b站-十壹-Eleven',
    coverUrl: 'http://127.0.0.1:5000/images/cake-1.png',
    cruMusic: true,
    title: 'best-wish'
  }
])  // 初始化为一个空的响应式数组

// region 获取音乐列表
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

const dialogues: Array<string> = [
  "你根本就不懂我！",
  "你不说我怎么懂你啊？",
  "真正懂不需要说！",
  "你说了我不就懂了吗？",
  "说出来有什么意思啊？",
  "我不说你也应该懂！",
  "我又不是算命的！",
  "我知道你几个意思？",
  "没什么意思啊！",
  "确实没什么意思！",
  "对现在我说话你觉得没意思了是吗？",
  "是我说的没意思吗？",
  "那我说没意思 ",
  "就是没意思吗？",
  "那你倒是告诉我你到底几个意思啊？",
  "好那我现在告诉你！",
  "我说的什么意思！"
];

const dbq = [
  '对不起',
  '对不起',
  '对不起',
  '对不起',
  '对不起',
  '对不起',
  '抱歉',
  '抱歉',
  '抱歉',
  '抱歉',
  '别生气了',
  '别生气了',
  '别生气了',
  '别生气了',
  '我错了',
  '我错了',
  '我错了',
]

const ls: Array<MessageObject> = []

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

const colorLs = [
  '#d25656',
  '#f5a623',
  '#f7ca18',
  '#000000',
  '#2a82c2',
  '#f5a623',
  '#f8f',
  '#82e024',
  '#41bd86'
]
for (let i = 0; i < 100; i++) {
  const a = ['不行', '我抗议', '拒绝在不平等条约上签字', '抗议']
  ls.push({
    id: nanoid(),
    message: a[randInt(0, a.length)],
    color: colorLs[randInt(0, colorLs.length)],
  })
}
</script>

<template>
  <!--  <HomePage/>-->
  <!--  <div style="position:fixed;bottom:10%;right: 3%;z-index: 999">-->
  <!--    <SkPlayer :musicList="musicList"/>-->
  <!--  </div>-->
  <MessageContainer :messageList="ls"/>
</template>

<style scoped>

</style>
