<script lang="ts" setup>
import {defineProps, ref, watch} from 'vue';
import type {Ref} from '@/types';

// 接收来自父组件的数据
const props = defineProps<{
  dialogue: string,
  ok: boolean
}>();

const isStart: Ref<boolean> = ref(false)
watch(
    () => props.ok,
    (value: boolean) => {
      isStart.value = value
    }
)


</script>

<template>
  <div :class="{'message-box': true, start: isStart}">
    <p>{{ dialogue }}</p>
  </div>
</template>

<style scoped lang="less">
@keyframes MsgBoxAnimation {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(0, -1500px);
  }
}

.start {
  animation: MsgBoxAnimation 10s 1s linear;
}

.message-box {
  //animation: MsgBoxAnimation 100s 0.5s linear;
  position: relative;
  //width: 10vw;
  max-width: 150px;
  padding: 5px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: #333;
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