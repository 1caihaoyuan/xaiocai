// 引入二次封装的axios
import request from "@/utils/request"
import type { AddOrUpdataUser, AllOrderStateResponeData, AllUSerResponeData, UserOrderInfoResponeData, CertationTypeResponseData, SubimtOrder, UserInfoResponseData, UserParams } from "@/api/user/type"
// 枚举地址
enum API {
  // 提交订单，获取订单号接口
  SUBMITORER_URL = '/order/orderInfo/auth/submitOrder/',
  // 获取当前账号用户的信息
  USERINFO_URL = '/user/auth/getUserInfo',
  // 会员认证接口
  USERCERTATION_URL = '/user/auth/userAuah',
  // 获取证件类型接口
  CERTIFICATIONTYPE_URL = '/cmn/dict/findByDictCode/',
  // 获取用户订单号的数据
  USERORRDERINFO_URL = '/order/orderInfo/auth/',
  // 获取所有就诊人的信息
  ALLUSER_URL = '/user/patient/auth/findAll',
  // 获取订单的状态
  ORDERSTATE_URL = '/order/orderInfo/auth/getStatusList',
  // 获取中国各个城市的数据
  CITY_URL = '/cmn/dict/findByParentId/',
  // 新增就诊人接口
  ADDUSER_URL = '/user/patient/auth/save',
  // 更新已有的就诊人接口
  UPDATAUSER_URL = '/user/patient/auth/update',
  // 删除已有就诊人
  DELETEUSER_URL = '/user/patient/auth/remove/'
}
// 提交订单
export const reqSubmitOrder = (hoscode: string, scheduleId: string, patientId: number) => request.post<any, SubimtOrder>(API.SUBMITORER_URL + `${hoscode}/${scheduleId}/${patientId}`)
// 获取当前用户信息的接口
export const reqUserInfo = () => request.get<any, UserInfoResponseData>(API.USERINFO_URL)
// 会员认证接口
export const reqUserCertation = (data: UserParams) => request.post<any, any>(API.USERCERTATION_URL, data)
// 获取证件类型的方法
export const reqCertationType = (CertificatesType = 'CertificatesType') => request.get<any, CertationTypeResponseData>(API.CERTIFICATIONTYPE_URL + CertificatesType)
// 获取订单数据接口
export const reqUserOrderInfo = (page: number, limit: number, patientId: string, orderStatus: string) => request.get<any, UserOrderInfoResponeData>(API.USERORRDERINFO_URL + `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
// 获取全部就诊人信息
export const reqAllUser = () => request.get<any, AllUSerResponeData>(API.ALLUSER_URL)
// 获取全部订单的接口
export const reqAllOrderState = () => request.get<any, AllOrderStateResponeData>(API.ORDERSTATE_URL)
// 获取城市的数据
export const reqCity = (parentId: string) => request.get<any, any>(API.CITY_URL + parentId)
// 新增与修改已有的接诊人接口方法
export const reqAddOrUpdataUser = (data: AddOrUpdataUser) => {
  if (data.id) {
    return request.put<any,any>(API.UPDATAUSER_URL, data)
  } else {
    return request.post<any,any>(API.ADDUSER_URL, data)
  }
}
// 删除某一个就诊人的信息
export const reqRemoveUser = (id:number) => request.delete<any,any>(API.DELETEUSER_URL + id)