<template>
  <div class="hospital">
    <!-- 左侧导航区 -->
    <div class="menu">
      <div class="top">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>/ 医院信息</span>
      </div>
      <el-menu :default-active="$Route.path" class="el-menu-vertical-demo">
        <el-menu-item index="/hospital/register" @click="changeActive('../hospital/register')">
          <el-icon><icon-menu /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail" @click="changeActive('../hospital/detail')">
          <el-icon>
            <document />
          </el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice" @click="changeActive('../hospital/notice')">
          <el-icon>
            <setting />
          </el-icon>
          <span>预约通知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close" @click="changeActive('../hospital/close')">
          <el-icon>
            <InfoFilled />
          </el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/search" @click="changeActive('../hospital/search')">
          <el-icon>
            <Search />
          </el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧内容展示区：路由组件展示区域 -->
    <div class="content">
      <!-- 子组件展示结构的地方 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts' setup name='hospital'>
import { onMounted } from 'vue'
import useDetailStore from '@/store/modules/hospitalDetail'
// 获取仓库对象
let detailStore = useDetailStore()
// 左侧菜单需要用到的图标
import {
  Document,
  Menu as IconMenu,
  InfoFilled,
  Setting,
  Search,
  HomeFilled,
} from '@element-plus/icons-vue'

import { useRouter, useRoute } from 'vue-router'
// 获取路由器
let $Router = useRouter()
// 获取当前路由的信息
let $Route = useRoute()
// 左侧菜单点击事件的回调
const changeActive = (path: string) => {
  // 跳转到对应的二级路由
  $Router.push({ path, query: { hoscode: $Route.query.hoscode } })
}

// 组件挂载完毕：通知pinia仓库发请求获取医院详情的数据，存储于仓库当中
onMounted(() => {
  // 获取医院详情的数据
  detailStore.getHospital($Route.query.hoscode as string)
  // 获取某一个医院科室的数据
  detailStore.getDeparment($Route.query.hoscode as string)
})
</script>

<style scoped lang="scss">
.hospital {
  display: flex;

  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;

    .el-menu-vertical-demo {
      margin-top: 10px;
    }

    .top {
      color: #7f7f7f;
      display: flex;
    }
  }

  .content {
    flex: 8;
  }
}
</style>