<template>
  <div class="top">
    <div class="content">
      <!-- 左侧 -->
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="">
        <p>尚医通 预约挂号统一平台</p>
      </div>
      <div class="right">
        <p class="help">帮助中心</p>
        <!-- 如果没有用户名字：就显示登陆注册 -->
        <p class="login" @click="login" v-if="!userStore.userInfo.name">登陆/注册</p>
        <!-- 如果有用户信息就展示用户的信息 -->
        <el-dropdown v-else>
          <span class="el-dropdown-link">
            {{ userStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goUser('/user/certification')">实名认证</el-dropdown-item>
              <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="goUser('/user/patient')">就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup name='hospital_top'>
// 获取user仓库数据(visiable)可以控制login组件的对话框的显示与隐藏
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
import { ArrowDown } from '@element-plus/icons-vue'
import path from 'path';
// 引入路由器
import { useRouter } from 'vue-router'
let $Router = useRouter()
const goHome = () => {
  // 编程式导航跳转到首页
  $Router.push({ path: '/home' })
}
// 点击登录与注册按钮的时候去弹出对话框
const login = () => {
  userStore.visiable = true
}

// 退出登陆按钮的回调
const logout = () => {
  // 通知pinia仓库清楚用户相关的信息
  userStore.logout()
  // 编程式导航路由跳转首页
  $Router.push({path:'/home'})
}

// 点击顶部下拉菜单进行路由跳转
const goUser = (path:string) => {
  $Router.push({path:path})
}
</script>

<style scoped lang="scss">
.top {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: center;
}

.content {
  width: 1200px;
  height: 70px;
  background-color: white;
  display: flex;
  justify-content: space-between;
}

.left {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  p {
    font-family: 20px;
    color: #55a6fe;
  }
}

.right {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #ccc;
  cursor: pointer;

  .help {
    margin-right: 10px;
  }
}
</style>