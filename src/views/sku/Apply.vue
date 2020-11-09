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
                // uploadHeader:
                tableArr: []
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
                this.uploadHeader = Object.assign(this.uploadHeader,{ "Authorization": "Bearer " + getSessionStore(config.ACCESS_TOKEN) })
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
                window.open(config.apiUrl + "/media/sample.xlsx", '_blank')
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
