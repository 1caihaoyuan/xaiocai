// vue3框架提供的方法createApp方法，可以用来创建应用实例方法
import { createApp } from 'vue'
// 引入清除默认样式
import '@/style/reset.scss'
// 引入根组件App
import App from '@/App.vue'
// 引入全局组件--顶部、底部都是全局组件
import HospitalTop from "@/components/hospital_top/index.vue"
import HospitalBottom from "@/components/hospital_bottom/index.vue"
import Login from '@/components/login/index.vue'
// 引入vue-router核心插件并安装
import router from '@/router'
// 引入element-puls插件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 国际化文件
import { zhCn } from 'element-plus/es/locales.mjs'
// 引入pinia仓库
import pinia from '@/store'
// 利用createApp方法创建应用实例，且将应用实例挂载到挂载点上
const app = createApp(App)
import Visior from '@/components/visitor/visitor.vue'
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)
app.component('Login',Login)
// 就诊人全局组件
app.component('Visitor',Visior)
// 安装vue-router
app.use(router)
// 安装element-plus插件
app.use(
  ElementPlus,
{
  locale:zhCn
})
// 安装pinia仓库
app.use(pinia)
// 引入路由鉴权的文件
import './permisstion'
// 挂载
app.mount('#app')
