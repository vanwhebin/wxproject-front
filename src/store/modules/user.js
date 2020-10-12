import Vue from 'vue'
import { getInfo, login, logout } from '@/api/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/store/mutation-types'
// import { setUserToken, welcome } from '@/utils/util'
// import store from '@/store'
// import apiSetting from '@/config/apiSetting'

const user = {
  state: {
    token: '',
    refresh: '',
    name: '',
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_REFRESH_TOKEN: (state, refresh) => {
      state.refresh = refresh
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          setUserToken(response.data.access_token, response.data.refresh_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
