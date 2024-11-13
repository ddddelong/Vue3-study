<script setup lang="ts">
import NavButton from "@/components/NavButton.vue";
import {nextTick, reactive} from "vue";
import {nanoid} from "nanoid";
import {randInt} from '@/hooks/random'

const bulletContents = ['666', '对对对', '哈哈哈', '我的天呐', '胡闹', '永恒荣耀，不灭星辰', '破浪乘风，粤上巅峰', '激流勇进，破浪归', '生而无畏，战至终章']
const colorLs = [
  '#d25656',
  '#f5a623',
  '#f7ca18',
  '#000000',
  '#2a82c2',
  '#f5a623',
  '#f8f',
  '#82e024',
  '#41bd86',
  '#fff'
]

// 弹幕轨道类
class Track {
  offset: number = 0   // 轨道相对偏移量
  disabled: boolean = false   // 轨道是否禁用
}

// 弹幕类
class Bullet {
  content: string;
  status: 'waiting' | 'run' | 'done' = 'waiting'
  id: string
  key: string
  track: Track
  color: string   // 弹幕颜色

  constructor(content: string = '哈哈哈', color = '#fff') {
    this.color = color
    this.track = new Track()
    this.id = nanoid();
    this.key = nanoid()
    this.content = content
  }

  get getTrackOffset() {
    return this.track.offset
  }

  get getColor() {
    return this.color
  }
}

let bullets = reactive<Bullet[]>([])   // 弹幕数组
const tracks = reactive<Track[]>([])   // 轨道数组
const trackCount = 8   // 轨道数量
// 初始化轨道
for (let i = 0; i < trackCount; i++) {
  const track = new Track()
  track.offset = i * 40
  tracks.push(track)
}

// 添加弹幕
function add(n: number = randInt(trackCount)) {
  const color = colorLs[randInt(colorLs.length)]
  const content = bulletContents[randInt(bulletContents.length)]
  const bullet = new Bullet(content, color)
  bullet.track = tracks[n]   // 使用第n个轨道
  bullets.push(bullet)
}

function run() {
  bullets.forEach((bullet) => {
    if (bullet.status === 'waiting') {
      bullet.status = 'run'

      bullet.track.disabled = true;   // 将当前轨道禁用
      // 动态生成解除禁用轨道的时间
      const w1 = document.querySelector('.container')?.getBoundingClientRect().width as number // 弹幕容器的宽度
      const w2 = document.getElementById(bullet.id)?.getBoundingClientRect().width as number  // 弹幕的宽度

      const delay = (w2 / (w1 + w2)) * 5 * 1000   // 解除禁用轨道的时间
      setTimeout(() => {
        bullet.track.disabled = false;   // 解除禁用
      }, delay)
    }
  })
}

// 动画结束后将组件销毁
function done(index: number) {
  bullets[index].status = 'done';
  bullets.splice(index, 1)
}

let timer: number | null = null;

// 自动发射弹幕
function auto() {
  if (timer) return stop()  // 防止重复点击
  timer = setInterval(() => {
    tracks.forEach((track, index) => {
      if (!track.disabled) {
        add(index)   // 如果轨道未禁用，则添加弹幕
        nextTick(() => {
          run()
        })
        return
      }
    })
  }, 500)
}

// 停止发射弹幕
function stop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  // bullets = []
}
</script>

<template>
  <div class="danmu">
    <div class="container">
      <!--      <div class="track" v-for="track in tracks"-->
      <!--           style="background-color: #ccc;width: 100%;height: 54px;margin-bottom: 2px"></div>-->
      <div
          v-for="(bullet, index) in bullets"
          class="title"
          :class="`animate-${bullet.status}`"
          @animationend="done(index)"
          :key="bullet.key"
          :id="bullet.id"
          :style="{ top: `${bullet.getTrackOffset}px` , color: bullet.getColor, '--duration': 4 +  's' }"
      >
        {{ bullet.content || 666 }}
      </div>
    </div>
    <div class="nav">
      <div class="btn">
        <NavButton
            text="装填弹幕"
            @click="add(randInt(trackCount))"
        />
      </div>
      <div class="btn">
        <NavButton
            text="发射弹幕"
            color="red"
            @click="run"
        />
      </div>
      <div class="btn">
        <NavButton
            text="自动发射"
            color="#8bc34a"
            @click="auto"
        />
      </div>
      <div class="btn">
        <NavButton
            text="停止发射"
            color="#ffcc00"
            @click="stop"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.danmu {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
  white-space: nowrap;


  .container, .nav {
    overflow: hidden;
    position: relative;
    width: 70vw;
    height: 70vh;
    order: 0;
    align-self: auto;
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 1;
    z-index: 99;
    border: 1px solid #8d1717;
    border-collapse: collapse;
  }

  .container {
    background-color: #000;
  }

  .nav {
    width: 10vw;

    .btn {
      padding: 10px;
      text-align: center;
    }
  }

  .title {
    position: absolute;
    font-size: 16px;
    line-height: 40px;
    //font-family: "字魂125号-九州真书", serif;
  }
}

.animate-done {
  left: 0;
  transform: translate3d(-100%, 0, 0);

}

.animate-waiting {
  //transform: translateX(100%);
  left: 100%;
}

.animate-run {
  animation: run var(--duration) linear forwards;
}

@keyframes run {
  0% {
    //transform: translateX(100%);
    left: 100%;
    transform: translate3d(0, 0, 0);
  }
  100% {
    //transform: translateX(0);
    left: 0;
    transform: translate3d(-100%, 0, 0);
  }
}
</style>