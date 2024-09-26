<template>
  <!-- 展示全部订单的结构 -->
  <el-card>
    <template #header>
      <div class="card-header">
        <span>挂号订单</span>
      </div>
    </template>
    <!-- 提供用户选择的下拉菜单 -->
    <el-form :inline="true">
      <el-form-item label="就诊人">
        <el-select placeholder="请选择就诊人" v-model="patientId" @change="changeUser" style="width: 200px;">
          <el-option label="请选择全部的就诊人"></el-option>
          <el-option v-for="item in allUser" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select placeholder="请选择订单状态" style="width: 200px;" v-model="orderStatus" @change="changeOrderStatus">
          <el-option label="全部订单" value=""></el-option>
          <el-option v-for="(item,index) in allOrderState" :key="index" :label="item.comment" :value="item.status"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 表格展示订单的数据 -->
    <el-table border style="margin: 20px 0px;" :data="allOrderArr">
      <el-table-column label="就诊的时间" prop="reserveDate"></el-table-column>
      <el-table-column label="医院的名称" prop="hosname"></el-table-column>
      <el-table-column label="科室" prop="depname"></el-table-column>
      <el-table-column label="医生" prop="title"></el-table-column>
      <el-table-column label="医事服务费" prop="amount"></el-table-column>
      <el-table-column label="就诊人" prop="patientName"></el-table-column>
      <el-table-column label="订单状态" prop="param.orderStatusString"></el-table-column>
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button type="text" @click="goDerail(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
      :background="true" layout="prev, pager, next, jumper, -> ,sizes, total," :total="total" @current-change="handler"
      @size-change="handlers" />
  </el-card>
</template>

<script lang='ts' setup name=''>
import { ref, onMounted } from 'vue'
// 引入获取订单的请求的方法
import { reqUserOrderInfo, reqAllUser, reqAllOrderState } from '@/api/user/index'
import { useRouter } from 'vue-router'
// 获取路由器对象
let $router = useRouter()
// 引入ts类型
import type { AllUSerResponeData, AllOrderStateResponeData, AllOrderState, AllUser, UserOrderInfoResponeData, Records } from '@/api/user/type'
// 当前分页器处于的页码
let pageNo = ref<number>(1)
// 当前页码展示几条数据
let pageSize = ref<number>(10)
// 收集就诊人的id
let patientId = ref<string>('')
// 订单的状态
let orderStatus = ref<string>('')
// 存储全部订单
let allOrderArr = ref<Records>([])
// 存储订单的总个数
let total = ref<number>(0)
// 存储所有就诊人信息
let allUser = ref<AllUser>([])
// 存储全部订单的状态
let allOrderState = ref<AllOrderState>([])
// 组件挂载完毕的钩子
onMounted(() => {
  // 获取相应的订单的方法
  getOrderInfo()
  // 获取全部就诊人的信息 获取全部订单状态
  getData()
})
// 获取订单的方法
const getOrderInfo = async () => {
  let result: UserOrderInfoResponeData = await reqUserOrderInfo(pageNo.value, pageSize.value, patientId.value, orderStatus.value)
  if (result.code == 200) {
    allOrderArr.value = result.data.records
    total.value = result.data.total
  }
}
// 详情按钮的回调
const goDerail = (row: any) => {
  $router.push({ path: '/user/order', query: { orderId: row.id } })
}
// 分页器组件当前页码的事件的回调
const handler = (pager: number) => {
  pageNo.value = pager
  getOrderInfo()
}

// 下拉菜单事件的回调
const handlers = (pageSizes: number) => {
  pageSize.value = pageSizes
  getOrderInfo()
}

// 获取就诊人与订单状态的接口方法
const getData = async () => {
  // 获取所有的就诊人
  const result: AllUSerResponeData = await reqAllUser()
  // 获取全部订单状态
  const result1: AllOrderStateResponeData = await reqAllOrderState()
  allUser.value = result.data
  allOrderState.value = result1.data
}

// 就诊人下拉菜单回调方法
const changeUser = () => {
  // 根据就诊人的id再次获取挂号订单的数据
  getOrderInfo()
}

// 订单状态下拉菜单 （可以用上面的  changeUser ）
const changeOrderStatus = () => {
  getOrderInfo()
}
</script>

<style scoped></style>