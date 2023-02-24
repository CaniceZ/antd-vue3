<template>
  <div class="bgImg">
    <img src="https://qiniu-fe.yigongpin.com/fms_login_bg.png" alt="" />
  </div>
  <div class="login-box">
    <div class="logo-box" data-v-1e04b609="">
      <img
        class="logo-box-img"
        src="https://fms-uat.yigongpin.net/fmsAssets/assets/fms_login_logo.44465aa4.svg"
        data-v-1e04b609=""
      />
      <div class="logo-box-tit">内部管理系统</div>
    </div>
    <a-form
      ref="formRef"
      class="p-4 enter-x"
      :model="formData"
      :rules="getFormRules"
      @keypress.enter="handleLogin"
    >
      <a-form-item name="accountOrMobile" class="enter-x">
        <a-input
          v-model:value="formData.accountOrMobile"
          size="large"
          placeholder="账号"
          class="fix-auto-fill"
        />
      </a-form-item>
      <a-form-item name="password" class="enter-x">
        <a-input-password
          v-model:value="formData.password"
          size="large"
          visibility-toggle
          placeholder="密码"
        />
      </a-form-item>

      <a-form-item class="enter-x">
        <a-button
          type="primary"
          size="large"
          block
          :loading="loading"
          @click="handleLogin"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
  <p class="coypright" data-v-1e04b609="">Copyright © xxxx.com 版权所有</p>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, unref } from 'vue'
import { message } from 'ant-design-vue'
import md5 from 'js-md5'
import { flatten } from '@/utils/permissions.js'
import { useRouter } from 'vue-router'
import { doLogin, routerInfo } from '@/api/user'
const router = useRouter()
const formRef = ref()
const loading = ref(false)
const formData = reactive({
  accountOrMobile: '',
  password: ''
})
async function handleLogin() {
  const val = await unref(formRef).validate()
  if (!val) return
  loading.value = true
  const { data, succeed } = await doLogin({
    accountOrMobile: val.accountOrMobile,
    password: md5(val.password)
  })
  if (succeed) {
    localStorage.setItem('userInfo', JSON.stringify(data))
    routerGet()
  }
  loading.value = false
}

async function routerGet() {
  // 获取权限
  const { data, succeed } = await routerInfo({})
  if (succeed) {
    if (data && data.length) {
      localStorage.setItem('router', JSON.stringify(data))
      localStorage.setItem('routes', JSON.stringify(flatten(data)))
      router.push({
        path: '/'
      })
    } else {
      message.warning('您没有此功能权限，如需开通，请联系管理员。')
      router.replace('/login')
    }
  }
}
const { getFormRules } = useFormRules()

function useFormRules() {
  const getAccountFormRule = computed(() => createRule('请输入账号'))
  const getPasswordFormRule = computed(() => createRule('请输入密码'))

  const getFormRules = computed((): { [k: string]: any } => {
    const accountFormRule = unref(getAccountFormRule)
    const passwordFormRule = unref(getPasswordFormRule)

    return {
      account: accountFormRule,
      password: passwordFormRule
    }
  })
  return { getFormRules }
}
function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: 'change'
    }
  ]
}
</script>
<style lang="less" scoped>
.bgImg {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  top: 0;
  display: inline-block;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    vertical-align: top;
    object-fit: cover;
  }
}
.login-box {
  width: 534px;
  height: 500px;
  padding: 64px;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  box-shadow: 2px 6px 38px 0 rgb(229 229 239 / 86%);
  outline: 16px solid rgba(255, 255, 255, 0.38);
  background-color: #fff;
  .logo-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .logo-box-img {
      margin-bottom: 16px;
    }
    .logo-box-tit {
      margin-bottom: 48px;
      font-weight: 700;
      font-size: 26px;
      line-height: 36px;
      color: #323233;
    }
  }
}
.coypright {
  position: fixed;
  bottom: 64px;
  width: 100vw;
  font-size: 12px;
  text-align: center;
  color: #969799;
}
</style>
