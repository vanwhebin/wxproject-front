<template>
    <Card dis-hover style="margin: auto;margin-top:50px;min-height:500px;margin-left:50px;margin-right:50px;">
        <p slot="title">{{ title }}</p>
        <a slot="extra" @click="$router.push({ name: 'sku-flow'})">创建流程</a>
        <div v-show="!showTable">
            <Row>
                <Table stripe :columns="columns" :data="data" :loading="listLoading" style="margin-bottom:10px">
                    <template slot-scope="{ row }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="check(row)">查看</Button>
                    </template>
                </Table>
                <Page :total="pagination.total" :page-size="pagination.num" :current="pagination.page" @on-change="changePage"/>
            </Row>
        </div>

        <div v-show="showTable">
            <Steps :current="stepActive" style="margin-bottom:15px">
                <Step :title="item.title" :content="item.desc" v-for="(item, key) in stepArr" :key="key"></Step>
            </Steps>
            <Row style="margin-bottom:5px">
                <Button type="default" @click.prevent="back">
                    返回
                </Button>
                <Button type="primary" style="float:right" @click.prevent="submitFlowBtn" :disabled="disableReSubmit" v-show="isDone && !disableReSubmit">
                    重新提交
                </Button>
            </Row>
            <!--   一个流程的sku列表   -->
            <SkuTable
                @onSelect="onSelect"
                ref="selectedFlowTable"
                :result="true"
                :isDone="isDone"
                @onEdit="onEditSku"
                :data="selectedFlowTable"
                :loading="tableLoading">
            </SkuTable>
        </div>
        <!--   sku表单编辑框     -->
        <InfoDrawer
            ref="infoDrawer"
            @submit="handleSubmit"
            @toggleDrawer="toggleDrawer"
            :showDrawer="showDrawer"
            :formData="skuInfo"></InfoDrawer>
        <!-- 确认模态框     -->
        <Modal
                ref="confirmModal"
                :mask-closable="false"
                v-model="confirmModal.show"
                title="操作提示"
                :loading="confirmModal.loading"
                @on-ok="submitFlow">
            <p>确认将已选产品SKU发起审批流程?</p>
        </Modal>
    </Card>

</template>

<script>
    import { login } from '@/api/api'
    import config from '@/config'
    import { setSessionStore, getSessionStore } from '@/utils/storage'
    import { getFlows, getFlow, putSKU, postCreatFlow } from '@/api/sku'
    import SkuTable from './module/Table'
    import InfoDrawer from "./module/Drawer"
    export default {
        name: "SkuApply",
        components: {
            SkuTable,
            InfoDrawer
        },
        data () {
            return {
                total: 100,
                isDone: false,
                showDrawer: false,
                confirmModal: {
                    show: false,
                    loading: true
                },
                stepActive: 0,
                stepArr: [
                    // { title: "上传产品列表", desc: "使用模板填充产品列表" },
                    // { title: "领导审批", desc: "审批流转" },
                    // { title: "流程结束", desc: "企业微信通知" },
                ],
                token: '',
                pagination: {
                    num: 10,
                    page: 1,
                    total: 0
                },
                listLoading: false,
                selectedFlow: null,
                action: null,
                actionSelectedFailedSKU: [],
                selectedFlowTable: [],
                tableLoading: false,
                columns: [
                    {
                        title: 'ID',
                        key: 'flow_id',
                        align: 'center'
                    },
                    {
                        title: '发起人',
                        key: 'creator_name',
                        align: 'center'
                    },
                    {
                        title: '处理状态',
                        align: 'center',
                        key: 'result',
                        render: (h, params) => {
                            console.log(params)
                            return h('div', [
                                h('Tag', {
                                    props: {
                                        color: params.row.result ? 'green': 'orange'
                                    }
                                }, params.row.result ? '已处理':'处理中')])
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'create_time',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center'
                    }

                ],
                data: [],
                skuInfo: {
                    "id": null,
                    "supplier": "",
                    "sku": "",
                    "model": "",
                    "title": "",
                    "is_new": "",
                    "qty": 0,
                    "price_with_tax": 0,
                    "amount_with_tax": 0,
                    "sell_day": 12,
                    "qty_within_30": 0,
                    "inventory": 0,
                    "coming_inventory": 0,
                    "gross_profit_rate": 0.0,
                    "return_rate": 0.0,
                    "memo": "",
                    "create_time": null,
                    "purchaser": ""
                }
            }
        },
        computed: {
            disableReSubmit () {
              // 没有选中sku条目前，重新提交按钮不可用
                return this.actionSelectedFailedSKU.length === 0
            },
            showTable () {
                return  this.selectedFlowTable.length !== 0
            },
            title () {
                return  this.selectedFlowTable.length === 0 ? "我的审批流程列表" : "审批SKU列表"
            }
        },
        mounted () {
            const token = getSessionStore(config.ACCESS_TOKEN)
            if (!token) {
                this.listLoading = true
                this.token = token
                this.getUserInfo()
            } else {
                this.getData()
            }
        },
        methods: {
            onSelect (value) {
                console.log(value)
                this.actionSelectedFailedSKU = value
            },
            getData () {
                this.listLoading = true
                const params = { num: this.pagination.num, page: this.pagination.page }
                getFlows(params).then((res) => {
                    console.log(res)
                    this.data = res.results
                    this.pagination.total = res.count
                    setTimeout(() => this.listLoading = false, 800)
                })
            },
            back () {
                this.selectedFlowTable = []
            },
            getFlow (flowID) {
                let data = []
                getFlow(flowID).then((res) => {
                    console.log(res)
                    res.data.skus.forEach((item) => {
                        let row = { result: item.is_pass, _disabled: item.is_pass }
                        data.push(Object.assign(row, item.sku))
                    })
                    this.isDone = res.data.is_done
                    this.selectedFlowTable = data
                    this.changeStep(res.data)
                    setTimeout(() => this.tableLoading = false, 500)
                })
            },
            changeStep (data) {
                const result = data.result
                this.stepArr = [ { title: "上传产品列表", desc: "使用模板填充产品列表", icon: 'ios-cloud-upload', status: 'finish' } ]
                for (let i = 0; i < result.length; i++) {
                    if (result[i].is_accept === 'reject') {
                        this.stepArr.push({
                            title: `审批不通过（${result[i].auditor}）`,
                            desc:'',
                            icon:'ios-person',
                            status: 'error'
                        })
                        this.stepActive = i
                        this.rejectReason = result[i].memo
                        return true
                    } else if (result[i].is_accept === 'accept') {
                        let node = { title: `审批（${result[i].auditor}）`, desc:'', icon:'ios-person', status: 'finish'}
                        this.stepArr.push(node)
                    } else {
                        let node = { title: `审批（${result[i].auditor}）`, desc:'', icon:'ios-person', status: 'wait'}
                        this.stepArr.push(node)
                        this.stepActive = i
                    }
                }

                if (data.is_done) {
                    this.stepArr.push({ title: `申请流程通过`, desc:'', icon:'md-checkmark-circle', status: 'finish'})
                    this.stepActive = this.stepArr.length - 1
                } else {
                    this.stepArr.push({ title: `审批结果`, desc:'', icon:'md-lock', status: 'wait'})
                }
            },
            check (row) {
                this.tableLoading = true
                this.selectedFlow = row
                this.getFlow(row.flow_id)
                console.log(row)
            },
            submitFlowBtn (value) {
                console.log(value)
                if (this.actionSelectedFailedSKU.length === 0) {
                    this.$Message.error('请至少选择一个SKU发起流程')
                    return false
                }
                this.confirmModal.show = true
            },
            submitFlow () {
                const data = { sku: this.actionSelectedFailedSKU }
                postCreatFlow(data).then((res) => {
                    console.log(res)
                    this.confirmModal.loading = false
                    this.confirmModal.show = false
                    this.$Message.success("所选SKU已重新发起流程")
                    this.getData()
                    this.back()
                })
            },
            changePage (page) {
                console.log(page)
                this.pagination.page = page
                this.getData()
            },
            toggleDrawer () {
                this.showDrawer = !this.showDrawer
            },
            onEditSku (row) {
                // console.log('edit')
                // console.log(row)
                this.showDrawer = true
                row.qty = Number(row.qty)
                row.price_with_tax = Number(row.price_with_tax)
                row.amount_with_tax = Number(row.amount_with_tax)
                row.sell_day = Number(row.sell_day)
                row.qty_within_30 = Number(row.qty_within_30)
                row.inventory = Number(row.inventory)
                row.coming_inventory = Number(row.coming_inventory)
                row.gross_profit_rate = (Number(row.gross_profit_rate) * 100)
                row.return_rate = (Number(row.return_rate) * 100)
                this.skuInfo = row
                // console.log(this.skuInfo)
            },
            handleSubmit (formData) {
                formData.gross_profit_rate = formData.gross_profit_rate / 100
                formData.return_rate = formData.return_rate / 100
                const data = Object.assign(formData, { flowID: this.selectedFlow.flow_id })
                putSKU(formData.id, data).then(() => {
                    this.getFlow(this.selectedFlow.flow_id)
                    this.$Message.success('SKU信息修改成功')
                    this.toggleDrawer()
                    this.$refs.infoDrawer.resetForm()
                })
            },
            getUserInfo () {
                let code, state
                const strRes = /code=.+/.exec(window.location.search)
                if (strRes) {
                    const codeStrArr = strRes[0].split('&')
                    code = codeStrArr[0].split('=')[1]
                    state = codeStrArr[1].split('=')[1]

                    login({ code: code, state: state }).then(response => {
                        console.log(response)
                        this.token = response.data.access_token
                        setSessionStore(config.ACCESS_TOKEN, response.data.access_token)
                        this.getData()
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
