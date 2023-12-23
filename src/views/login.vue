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
  <div class="header">
    <div class="inner-header flex flex-col">
      <h1>Login Here</h1>
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

    <!-- Waves Container -->
    <div>
      <svg
        class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto"
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
    <!-- Waves end -->
  </div>
  <!-- Header ends -->

  <!-- Content starts -->
  <div class="content flex">
    <p>melingblue </p>
  </div>
  <!-- Content ends -->
</template>

<style scoped lang="scss">
.user-login {
  width: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2rem;
  border-radius: 1rem;
  // box-shadow: 3px 2px 1rem 0px #dfe7ff;
  box-shadow: 10px 10px 20px #dfe7fc75,
    -15px -15px 30px #ededed1e, ;

  background: #f1f3f9;
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
  width: 18rem;
  padding: 1rem;
  border-radius: 10px;
  background: linear-gradient(315deg, #fafbff, #fefeff);
  border: none;
  outline: none;
  margin: .5rem;
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

h1 {
  font-family: 'Kalnia', serif;
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 48px;
}

p {
  font-family: 'Kalnia', serif;
  letter-spacing: 1px;
  font-size: 14px;
  color: #333333;
}

.header {
  position: relative;
  text-align: center;
  background: linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%);
  color: white;
}

.inner-header {
  height: 65vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

.flex {
  /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px;
  /*Fix for safari gap*/
  min-height: 100px;
  max-height: 150px;
}

.content {
  position: relative;
  height: 20vh;
  text-align: center;
  background-color: white;
}

/* Animation */

.parallax>use {
  animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
}

.parallax>use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax>use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax>use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax>use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}

/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }

  .content {
    height: 30vh;
  }

  h1 {
    font-size: 24px;
  }
}
</style>
