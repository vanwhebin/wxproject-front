<template>
    <div>
        <div style="margin-top:20px">

            <van-form @submit="onSubmit">
                <van-field
                        v-show="auditNow"
                        :value="formData.creator.username"
                        label="创建人">
                </van-field>
                <van-field
                        v-show="auditNow"
                        :value="formData.create_time"
                        label="创建时间">
                </van-field>
                <van-field
                        v-model="form.category"
                        name="category"
                        label="产品细分类目"
                        :rules="[{ required: true, message: '请填写产品细分类目' }]">
                </van-field>
                <van-field
                        v-model="form.model_type"
                        name="model_type"
                        label="产品型号"
                        :rules="[{ required: true, message: '请填写产品型号' }]">
                </van-field>
                <van-field
                        v-model="form.market_share_analysis"
                        rows="5"
                        name="market_share_analysis"
                        autosize
                        label="市场大盘容量及市占分析"
                        type="textarea"
                        :rules="[{ required: true, message: '请填写容量及市占分析' }]">>
                </van-field>
                <van-field
                        v-model="form.context_analysis"
                        rows="5"
                        name="context_analysis"
                        autosize
                        label="场景分析"
                        type="textarea"
                        :rules="[{ required: true, message: '请简要描述该产品场景分析' }]">>
                </van-field>

                <van-checkbox-group
                    v-show="!auditNow"
                    direction="horizontal"
                    disabled style="padding:15px;width:100%;"
                    v-model="auditor">
                    <span style="margin-right:10px;font-size: 14px;color:#646566">审批 </span>
                    <van-checkbox name="1">邓望明</van-checkbox>
                    <van-checkbox name="2">杜波</van-checkbox>
                </van-checkbox-group>

                <div class="van-hairline--bottom" v-show="!auditNow"></div>

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

                <div style="text-align: center;margin-top:20px;font-size: 14px;cursor:pointer"
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
    import { Form, Button, Field, Uploader, Toast, Dialog, Checkbox, CheckboxGroup, Icon } from 'vant'

    export default {
        name: "ApplyForm",
        components: {
            [Form.name]: Form,
            [Button.name]: Button,
            [Field.name]: Field,
            [Uploader.name]: Uploader,
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
        mounted () {
          if (this.formData) {
              this.formData.attachments =  typeof this.formData.attachments === 'string' ?
                  JSON.parse(this.formData.attachments) : []
              this.form = this.formData
          }
        },
        data () {
            return {
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
                    market_share_analysis: ''
                }

            }
        },
        computed: {
            auditNow () {
                return Boolean(this.formData.id)
            }
        },
        methods: {
            onSubmit (values) {
                if (this.uploadFileList.length === 0) {
                    Toast.fail('请上传附件')
                    return false
                }
                console.log('submit', values)
                console.log('submit', this.form)

                this.uploadFileList.forEach((item) => {
                    this.form.attachments.push(item.file.url)
                    return item
                })

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

</style>
