<script setup lang="ts">
import NavButton from "@/components/NavButton.vue";
import Edit from "@/components/BulletComments/Edit.vue";
import {type Danmu1} from "@/types/danmu";
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

// 弹幕类型类
class DanmuType {
  type: string = 'roll'  // 'roll' | 'top' | 'bottom'

  constructor(type = 'roll') {
    this.type = type
  }

  // 根据弹幕类型，返回ture表示roll类型，否则为top或bottom类型
  get isRoll() {
    return this.type === 'roll'
  }
}

// 弹幕类
class Bullet {
  content: string;
  status: 'waiting' | 'run' | 'done' = 'waiting'
  id: string
  key: string
  track: Track
  color: string   // 弹幕颜色
  danmuType: DanmuType
  isNew: boolean

  constructor(content: string = '哈哈哈', color = '#fff') {
    this.color = color
    this.track = new Track()
    this.id = nanoid();
    this.key = nanoid()
    this.content = content
    this.danmuType = new DanmuType();
    this.isNew = false
  }

  get getTrackOffset() {
    if (this.danmuType.isRoll) {
      return {
        top: `${this.track.offset}px`, // 滚动弹幕使用 `top`
      };
    }

    return {
      transform: `translateY(${this.track.offset}px)`, // 非滚动弹幕使用 `transform`
    };

  }

  get getColor() {
    return this.color
  }

  get getClassList() {
    if (!this.isNew) {
      if (this.danmuType.type === 'roll') {
        return [`animate-${this.status}`, 'title']
      } else {
        return [`danmu-type-${this.danmuType.type}`, 'fade-out']
      }
    } else {
      switch (this.danmuType.type) {
        case 'bottom':

        case 'top':
          return [`danmu-type-${this.danmuType.type}`, 'fade-out']

        case 'roll':
          return [`animate-${this.status}`, 'title']
      }
    }
  }
}

let bullets = reactive<Bullet[]>([])   // 弹幕数组
const tracks = reactive<Track[]>([])   // 轨道数组
const bulletTypes = reactive<DanmuType[]>([])
const trackCount = 8   // 轨道数量
// 初始化轨道
for (let i = 0; i < trackCount; i++) {
  const track = new Track()
  track.offset = i * 40
  tracks.push(track)
}

// 初始化弹幕类型
bulletTypes.push(new DanmuType('roll'))
bulletTypes.push(new DanmuType('top'))
bulletTypes.push(new DanmuType('bottom'))

// 添加弹幕
function add(n: number = randInt(trackCount)) {
  const color = colorLs[randInt(colorLs.length)]
  const content = bulletContents[randInt(bulletContents.length)]
  const bullet = new Bullet(content, color)
  bullet.track = tracks[n]   // 使用第n个轨道
  bullet.danmuType = bulletTypes[randInt(bulletTypes.length)]   // 使用随机弹幕类型
  bullets.push(bullet)
}

function run() {
  bullets.forEach((bullet) => {
    if (bullet.danmuType.isRoll) {
      // 如果弹幕是滚动类型
      if (bullet.status === 'waiting') {
        bullet.status = 'run';

        // 禁用轨道，防止其他弹幕同时发射到同一轨道
        bullet.track.disabled = true;

        // 获取容器和弹幕宽度
        const w1 = document.querySelector('.container')?.getBoundingClientRect().width;
        const w2 = document.getElementById(bullet.id)?.getBoundingClientRect().width;

        // 宽度校验，避免除数为0
        if (w1 && w2) {
          const delay = (w2 / (w1 + w2)) * 5 * 1000;
          setTimeout(() => {
            bullet.track.disabled = false; // 解除轨道禁用
          }, delay);
        } else {
          bullet.track.disabled = false; // 宽度获取失败时立即解除禁用
        }
      }
    } else {
      // 如果弹幕不是滚动类型
      bullet.track.disabled = true;

      // 3秒后解除轨道禁用
      setTimeout(() => {
        bullet.track.disabled = false;
      }, 3000);
    }
  });
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


// 处理用户输入的弹幕内容
function handleInput(b: Danmu1) {
  const types = {
    '滚动': 'roll',
    '顶部': 'top',
    '底部': 'bottom'
  }
  const content = b.content
  const color = b.color
  const type = types[b.type]
  console.log(content, color, type)
  const bullet = new Bullet(content, color)
  bullet.danmuType.type = type
  bullet.track = tracks[randInt(5)]   // 使用第n个轨道
  bullet.isNew = true
  bullets.push(bullet)
  run()
}


function getBulletStyle(bullet: Bullet) {
  return {
    ...bullet.getTrackOffset, // 获取 `top` 或 `transform` 样式
    color: bullet.getColor,   // 弹幕颜色
    '--duration': '4s',       // 动画持续时间
  };
}

</script>

<template>
  <div class="danmu">
    <div class="container">
      <!--      <div class="track" v-for="track in tracks"-->
      <!--           style="background-color: #ccc;width: 100%;height: 54px;margin-bottom: 2px"></div>-->
      <div
          v-for="(bullet, index) in bullets"
          :class="bullet.getClassList"
          @animationend="done(index)"
          :key="bullet.key"
          :id="bullet.id"
          :style="getBulletStyle(bullet)"
      >
        <p :class="[bullet.isNew ? 'new-bullet': '']">{{ bullet.content }}</p>
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
      <div class="btn">
        <Edit @add="handleInput"/>
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

// 非roll类型的动画
@keyframes fade-out {
  0% {
    //display: block;

  }
  80% {
    opacity: 1;
  }
  90% {
    opacity: 10%;
  }
  100% {
    opacity: 0;
    display: none;
  }
}

.danmu-type-top,
.danmu-type-bottom {
  position: absolute;
  text-align: center;
  width: 100%;
  font-size: 16px;
  line-height: 40px;
  transition: all 1s linear;
}

.fade-out {
  animation: fade-out 5s linear forwards;
}

// 新添加的弹幕的样式
.new-bullet {
  display: inline-block;
  border: 1px solid #fff;
  padding: 0 10px;
}
</style>