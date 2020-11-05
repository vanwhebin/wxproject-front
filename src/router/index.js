import Vue from 'vue'
import Router from 'vue-router'
import ProductFlow from '@/views/product/Apply'
import ProductAuditList from '@/views/product/AuditList'
import ProductAudit from '@/views/product/Audit'
import page404 from '@/views/NotFound'
import Apply from '@/views/sku/Apply'
import SkuApplyList from '@/views/sku/SkuApplyList'
import SkuApply from '@/views/sku/SkuApply'

const routes = [
    { path: '/product/flow', name: 'product-flow', component: ProductFlow },
    { path: '/product/auditlist', name: 'audit-list', component: ProductAuditList },
    { path: '/product/audit/:projectID([1-9]\\d*)?', name: 'product-audit', component: ProductAudit },

    { path: '/sku/flow', name: 'sku-flow', component: Apply },
    { path: '/sku/auditlist', name: 'sku-audit-list', component: SkuApplyList },
    { path: '/sku/history', name: 'sku-apply', component: SkuApply },

    { path: '*', name: 'notFound', component: page404 }
]
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes
})

export default router
