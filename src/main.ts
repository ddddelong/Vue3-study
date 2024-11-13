import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './router'
import ElementPlus from 'element-plus';  // 引入element-plus组件库
import 'element-plus/dist/index.css';  // 引入element-plus组件库样式

// 创建pinia实例
const pinia = createPinia()
const app = createApp(App)

app.use(ElementPlus)  // 使用element-plus组件库
app.use(router)
app.use(pinia)    // 安装pinia插件
app.mount('#app')
