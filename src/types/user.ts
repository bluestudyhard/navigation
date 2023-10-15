export default interface loginInfo {
  username: string
  password: string
  confirmpassword?: string
}

export interface userInfo {
  id: number
  username: string
  password: string
  desc?: string
  roles?: string[]
  routes: string[]
  token: string
}

interface dataType {
  token?: string
  message: string
  code: number
}
export interface loginResponseData {
  data: dataType
}
