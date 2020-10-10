import api from './index'
import apiSetting from '@/config'
const version = apiSetting.version

// 企业微信登录
export const login = (data) => {
  return api.post(`/login/`, data)
}

// 文件上传
export const upload = (data) => {
  return api.post(`${version}/upload/`, data)
}

// 提交项目表单
export const postCreatProject = (data) => {
  return api.post(`${version}/project/create`, data)
}

// 获取需要审批的项目列表
export const getProjects = (params) => {
  return api.get(`${version}/project/list`, params)
}

export const getProject = (projectID) => {
  return api.get(`${version}/project/${projectID}`)
}


export const auditProject = (projectID, data) => {
    return api.patch(`${version}/project/audit/${projectID}`, data)
}


export const auditRight = (projectID) => {
  return api.get(`${version}/project/right/${projectID}`)
}
