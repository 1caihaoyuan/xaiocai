<template>
  <div>

  </div>
</template>

<script lang='ts' setup name='wxlogin'>
import { SET_TOKEN } from '@/utils/user'
// 获取用户信息
import { useRoute } from 'vue-router'
// 获取路由对象
let $route = useRoute()

// 持久化存储用户信息
SET_TOKEN(JSON.stringify($route.query))
// 访问此路由组件代码执行：授权成功
let html:any = document.querySelector('html')
html.style.display = 'none'
</script>

<style scoped></style>