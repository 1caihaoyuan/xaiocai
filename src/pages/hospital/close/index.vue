<template>
  <div>
    <div class="info">
      <h1>{{ hospitalStore.hospitalInfo.hospital?.hosname }}停诊信息</h1>
      <el-empty description="暂无信息" />
    </div>
  </div>
</template>

<script lang='ts' setup name='close'>
// 引入医院详细仓库的数据
import useDetailStore from '@/store/modules/hospitalDetail'
let hospitalStore = useDetailStore()
</script>

<style scoped lang="scss">
.info{
  h1{
    text-align: center;
    font-size: 30px;
    font-weight: 900;
  }
}
</style>