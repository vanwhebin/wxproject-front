import axios from 'axios'
import config from '@/config'
import { Dialog } from 'vant'
import { getSessionStore } from '@/utils/storage'

// 引用axios
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
axios.defaults.timeout = 20000
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

function apiAxios (method, url, params) {
  return new Promise((resolve, reject) => {
    axios({
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ||  method === 'PATCH' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      withCredentials: false
    }).then(res => {
      console.log(res)
      resolve(res.data)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

axios.interceptors.request.use(function (axiosConfig) {
  axiosConfig.headers.Accept = 'application/json'
  let AUTH_TOKEN = getSessionStore(config.ACCESS_TOKEN)
  console.log(AUTH_TOKEN)

  if (AUTH_TOKEN) {
    axiosConfig.headers.Authorization = 'Bearer ' + AUTH_TOKEN
  }
  return axiosConfig
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(res => {
  console.log(res)
  const { data, status } = res
  return { data, status }
}, error => {
  console.log(error.response)
  if (error.response) {
    if (error.response.status === 401) {
      Dialog.alert({
        title: '授权失败',
        message: '企业微信授权失败，请重新打开页面',
      }).then(() => {
        window.close()
      })
    }
    return Promise.reject(error)
  }
})

// 返回到vue模板中的调用接口
export default {
  get: function (url, params) {
    return apiAxios('GET', url, params)
  },
  post: function (url, params) {
    return apiAxios('POST', url, params)
  },
  put: function (url, params) {
    return apiAxios('PUT', url, params)
  },
  delete: function (url, params) {
    return apiAxios('DELETE', url, params)
  },
  patch: function (url, params) {
    return apiAxios('PATCH', url, params)
  }
}
