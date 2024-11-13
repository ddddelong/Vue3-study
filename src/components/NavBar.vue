<script setup lang="ts">
import {RouterView, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import type {TabsPaneContext} from "element-plus";

const activeName = ref('first')
const router = useRouter()
const handleClick = (tab: TabsPaneContext, event: Event) => {
  switch (tab.props.name) {
    case 'first':
      router.push({name: 'Home'})
      break
    case 'second':
      router.push({name: 'message'})
      break
    case 'third':
      router.push({name: 'Danmu'})
      break
  }
}
onMounted(() => {
  router.push({name: 'Home'})
})
</script>

<template>
  <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
  >
    <el-tab-pane label="首页" name="first">
      <RouterView/>
    </el-tab-pane>
    <el-tab-pane label="Gif动画" name="second">
      <RouterView/>
    </el-tab-pane>
    <el-tab-pane label="弹幕" name="third">
      <RouterView/>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="less">

</style>

<style>
.el-tabs__header {
  margin: 0;
}
</style>