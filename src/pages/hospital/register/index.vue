<template>
  <div class="register">
    <div class="top">
      <div class="title">{{ hospitalStore.hospitalInfo.hospital?.hosname }}</div>
      <div class="level">
        <svg t="1717133534923" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="2018" width="16" height="16">
          <path
            d="M735.76 859.41c-0.89 0-1.76-0.04-2.64-0.12l-498.1-0.1c-14.86 0-28.82-5.79-39.32-16.31-10.5-10.5-16.27-24.48-16.26-39.33l0.2-308.44c0.02-27.88 20.91-51.58 48.57-55.12 78.97-10.13 141.71-27.73 163.72-45.92 34.76-28.7 65.22-85.17 65.22-120.85 0-60.91 47.69-108.61 108.55-108.61 49.16 0 91.49 32.43 104.56 79.44 0.72 1.62 1.27 3.31 1.64 5.03 5.12 23.25 7.71 46.62 7.71 69.48 0 23.09-2.46 45.94-7.33 68.29l118.44 0.1c2.43 0 4.73 0.16 6.98 0.48 36.17 2.05 68.88 21.38 87.77 51.96 11.97 18.76 17.68 40.94 16.39 63.97a55.39 55.39 0 0 1-1.87 16.51L840.21 783.9c-1.75 6.58-4.08 11.92-7.14 16.67-9.09 17.28-22.35 31.72-38.48 41.82-17.5 11.1-37.89 17.02-58.83 17.02zM565.71 220.18c-30.19 0-52.97 22.79-52.97 53.02 0 58.32-43.43 129.04-85.4 163.71-39.74 32.84-126.39 49.78-192.05 58.21l-0.26 308.47 500.73 0.11c0.72 0 1.42 0.02 2.13 0.08a54.42 54.42 0 0 0 27.06-8.43c8.17-5.12 14.8-12.52 19.34-21.48a27.8 27.8 0 0 1 2.13-3.55l59.65-263.85c-0.12-1.41 0.13-3.85 0.23-5.26 0.86-11.68-1.88-22.85-7.9-32.3-9.69-15.67-26.32-25.29-44.71-26.05-1.3-0.05-2.59-0.19-3.87-0.43l-154.21-0.04a27.836 27.836 0 0 1-22.64-11.7 27.833 27.833 0 0 1-3.58-25.23c9.72-27.93 14.65-57.17 14.65-86.92 0-17.54-1.87-35.51-5.55-53.51-0.48-1.21-0.87-2.46-1.16-3.74-5.61-24.19-26.83-41.11-51.62-41.11z m0 0"
            fill="#3D6AB2" opacity=".8" p-id="2019"></path>
          <path d="M86.4 449.89m-22.59 0a22.59 22.59 0 1 0 45.18 0 22.59 22.59 0 1 0-45.18 0Z" fill="#4D73B6"
            opacity=".8" p-id="2020"></path>
          <path d="M125.93 364.83m-22.59 0a22.59 22.59 0 1 0 45.18 0 22.59 22.59 0 1 0-45.18 0Z" fill="#44BDDC"
            opacity=".8" p-id="2021"></path>
          <path d="M937.6 404.35m-22.59 0a22.59 22.59 0 1 0 45.18 0 22.59 22.59 0 1 0-45.18 0Z" fill="#4D73B6"
            opacity=".8" p-id="2022"></path>
          <path
            d="M317.43 495.7h-4.36v0.44c-13.24 2.1-23.4 13.48-23.4 27.32v243.65c0 13.83 10.15 25.21 23.4 27.32v0.44H326.47c15.33 0 27.75-12.42 27.75-27.75V523.46c0-15.32-12.42-27.76-27.75-27.76h-9.04z"
            fill="#44BDDC" opacity=".8" p-id="2023"></path>
          <path
            d="M242.63 475.7c0 15.94-12.16 28.86-27.15 28.86-15 0-27.16-12.93-27.16-28.86 0-15.94 12.15-28.87 27.16-28.87 14.99 0 27.15 12.92 27.15 28.87zM242.63 823.73c0 15.94-12.16 28.86-27.15 28.86-15 0-27.16-12.93-27.16-28.86 0-15.94 12.15-28.87 27.16-28.87 14.99 0 27.15 12.93 27.15 28.87z"
            fill="#3D6AB2" opacity=".8" p-id="2024"></path>
        </svg>
        <span>{{ hospitalStore.hospitalInfo.hospital?.param.hostypeString }}</span>
      </div>
    </div>
    <!-- 展示内容的区域 -->
    <div class="content">
      <div class="left">
        <img :src="`data:image/jpeg;base64,` + hospitalStore.hospitalInfo.hospital?.logoData" alt="">
      </div>
      <div class="right">
        <div>挂号规则</div>
        <div class="time">
          预约周期：{{ hospitalStore.hospitalInfo.bookingRule?.cycle }}天 放号时间：{{
            hospitalStore.hospitalInfo.bookingRule?.releaseTime }} 停挂时间：{{ hospitalStore.hospitalInfo.bookingRule?.quitTime
          }}
        </div>
        <div class="address">
          具体位置：{{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}
        </div>
        <div class="route">
          具体路线：{{ hospitalStore.hospitalInfo.hospital?.route }}
        </div>
        <div class="releasetime">
          退号时间：就诊前一工作日{{ hospitalStore.hospitalInfo.bookingRule?.quitTime }}前取消
        </div>
        <div class="rule">预约挂号规则</div>
        <div class="ruleInfo" v-for="(item, index) in hospitalStore.hospitalInfo.bookingRule?.rule" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
    <!-- 放置每一个医院的科室的数据 -->
    <div class="deparment">
      <div class="leftNav">
        <ul>
          <li @click="changeIndex(index)" :class="{ active: index == currentIndex }"
            v-for="(deparment, index) in hospitalStore.deparmentArr" :key="deparment.depcode">{{ deparment.depname }}
          </li>
        </ul>
      </div>
      <div class="deparmentInfo">
        <!-- 用一个div代表：大科室与小科室 -->
        <div class="showDeparment" v-for="(deparment) in hospitalStore.deparmentArr" :key="deparment.depcode">
          <h1 class="cur">{{ deparment.depname }}</h1>
          <!-- 每一个大的科室下的小的科室 -->
          <ul>
            <li @click="showLogin(item)" v-for="(item) in deparment.children" :key="item.depcode">
              {{ item.depname }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup name='register'>
// 获取user仓库数据(visiable)可以控制login组件的对话框的显示与隐藏
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// 引入医院详情仓库的数据
import useDetailStore from '@/store/modules/hospitalDetail'
let hospitalStore = useDetailStore()
// 获取路由器
let $router = useRouter()
// 获取路由对象
let $route = useRoute()
// 控制科室高亮的响应式数据
let currentIndex = ref<number>(0)
// 左侧大的科室点击的事件
const changeIndex = (index: number) => {
  currentIndex.value = index
  // 点击导航获取右侧科室（大的科室H1标题）
  let allh1 = document.querySelectorAll('.cur')
  // 滚动到对应科室的位置上
  allh1[currentIndex.value].scrollIntoView({
    behavior: 'smooth', //过度动画效果
    block: 'start', //滚动到的位置默认起始位置
  })
}
// 点击科室按钮的回调
// item即为用户选中的科室的数据
const showLogin = (item: any) => {
  // 点击某一个医院的科室按钮进入到响应的预约挂号详情页面
  // 跳转到预约挂号详情页面
  $router.push({path:'/hospital/register_step1',query:{hoscode:$route.query.hoscode,depcode:item.depcode}})
}
</script>

<style scoped lang="scss">
.register {
  .top {
    display: flex;

    .title {
      font-size: 30px;
      font-weight: 900;
    }

    .level {
      color: #7f7f7f;
      margin-left: 10px;
      height: 40px;
      text-align: center;
      line-height: 40px;

      span {
        margin-left: 5px;
      }
    }
  }

  .content {
    margin-top: 20px;
    display: flex;

    .left {
      width: 80px;

      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }

    .right {
      margin-left: 20px;
      flex: 1;
      font-size: 14px;

      .time,
      .address,
      .route,
      .releasetime,
      .ruleInfo {
        margin-top: 10px;
        color: #7f7f7f;
      }

      .rule {
        margin: 10px 0;
      }
    }
  }

  .deparment {
    margin-top: 20px;
    width: 100%;
    height: 500px;
    display: flex;

    .leftNav {
      width: 80px;
      height: 100%;

      ul {
        width: 100%;
        height: 100%;
        background: rgb(248, 248, 248);
        display: flex;
        flex-direction: column;

        li {
          flex: 1;
          text-align: center;
          color: #7f7f7f;
          font-size: 14px;
          line-height: 40px;
          cursor: pointer;

          &.active {
            border-left: 2px solid red;
            color: red;
            background-color: white;
          }
        }
      }
    }

    .deparmentInfo {
      flex: 1;
      margin-left: 20px;
      height: 100%;
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .showDeparment {
        h1 {
          background-color: rgb(248, 248, 248);
          color: #ca4545;
          font-size: 18px;
          margin-bottom: 10px;
        }

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 33%;
            color: #7f7f7f;
            line-height: 30px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>