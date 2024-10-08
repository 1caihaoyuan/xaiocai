<template>
  <div>
    <!-- 首页轮播图的结构 -->
    <Carousel />
    <!-- 首页搜索医院的表单区域 -->
    <Search />
    <!-- 底部展示医院的结构 -->
    <el-row gutter="20">
      <el-col :span="20">
        <!-- 等级子组件 -->
        <Level @getLevel="getLevel" />
        <!-- 地区 -->
        <Region @getRegion="getRegion" />
        <!-- 展示医院的结构 -->
        <div class="hospital" v-if="hasHospitalArr.length > 0">
          <Card class="item" v-for="(item, index) in hasHospitalArr" :key="index" :hospitalInfo="item" />
        </div>
        <el-empty v-else description="暂无数据" />
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSiza" @size-change="sizeChange"
          @current-change="currentChange" :page-sizes="[10, 20, 30, 40]" :page-siza="pageSiza"
          layout=" prev, pager, next, jumper, ->,sizes,total" :total="total">
        </el-pagination>
      </el-col>
      <el-col :span="4">
      <Tip/>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts' setup name='home'>
// 引入组合式API函数
import { onMounted, ref } from 'vue'
import { reqHospital } from '@/api/home/index'
// 引入首页轮播图组件
import Carousel from '@/pages/home/carousel/index.vue'
// 引入首页搜索的组件
import Search from '@/pages/home/search/index.vue'
// 引入首页等级的组件
import Level from '@/pages/home/level/index.vue'
// 引入首页地区选择的组件
import Region from '@/pages/home/region/index.vue'
// 引用医院新的卡片组件
import Card from '@/pages/home/card/index.vue'
// 引入右侧的组件
import Tip from '@/pages/home/tip/index.vue'
import type { Contrnt, HospitalResponseData } from '@/api/home/type'
// 分页器页码
let pageNo = ref<number>(1)
// 一页展示几条数据
let pageSiza = ref<number>(10)
// 存储已有的医院的数据
let hasHospitalArr = ref<Contrnt>([])
// 存储已有医院的总个数
let total = ref<number>(0)
// 存储医院的等级响应式数据
let hostype = ref<string>('')
// 存储选择医院的地区
let districtCode = ref<string>('')
// 组件挂载完毕:发送一次请求
onMounted(() => {
  getHospitalInfo()
})

// 获取已有的医院的数据
const getHospitalInfo = async () => {
  // 获取医院的数据：默认获取第一页，一页十个医院数据
  let result: HospitalResponseData = await reqHospital(pageNo.value, pageSiza.value,hostype.value,districtCode.value)
  if (result.code === 200) {
    // 存储已有的医院的数据
    hasHospitalArr.value = result.data.content
    // 存储医院的总个数
    total.value = result.data.totalElements
  }
}

// 分页器页码发生变化时候的回调
const currentChange = () => {
  getHospitalInfo()
}
// 分页器下拉菜单发生变化的时候会触发
const sizeChange = () => {
  // 当前页码归第一页
  pageNo.value = 1
  // 再次发请求获取医院的数据
  getHospitalInfo()
}

// 子组件的自定义事件:要获取儿子给父组件传递过来的等级的参数
const getLevel = (level:string) => {
  // 收集参数:等级的参数
  hostype.value = level
  // 再次发请求
  getHospitalInfo()
}
// 子组件的自定义事件：获取子组件传递过来的地区的参数
const getRegion = (region:string) => {
  // 存储地区的参数
  districtCode.value = region
  // 再次发请求
  getHospitalInfo()
}
</script>

<style scoped lang="scss">
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    width: 48%;
    margin: 10px 0;
  }
}
</style>