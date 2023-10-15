import type { loginResponseData } from '@/types/user'
import { loginReq } from '@/api/user'
import type loginInfo from '@/types/user'

export const userSignUp = function (data: any) {
  // 检查是否完成pass的条件，如果为false，就不能提交，然后输入框会抖动
  console.log(data)
}

export const userLogin = async function (data: loginInfo) {
  console.log(data.username, data.password)
  const result: loginResponseData = await loginReq(data)
  console.log(result.data)
  if (result.data.code === 200) {
    localStorage.setItem('token', result.data.token as string)
    return true
  }
  return false
}
// export const userLogin = function () {
//   if (!pass.value) {
//     // eslint-disable-next-line no-alert
//     alert('请检查输入')
//     return
//   }
//   const user = {
//     username: username.value,
//     password: passWord.value,
//   }
//   const userString = localStorage.getItem('user')
//   const userObject = JSON.parse(userString as string)
//   if (user.username === userObject.username && user.password === userObject.password) {
//     // eslint-disable-next-line no-alert
//     alert('登录成功')
//     router.push('.data
//   }
//   else {
//     // eslint-disable-next-line no-alert
//     alert('用户名或密码错误')
//   }
// }
