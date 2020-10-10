<template>
    <div>
        <van-nav-bar :title="curObject.name"></van-nav-bar>
        <ApplyForm :formData="form"></ApplyForm>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { login } from '@/api/api'
    import { upload, postCreatProject } from '@/api/api'
    import { Form, Button, Field, NavBar, Uploader, Toast, Dialog, Checkbox, CheckboxGroup } from 'vant'
    import ApplyForm from './module/ApplyForm'
    import { setUserToken, getUserAccessToken } from '@/utils/util'

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
            // this.test()
        },
        methods: {
            getUserInfo () {
                let code
                const strRes = /code=.+/.exec(window.location.search)
                if (strRes) {
                    const codeStr = (strRes[0].substr(5))
                    const symbolLocation = codeStr.indexOf('&')
                    code = symbolLocation !== -1 ? codeStr.substr(0, symbolLocation) : codeStr
                    login({ code: code }).then(response => {
                        console.log(response)
                        const accessToken = response.data.access_token
                        const refreshToken = response.data.access_token
                        setUserToken(accessToken, refreshToken)
                        console.log()
                    })
                }
            },
            test () {
                const accessToken = '41234123412'
                const refreshToken = '4123412341234124'
                setUserToken(accessToken, refreshToken)
                console.log(Vue.ls.get('Access-Token'))
                console.log(Vue.ls.get('Refresh-Token'))
                console.log(getUserAccessToken())
            }
        }
    }
</script>

<style scoped>

</style>
