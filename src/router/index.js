import Vue from 'vue'
import Router from 'vue-router'
import ProductFlow from '@/views/Apply'
import ProductAuditList from '@/views/AuditList'
import ProductAudit from '@/views/Audit'
import page404 from '@/views/NotFound'
import Table from '@/views/Table'

const routes = [
    { path: '/product/flow', name: 'product-flow', component: ProductFlow },
    { path: '/sku/table', name: 'sku-flow', component: Table },
    { path: '/product/auditlist', name: 'audit-list', component: ProductAuditList },
    { path: '/product/audit/:projectID([1-9]\\d*)?', name: 'product-audit', component: ProductAudit },
    { path: '*', name: 'notFound', component: page404 }
]
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes
})

export default router
