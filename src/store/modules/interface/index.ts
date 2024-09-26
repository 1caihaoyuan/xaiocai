import type { HospitalDetail,DepartmentArr,UserInfo } from '@/api/hospital/type'
// 定义仓库内部存储数据state的ts类型
export interface DetailState {
  hospitalInfo: HospitalDetail
  deparmentArr:DepartmentArr
}


// 用户仓库相关state数据的ts类型定义
export interface UserStore {
  visiable: boolean, // 用于控制登陆组件dialog显示与隐藏
  code: string, // 存储用户的验证码
  userInfo: UserInfo
}