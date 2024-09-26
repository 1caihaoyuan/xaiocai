// 路由鉴权：路由能不能被访问权限的设置 -> 全局守卫完成
// 引入路由器
import router from "./router"
// 引入进度条
import NProgress from 'nprogress'
// 引入仓库
import Pinia from "@/store"
let userStore = useUserStore(Pinia)
// 引入进度条的样式
import 'nprogress/nprogress.css'
import useUserStore from "./store/modules/user"
// 取消进度条的加载小圆球
NProgress.configure({ trickle: false })

// 存储用户未登陆可以访问的路由路径
let whiteList = [
  '/home',
  '/hospital/register',
  '/hospital/detail',
  '/hospital/notice',
  '/hospital/close',
  '/hospital/search'
]
// 添加相应的全局守卫
// 前置守卫
router.beforeEach((to, from, next) => {
  // 访问路由组建之前，进度条开始动
  NProgress.start()
  // 动态设置网页左上角的标题
  document.title = `挂医-${to.meta.title}`
  // 根据token判断用户是否登陆
  let token = userStore.userInfo.token
  if (token) {
    // 用户登陆了
    next()
  } else {
    // 用户未登陆
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 登陆组件显示出来
      userStore.visiable = true
      next({path:'/home',query:{redirect:to.fullPath}})
    }
  }
})

// 后置路由
router.afterEach((to, from) => {
  // 访问路由组建成功，进度条消失
  NProgress.done()
})