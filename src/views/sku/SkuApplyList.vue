<template>
    <Card dis-hover style="margin: auto;margin-top:50px;min-height:500px;margin-left:50px;margin-right:50px;">
        <p slot="title">{{ title }}</p>
        <div v-show="!showTable">
            <Row>
                <Table stripe :columns="columns" :data="data" :loading="listLoading" style="margin-bottom:10px">
                    <template slot-scope="{ row }" slot="action">
                        <Button type="primary" size="small" :disabled="row.result" style="margin-right: 5px" @click="audit(row)">审批</Button>
                    </template>
                </Table>
                <Page :total="pagination.total" :page-size="pagination.num" :current="pagination.page" @on-change="changePage"/>
            </Row>
        </div>

        <div v-show="showTable">
            <Row style="margin-bottom:5px">
                <Button type="default" @click.prevent="back">
                    返回
                </Button>
                <Dropdown style="float:right" @on-click="submitFlowBtn">
                    <Button type="primary">
                        审批
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem :disabled="disableSubmit" name="pass">通过</DropdownItem>
                        <DropdownItem :disabled="disableSubmit" name="reject">驳回</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Row>
            <SkuTable
                    @onSelect="onSelect"
                    ref="selectedFlowTable"
                    :data="selectedFlowTable"
                    :loading="tableLoading">
            </SkuTable>
        </div>
        <Modal
                ref="confirmModal"
                :mask-closable="false"
                v-model="confirmModal.show"
                title="操作提醒"
                :loading="confirmModal.loading"
                @on-ok="submitFlow">
            <p>确认将已选产品SKU执行操作?</p>
            <Input type="textarea" v-model="rejectReason" :rows="4" v-show="!action" placeholder="(非必填)驳回意见" />
        </Modal>
    </Card>

</template>

<script>
    import { login } from '@/api/api'
    import config from '@/config'
    import { setSessionStore, getSessionStore } from '@/utils/storage'
    import { getFlows, getFlow, auditFlow } from '@/api/sku'
    import SkuTable from './module/Table'
    export default {
        name: "ApplyList",
        components: {
            SkuTable
        },
        data () {
            return {
                total: 100,
                confirmModal: {
                    show: false,
                    loading: true
                },
                pagination: {
                  num: 10,
                  page: 1,
                  total: 0
                },
                rejectReason: '',
                listLoading: false,
                selectedFlow: null,
                action: null,
                actionSelectedSKU: [],
                selectedFlowTable: [],
                tableLoading: false,
                columns: [
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
                                }, params.row.result ? '已处理':'未处理')])
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
                data: []
            }
        },
        computed: {
            disableSubmit () {
                return this.actionSelectedSKU.length === 0
            },
            showTable () {
                return  this.selectedFlowTable.length !== 0
            },
            title () {
                return  this.selectedFlowTable.length === 0 ? "产品审批流程列表" : "审批列表SKU"
            }
        },
        mounted () {
            const token = getSessionStore(config.ACCESS_TOKEN)
            if (!token) {
                this.listLoading = true
                this.getUserInfo()
            }
            this.getData()
        },
        methods: {
            getUserInfo () {
                let code, state
                const strRes = /code=.+/.exec(window.location.search)
                if (strRes) {
                    const codeStrArr = strRes[0].split('&')
                    code = codeStrArr[0].split('=')[1]
                    state = codeStrArr[1].split('=')[1]

                    login({ code: code, state: state }).then(response => {
                        console.log(response)
                        const accessToken = response.data.access_token
                        setSessionStore(config.ACCESS_TOKEN, accessToken)
                        this.getData()
                    })
                }
            },
            onSelect (value) {
                console.log(value)
                this.actionSelectedSKU = value
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
                this.rejectReason = ""
            },
            audit (row) {
                this.tableLoading = true
                this.selectedFlow = row
                let data = []
                getFlow(row.flow_id).then((res) => {
                    console.log(res)
                    res.data.skus.forEach((item) => {
                        let row = { result: item.is_pass, _disabled: item.is_pass }
                        data.push(Object.assign(row, item.sku))
                    })
                    this.selectedFlowTable = data
                    setTimeout(() => this.tableLoading = false, 500)
                })
            },
            submitFlowBtn (value) {
                console.log(value)
                this.action = value === 'pass'
                if (!this.action) {

                }
                this.confirmModal.show = true
            },
            submitFlow () {
                const data = { is_accept: this.action, sku: this.actionSelectedSKU, memo: this.rejectReason }
                auditFlow(this.selectedFlow.flow_id, data).then((res) => {
                    console.log(res)
                    this.confirmModal.loading = false
                    this.confirmModal.show = false
                    this.$Message.success("审批完成")
                    this.getData()
                    this.back()
                })
            },
            changePage (page) {
                console.log(page)
                this.pagination.page = page
                this.getData()
            }
        }
    }
</script>

<style scoped>

</style>
