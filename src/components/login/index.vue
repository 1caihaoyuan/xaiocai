<template>
  <div class="login_container">
    <!-- title是对话框左上角的标题 v-model是控制对话框的显示与隐藏 -->
    <el-dialog v-model="userStore.visiable" title="用户登陆" width="740">
      <div class="el-dialog__body">
        <!-- 对话框身体部分结构 -->
        <div class="content">
          <el-row>
            <!-- 左侧：手机号码登录或者微信扫一扫 -->
            <el-col :span="12">
              <div class="logint">
                <div v-show="scene == 0">
                  <el-form :model="loginParam" :rules="rules" ref="form">
                    <el-form-item prop="phone">
                      <el-input :prefix-icon="User" placeholder="请你输入手机号码" v-model="loginParam.phone"></el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                      <el-input :prefix-icon="Lock" placeholder="请输入手机验证码" v-model="loginParam.code"></el-input>
                    </el-form-item>
                    <el-from-item>
                      <el-button :disabled="!isPhone || flag ? true : false">
                        <CountDown v-if="flag" :flag="flag" @getFlag="getFlag" />
                        <span v-else @click="getCode">获取验证码</span>
                      </el-button>
                    </el-from-item>
                  </el-form>
                  <el-button style="width: 98%; margin-top: 10px;" type="primary"
                    :disabled="!isPhone || loginParam.code.length < 6" @click="login">
                    用户登陆
                  </el-button>
                  <div class="bottom" @click="changeScene">
                    <p>
                      微信扫码登陆
                    </p>
                    <svg t="1717229181666" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="2045" width="32" height="32">
                      <path
                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                        fill="#d81e06" p-id="2046"></path>
                      <path
                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                        fill="#d81e06" p-id="2047"></path>
                    </svg>
                  </div>
                </div>
                <div class="webchat" v-show="scene == 1">
                  <!-- 在这个容器当中显示微信扫码登陆的页面 -->
                  <div id="login_container"></div>
                  <div class="phone" @click="handler">
                    <p>手机短信验证码登陆</p>
                    <svg t="1717488435161" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="3047" width="32" height="32">
                      <path d="M512.1 512.4m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#BF67E8" p-id="3048">
                      </path>
                      <path
                        d="M619.9 796.8H404.2c-23.8 0-43.3-19.5-43.3-43.3V271.2c0-23.8 19.5-43.3 43.3-43.3h215.7c23.8 0 43.3 19.5 43.3 43.3v482.3c0 23.9-19.5 43.3-43.3 43.3z"
                        fill="#FFFFFF" p-id="3049"></path>
                      <path
                        d="M623.2 734H401c-7.7 0-13.9-6.2-13.9-13.9V304.7c0-7.7 6.2-13.9 13.9-13.9h222.2c7.7 0 13.9 6.2 13.9 13.9v415.4c0 7.7-6.2 13.9-13.9 13.9z"
                        fill="#BF67E8" p-id="3050"></path>
                      <path d="M512.1 765.8m-15.8 0a15.8 15.8 0 1 0 31.6 0 15.8 15.8 0 1 0-31.6 0Z" fill="#BF67E8"
                        p-id="3051"></path>
                      <path
                        d="M550.2 474.4c1-0.5 1.4-1.7 0.9-2.7-1.4-3.3-5.7-9.5-17.3-9.5-15.8 0-21.6 5.7-21.6 5.7s-4.1-5.7-21.6-5.7-25.1 23.5-21.3 42.3c4.1 20.2 17.5 39.6 25.9 39.6s10.9-4.6 18-4.6 12.3 4.6 18.3 4.6 13.1-5.2 18-13.4c3.4-5.7 5.3-11.5 6.1-14.6 0.3-1.1-0.3-2.2-1.4-2.6-4.1-1.3-13.1-5.6-13.1-19.2 0.1-13.1 6.2-18.2 9.1-19.9zM532.4 435.2c1.6-0.3 3.1 1 3 2.6-0.3 3.8-1.4 10.3-5.6 15.1-4.2 4.8-10.5 6.8-14.2 7.6-1.6 0.3-3.1-1-3-2.6 0.3-3.8 1.4-10.3 5.6-15.1 4.2-4.9 10.5-6.8 14.2-7.6z"
                        fill="#BF67E8" p-id="3052"></path>
                      <path
                        d="M522.8 263.5H473c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5h49.8c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5z"
                        fill="#BF67E8" p-id="3053"></path>
                      <path d="M548.1 259.5m-5 0a5 5 0 1 0 10 0 5 5 0 1 0-10 0Z" fill="#BF67E8" p-id="3054"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="rightContent">
                <div class="top">
                  <div class="item">
                    <img src="@/assets/images/code_app.png" alt="">
                    <svg t="1717229725303" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="2048" width="16" height="16">
                      <path
                        d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                        fill="#5D5D5D" p-id="2049"></path>
                    </svg>
                    <p>微信扫一扫关注</p>
                    <p>“快速预约挂号”</p>
                  </div>
                  <div class="item">
                    <img src="@/assets/images/code_login_wechat.png" alt="">
                    <svg t="1717229871045" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="4173" width="16" height="16">
                      <path
                        d="M256 85.333333h512c64.8 0 117.333333 52.533333 117.333333 117.333334v618.666666c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334z m0 64a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V202.666667a53.333333 53.333333 0 0 0-53.333333-53.333334H256z m170.666667 618.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z"
                        fill="#000000" p-id="4174"></path>
                    </svg>
                    <p>扫一扫下载</p>
                    <p>“预约挂号”APP</p>
                  </div>
                </div>
              </div>
              <p class="tip">回春医官方指定平台</p>
              <p class="tip">快速挂号安全放心</p>
            </el-col>
          </el-row>
        </div>
      </div>
      <template #footer>
        <el-button type="primary" @click="closeDialog">关闭窗口</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup name='Login'>
// 引入微信扫码登陆参数请求
import { reqWxlogin } from '@/api/hospital/index'
import { User, Lock, } from '@element-plus/icons-vue'
import type { WXLOginResponseData } from '@/api/hospital/type'
import { useRouter, useRoute } from 'vue-router'
// 获取user仓库数据(visiable)可以控制login组件的对话框的显示与隐藏
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
// 获取路由器对象
let $router = useRouter()
let $route = useRoute()

// 引入倒计时组件
import CountDown from '@/components/countd/index.vue'
// 定义一个响应式数据去控制倒计时组件的显示与隐藏
let flag = ref<boolean>(false)// flag 如果为真开启倒计时 flag为假的并非倒计时
import { ref, reactive, computed, watch } from 'vue'
import { ElMessage } from 'element-plus';
let scene = ref<number>(0) // 0代表手机号码登录 如果是1代表微信扫码登陆
// 获取form组件实例
let form = ref<any>()
// 收集表单数据————收集手机号码
let loginParam = reactive({
  phone: '',// 手机手机号码
  code: '', //手机验证码
})
// 计算出当前表单元素收集的内容是否是手机号码格式
let isPhone = computed(() => {
  // 手机号码的正则表达式
  const reg = /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/
  // 返回布尔值 真代表手机号码 假代表不是手机号码
  return reg.test(loginParam.phone)
})
// 点击微信扫码登陆微信小图标切换为微信扫码登陆
const changeScene = async () => {
  // 切换场景为1
  scene.value = 1
  // 发请求获取微信扫码二维码需要的参数
  // 咱们再向硅谷学校服务器发请求，获取微信扫码登陆页面参数，还需要携带一个告诉学校服务器用户授权以后重定向项目某一个页面
  let redirect_URL = encodeURIComponent(window.location.origin + '/wxlogin')
  let result: WXLOginResponseData = await reqWxlogin(redirect_URL)
  // 生成微信扫码登陆二维码页面
  // @ts-ignore
  new WxLogin({
    self_redirect: true, //true:手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
    id: "login_container", //显示二维码容器设置
    appid: result.data.appid, //应用位置标识appid
    scope: "snsapi_login", //当前微信扫码登录页面已经授权了
    redirect_uri: result.data.redirectUri, //填写授权回调域路径,就是用户授权成功以后，微信服务器向公司后台推送code地址
    state: result.data.state, //state就是学校服务器重定向的地址携带用户信息
    style: "black",
    href: "",
  });
}
// 获取验证码按钮的回调
const getCode = async () => {
  // 解决element-plus按钮禁用还能点击的问题
  if (!isPhone.value || flag.value) return
  // 开启倒计时模式,倒计时组件得显示出来
  flag.value = true
  // 通知pinia仓库存储验证码
  try {
    // 代表获取验证码成果
    await userStore.getCode(loginParam.phone)
    loginParam.code = userStore.code
  } catch (error) {
    ElMessage({
      type: 'error',
      message: (error as Error).message
    })
  }
}
// 计数器子组件绑定的自定义事件
// 当倒计时为0的时候，通知父组件倒计时组件应该隐藏
const getFlag = (value: boolean) => {
  // 倒计时模式结束
  flag.value = value
}

// 点击用户登陆按钮的回调
const login = async () => {
  // 保证表单校验两项都符合条件
  await form.value.validate()
  // 发起登陆请求
  // 请求成功：顶部组件需要展示用户的名字以及对话框关闭
  // 登陆的请求：失败弹出对应登陆失败的对应信息
  try {
    // 用户登陆成功
    await userStore.userLogin(loginParam)
    // 关闭对话框
    userStore.visiable = false
    // 获取url的query参数
    let redirect = $route.query.redirect
    if(redirect){
      $router.push(redirect as string)
    }else{
      $router.push('/home')
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: (error as Error).message
    })
  }
}

// 自定义校验规则：手机号码自定义校验规则
const validatorPhone = (rule: any, value: any, callBack: any) => {
  // rule:即为表单校验规则的对象
  // value：即为当前文本内容
  // callBack：即为回调函数
  const reg = /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/
  if (reg.test(value)) {
    callBack()
  } else {
    callBack(new Error('请输入正确的手机号码格式'))
  }
}

// 验证码自定义校验规则
const validatorCode = (rule: any, value: any, callBack: any) => {
  if (/^\d{6}$/.test(value)) {
    callBack()
  } else {
    callBack(new Error('请输入正确的验证码格式'))
  }
}

// 表单校验的规则对象
const rules = {
  // 手机号码的校验规则
  // required代表当前的字段务必进行校验
  // message代表的校验错误的提示信息
  // trigger: 代表表单校验触发的时机 change文本发生变化的时候进行校验 blur：失去焦点的时候触发校验
  // min：代表的是最小位数
  // max：代表的是最大的位数
  // phone:[{required: true, message:'手机号码务必是11位',trigger:'change',min:11}],
  // code:[{required:true,message:'验证码务必是6位',trigger:'blur',min:6}]

  phone: [{ trigger: 'change', validator: validatorPhone }],
  code: [{ trigger: 'change', validator: validatorCode }]
}

// 关闭窗口按钮的回调
const closeDialog = () => {
  userStore.visiable = false
}

// 点击手机短信验证码盒子回调
const handler = () => {
  scene.value = 0
}

// 监听场景的数据
watch(() => scene.value, (val: number) => {
  if (val === 1) {
    userStore.queryState()
  }
})
</script>

<style scoped lang="scss">
.login_container {
  .el-dialog__body {
    width: 100%;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;

    .content {
      margin: 30px 0;

      .logint {
        border: 1px solid #ccc;
        padding: 20px;

        .webchat {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;

          .phone {
            display: flex;
            flex-direction: column;
            align-items: center;

            p {
              margin: 10px 0;
            }
          }
        }

        .bottom {
          display: flex;
          flex-direction: column;
          align-items: center;

          p {
            margin: 10px 0;
            cursor: pointer;
          }
        }
      }

      .rightContent {
        .top {
          display: flex;
          justify-content: space-around;

          .item {
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
              width: 130px;
              height: 130px;
            }

            p {
              margin: 5px 0;
            }
          }
        }
      }

      .tip {
        text-align: center;
        font-size: 20px;
        margin: 40px 0;
        font-style: oblique;
      }
    }
  }
}
</style>