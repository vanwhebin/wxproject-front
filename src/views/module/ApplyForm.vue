<template>
    <div>
        <div style="margin-top:20px">
            <van-steps :active="active" :active-color="activeColor" :active-icon="activeIcon">
                <van-step v-for="item in stepList">{{item}}</van-step>
            </van-steps>
            <van-form @submit="onSubmit" class="form">
                <van-field
                        v-if="auditNow"
                        :value="formData.creator_name"
                        label="创建人">
                </van-field>
                <van-field
                        v-if="auditNow"
                        :value="formData.create_time"
                        label="创建时间">
                </van-field>
                <div class="field-label"><span class="field-label-require">*</span>产品细分类目</div>
                <van-field
                        placeholder="请填写产品细分类目"
                        v-model="form.category"
                        name="category"
                        :rules="[{ required: true }]">
                </van-field>
                <div class="field-label"><span class="field-label-require">*</span>产品型号</div>
                <van-field
                        placeholder="请填写产品型号"
                        v-model="form.model_type"
                        name="model_type"
                        :rules="[{ required: true }]">
                </van-field>
                <div class="field-label"><span class="field-label-require">*</span>市场大盘容量及市占分析</div>
                <van-field
                        placeholder="请填写容量及市占分析"
                        v-model="form.market_share_analysis"
                        rows="3"
                        name="market_share_analysis"
                        autosize
                        type="textarea"
                        :rules="[{ required: true }]">>
                </van-field>
                <div class="field-label"><span class="field-label-require">*</span>产品主要参数和配置</div>
                <van-field
                        placeholder="请描述该产品主要参数和配置"
                        v-model="form.context_analysis"
                        rows="3"
                        name="context_analysis"
                        autosize
                        type="textarea"
                        :rules="[{ required: true }]">>
                </van-field>
                <van-uploader
                        v-show="!auditNow"
                        v-model="uploadFileList"
                        style="padding:15px;width:100%"
                        :accept="acceptType"
                        :max-count="5"
                        :max-size="maxSize"
                        :after-read="uploadFile"
                        :before-read="showReading"
                        @oversize="onOversize">
                    <van-button icon="upgrade" type="primary">上传文件</van-button>
                </van-uploader>

                <div style="text-align: center;margin-top:20px;font-size: 14px;cursor:pointer;margin-bottom: 20px"
                    v-for="(i, k) in formData.attachments" @click="downloadFile(i)"
                    :key="k">
                    <van-icon name="newspaper-o"
                              size="15px"
                              v-show="auditNow"
                              :key="k"
                              >附件{{ k + 1 }}
                    </van-icon>
                </div>

                <div style="margin: 16px;" v-show="!auditNow">
                    <van-button round block type="info" native-type="submit" style="width: 100%;" :disabled="submitDisable">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    import { upload, postCreatProject } from '@/api/api'
    import { Form, Button, Field, Uploader, Toast, Dialog, Checkbox, CheckboxGroup, Icon, Steps, Step } from 'vant'

    export default {
        name: "ApplyForm",
        components: {
            [Form.name]: Form,
            [Button.name]: Button,
            [Field.name]: Field,
            [Uploader.name]: Uploader,
            [Steps.name]: Steps,
            [Step.name]: Step,
            [Toast.name]: Toast,
            [Icon.name]: Icon,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [Dialog.name]: Dialog,
        },
        props: {
          formData: {
              type: Object,
              default: {}
          }
        },
        data () {
            return {
                // active: 0,
                curObject: {
                    name: '发起立项流程'
                },
                maxSize: 10 * 1024 * 1024,
                acceptType: "image/*,.doc,.docx,.pdf,.ppt,.xlsx,.xls",
                auditor: ['1', '2'],
                uploadFileList: [],
                submitDisable: false,
                form: {
                    category: '',
                    model_type: '',
                    context_analysis: '',
                    attachments: [],
                    create_time: '',
                    market_share_analysis: ''
                },
                stepList: [
                    '提交申请',
                    '流程审批',
                    '审批结果',
                ],
                activeColor: '#07c160',
                activeIcon: 'checked'
            }
        },
        mounted () {
            console.log(this.formData)
            if (this.formData.id) {
                this.stepList = ['提交申请']
                this.formData.attachments =  typeof this.formData.attachments === 'string' ?
                    JSON.parse(this.formData.attachments) : []
                this.form = this.formData
                let result = this.formData.result
                for (let i = 0; i < result.length; i++) {
                    this.stepList.push(`审批（${result[i].auditor}）`)
                    if (result[i].is_accept === 'reject') {
                        this.stepList.push('立项申请不通过')
                        this.activeColor = "#C12021"
                        this.activeIcon = "clear"
                        return true
                    }
                }

                if (this.formData.is_done) {
                    this.stepList.push("立项申请通过")
                } else {
                    this.stepList.push("审批结果")
                }



                // if (this.formData.is_pass) {
                //     this.active = this.stepList.length - 1
                // } else {
                //     if (this.formData.is_done === true) {
                //         // 流程已结束 则表明审批不通过
                //         this.stepList = [
                //             '提交申请',
                //         ]
                //     } else {
                //         // 流程未结束 审批未进行
                //     }
                // }
            }
        },
        computed: {
            auditNow () {
                return Boolean(this.formData.id)
            },
            active () {
                if (this.formData.id) {
                    const result = this.formData.result
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].is_accept === 'reject') {
                            return (this.stepList.length - 1)
                        }

                        if (result[i].is_accept === null) {
                            return (i + 1)
                        }
                    }

                    return (this.stepList.length - 1)
                } else {
                    return 0
                }


                // if (this.formData.is_pass === true) {
                //     // 审批通过 流程结束
                //     return 3
                // } else {
                //     // 审批通过未知 null False
                //     if (this.formData.is_done === true) {
                //         // 流程已结束 则表明审批不通过
                //         this.stepList = [
                //             '提交申请',
                //         ]
                //     } else {
                //         // 流程未结束 审批未进行
                //     }
                // }

                // if (!this.formData.id) {
                //     return 0
                // } else if (this.formData.cur_auditor === '邓望明') {
                //     return 1
                // } else if (this.formData.cur_auditor === '杜波') {
                //     return 2
                // } else {
                //     return 3
                // }
            }
        },
        methods: {
            onSubmit (values) {

                Toast.loading('正在执行，请稍侯...')
                console.log('submit', values)
                console.log('submit', this.form)
                if (this.uploadFileList.length > 0) {
                    // Toast.fail('请上传附件')
                    // return false
                    this.uploadFileList.forEach((item) => {
                        this.form.attachments.push(item.file.url)
                        return item
                    })
                }


                values.attachments = JSON.stringify(this.form.attachments)
                postCreatProject(values).then((res) => {
                    console.log(res)
                    Dialog.alert({
                        message: '流程创建成功',
                    }).then(() => {
                        this.resetForm()
                    }).catch(err => {
                        console.log(err)
                        Toast.fail('创建出错，请稍候再试')
                    })
                })
            },
            resetForm () {
                this.form.category = ""
                this.form.model_type = ""
                this.form.context_analysis = ""
                this.form.market_share_analysis = ""
                this.form.attachments = []
                this.uploadFileList = []
            },
            onOversize(file) {
                console.log(file);
                Toast('文件大小不能超过 10M')
            },
            uploadFile (file) {
                console.log(file)
                var data = new FormData()
                data.append('file', file.file)
                upload(data).then((res) => {
                    console.log(res)
                    if (res.msg !== 'ok') {
                        Toast.fail(res.msg)
                        return false
                    }
                    let el = this.uploadFileList.pop()
                    el.file.url = res.data.file
                    this.uploadFileList.push(el)
                    Toast.success('上传成功')
                    // setTimeout(Toast.clear(), 1000)
                    console.log(this.uploadFileList)
                }).catch(err => {
                    console.log(err)
                    Toast.clear()
                    Toast.fail(err.msg)
                })
                this.submitDisable = false
            },
            downloadFile (file) {
                console.log(file)
                window.open(file)
            },
            showReading () {
                this.submitDisable = true
                Toast.loading({
                    message: '上传中...',
                    forbidClick: true,
                    duration: 10000
                })
                return true
            }
        }
    }
</script>

<style scoped>
    .form {
        margin: 10px;
        border: #0000004f solid 1px;
        border-radius: 5px;
    }
    .field-label {
        margin-top:10px;
        font-size: 14px;
        line-height: 24px;
        color: #646566;
        padding-left: 19px;
    }

    .field-label-require {
        color: red
    }
    .van-cell::after {
        border-bottom: 1px solid #c2c3c5 !important;
    }
    .van-field__body {
        border: #00000021 solid 1px !important;
        border-radius: 5px !important;
    }
</style>
