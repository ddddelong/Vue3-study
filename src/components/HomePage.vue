<script setup lang="ts">
import {onMounted, reactive, onBeforeUnmount, ref} from 'vue'
import type {Reactive} from 'vue'
import type {MusicInfoObject} from '@/types'
import SkPlayer from "@/components/SkPlayer.vue";
import LunarCalendar from "lunar-calendar";

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
  // console.log(data.data);
  musicList.splice(0, musicList.length, ...data.data);
}).catch(error => {
  console.error('There has been a problem with your fetch operation:', error);
});
// endregion
const timeData = reactive({
  h: '0',
  m: '0',
  s: '0',
  lunar: "农历九月十九",
  date: "2024年10月24日"
})

/**
 * 计算给定日期的农历表示形式
 * @param {Date} date - 公历日期
 * @returns {string} 农历日期，如九月廿二
 */
function getLunar(date: Date): string {
  const lunar = LunarCalendar.solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return `${lunar.lunarMonthName}${lunar.lunarDayName}`
}

let animationFrameId: number = 0;

function updateTime() {
  let lastSecond = -1;
  let lastMinute = -1;
  let lastHour = -1;

  function update() {
    const now = new Date();
    const currentSecond = now.getSeconds();
    const currentMinute = now.getMinutes();
    const currentHour = now.getHours();

    // 每秒只更新秒数
    if (currentSecond !== lastSecond) {
      timeData.s = currentSecond.toString().padStart(2, '0');
      lastSecond = currentSecond;
    }

    // 每分钟只更新分钟数
    if (currentMinute !== lastMinute) {
      timeData.m = currentMinute.toString().padStart(2, '0');
      lastMinute = currentMinute;
    }

    // 每小时只更新小时数
    if (currentHour !== lastHour) {
      timeData.h = currentHour.toString().padStart(2, '0');
      lastHour = currentHour;

      // 每次小时变化时更新农历和日期
      timeData.lunar = ' 农历' + getLunar(now);
      timeData.date = now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    // 下一次请求动画帧调用
    animationFrameId = requestAnimationFrame(update);
  }

  update();
}

const audioPlay = ref<HTMLAudioElement | null>()
const homeButton = ref<HTMLButtonElement | null>(null);
const audioSrc = new URL('../assets/audio/hu.mp3', import.meta.url).href

const click = () => {
  // const btn = document.querySelector('.btn-home button')
  // 退出动画
  new Promise(resolve => {
    setTimeout(() => {
      console.log(homeButton)
      homeButton.value?.classList.add('move')
      console.dir(audioPlay.value)
      audioPlay.value?.play().catch((error) => console.log('audio play error' + error))
      resolve(6)
    }, 0)
  })
      .then(() => new Promise(resolve => {
            setTimeout(() => {
              document.querySelector('.home-page')?.remove()   // 移除首页
              cancelAnimationFrame(animationFrameId)   // 取消时间更新
              // document.querySelector('.bg').style.display = 'block';   // 开始显示adv页面
              // setTimeout(() =>requestAnimationFrame(adv.showTextWithAnimationFrame), 1500)   // 延迟显示祝福动画
              resolve(6)
            }, 1000)
          })
      )
      .then(() => {
        // 播放音乐
        // document.querySelector('#skPlayer a').click()
      })
}
onMounted(() => {
  updateTime();

})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId);
})
</script>

<template>
  <div class="home-page">
    <div class="home-page__header">
      <div class="time-container">
        <div class="time">
          <span class="h">{{ timeData.h }}</span> : <span class="m">{{ timeData.m }}</span> : <span class="s">{{
            timeData.s
          }}</span>
        </div>
        <div class="xxx">
          <span class="time-container__date">{{ timeData.date }}</span>
          <span class="time-container__lunar">{{ timeData.lunar }}</span>
        </div>
      </div>
    </div>
    <div class="btn-home">
      <button @click="click" ref="homeButton"><span>哈哈哈</span></button>
      <audio :src="audioSrc" id="hu" ref="audioPlay"></audio>
    </div>
    <div id="beijing">
      <img src="../assets/images/坏笑.png" alt="">
    </div>
    <div class="home-page__foot">
      <img src="../assets/images/头像.jpg" alt="">
      <p>来自：泥小汁真棒！</p>
    </div>
  </div>
  <el-divider/>
  <div id="skPlayer" style="position:absolute;bottom:10%;background: #efc43c;right: 3%;z-index: 999">
    <SkPlayer :music-list="musicList"/>
  </div>
</template>

<style scoped lang="less">
@keyframes aaaa {
  from {
    transform: translate(0);
  }

  to {
    transform: translate(1500px);
  }
}

.move {
  animation: aaaa 1s 0.2s forwards;
}

#beijing {
  position: absolute;
  bottom: 0;

  img {
    display: block;
    margin: 0;
    width: 30vw;
  }
}

.home-page {
  position: relative;
  margin-top: 0;
  @btn-width: 20vw;
  @btn-height: 13vh;
  background-color: pink;
  width: 100vw;
  height: 90vh;
  color: #fff;

  .btn-home {
    position: relative;
    margin-top: 100px;
    height: @btn-height;
    flex-wrap: nowrap;

    @btn-color: #ff0;

    button {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);

      width: @btn-width;
      height: @btn-height;
      border-radius: @btn-height * 0.5;
      font-size: 30px;
      //background-color: #66ddf7;
      background-color: rgba(45, 45, 45, 1);
      border: navajowhite;
      font-family: '创中黑', serif;
      --x: 0;
      --y: 0;

      // 动画
      overflow: hidden;
      color: #999;

      &:hover {
        color: @btn-color;
        text-shadow: 0 0 15px @btn-color,
        0 0 40px @btn-color;
      }

      &::before {
        content: "";
        position: absolute;
        z-index: 0;
        top: var(--y);
        left: var(--x);
        //top: 10px;
        //left: 0;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 100px;
        background: radial-gradient(@btn-color, transparent, transparent);
        opacity: 0;
        transition: .5s, left 0s, top 0s;

      }

      &:hover::before {
        opacity: 1;
      }

      &::after {
        content: "";
        position: absolute;
        background-color: rgba(45, 45, 45, .8);
        inset: 2px;
        border-radius: 50px;
      }

      span {
        position: relative;
        z-index: 1;
        letter-spacing: .2em;
      }
    }
  }

  .home-page__header {
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    font-family: 'Microsoft Himalaya', sans-serif;
    margin: 0 auto;
    padding: 10px;
    color: #000;
    font-size: 22px;
    width: 500px;
    //border: 2px solid rgba(78, 129, 89, 0.43);
    //border-radius: 40px;
    
    .time-container {
      width: 500px;
      margin: 10px auto;

      .xxx {
        margin-top: 20px;
        text-align: center;
      }

      .time {
        color: #fff;
        text-align: center;
        margin: 10px 0 10px 0;
        font-size: 50px;
        line-height: 60px;
        font-family: '创中黑', sans-serif;
        text-shadow: 2px 2px 2px #000;

        .h,
        .m,
        .s {
          display: inline-block;
          width: 60px;
          height: 65px;
        }
      }
    }
  }

  .home-page__foot {
    display: flex;
    flex-direction: column;
    align-items: center; /* 水平居中 */
    justify-content: center; /* 垂直居中 */
    position: absolute;
    width: 30vh;
    bottom: 0;
    left: 50%; /* 将元素左边缘移动到父元素的中心 */
    transform: translateX(-50%); /* 将元素向左移动自身宽度的一半 */

    img {
      width: 50px;
      border-radius: 50%;
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 20px;
    }
  }
}
</style>
<style>
.el-divider--horizontal {
  margin: 0 !important;
  padding: 0;
  background-color: #9C1A1C;
}

.el-tabs__header {
  margin: 0 !important;
}
</style>