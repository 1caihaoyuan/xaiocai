<template>
  <!-- 实名认证组件的结构 -->
  <el-card class="box-card">
    <!-- 卡片头部 -->
    <template #header>
      <div class="card-header">
        <h1>实名信息</h1>
      </div>
    </template>
    <!-- 实名认证结构的提示部分 -->
    <div class="tip" style="color: #7f7f7f;">
      <p><el-icon>
          <InfoFilled />
        </el-icon>提示</p>
    </div>
    <!-- 卡片身体的底部：认证成功的结构 -->
    <el-descriptions v-if="userInfo.authStatus == 1" class="margin-top" size="small" :column="1" border
      style="margin: 20px auto;">
      <el-descriptions-item label-align="center" :width='20'>
        <template #label>
          <div class="cell-item">
            用户姓名
          </div>
        </template>
        {{ userInfo.name }}
      </el-descriptions-item>
      <el-descriptions-item label-align="center" :width='20'>
        <template #label>
          <div class="cell-item">
            证件类型
          </div>
        </template>
        {{ userInfo.certificatesType == '10' ? '身份证' : '户口本' }}
      </el-descriptions-item>
      <el-descriptions-item label-align="center" :width='20'>
        <template #label>
          <div class="cell-item">
            证件号码
          </div>
        </template>
        {{ userInfo.certificatesNo }}
      </el-descriptions-item>
    </el-descriptions>
    <!-- 用户未认证的结构 -->
    <el-form ref="form" :model="params" :rules="rules" v-if="userInfo.authStatus == 0" style="width: 50%; margin: 20px auto;"
      :label-width="80">
      <el-form-item label="用户姓名" prop="name">
        <el-input placeholder="请输入用户姓名" v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="certificatesType">
        <el-select placeholder="请选择证件的类型" v-model="params.certificatesType">
          <el-option :label="item.name" :value="item.value" v-for="(item, index) in arrType" :ket="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="certificatesNo">
        <el-input placeholder="请输入证件号码" v-model="params.certificatesNo"></el-input>
      </el-form-item>
      <el-form-item label="上传证件" prop="certificatesUrl">
        <!-- action:upload组件向服务器提交图片路径
          limit:照片墙约束图片的个数
          on-exceed：超出约束数量的钩子
        -->
        <el-upload ref="upload" list-type="picture-card" :on-preview="handlePictureCardPreview"
          :on-remove="removehandler" :on-success="successhandler" :on-exceed='exceedhandler' limit="1"
          action="/api/oss/file/fileUpload?fileHost=userAuah">
          <img style="width: 100%; height: 100%;" src="../../../assets/images/auth_example.png" alt="">
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full v-if="params.certificatesUrl" style="width: 100%;height: 100%;" :src="params.certificatesUrl"
            alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" type="primary">提交</el-button>
        <el-button @click="reset">重写</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang='ts' setup name=''>
// 引入element-puls 图标
import {
  InfoFilled
} from '@element-plus/icons-vue'
// 存储用户信息
let userInfo: any = ref<any>({})
let arrType = ref<CertationArr>([])
// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
// 引入组合式api函数
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
// 获取from组件
let form = ref()
import { reqCertationType, reqUserCertation, reqUserInfo } from '@/api/user/index'
import { UserParams, UserInfoResponseData, CertationArr, CertationTypeResponseData } from '@/api/user/type'
let upload = ref()
// 收集表单认证数据
let params = reactive<UserParams>({
  "certificatesNo": '',
  "certificatesType": '',
  "certificatesUrl": '',
  "name": ''
})
// 组件挂载完毕
onMounted(() => {
  // 获取用户信息的方法
  getUserInfo()
  // 获取证件类型的接口
  getType()
})
// 获取用户信息方法
const getUserInfo = async () => {
  let result: UserInfoResponseData = await reqUserInfo()
  if (result.code === 200) {
    userInfo.value = result.data
  }
}
// 获取证件类型
const getType = async () => {
  let result: CertationTypeResponseData = await reqCertationType()
  if (result.code == 200) {
    arrType.value = result.data
  }
}

// 超出数量的钩子
const exceedhandler = () => {
  ElMessage({
    type: 'error',
    message: '图片只能上传一张'
  })
}

// 图片上传成功的钩子
const successhandler = (response: any, uploadFile: any, uploadFiles: any) => {
  // 如果图片上传成功校验结构清除
  form.value.clearValidate('certificatesUrl')
  // 收集上传成功图片的地址
  // response：上传图片请求服务器返回的数据
  // uploadFile:上传文件的数据
  params.certificatesUrl = response.data
}

// 点击图片预览
const handlePictureCardPreview = () => {
  dialogVisible.value = true
}

// 图片删除钩子
const removehandler = () => {
  params.certificatesUrl = ''
}
// 重写
const reset = () => {
  // 清空文件上传的列表
  upload.value.clearFiles()
  // 清空数据
  Object.assign(params, {
    "certificatesNo": '',
    "certificatesType": '',
    "certificatesUrl": '',
    "name": ''
  })
}

// 提交
const submit = async () => {
  // 进行全部表单校验 全部表单校验通过返回一个成功的promise
  // 如果有一个校验失败 返回的是一个失败的promise 后面的语句不在执行了
  await form.value.validate()

  try {
    // 认证成功
    await reqUserCertation(params)
    // 提示
    ElMessage({
      type: 'success',
      message: '认证成功'
    })
    // 认证成功以后再次获取用户信息
    getUserInfo()
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '认证失败'
    })
  }
}

// 自定义校验规则姓名的方法
const validatorName = (rule: any, value: any, callback: any) => {
  // rules:即为当前校验字段的校验规则对象
  // value:即为文本内容
  const reg = /^[\u4E00-\u9FA5]{2,4}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的中国人姓名'))
  }
}
// 证件类型校验的方法
const validatorType = (rule: any, value: any, callback: any) => {
  if (value == '10' || value == '20') {
    callback()
  } else {
    callback(new Error('请选择证件的类型'))
  }
}

// 证件号码的校验方法
const validatorNo = (rule: any, value: any, callback: any) => {
  let sfz = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
  let hkb = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (sfz.test(value) || hkb.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的身份证/户口本号码'))
  }
}

// 证件照图片
const validatorUrl = (rule: any, value: any, callback: any) => {
if(value.length){
  callback()
}else{
  callback(new Error('请上传证件照图片'))
}
}

// 表单校验规则的对象
const rules = {
  name: [{
    // require:true,代表当前数据务必需要校验
    required: true,
    validator: validatorName
  }],
  certificatesType: [{
    required: true,
    validator: validatorType
  }],
  certificatesNo: [{
    required: true,
    validator: validatorNo
  }],
  certificatesUrl: [{
    required: true,
    validator: validatorUrl
  }]
}
</script>

<style scoped lang="scss">
.box-card {
  .tip {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>