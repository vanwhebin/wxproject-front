<template>
    <div>
        <van-nav-bar :title="curObject.name"></van-nav-bar>
        <ApplyForm :formData="form"></ApplyForm>
    </div>
</template>

<script>
    import { upload, postCreatProject } from '@/api/api'
    import { Form, Button, Field, NavBar, Uploader, Toast, Dialog, Checkbox, CheckboxGroup } from 'vant'
    import ApplyForm from './module/ApplyForm'

    export default {
        name: "Apply",
        components: {
            [Form.name]: Form,
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [Field.name]: Field,
            [Uploader.name]: Uploader,
            [Toast.name]: Toast,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [Dialog.name]: Dialog,
            ApplyForm
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
