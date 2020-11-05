<template>
    <Card style="margin: auto;margin-top:50px;min-height:500px;margin-left:10px;margin-right:10px;">
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            毛利不达标产品审批流程
        </p>
        <a slot="extra" @click="$router.push({ name: 'sku-apply'})">流程列表</a>
        <Steps :current="0">
            <Step :title="item.title" :content="item.desc" v-for="(item, key) in stepArr" :key="key"></Step>
        </Steps>
        <Row v-show="!showTable">
            <Upload
                    style="margin-top: 15%;"
                    type="drag"
                    :max-size="maxSize"
                    :on-exceeded-size="onExceedSize"
                    @before-upload="updateHeader"
                    :headers="uploadHeader"
                    name="file"
                    accept=".xlsx"
                    :on-success="afterUpload"
                    :on-error="uploadError"
                    :action="uploadUrl">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>上传SKU产品数据</p>
                </div>
            </Upload>
            <Row style="text-align: center">
                <a href="#" @click.prevent="downloadTemplate">
                    <Icon type="ios-loop-strong"></Icon>
                    下载数据模板
                </a>
            </Row>
        </Row>
        <Row v-show="showTable" style="margin-top: 25px">
            <div style="margin-bottom:5px">
                <Button @click="handleSelectAll()">{{ selectAllTitle }}</Button>
                <Button type="primary" @click.prevent="submitFlowBtn" style="float:right" :disabled="disableSubmit">
                    发起流程
                </Button>
            </div>
            <SkuTable ref="skuTable"
                      :data="tableArr"
                      :loading="tableLoading"
                      @onSelect="onSelectSkuItem"
                      @selectAllCaption="selectAllCaption">
            </SkuTable>
            <Button @click="handleSelectAll()" style="margin-top:5px">{{ selectAllTitle }}</Button>
        </Row>

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
    import config from "@/config"
    import SkuTable from './module/Table'
    import { postCreatFlow } from '@/api/sku'
    import { getSessionStore, setSessionStore } from '@/utils/storage'

    const token = getSessionStore(config.ACCESS_TOKEN)
    export default {
        name: "Apply",
        components: {
            SkuTable
        },
        data () {
            return {
                confirmModal: {
                    show: false,
                    loading: true
                },
                stepArr: [
                    { title: "上传产品列表", desc: "使用模板填充产品列表" },
                    { title: "领导审批", desc: "审批流转" },
                    { title: "流程结束", desc: "企业微信通知" },
                ],
                selectAllCaptionChoice: {
                    0: '取消全选',
                    1: '全选'
                },
                selectAllTitle: '全选',
                tableLoading: false,
                showTable: false,
                maxSize: (1024 * 10),
                uploadUrl: config.apiUrl + '/api/v1/sku/template',
                token: "",
                selectedSkuItemArray: [],
                uploadHeader: { "Authorization": "Bearer " + token },
                tableArr: [
                    {
                        "id": 876,
                        "supplier": "中国阿里巴巴1",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf1",
                        "is_new": "否",
                        "qty": "341",
                        "price_with_tax": "32124.2300",
                        "amount_with_tax": "3212423.0000",
                        "sell_day": 12,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 877,
                        "supplier": "中国阿里巴巴2",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf2",
                        "is_new": "否",
                        "qty": "342",
                        "price_with_tax": "32125.2300",
                        "amount_with_tax": "3212523.0000",
                        "sell_day": 13,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 878,
                        "supplier": "中国阿里巴巴3",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf3",
                        "is_new": "否",
                        "qty": "343",
                        "price_with_tax": "32126.2300",
                        "amount_with_tax": "3212623.0000",
                        "sell_day": 14,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 879,
                        "supplier": "中国阿里巴巴4",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf4",
                        "is_new": "否",
                        "qty": "344",
                        "price_with_tax": "32127.2300",
                        "amount_with_tax": "3212723.0000",
                        "sell_day": 15,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 880,
                        "supplier": "中国阿里巴巴5",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf5",
                        "is_new": "否",
                        "qty": "345",
                        "price_with_tax": "32128.2300",
                        "amount_with_tax": "3212823.0000",
                        "sell_day": 16,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 881,
                        "supplier": "中国阿里巴巴6",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf6",
                        "is_new": "否",
                        "qty": "346",
                        "price_with_tax": "32129.2300",
                        "amount_with_tax": "3212923.0000",
                        "sell_day": 17,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 882,
                        "supplier": "中国阿里巴巴7",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf7",
                        "is_new": "否",
                        "qty": "347",
                        "price_with_tax": "32130.2300",
                        "amount_with_tax": "3213023.0000",
                        "sell_day": 18,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 883,
                        "supplier": "中国阿里巴巴8",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf8",
                        "is_new": "否",
                        "qty": "348",
                        "price_with_tax": "32131.2300",
                        "amount_with_tax": "3213123.0000",
                        "sell_day": 19,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 884,
                        "supplier": "中国阿里巴巴9",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf9",
                        "is_new": "否",
                        "qty": "349",
                        "price_with_tax": "32132.2300",
                        "amount_with_tax": "3213223.0000",
                        "sell_day": 20,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 885,
                        "supplier": "中国阿里巴巴10",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf10",
                        "is_new": "否",
                        "qty": "350",
                        "price_with_tax": "32133.2300",
                        "amount_with_tax": "3213323.0000",
                        "sell_day": 21,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 886,
                        "supplier": "中国阿里巴巴11",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf11",
                        "is_new": "否",
                        "qty": "351",
                        "price_with_tax": "32134.2300",
                        "amount_with_tax": "3213423.0000",
                        "sell_day": 22,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 887,
                        "supplier": "中国阿里巴巴12",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf12",
                        "is_new": "否",
                        "qty": "352",
                        "price_with_tax": "32135.2300",
                        "amount_with_tax": "3213523.0000",
                        "sell_day": 23,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 888,
                        "supplier": "中国阿里巴巴13",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf13",
                        "is_new": "否",
                        "qty": "353",
                        "price_with_tax": "32136.2300",
                        "amount_with_tax": "3213623.0000",
                        "sell_day": 24,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 889,
                        "supplier": "中国阿里巴巴14",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf14",
                        "is_new": "否",
                        "qty": "354",
                        "price_with_tax": "32137.2300",
                        "amount_with_tax": "3213723.0000",
                        "sell_day": 25,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 890,
                        "supplier": "中国阿里巴巴15",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf15",
                        "is_new": "否",
                        "qty": "355",
                        "price_with_tax": "32138.2300",
                        "amount_with_tax": "3213823.0000",
                        "sell_day": 26,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 891,
                        "supplier": "中国阿里巴巴16",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf16",
                        "is_new": "否",
                        "qty": "356",
                        "price_with_tax": "32139.2300",
                        "amount_with_tax": "3213923.0000",
                        "sell_day": 27,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 892,
                        "supplier": "中国阿里巴巴17",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf17",
                        "is_new": "否",
                        "qty": "357",
                        "price_with_tax": "32140.2300",
                        "amount_with_tax": "3214023.0000",
                        "sell_day": 28,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 893,
                        "supplier": "中国阿里巴巴18",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf18",
                        "is_new": "否",
                        "qty": "358",
                        "price_with_tax": "32141.2300",
                        "amount_with_tax": "3214123.0000",
                        "sell_day": 29,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 894,
                        "supplier": "中国阿里巴巴19",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf19",
                        "is_new": "否",
                        "qty": "359",
                        "price_with_tax": "32142.2300",
                        "amount_with_tax": "3214223.0000",
                        "sell_day": 30,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 895,
                        "supplier": "中国阿里巴巴20",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf20",
                        "is_new": "否",
                        "qty": "360",
                        "price_with_tax": "32143.2300",
                        "amount_with_tax": "3214323.0000",
                        "sell_day": 31,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 896,
                        "supplier": "中国阿里巴巴21",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf21",
                        "is_new": "否",
                        "qty": "361",
                        "price_with_tax": "32144.2300",
                        "amount_with_tax": "3214423.0000",
                        "sell_day": 32,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 897,
                        "supplier": "中国阿里巴巴22",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf22",
                        "is_new": "否",
                        "qty": "362",
                        "price_with_tax": "32145.2300",
                        "amount_with_tax": "3214523.0000",
                        "sell_day": 33,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 898,
                        "supplier": "中国阿里巴巴23",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf23",
                        "is_new": "否",
                        "qty": "363",
                        "price_with_tax": "32146.2300",
                        "amount_with_tax": "3214623.0000",
                        "sell_day": 34,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 899,
                        "supplier": "中国阿里巴巴24",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf24",
                        "is_new": "否",
                        "qty": "364",
                        "price_with_tax": "32147.2300",
                        "amount_with_tax": "3214723.0000",
                        "sell_day": 35,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    },
                    {
                        "id": 900,
                        "supplier": "中国阿里巴巴25",
                        "sku": "fadfasdfasdfasdf",
                        "model": "413",
                        "title": "dsfasdfasdffasdfasdfasdf25",
                        "is_new": "否",
                        "qty": "365",
                        "price_with_tax": "32148.2300",
                        "amount_with_tax": "3214823.0000",
                        "sell_day": 36,
                        "qty_within_30": 0,
                        "inventory": 0,
                        "coming_inventory": 0,
                        "gross_profit_rate": 0,
                        "return_rate": 0,
                        "memo": "#N/A",
                        "create_time": "2020-11-04 17:33:04",
                        "purchaser": "万伟斌"
                    }
                ]
            }
        },
        computed: {
            disableSubmit () {
                return this.selectedSkuItemArray.length === 0
            }
        },
        mounted () {
            this.getUserInfo()
        },
        methods: {
            updateHeader () {
                this.uploadHeader = { "Authorization": "Bearer " + getSessionStore(config.ACCESS_TOKEN) }
            },
            submitFlowBtn () {
                console.log('submitFlow')
                if (this.selectedSkuItemArray.length === 0) {
                    this.$Message.warning('请选择SKU')
                    return false
                }
                this.confirmModal.show = true
            },
            submitFlow () {
                this.confirmModal.loading = true
                postCreatFlow({ sku: this.selectedSkuItemArray }).then((res) => {
                    console.log(res)
                    this.confirmModal.loading = false
                    this.confirmModal.show = false
                    this.$Message.success("创建成功")
                    this.selectedSkuItemArray = []
                    this.tableArr = []
                    this.showTable = false

                })
            },
            onExceedSize () {
                this.$Message.warning('上传文件大小最大10M')
            },
            uploadError (error, file, fileList) {
                this.$Message.error(file.msg)
                console.log(error)
                console.log(file)
                console.log(fileList)
            },
            afterUpload (response, file, fileList) {
                this.showTable = true
                this.tableLoading = true
                setTimeout(() => this.tableLoading = false, 1000)
                this.tableArr = response.data
                console.log(response)
                console.log(file)
                console.log(fileList)
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
                        const accessToken = response.data.access_token
                        setSessionStore(config.ACCESS_TOKEN, accessToken)
                    })
                }
            },
            downloadTemplate () {
                window.open(config.apiUrl + "/media/毛利不达标需特批-样表.xlsx", '_blank')
            },
            selectAllCaption (status) {
                console.log(status)
                this.selectAllTitle = this.selectAllCaptionChoice[Number(!status)]
            },
            handleSelectAll () {
                this.$refs.skuTable.selectAll()
            },
            onSelectSkuItem (skuArr) {
                console.log(skuArr)
                this.selectedSkuItemArray = skuArr
            }
        }
    }
</script>

<style scoped>

</style>
