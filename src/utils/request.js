import Vue from 'vue'
import store from '@/store'
import axios from 'axios'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/store/mutation-types'
import router from '@/router'

function failAuth () {
  // 否则跳到登录
  notification.error({
    message: '未登录',
    description: '用户验证失败'
  })

  store.dispatch('Logout').then(() => {
    setTimeout(() => {
      router.push({ name: 'login' })
    }, 1500)
  })
}

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    // const token = Vue.ls.get(REFRESH_TOKEN)
    // const refreshToken = Vue.ls.get(REFRESH_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: '权限不足',
        description: data.msg
      })
    }
    if (error.response.status === 401) {
      // 如果用户有refresh token 则自动续期
      // if (token) {
      //   refreshToken(token).then((res) => {
      //     // 将token保存
      //     store.commit('SET_TOKEN', res.token)
      //     // TODO 再次请求
      //   }).catch(() => failAuth())
      // } else {
      //   failAuth()
      // }
      failAuth()
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义 token 请根据实际情况自行修改
    // config.headers[ACCESS_TOKEN] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  console.log(response)
  return response.data
}, err => {
  console.log(err)
})

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
