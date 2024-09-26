<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <!-- 卡片：用于展示就诊人信息 -->
    <el-card class="box-card">
      <!-- 卡片头部 -->
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button type="success" :icon="UserFilled" @click="goUser">添加就诊人</el-button>
        </div>
      </template>
      <!-- 卡片的身体部分要展示就诊人信息 -->
      <div class="user">
        <Visitor @click="changeIndex(index)" v-for="(user, index) in userArr" :key="user.id" class="item" :user="user"
          :index="index" :currentIndex="currentIndex" />
      </div>
    </el-card>
    <!-- 卡片：展示医生信息 -->
    <el-card>
      <!-- 卡片头部 -->
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <!-- 卡片身体部分：去展示医生具体信息 -->
      <el-descriptions class="margin-top" :column="2" :size="size" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊日期:</div>
          </template>
          {{ docInfo.workDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊医院:</div>
          </template>
          {{ docInfo.param?.hosname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊科室:</div>
          </template>
          {{ docInfo.param?.depname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生姓名:</div>
          </template>
          {{ docInfo.docname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生职称:</div>
          </template>
          {{ docInfo.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生专长:</div>
          </template>
          {{ docInfo.skill }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生服务费:</div>
          </template>
          <span style="color: red;">{{ docInfo.amount }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 确定挂号按钮 -->
    <div class="btn">
      <el-button class="button" type="primary" :disabled="currentIndex == -1 ? true : false"
        @click="submitOrder">确认挂号</el-button>
    </div>
  </div>
</template>

<script lang='ts' setup name=''>
import { UserFilled } from '@element-plus/icons-vue'
// 引入获取就诊人信息的接口
import { reqGetUser, reqDoctorInfo } from '@/api/hospital/index'
import { reqSubmitOrder } from '@/api/user'
import type { SubimtOrder } from '@/api/user/type'
import { onMounted, ref } from 'vue'
import type { UserResponseData, UserArr, DoctorInfoData} from '@/api/hospital/type'
import { useRoute,useRouter } from 'vue-router'
// 获取路由对象
let $route = useRoute()
// 存储医生的信息
let docInfo = ref<any>({})
// 获取路由器对象
let $router = useRouter()
// 存储用户确定就诊人的索引值
let currentIndex = ref<number>(-1)
import { ElMessage } from 'element-plus'
// 存储全部就诊人信息
let userArr = ref<UserArr>([])
// 组件挂载完毕去获取相应的数据
onMounted(() => {
  // 获取就诊人信息
  fetchUserData()
  // 获取医生的信息
  fetchInfo()
})
// 获取就诊人信息
const fetchUserData = async () => {
  // 获取就诊人信息
  let result: UserResponseData = await reqGetUser()
  if (result.code === 200) {
    userArr.value = result.data
  }
}
// 获取医生信息
const fetchInfo = async () => {
  // 获取医生信息
  let result: DoctorInfoData = await reqDoctorInfo($route.query.docId as string)
  if (result.code === 200) {
    docInfo.value = result.data
  }
}

// 点击就诊人子组建回调
const changeIndex = (index: number) => {
  // 存储当前用户选择就诊人信息索引值
  currentIndex.value = index
}

// 确定挂号按钮回调
const submitOrder = async () => {
  // 医院编号
  let hoscode = docInfo.value.hoscode
  // 医生的id
  let scheduleId = docInfo.value.id
  // 就诊人id
  let patientId = userArr.value[currentIndex.value].id
  // 提交订单
  let result:SubimtOrder = await reqSubmitOrder(hoscode, scheduleId, patientId)
  // 提交订单成功
  if(result.code === 200){
    $router.push({path:'/user/order',query:{orderId:result.data}})
  }else{
    ElMessage({
      type:'error',
      message:result.message
    })
  }
  
}

// 预约挂号添加就诊人按钮的方法
const goUser = () => {
  // 路由跳转
  $router.push({path:'/user/patient',query:{type:'add'}})
}
</script>

<style scoped lang="scss">
.container {
  .tip {
    font-weight: 900;
    color: #7f7f7f;
    font-size: 23px;
  }

  .box-card {
    margin: 20px 0;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .user {
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 32%;
        margin: 5px;
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
}
</style>