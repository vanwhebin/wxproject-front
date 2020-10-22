<template>
    <div>
        <div style="margin-top:20px">
            <van-steps :active="active" :active-color="activeColor" :active-icon="activeIcon">
                <van-step v-for="item in stepList">{{item}}</van-step>
            </van-steps>
            <van-field
                :readonly="Boolean(rejectReason)"
                label="驳回意见: "
                v-show="rejectReason"
                :value="rejectReason"
                type="textarea"
                row="2"
                autosize></van-field>
            <van-form @submit="onSubmit" class="form">
                <van-field
                        :readonly="auditNow"
                        v-if="auditNow"
                        :value="formData.creator_name"
                        label="创建人">
                </van-field>
                <van-field
                        :readonly="auditNow"
                        v-if="auditNow"
                        :value="formData.create_time"
                        label="创建时间">
                </van-field>
                <div class="field-label"><span class="field-label-require">*</span>产品细分类目</div>
                <van-field
                        :readonly="auditNow"
                        placeholder="请填写产品细分类目"
                        v-model="form.category"
                        name="category"
                        :rules="[{ required: true }]">
                </van-field>
                <div class="field-label"><span class="field-label-require">*</span>市场容量</div>
                <van-field
                    :readonly="auditNow"
                    placeholder="请填写产品型号"
                    v-model="form.type"
                    name="type">
                    <div slot="input">
                        <van-radio-group v-model="form.type" direction="horizontal">
                            <van-radio name="1">小于300万美金</van-radio>
                            <van-radio name="2">大于等于300万美金</van-radio>
                        </van-radio-group>
                    </div>
                </van-field>

                <div class="field-label"><span class="field-label-require">*</span>产品型号</div>
                <van-field
                        :readonly="auditNow"
                        placeholder="请填写产品型号"
                        v-model="form.model_type"
                        name="model_type"
                        :rules="[{ required: true }]">
                </van-field>
                <div class="field-label"><span class="field-label-require">*</span>市场大盘容量及市占分析</div>
                <van-field
                        :readonly="auditNow"
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
                        :readonly="auditNow"
                        placeholder="请描述该产品主要参数和配置"
                        v-model="form.context_analysis"
                        rows="3"
                        name="context_analysis"
                        autosize
                        type="textarea"
                        :rules="[{ required: true }]">>
                </van-field>
                <div class="field-label"><span class="field-label-require">*</span>首单数量</div>
                <van-field
                        :readonly="auditNow"
                        type="digit"
                        placeholder="请填写首单数量"
                        v-model="form.first_orders"
                        name="first_orders"
                        :rules="[{ required: true }]">
                </van-field>
                <div class="field-label"><span class="field-label-require">*</span>月销量预测</div>
                <van-field
                        :readonly="auditNow"
                        placeholder="请简要描述该产品月销量预测"
                        v-model="form.orders_estimate"
                        rows="3"
                        name="orders_estimate"
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
                    v-for="(i, k) in formData.attachments" @click="downloadFile(i.url)"
                    :key="k">
                    <van-icon name="newspaper-o"
                              size="15px"
                              v-show="auditNow"
                              :key="k"
                              >{{ i.name }}
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
    import { RadioGroup, Radio, Form, Button, Field, Uploader, Toast, Dialog, Checkbox, CheckboxGroup, Icon, Steps, Step } from 'vant'

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
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
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
                    type: '',
                    first_orders: '',
                    orders_estimate: '',
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
                rejectReason: "",
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
                        this.rejectReason = result[i].memo
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
                            this.activeColor = '#468EFF'
                            this.activeIcon = 'clock'
                            return (i + 1)
                        }
                    }

                    return (this.stepList.length - 1)
                } else {
                    return 0
                }
            }
        },
        methods: {
            onSubmit (values) {

                Toast.loading('正在执行，请稍侯...')
                console.log('submit', values)
                console.log('submit', this.form)
                if (this.uploadFileList.length > 0) {
                    this.uploadFileList.forEach((item) => {
                        this.form.attachments.push({name: item.file.name, url: item.file.url})
                        return item
                    })
                } else {
                    Toast.fail('请上传ROI分析文件')
                    return false
                }

                if (!values.type) {
                    Toast.fail('请选择市场容量')
                    return false
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
                this.form.type = ""
                this.form.first_orders = ""
                this.form.orders_estimate = ""
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
</style>
