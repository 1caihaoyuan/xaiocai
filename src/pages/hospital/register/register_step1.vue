<template>
  <div class="wrap">
    <!-- 顶部结构 -->
    <div class="top">
      <div class="hosname">{{ workData.baseMap?.hosname }}</div>
      <div class="line"></div>
      <div>{{ workData.baseMap?.bigname }}</div>
      <div class="dot">.</div>
      <div class="hosdeparment">{{ workData.baseMap?.depname }}</div>
    </div>
    <!-- 中间展示日期的结构 -->
    <div class="center">
      <h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
      <div class="container">
        <div class="item"
          :class="{ active: item.status === -1 || item.availableNumber === -1, cur: item.workDate == workTime.workDate }"
          v-for="item in workData.bookingScheduleList" :key="item" @click="changeTime(item)">
          <div class="item-top">{{ item.workDate }}-{{ item.dayOfWeek }}</div>
          <div class="bottom">
            <div v-if="item.status === -1">停止挂号</div>
            <div v-if="item.status === 0">
              {{ item.availableNumber === -1 ? '约满了' : '有号' }}
            </div>
            <div v-if="item.status === 1">即将放号</div>
          </div>
        </div>
      </div>
      <el-pagination layout="prev, pager, next" :total="workData.total" v-model:current-page="pageNo"
        @current-change="fetchWorkData" />
    </div>
    <!-- 底部展示相应医生的结构 -->
    <div class="bottom">
      <!-- 展示即将放号的时间 -->
      <div class="will" v-if="workTime.status === 1">
        <span class="time">2021.8.20</span>
        <span class="willNumberAllocation">放号</span>
      </div>
      <!-- 展示医生的结构 -->
      <div class="doctor" v-else>
        <!-- 上午 -->
        <div class="moring">
          <!-- 顶部文字的提示 -->
          <div class="tip">
            <svg t="1717580352253" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="2163" width="32" height="32">
              <path
                d="M511.3 276.6c-130.1 0-235.9 105.8-235.9 235.9s105.8 235.9 235.9 235.9 235.9-105.8 235.9-235.9-105.8-235.9-235.9-235.9z m0 418.2C410.8 694.8 329 613 329 512.5s81.8-182.3 182.3-182.3c100.5 0 182.3 81.8 182.3 182.3s-81.7 182.3-182.3 182.3zM511.3 217c14.8 0 26.8-12 26.8-26.8v-98c0-14.8-12-26.8-26.8-26.8s-26.8 12-26.8 26.8v98c0.1 14.8 12 26.8 26.8 26.8zM264.5 303.6c5.2 5.2 12.1 7.8 18.9 7.8 6.9 0 13.7-2.6 18.9-7.8 10.5-10.5 10.5-27.4 0-37.9L233 196.4a26.738 26.738 0 0 0-37.9 0 26.738 26.738 0 0 0 0 37.9l69.4 69.3zM215.9 512.5c0-14.8-12-26.8-26.8-26.8h-98c-14.8 0-26.8 12-26.8 26.8s12 26.8 26.8 26.8h98c14.8 0 26.8-12 26.8-26.8zM264.5 721.4l-69.3 69.3a26.738 26.738 0 0 0 0 37.9c5.2 5.2 12.1 7.8 18.9 7.8 6.9 0 13.7-2.6 18.9-7.8l69.3-69.3c10.5-10.5 10.5-27.4 0-37.9-10.4-10.4-27.3-10.4-37.8 0zM511.3 808c-14.8 0-26.8 12-26.8 26.8v98c0 14.8 12 26.8 26.8 26.8s26.8-12 26.8-26.8v-98c0-14.8-12-26.8-26.8-26.8zM758.1 721.4a26.738 26.738 0 0 0-37.9 0 26.738 26.738 0 0 0 0 37.9l69.3 69.3c5.2 5.2 12.1 7.8 18.9 7.8 6.9 0 13.7-2.6 18.9-7.8 10.5-10.5 10.5-27.4 0-37.9l-69.2-69.3zM931.6 485.7h-98c-14.8 0-26.8 12-26.8 26.8s12 26.8 26.8 26.8h98c14.8 0 26.8-12 26.8-26.8s-12-26.8-26.8-26.8zM739.2 311.4c6.9 0 13.7-2.6 18.9-7.8l69.3-69.3c10.5-10.5 10.5-27.4 0-37.9a26.738 26.738 0 0 0-37.9 0l-69.3 69.3a26.738 26.738 0 0 0 0 37.9c5.3 5.2 12.1 7.8 19 7.8z"
                fill="#08a2f2" p-id="2164"></path>
            </svg>
            <span class="text">上午号源</span>
          </div>
          <!-- 每一个医生的信息 -->
          <div class="docInfo" v-for="doctor in moringArr" :key="doctor.id">
            <!-- 左侧展示医生的名字|技能 -->
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">{{ doctor.skill }}</div>
            </div>
            <!-- 右侧展示医生挂号多少钱还剩多少张号 -->
            <div class="right">
              <div class="money">¥{{ doctor.amount }}</div>
              <el-button type="primary" @click="goStep2(doctor) ">{{ doctor.availableNumber }}</el-button>
            </div>
          </div>
        </div>
        <!-- 下午 -->
        <div class="moring">
          <!-- 顶部文字的提示 -->
          <div class="tip">
            <svg t="1717581865656" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="4429" width="32" height="32">
              <path
                d="M66 704.08h892v80H66zM242.66 848.35h535v80h-535zM624.85 543.18L512.59 655.44l-0.16-0.16-42.27-42.27L401.15 544l42.43-42.43 39.76 39.77V406.06h60v133.78l39.08-39.09 42.43 42.43z"
                p-id="4430" fill="#40f8f1"></path>
              <path
                d="M846.74 598.1l-71.8-5.31c0.48-6.45 0.71-12.82 0.71-19.5a263.65 263.65 0 0 0-527.3 0c0 6.65 0.24 13 0.71 19.51l-71.8 5.29c-0.61-8.26-0.91-16.37-0.91-24.8a335.65 335.65 0 1 1 671.3 0c0 8.47-0.3 16.58-0.91 24.81zM875.79 595.45v-72h100v72zM794.694 327.652l-50.912-50.912 70.71-70.71 50.913 50.91zM548 195.65h-72v-100h72zM280.21 276.737L229.3 327.65l-70.71-70.71 50.91-50.912zM148.21 523.45v72h-100v-72z"
                p-id="4431" fill="#40f8f1"></path>
            </svg>
            <span class="text">下午号源</span>
          </div>
          <!-- 每一个医生的信息 -->
          <div class="docInfo" v-for="doctor in afterArr" :key="doctor.id">
            <!-- 左侧展示医生的名字|技能 -->
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">{{ doctor.skill }}</div>
            </div>
            <!-- 右侧展示医生挂号多少钱还剩多少张号 -->
            <div class="right">
              <div class="money">¥{{ doctor.amount }}</div>
              <el-button type="primary" @click="goStep2(doctor) ">{{ doctor.availableNumber }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup name=''>
import { onMounted, ref, computed } from 'vue'
import { reqHospitalWork, reqHospitalDoctor } from '@/api/hospital/index'
import { useRoute, useRouter } from 'vue-router'
import type { HospitaWordData, DoctorResponseData, DocArr, Doctor } from '@/api/hospital/type'
// 获取路由对象
let $route = useRoute()
// 获取路由器
let $router = useRouter()
// 分页器当前页码
let pageNo = ref<number>(1)
// 每一页展示几条数据
let limit = ref<number>(6)
// 存储医院科室挂号的数据
let workData = ref<any>({})
// 存储排班日期：当前数据的第一个
let workTime = ref<any>({})
// 存储排班医生的数据
let doctorArr = ref<DocArr>([])
// 组件挂载完毕发一次请求
onMounted(() => {
  fetchWorkData()
})
// 获取挂号数据
const fetchWorkData = async () => {
  let result: HospitaWordData = await reqHospitalWork(pageNo.value, limit.value, $route.query.hoscode as string, $route.query.depcode as string)
  if (result.code === 200) {
    workData.value = result.data
    // 存储第一天日期的数据
    workTime.value = workData.value.bookingScheduleList[0]
    // 获取一次医生的数据
    getDoctorWorkData()
  }
}

// 获取某一天医生排班的数据
const getDoctorWorkData = async () => {
  // 医院的编号
  let hoscode: string = $route.query.hoscode as string
  // 科室的编号
  let depcode: string = $route.query.depcode as string
  // 时间
  let workData: string = workTime.value.workDate
  // 获取排班医生的数据
  let result: DoctorResponseData = await reqHospitalDoctor(hoscode, depcode, workData)
  if (result.code === 200) {
    if (workTime.value.status === 0) {
      doctorArr.value = result.data
    } else {
      doctorArr.value = []
    }
  }
}

// 点击顶部某一天的时候触发回调
const changeTime = (item: any) => {
  // 存储用户选择的那一天的数据
  workTime.value = item
  // 再发一次获取医生排班的数据
  getDoctorWorkData()
}

// 计算出上午排班医生的数据
let moringArr = computed(() => {
  return doctorArr.value.filter((doc: Doctor) => {
    return doc.workTime === 0
  })
})

// 计算出下午排班医生的数据
let afterArr = computed(() => {
  return doctorArr.value.filter((doc: Doctor) => {
    return doc.workTime === 1
  })
})

// 路由跳转进入到选择就诊人页面
const goStep2 = (doctor: Doctor) => {
  // 编程式导航进行路由跳转且携带医生的id
  $router.push({ path: '/hospital/register_step2', query: { docId: doctor.id } })
} 
</script>

<style scoped lang="scss">
.wrap {
  .top {
    display: flex;
    color: #7f7f7f;

    div {
      cursor: pointer;
    }

    .line {
      width: 1px;
      height: 15px;
      background-color: skyblue;
      margin: 0 5px;
    }

    .dot {
      margin: 0 5px;
      color: skyblue;
    }

    .hosname:hover {
      color: skyblue;
    }
  }

  .center {
    margin: 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .time {
      font-weight: 900;
    }

    .container {
      margin: 30px;
      width: 100%;
      display: flex;

      .item {
        flex: 1;
        border: 1px solid skyblue;
        margin: 0 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 0.5s;

        &.active {
          border: 1px solid #ccc;
          color: #7f7f7f;

          .item-top {
            background-color: #ccc;
          }
        }

        &.cur {
          transform: scale(1.1);

        }

        .item-top {
          background-color: #e8f2ff;
          height: 30px;
          width: 100%;
          text-align: center;
          line-height: 30px;
        }

        .bottom {
          width: 100%;
          height: 60px;
          text-align: center;
          line-height: 60px;
        }
      }
    }
  }

  .bottom {
    .will {
      display: flex;
      justify-content: center;
      font-size: 25px;
      font-weight: 500;

      .time {
        color: rgb(66, 204, 246);
      }

      .willNumberAllocation {
        color: #7f7f7f;
      }
    }

    .doctor {
      .moring {
        .tip {
          display: flex;
          align-items: center;

          .text {
            color: #7f7f7f;
            font-size: 17px;
            font-weight: 500;
          }
        }

        .docInfo {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
          border-bottom: 1px solid #ccc;

          .left {
            .info {
              color: skyblue;
              margin: 10px 0;

              span {
                margin: 0 5px;
                font-size: 18px;
                font-weight: 900;
              }

              span:first-child {
                margin-left: 0;
              }
            }

            .skill {
              margin: 10px 0;
              color: #7f7f7f;
            }
          }

          .right {
            display: flex;
            align-items: center;
            width: 150px;
            justify-content: space-between;

            .money {
              color: #7f7f7f;
              font-weight: 900;
            }
          }
        }
      }
    }
  }
}
</style>