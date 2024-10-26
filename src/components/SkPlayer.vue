<script lang="ts" setup>
import '@/utils/skPlayer/skPlayer.scss'
import { onMounted, ref, nextTick } from 'vue'
import type { Ref, ReactiveArray, MusicInfo } from '@/types'


type Options = {
  audio: Ref<HTMLAudioElement>,
  cover: Ref<HTMLImageElement>,
  playButton: Ref<HTMLAnchorElement>,
  musicInfo: ReactiveArray<MusicInfo>,
}

class AudioPlayer {
  audio: Ref<HTMLAudioElement>;
  cover: Ref<HTMLImageElement>;
  playButton: Ref<HTMLAnchorElement>;
  currentProgress: Ref<number>;
  totalTime: Ref<string>;
  currenTime: Ref<string>;
  volume: Ref<number>;
  isShowList: Ref<boolean>;
  musicInfo: ReactiveArray<MusicInfo>;
  curIndex: Ref<number>;

  constructor(options: Options) {
    this.audio = options.audio;
    this.cover = options.cover;
    this.playButton =options.playButton;
    this.currentProgress = ref(0);
    this.totalTime = ref('0:00');
    this.currenTime = ref('0:00');
    this.volume = ref(100);
    this.isShowList = ref(false);
    this.curIndex = ref(0);
    this.musicInfo = options.musicInfo;
  }

  formatTime(seconds: number): string {
    const date = new Date(seconds * 1000);
    return (
        ('0' + date.getUTCMinutes()).slice(-2) +
        ':' +
        ('0' + date.getUTCSeconds()).slice(-2)
    );
  }

  pause() {
    if (this.audio.value?.paused) {
      this.audio.value.play();
    } else {
      this.audio.value?.pause();
    }
  }

  setProgress() {
    if (this.audio.value) {
      this.totalTime.value = this.formatTime(this.audio.value.duration);
      this.audio.value.ontimeupdate = () => {
        this.currentProgress.value = (this.audio.value.currentTime / this.audio.value.duration) * 100;
        this.currenTime.value = this.formatTime(this.audio.value.currentTime);
      };
    }
  }

  // 添加一个 getter获取当前播放进度
  get currentProgressValue() {
    return this.currentProgress.value;
  }

  updateProgram(e: MouseEvent) {
    if (this.audio.value?.paused) {
      this.playButton.value?.click();
    }
    const container = e.currentTarget as HTMLDivElement;
    if (this.audio.value) {
      this.audio.value.currentTime = (e.offsetX / container.clientWidth) * this.audio.value.duration;
    }
  }

  setVolume(e: MouseEvent) {
    const container = e.currentTarget as HTMLDivElement;
    this.volume.value = (e.offsetX / container.clientWidth) * 100;
    if (this.audio.value) {
      console.log(this.volume.value)
      this.audio.value.volume = this.volume.value / 100;
    }
  }

  // 添加一个 getter获取当前音量
  get volumeValue() {
    return this.volume.value;
  }

  switchListState() {
    this.isShowList.value = !this.isShowList.value;
  }

  // 添加一个getter获取当前播放列表状态
  get isShowListValue() {
    return this.isShowList.value;
  }

  switchMusic(index: number) {
    this.audio.value?.pause();
    this.curIndex.value = index;

    nextTick(() => {
      if (this.audio.value) {
        this.audio.value.src = this.musicInfo[this.curIndex.value].url;
        this.audio.value.currentTime = 0;
        this.audio.value.play().catch((error: string) => {
          console.error('播放音乐时出错:', error);
        });
        this.musicInfo.forEach((item: MusicInfo, idx: number) => {
          item.cruMusic = idx === this.curIndex.value;
        });
      }
    });
  }

  // 检查当前音乐播放状态
  get isPlay() {
    return !this.audio.value?.paused;
  }
}

// 接收来自父组件的音乐列表
const props = defineProps<{
  musicList: ReactiveArray<MusicInfo>
}>()

const musicInfo: ReactiveArray<MusicInfo> = props.musicList;
const audio = ref();
const cover = ref();
const playButton = ref();
const audioPlayer = new AudioPlayer({
  audio,
  cover,
  playButton,
  musicInfo,
});
onMounted(() => {
});
</script>

<template>
  <div class="SkPlayer" :class="{'skPlayer-list-on': audioPlayer.isShowListValue}">
    <audio ref="audio" class="skPlayer-source" :src="audioPlayer.musicInfo[audioPlayer.curIndex.value].url" @loadedmetadata="audioPlayer.setProgress"></audio>
    <div class="skPlayer-picture">
      <img ref="cover" alt="" class="skPlayer-cover" :src="audioPlayer.musicInfo[audioPlayer.curIndex.value].coverUrl">
      <a ref="playButton" :class="{'skPlayer-play-btn': true, 'skPlayer-pause': audioPlayer.isPlay}" href="javascript:" @click="audioPlayer.pause">
        <span class="skPlayer-left"></span>
        <span class="skPlayer-right"></span>
      </a>
    </div>
    <div class="skPlayer-control">
      <p class="skPlayer-name">{{ audioPlayer.musicInfo[audioPlayer.curIndex.value].title }}</p>
      <p class="skPlayer-author">{{ audioPlayer.musicInfo[audioPlayer.curIndex.value].author }}</p>
      <div class="skPlayer-percent" @click="audioPlayer.updateProgram">
        <div class="skPlayer-line-loading" style="{width: 100%}"></div>
        <div class="skPlayer-line" :style="{width: audioPlayer.currentProgressValue + '%'}"></div>
      </div>
      <p class="skPlayer-time">
        <span class="skPlayer-cur">{{ audioPlayer.currenTime }}</span>/<span class="skPlayer-total">{{ audioPlayer.totalTime }}</span>
      </p>
      <div class="skPlayer-volume">
        <i class="skPlayer-icon"></i>
        <div class="skPlayer-percent" @click="audioPlayer.setVolume($event)">
          <div class="skPlayer-line" :style="{width: audioPlayer.volumeValue + '%'}"></div>
        </div>
      </div>
      <div class="skPlayer-list-switch" @click="audioPlayer.switchListState">
        <i class="skPlayer-list-icon"></i>
      </div>
      <i class="skPlayer-mode"></i>
    </div>
    <ul class="skPlayer-list">
      <li v-for="(item, index) in audioPlayer.musicInfo" :class="{'skPlayer-curMusic': item.cruMusic}" :key="index" @click="audioPlayer.switchMusic(index)">
        <i class="skPlayer-list-sign"></i>
        <span class="skPlayer-list-index">{{ index + 1 }}</span>
        <span class="skPlayer-list-name">{{ item.title }}</span>
        <span class="skPlayer-list-author">{{ item.author }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">

</style>
