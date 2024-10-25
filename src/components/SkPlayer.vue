<script lang="ts" setup>
import '@/utils/skPlayer/skPlayer.scss'
import {onMounted, ref} from 'vue'

const audio = ref()   // 音频元素
const cover = ref()   // 封面图片
const playButton = ref()    // 播放与暂停按钮
const currentProgress = ref(0)  // 播放进度
const totalTime = ref('0')   // 音频总时间
const currenTime = ref('00:00')   // 音频播放当前时间
const volume = ref(100)   // 音量
const isShowList = ref(false)   // 是否显示列表

// 格式化时间
function formatTime(seconds) {
  const date = new Date(seconds * 1000);
  return (
      ('0' + date.getUTCMinutes()).slice(-2) +
      ':' +
      ('0' + date.getUTCSeconds()).slice(-2)
  );
}

// 播放与暂停
function pause() {
  if (audio.value.paused) {
    audio.value.play()
    cover.value.classList.add('skPlayer-pause')
    playButton.value.classList.add('skPlayer-pause')
  } else {
    audio.value.pause()
    cover.value.classList.remove('skPlayer-pause')
    playButton.value.classList.remove('skPlayer-pause')
  }
}

// 设置播放进度
function setProgress() {
  totalTime.value = formatTime(audio.value.duration)
  audio.value.ontimeupdate = () => {
    currentProgress.value = (audio.value.currentTime / audio.value.duration) * 100
    currenTime.value = formatTime(audio.value.currentTime)
  }
}

// 点击进度条更新播放进度
function updateProgram(e: MouseEvent) {
  if(audio.value.paused){
    playButton.value.click()
  }
  const container = e.currentTarget as HTMLDivElement
  audio.value.currentTime = (e.offsetX / container.clientWidth) * audio.value.duration
}

// 音量控制
function setVolume(e: MouseEvent) {
  const container = e.currentTarget as HTMLDivElement
  volume.value = (e.offsetX / container.clientWidth) * 100
  audio.value.volume = volume.value / 100
}

// 音乐列表切换
function switchListState() {
  isShowList.value = !isShowList.value
}
onMounted(() => {
})
</script>

<template>
  <div id="skPlayer" style="position:fixed;bottom:10%;background: #efc43c;right: 3%;z-index: 999" :class="{'skPlayer-list-on': isShowList}">
    <audio ref="audio" class="skPlayer-source" src="src/assets/audio/xl_xurry-Happy-Birthday.mp4" @loadedmetadata="setProgress"></audio>
    <div class="skPlayer-picture">
      <img ref="cover" alt="" class="skPlayer-cover" src="../assets/images/cake-1.png">
      <a ref="playButton" class="skPlayer-play-btn" href="javascript:" @click="pause">
        <span class="skPlayer-left"></span>
        <span class="skPlayer-right"></span>
      </a>
    </div>
    <div class="skPlayer-control">
      <p class="skPlayer-name">best-wish</p>
      <p class="skPlayer-author">b站-十壹-Eleven</p>
      <div class="skPlayer-percent" @click="updateProgram">
        <div class="skPlayer-line-loading" style="{width: 100%}"></div>
        <div class="skPlayer-line" :style="{width: currentProgress + '%'}" ></div>
      </div>
      <p class="skPlayer-time">
        <span class="skPlayer-cur">{{ currenTime }}</span>/<span class="skPlayer-total">{{ totalTime }}</span>
      </p>
      <div class="skPlayer-volume" style="">
        <i class="skPlayer-icon"></i>
        <div class="skPlayer-percent" @click="setVolume">
          <div class="skPlayer-line" :style="{width: volume + '%'}"></div>
        </div>
      </div>
      <div class="skPlayer-list-switch" @click="switchListState">
        <i class="skPlayer-list-icon"></i>
      </div>
      <i class="skPlayer-mode"></i>
    </div>
    <ul class="skPlayer-list">
      <li class="skPlayer-curMusic" data-index="0">
        <i class="skPlayer-list-sign"></i>
        <span class="skPlayer-list-index">1</span>
        <span class="skPlayer-list-name" title="best-wish">best-wish</span>
        <span class="skPlayer-list-author" title="b站-十壹-Eleven">b站-十壹-Eleven</span>
      </li>

      <li data-index="1">
        <i class="skPlayer-list-sign"></i>
        <span class="skPlayer-list-index">2</span>
        <span class="skPlayer-list-name" title="祝你生日快乐呀">祝你生日快乐呀</span>
        <span class="skPlayer-list-author" title="b站-许里xurry">b站-许里xurry</span>
      </li>

    </ul>
  </div>
</template>

<style scoped lang="less">

</style>
