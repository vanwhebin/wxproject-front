<template>
    <div>
        <van-nav-bar :title="curObject.name"></van-nav-bar>
        <ApplyForm :formData="form"></ApplyForm>
    </div>
</template>

<script>
    import { login } from '@/api/api'
    import config from '@/config'
    import { upload, postCreatProject } from '@/api/api'
    import { Form, Button, Field, NavBar, Uploader, Toast, Dialog, Checkbox, CheckboxGroup } from 'vant'
    import ApplyForm from './module/ApplyForm'
    // import { setUserToken } from '@/utils/util'
    import { setSessionStore } from '@/utils/storage'

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
                    creator: {},
                    model_type: '',
                    context_analysis: '',
                    attachments: [],
                    market_share_analysis: ''
                }

            }
        },
        mounted () {
            this.getUserInfo()
        },
        methods: {
            getUserInfo () {
                let code, state
                const strRes = /code=.+/.exec(window.location.search)
                if (strRes) {
                    // const codeStr = (strRes[0].substr(5))
                    // const symbolLocation = codeStr.indexOf('&')
                    // code = symbolLocation !== -1 ? codeStr.substr(0, symbolLocation) : codeStr
                    const codeStrArr = strRes[0].split('&')
                    code = codeStrArr[0].split('=')[1]
                    state = codeStrArr[1].split('=')[1]

                    login({ code: code, state: state }).then(response => {
                        console.log(response)
                        const accessToken = response.data.access_token
                        setSessionStore(config.ACCESS_TOKEN, accessToken)
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
