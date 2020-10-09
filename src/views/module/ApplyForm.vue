<template>
    <div>
        <div style="margin-top:20px">

            <van-form @submit="onSubmit">
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
                        style="padding:15px;width:100%"
                        multiple
                        result-type="file"
                        :accept="acceptType"
                        :max-size="maxSize"
                        :after-read="uploadFile"
                        :before-read="showReading"
                        @oversize="onOversize">
                    <van-button icon="plus" type="primary">上传文件</van-button>
                </van-uploader>


                <div style="margin: 16px;" v-show="!auditNow">
                    <van-button round block type="info" native-type="submit" style="width: 100%;">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    import { upload, postCreatProject } from '@/api/api'
    import { Form, Button, Field, Uploader, Toast, Dialog, Checkbox, CheckboxGroup } from 'vant'

    export default {
        name: "ApplyForm",
        components: {
            [Form.name]: Form,
            [Button.name]: Button,
            [Field.name]: Field,
            [Uploader.name]: Uploader,
            [Toast.name]: Toast,
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
                curObject: {
                    name: '发起立项流程'
                },
                maxSize: 10 * 1024 * 1024,
                acceptType: ".doc,.docx, .pdf, .ppt, .jpg, .jpeg, .png",
                auditor: ['1', '2'],
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
                return Boolean(this.formData.category)
            }
        },
        methods: {
            onSubmit (values) {
                console.log('submit', values)
                console.log('submit', this.form)
                values.attachments = JSON.stringify(this.form.attachments)
                postCreatProject(values).then((res) => {
                    console.log(res)
                    Dialog.alert({
                        message: '流程创建成功',
                    }).then(() => {
                        this.resetForm()
                    });
                })
            },
            resetForm () {
                this.form.category = ""
                this.form.model_type = ""
                this.form.context_analysis = ""
                this.form.market_share_analysis = ""
                this.form.attachments = []
            },
            onOversize(file) {
                console.log(file);
                Toast('文件大小不能超过 10M')
            },
            uploadFile (file) {
                var data = new FormData()
                data.append('file', file.file)
                upload(data).then((res) => {
                    console.log(res)
                    this.form.push(res.data.file)
                    Toast.clear()
                })
            },
            showReading () {
                Toast.loading({
                    message: '上传中...',
                    forbidClick: true,
                    duration: 10000
                })
            }
        }
    }
</script>

<style scoped>

</style>
