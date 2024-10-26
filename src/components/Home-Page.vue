<script setup lang="ts">
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue'
import LunarCalendar from "lunar-calendar";

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
function getLunar(date: Date):string {
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
      audioPlay.value?.play().catch((error)=>console.log('audio play error' + error))
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
    <div id="beijing">
      <img src="../assets/images/坏笑.png" alt="">
    </div>
    <div class="home-page__header">
      <div class="time-container">
        <div class="time">
          <span class="h">{{ timeData.h }}</span> : <span class="m">{{ timeData.m }}</span> : <span class="s">{{
            timeData.s }}</span>
        </div>
        <div class="xxx">
          <span class="time-container__date">{{ timeData.date }}</span>
          <span class="time-container__lunar">{{ timeData.lunar }}</span>
        </div>
      </div>
    </div>
    <div class="btn-home">
      <button @click="click" ref="homeButton"><span>祝我生日快乐</span></button>
      <audio :src="audioSrc" id="hu" ref="audioPlay"></audio>
    </div>
    <div class="home-page__foot">
      <img src="../assets/images/头像.jpg" alt="">
      <p>来自：泥小汁真棒！</p>
    </div>
  </div>
<!--  <div id="skPlayer" style="position:fixed;bottom:10%;background: #efc43c;right: 3%;z-index: 999"></div>-->
</template>

<style scoped lang="less">
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}

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
  position: relative;
  width: auto;
  height: auto;
  top: 40%;

  img {
    position: absolute;
    width: 40%;
    height: auto;
    //height: 110%;
    //height: 100%;
  }
}

.home-page {
  //display: none;
  @btn-width: 300px;
  @btn-height: 100px;
  //display: grid;
  //place-items: center;
  background-color: pink;
  //background: url("../assets/images/坏笑.jpeg") no-repeat center center fixed;
  position: fixed;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  color: #fff;
  //left: 100%;
  //transform: translate(10px);

  .btn-home {
    position: absolute;
    left: calc(50% - @btn-width / 2);
    top: calc(50% - @btn-height / 2);

    @btn-color: #ff0;

    button {
      position: relative;
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
    font-family: 'Microsoft Himalaya', sans-serif;
    margin: 10px auto;
    color: #000;
    font-size: 22px;
    width: 500px;
    //border: 2px solid rgba(78, 129, 89, 0.43);
    //border-radius: 40px;
    padding: 10px;

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
    display: grid;
    place-items: center;
    /* 水平和垂直居中 */
    height: 88vh;

    img {
      width: 50px;
      border-radius: 50%;
      transform: translate(0, 500%);
    }
  }
}
</style>
