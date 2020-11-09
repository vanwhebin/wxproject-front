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
    { path: '/product/flow', name: 'product-flow', component: ProductFlow, meta: { title: '产品立项申请'} },
    { path: '/product/auditlist', name: 'audit-list', component: ProductAuditList, meta: { title: '产品立项列表'}  },
    { path: '/product/audit/:projectID([1-9]\\d*)?', name: 'product-audit', component: ProductAudit, meta: { title: '产品申请详情'}  },

    { path: '/sku/flow', name: 'sku-flow', component: Apply, meta: { title: '返单特采数据上传'} },
    { path: '/sku/auditlist', name: 'sku-audit-list', component: SkuApplyList, meta: { title: '返单特采审核列表'} },
    { path: '/sku/history', name: 'sku-apply', component: SkuApply, meta: { title: '返单特采申请记录'}  },

    { path: '*', name: 'notFound', component: page404, meta: { title: '错误，请返回'}  }
]

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes
})

export default router
