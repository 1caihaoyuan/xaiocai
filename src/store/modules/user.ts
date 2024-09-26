// 定义用户相关的仓库
import { defineStore } from "pinia"
// 引入获取验证码的请求方法
import { reqCode, reqUserLogin } from '@/api/hospital/index'
import type { LofginData, UserLoginResponseData, } from '@/api/hospital/type'
import type {UserStore} from '@/store/modules/interface/index'
import { GET_TOKEN,SET_TOKEN,REMOVE_TOKEN } from "@/utils/user"
const useUserStore = defineStore('User', {
  state: ():UserStore => {
    return {
      visiable: false, // 用于控制登陆组件dialog显示与隐藏
      code: '', // 存储用户的验证码
      userInfo: JSON.parse(GET_TOKEN() as string) || {}
    }
  },
  actions: {
    // 获取验证码的方法
    async getCode(phone: string) {
      // 再向服务器携带手机号码要获取验证码
      // 正常开发的时候，只需要发一个请求，后台就会将验证码推送到用户的手机设备当中
      // 当然咱们目前服务器不能向用户的手机设备推送验证码（花钱）
      let result: any = await reqCode(phone)
      if (result.code === 200) {
        this.code = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 用户手机号码登陆的方法
    async userLogin(loginData: LofginData) {
      // 登陆请求
      let result: UserLoginResponseData = await reqUserLogin(loginData)
      if (result.code === 200) {
        this.userInfo = result.data
        // 本地存储持久化存储用户信息
        SET_TOKEN(JSON.stringify(this.userInfo))
        // 返回一个成功的promise
        return 'ok'
      }else{
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出登陆
    logout(){
      // 清空仓库的数据
      this.userInfo = {name:'',token:''}
      // 清空本地存储
      REMOVE_TOKEN()
    },
    // 查询微信扫码的接口(看本地存储是否存储数据)
    queryState(){
      // 开启定时器每个一段时间就去问：本地存储是否拥有用户信息
      let timer =setInterval(() => {
        // 本地存储已经有数据：扫码成功
        if(GET_TOKEN()){
          // 关闭对话框
          this.visiable = false
          this.userInfo = JSON.parse(GET_TOKEN() as string)
          clearInterval(timer)
        }
      },1000)
    }
  },
  getters: {

  }
})

export default useUserStore