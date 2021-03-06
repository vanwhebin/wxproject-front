import api from './index'
import apiSetting from '@/config'
const version = apiSetting.version

export const postCreatFlow = (data) => {
    return api.post(`${version}/sku/create`, data)
}

export const getFlows = (params) => {
    return api.get(`${version}/sku/list`, params)
}

export const getHistory = (params) => {
    return api.get(`${version}/sku/history`, params)
}

export const getFlow = (flowID) => {
    return api.get(`${version}/sku/${flowID}`)
}

export const auditFlow = (flowID, data) => {
    return api.patch(`${version}/sku/audit/${flowID}`, data)
}

export const putSKU = (SKUID, data) => {
    return api.put(`${version}/sku/info/${SKUID}`, data)
}


export const auditRight = (flowID) => {
    return api.get(`${version}/sku/right/${flowID}`)
}
