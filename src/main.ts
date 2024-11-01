import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
// import router from './router'

// 创建pinia实例
const pinia = createPinia()
const app = createApp(App)

// app.use(router)
app.use(pinia)    // 安装pinia插件
app.mount('#app')
