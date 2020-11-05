<template>
    <Card dis-hover style="margin: auto;margin-top:50px;min-height:500px;margin-left:50px;margin-right:50px;">
        <p slot="title">{{ title }}</p>
        <div>
            <Row>
                <Table stripe :columns="columns" :data="data" style="margin-bottom:10px">
                    <template slot-scope="{ row }" slot="action" v-show="!row.result">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="audit(row)">审批</Button>
                    </template>
                </Table>
                <Page :total="total" />
            </Row>
        </div>

        <div>
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
                v-model="confirmModal.show"
                title="操作提醒"
                :loading="confirmModal.loading"
                @on-ok="submitFlow">
            <p>确认将已选产品SKU执行操作?</p>
        </Modal>
    </Card>

</template>

<script>
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
                    loading: false
                },
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
                data: [
                    {
                        "creator_name": "万伟斌",
                        "result": false,
                        "flow_id": 6,
                        "create_time": "2020-11-04 18:10:03"
                    }
                ]
            }
        },
        computed: {
            disableSubmit () {
                return this.selectedFlowTable.length === 0
            },
            title () {
                return  this.selectedFlowTable.length === 0 ? "产品审批流程列表" : "审批列表SKU"
            }
        },
        mounted () {
            this.getData()
        },
        methods: {
            onSelect (value) {
                console.log(value)
                this.actionSelectedSKU = value
            },
            getData () {
                console.log("getData")
                getFlows().then((res) => {
                    console.log(res)
                    this.data = res.results
                    this.total = res.count
                })
            },
            back () {
                this.selectedFlowTable = []
            },
            audit (row) {
                this.selectedFlow = row
                getFlow(row.flow_id).then((res) => {
                    console.log(res)
                    this.selectedFlowTable = res.data.skus
                })
                console.log(row)
            },
            submitFlowBtn (value) {
                console.log(value)
                this.action = value === 'pass'
                this.confirmModal.show = true
            },
            submitFlow () {
                const data = { is_accept: this.action, sku: this.actionSelectedSKU }
                auditFlow(this.selectedFlow.flow_id, data).then((res) => {
                    console.log(res)
                    this.$message.success("审批完成")
                    this.getData()
                    this.back()
                })
            }
        }
    }
</script>

<style scoped>

</style>
