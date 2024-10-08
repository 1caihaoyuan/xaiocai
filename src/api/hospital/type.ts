// 定义详情模块数据的ts类型
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

//  代表医院详情数据
export interface HosPitalDetail {
  "bookingRule": {
    "cycle": number,
    "releaseTime": string,
    "stopTime": string,
    "quitDay": number,
    "quitTime": string,
    "rule": string[]
  },
  "hospital": {
    "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
      "hostypeString": string,
      "fullAddress": string
    },
    "hoscode": string,
    "hosname": string,
    "hostype": string,
    "provinceCode": string,
    "cityCode": string,
    "districtCode": string,
    "address": string,
    "logoData": string,
    "intro": null,
    "route": string,
    "status": number,
    "bookingRule": null
  }
}

// 医院详情接口返回的数据ts
export interface HospitalDetail extends ResponseData {
  data: HosPitalDetail
}

// 代表医院科室的数据
export interface Department {
  "depcode": string,
  "depname": string,
  "children"?: Department[]
}

// 代表存储科室的数组类型
export type DepartmentArr = Department[]
// 获取科室接口返回的数据类型
export interface DepartmentResponsData extends ResponseData {
  data: DepartmentArr
}

// 用户登陆接口需要携带的参数的类型
export interface LofginData {
  phone: string,
  code: string
}

// 登陆接口返回的用户信息的数据
export interface UserInfo {
  name: string,
  token: string
}
// 登陆接口返回的数据的ts类型
export interface UserLoginResponseData extends ResponseData {
  data: UserInfo
}

// 定义微信扫码登陆返回的数据的ts类型
export interface WXLogin {
  "redirectUri": string,
  "appid": string,
  "scope": string,
  "state": string
}

export interface WXLOginResponseData extends ResponseData {
  data: WXLogin
}

export interface BaseMap {
  "workDateString": string,
  "releaseTime": string,
  "bigname": string,
  "stopTime": string,
  "depname": string,
  "hosname": string
}

export interface WorkDate {
  "workDate": string,
  "workDateMd": string,
  "dayOfWeek": string,
  "docCount": number,
  "reservedNumber": number,
  "availableNumber": number,
  "status": number
}

export type BookingScheduleList = WorkDate[]

export interface HospitaWordData extends ResponseData {
  data: {
    total: number,
    bookingScheduleList: BookingScheduleList,
    baseMap: BaseMap
  }
}


// 代表的是一个医生的数据
export interface Doctor {
  "id": string,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
    "dayOfWeek": string,
    "depname": string,
    "hosname": string
  },
  "hoscode": string,
  "depcode": string,
  "title": string,
  "docname": string,
  "skill": string,
  "workDate": number,
  "workTime": number,
  "reservedNumber": number,
  "availableNumber": number,
  "amount": number,
  "status": number,
  "hosScheduleId": string
}

// 数组包含全部医生
export type DocArr = Doctor[]
// 获取医生排班接口返回的数据
export interface DoctorResponseData extends ResponseData {
  data: DocArr
}


// 代表的是一个就诊人数据ts类型
export interface User {
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
    "certificatesTypeString": string,
    "contactsCertificatesTypeString": string,
    "cityString": null,
    "fullAddress": string,
    "districtString": null,
    "provinceString": null
  },
  "userId": number,
  "name": number,
  "certificatesType": string,
  "certificatesNo": string,
  "sex": number,
  "birthdate": string,
  "phone": string,
  "isMarry": number,
  "provinceCode": null,
  "cityCode": null,
  "districtCode": null,
  "address": string,
  "contactsName": string,
  "contactsCertificatesType": string,
  "contactsCertificatesNo": string,
  "contactsPhone": string,
  "isInsure": number,
  "cardNo": null,
  "status": string
}

export type UserArr = User[]
export interface UserResponseData extends ResponseData {
  data: UserArr
}

// 获取某一个挂号医生数据的详情
export interface DoctorInfoData extends ResponseData {
  data: Doctor
}