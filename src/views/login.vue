<!-- eslint-disable padded-blocks -->
<script setup lang="ts">
import type { Rules } from 'async-validator'
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import type { Ref } from 'vue'
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import type loginInfo from '../types/user'
import userStore from '../stores/user'
import router from '../router'
import { userLogin, userSignUp } from '@/service/login'

const useUserStore = userStore()
const { token } = storeToRefs(useUserStore)
const password: Ref<loginInfo['password']> = ref('')
const username: Ref<loginInfo['username']> = ref('')
const comfirmPassWord = ref('')

const form = reactive({
  username,
  password,
  comfirmPassWord,
})
const passwordCheckList = ref([{
  text: 'character 8',
  isCorrect: false,
}, {
  text: 'Upper Letter',
  isCorrect: false,
}, {
  text: 'Number',
  isCorrect: false,
}, {
  text: 'Symbol',
  isCorrect: false,
}])

// 检查密码是否带有大写字母，符号，长度8,数字
function passwordCheck() {
  const hasNumber = /\d/.test(password.value)
  const hasUpperCase = /[A-Z]/.test(password.value)
  const hasSymbol = /[^\w\s]/.test(password.value)
  const hasLength8 = password.value.length >= 8
  passwordCheckList.value[0].isCorrect = hasLength8
  passwordCheckList.value[1].isCorrect = hasUpperCase
  passwordCheckList.value[2].isCorrect = hasNumber
  passwordCheckList.value[3].isCorrect = hasSymbol
}

const rules: Rules = {
  // 规则在不输入时不生效，即文本框不输入时不会改变颜色
  username: [
    { required: true, message: 'Please input name' },
    { min: 3, max: 12, message: 'Length should be 3 to 12' },

  ],
  password: [
    { required: true, message: 'Please input password' },
    { min: 8, message: 'Length should be 8' },
    { pattern: /[A-Z]/, message: 'Upper letter' },
    { pattern: /\d/, message: 'Number' },
    { pattern: /[^\w\s]/, message: 'Symobl' },

  ],
  // 判断两次密码是否相等
  comfirmPassWord: [
    { required: true, message: 'Comfirm your password' },
    { validator: (_rule, value) => value === password.value, message: 'Password not match' },
  ],
}
const { errorFields, pass } = useAsyncValidator(form, rules)

// 注册
function signUp() {
  userSignUp(form)
}
async function login() {

  if (await userLogin(form)) {

    ElMessage.success(`Login Success welcome ${token.value}`)
    // 登录成功后跳转到首页
    router.replace({ path: '/' })
  }
  else { ElMessage.error('Login Failed') }

}
// 使用localHost暂时存储用户名和密码，并且有一个注册和登录检测的功能

// watchEffect(() => {
//   console.log(errorFields?.value)
// })
</script>

<template>
  <div class="container">
    <div>
      <h1>Test Login</h1>
    </div>
    <div class="user-login">
      <form>
        <div class="user-name">
          <input v-model="username" type="text" placeholder="Please input your name">
          <label class="label" for="input">
            <span v-if="errorFields?.username?.length">
              {{ errorFields?.username[0]?.message }}
            </span>
          </label>
        </div>
        <div class="user-password">
          <input v-model="password" type="password" placeholder="Please input password" @input="passwordCheck">
          <label class="label" for="input">
            <span v-if="errorFields?.password?.length">
              {{ errorFields?.password[0]?.message }}
            </span>
          </label>
        </div>
        <div class="password-check">
          <span v-for="(check, index) in passwordCheckList" :key="index" :class="check.isCorrect ? 'correct' : ''">
            {{ check.text }}
          </span>
        </div>
        <input v-model="comfirmPassWord" type="password" placeholder="Comfirm Password" class="comfirm-password">
        <div v-if="errorFields?.comfirmPassWord?.length">
          {{ errorFields?.comfirmPassWord[1]?.message }}
        </div>
        <div flex-auto>
          <button type="button" @click="signUp">
            <span>
              SignUp
            </span>
          </button>
          <button type="button" @click="login">
            <span>
              Login
            </span>
          </button>
          <span :class="pass ? 'correct' : ''">{{ pass }}</span>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;

  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
}

.user-login {
  width: 25rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2rem;
  border-radius: 1rem;
  // box-shadow: 3px 2px 1rem 0px #dfe7ff;
  box-shadow: 10px 10px 20px #dfe7fc,
    -15px -15px 30px #ededed8f, ;

  background: #fafbff;
  backdrop-filter: blur(10px);
  // background: linear-gradient(315deg, #fafbff, #fefeff) background-blend-mode: normal, normal, screen, overlay, normal;

  form {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

  }

}

input {
  width: 14rem;
  padding: .9rem;
  border-radius: 10px;
  background: linear-gradient(315deg, #fafbff, #fefeff);
  border: none;
  outline: none;
  margin: .4rem;
  margin-bottom: 1rem;
  box-shadow: 0px 2px 8px 1px #dde4f7, inset 0px -1px 1px #e3eaff;
}

.user-name {
  position: relative;

  .label {
    position: absolute;
    pointer-events: none;
    top: 0rem;
    left: 1rem;

    span {
      display: inline-block;
      font-size: 14px;
      min-width: 5px;
      color: transparent;
      background: none;
      transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 0.55);

    }
  }

  input:focus+label span {
    background: linear-gradient(135deg, #396AF1 10%, #A665F6 90%);
    color: transparent;
    -webkit-background-clip: text;
    transform: translateY(-1rem);
  }
}

.user-password {
  position: relative;

  .label {
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 1rem;

    >span {
      display: inline-block;
      font-size: 14px;
      min-width: 5px;
      color: transparent;
      transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 0.55);
    }
  }

  input:focus+label span {
    background: linear-gradient(135deg, #396AF1 10%, #A665F6 90%);
    color: transparent;
    -webkit-background-clip: text;
    transform: translateY(-1rem);

  }
}

.password-check {
  display: flex;

  color: #525252;

  >span {
    border: 1px solid #dddada2a;
    box-shadow: 0 0 2px 1px #efeded2a;
    margin: .1rem;
    padding: .2rem;
    font-size: 12px;
    border-radius: .4rem;
  }

  transition: 0.8s all ease-in-out;
}

.border-red {
  border: 1px solid red;
}

.correct {
  color: #fff;
  background-color: #396AF1;
  transition: all 0.3s ease-in-out;
}

button {
  position: relative;
  overflow: hidden;
  height: 2rem;
  width: 6rem;
  padding: 0rem 1rem;
  border-radius: 12px;
  background: #7dd9fd;
  margin-right: 1rem;
  color: #fff;
  border: none;

  span {
    position: relative;
    z-index: 1;
  }
}

button:hover::before {
  transform: scaleX(1);
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleX(0);
  transform-origin: 0 50%;
  width: 100%;
  height: inherit;
  border-radius: inherit;
  background-image: linear-gradient(135deg, #396AF1 10%, #A665F6 90%);
  transition: all 0.475s;
}
</style>
