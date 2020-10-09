import Vue from 'vue'
import store from '@/store'
import apiSetting from '@/config'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/store/mutation-types'

/**
 * @param n 金额
 * @param c 小数点后面有几位 (四舍五入到指定的位数)
 * @param d 小数点 符号 (.) , 把它作为参数，是因为你可以自己制定你所需要的符号，比如你可以把 12345.678  格式化成  12,345#678   在这里，用# 符号 而不是 . 符号
 * @param t 千分位的符号 (,) 也就是格式化成12,345.68中的逗号 (,), 你可以设置成任何你需要的符号, 比如 格式化成12@345.68   在这里，用@符号 而不是 , 符号
 * @returns {string}
 */
export function moneyFormat (n, c, d, t) {
  let j
  n = Math.abs(n)
  c = isNaN(c = Math.abs(c)) ? 2 : c
  d = d === undefined ? '.' : d
  t = t === undefined ? ',' : t
  const s = n < 0 ? '-' : ''
  const i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)))
  j = (j = i.length) > 3 ? j % 3 : 0
  return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '')
}

export function list2Tree (data, childArr, pid = 'pid', root = 0) {
  data.forEach(item => {
    // 判断是否为父级菜单
    if (item[pid] === root) {
      const child = {
        ...item,
        title: item.title,
        key: item.key || item.id || item.title,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      list2Tree(data, child.children, pid, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      childArr.push(child)
    }
  })
}

export function debounce (fn, wait) {
  var timeout = null
  return function () {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(fn, wait)
  }
}

export function throttle (func, delay) {
  var prev = Date.now()
  return function () {
    var context = this
    var args = arguments
    var now = Date.now()
    if (now - prev >= delay) {
      func.apply(context, args)
      prev = Date.now()
    }
  }
}

export function curTimeStamp (date) {
  if (!date) {
    return parseInt((new Date()).getTime().toString().substring(0, 10))
  } else {
    return parseInt(date.toString().substring(0, 10))
  }
}

export function isImage (str) {
  // 图片正则
  // const PICTURE_EXPRESSION = /\.(png|jpe?g|gif|svg)(\?.*)?$/
  const picReg = new RegExp(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  // url正则
  // const URL_REGULAR_EXPRESSION = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/
  const objExp = new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.?%&=]*)?/)
  return !!(str.match(objExp) && str.match(picReg))
}

export function getFormatTime (timestamp) {
  const diff = 8 * 3600 * 1000
  const date = new Date((timestamp + diff)) // 获得北京时间
  return date.toJSON().substr(0, 19).replace('T', ' ')
}

export function getExpireTime (timestamp) {
  const diff = (8 + 24) * 3600 * 1000
  const date = new Date((timestamp + diff)) // 获得北京时间
  return date.toJSON().substr(0, 19).replace('T', ' ')
}

export function timeFormat (time, type) {
  const date = new Date((time + 8 * 3600) * 1000) // 获得北京时间
  if (!type) {
    return date.toJSON().substr(0, 19).replace('T', ' ')
  } else if (type === 'time') {
    return date.toJSON().substr(10, 9).replace('T', ' ')
  } else if (type === 'date') {
    return date.toJSON().substr(0, 10).replace('T', ' ')
  }
}

export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
      () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

export function setUserToken (accessToken, refreshToken) {
  Vue.ls.set(ACCESS_TOKEN, accessToken, apiSetting.tokenExpire.access_token)
  Vue.ls.set(REFRESH_TOKEN, refreshToken, apiSetting.tokenExpire.refresh_token)
  store.commit('SET_TOKEN', accessToken)
  store.commit('SET_REFRESH_TOKEN', refreshToken)
}
