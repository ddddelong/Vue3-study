<script lang="ts" setup>
import {provide, ref, watch, inject, type Ref} from 'vue';
// 接收来自父组件的数据
const props = defineProps<{
  message: string,
  ok: boolean
}>();

// const isStart = computed(() => props.ok)
// const isStart = ref(false)
const y = ref(0)    // 偏移量
const duration = 10000   // 动画持续时间
const setupButton: Ref<HTMLElement> = inject('setupButton') as Ref<HTMLElement> // 父组件提供的按钮

let textAnimationId: number | null = null   // 记录动画的id
function textAnimation() {
  y.value -= 1
  textAnimationId = requestAnimationFrame(textAnimation)
}

function stopAnimation() {
  if (textAnimationId !== null) {
    cancelAnimationFrame(textAnimationId);
    textAnimationId = null;
  }
}

watch(
    () => props.ok,
    (value) => {
      if (value) {
        // 开始动画
        if (textAnimationId === null) {
          textAnimation();
          setTimeout(() => {
            stopAnimation();
            setTimeout(() => {
              y.value = 0; // 恢复原样
              setupButton.value.style.opacity = '100';
              props.ok = false
            }, 2000);
          }, duration);
        }
      } else {
        stopAnimation();
      }
    }
);

</script>

<template>
  <div
      :class="{'message-box': true}"
      :style="{'transform': `translate(0, ${y}px)`}"
  >
    <p>{{ message }}</p>
  </div>
</template>

<style scoped lang="less">
@keyframes MsgBoxAnimation {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(0, -2000px);
  }
}

.start {
  animation: MsgBoxAnimation 10s 1s linear;
}

.message-box {
  //animation: MsgBoxAnimation 100s 0.5s linear;
  position: relative;
  //width: 10vw;
  max-width: 100px;
  padding: 5px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  //font-family: Arial, sans-serif;
  //color: #333;
  margin: 10px auto;
}

.message-box::after {
  content: '';
  position: absolute;
  bottom: 25%;
  left: -20px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent #fff transparent transparent;
}

</style>