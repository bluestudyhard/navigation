import { request } from '@/utils/request'
import type loginInfo from '@/types/user'

// 统一管理接口
const API = {
  LOGIN_URL: '/user/login',
  USERINFO_URL: '/user/info',

} as const

export const loginReq = (data: loginInfo) => request.post(API.LOGIN_URL, data)
export const getUserInfo = () => request.get(API.USERINFO_URL)
