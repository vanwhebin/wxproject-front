<template>
    <div>
        <van-nav-bar :title="curObject.name" left-text="返回" left-arrow @click-left="onClickLeft" v-show="ownRight"></van-nav-bar>
        <van-skeleton title :row="15" :loading="loading" class="skeleton">
            <ApplyForm :formData="formData"></ApplyForm>
            <div class="action">
                <div v-if="!toggleReject">
                    <div v-show="ownRight">
                        <van-button type="primary" @click="pass"> 同意</van-button>
                        <van-button type="info"  style="margin-left:35px" @click="toggleReject=true">否决</van-button>
                    </div>
                </div>
                <div v-else>
                    <van-field
                            v-model="memo"
                            rows="3"
                            name="memo"
                            autosize
                            :autofocus="true"
                            label="否决意见"
                            type="textarea"
                            placeholder="请填写否决意见">
                    </van-field>

                    <div class="van-hairline--bottom" style="margin-bottom:20px"></div>

                    <van-button type="primary" @click="toggleReject=false"> 取消</van-button>
                    <van-button type="info"  style="margin-left:35px" @click="reject">确认</van-button>
                </div>
            </div>
        </van-skeleton>
    </div>
</template>

<script>
    import { getProject, auditProject, auditRight, login } from '@/api/api'
    import config from '@/config'
    import ApplyForm from './module/ApplyForm'
    import { Button, NavBar, Toast, Dialog, Skeleton, Field } from 'vant'
    import { setSessionStore, getSessionStore } from '@/utils/storage'
    export default {
        name: "Audit",
        components: {
            ApplyForm,
            [NavBar.name]: NavBar,
            [Field.name]: Field,
            [Button.name]: Button,
            [Skeleton.name]: Skeleton,
            [Dialog.name]: Dialog,
            [Toast.name]: Toast,
        },
        data () {
            return {
                toggleReject: false,
                ownRight: false,
                memo: "",
                curObject: { name: "审批立项申请" },
                loading: true,
                projectID: 0,
                formData: {}
            }
        },
        mounted () {
            const params = this.$route.params
            console.log(params)
            if (params.projectID !== undefined) {
                this.projectID = params.projectID
                if (!getSessionStore(config.ACCESS_TOKEN)) {
                    this.getUserInfo()
                } else {
                    this.getProject(this.projectID)
                }
            } else {
                Dialog.alert({
                    message: '项目链接错误',
                }).then(() => {
                    this.$router.push({name: "audit-list"})
                });
            }
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
                        setSessionStore(config.ACCESS_TOKEN, accessToken)
                        this.getProject(this.projectID)
                    })
                }
            },
            getProject (projectID) {
                getProject(projectID).then((res) => {
                    console.log(res)
                    auditRight(projectID).then((res) => {
                        if (res.data) {
                            this.ownRight = true
                        }
                    })
                    this.formData = res.data
                    setTimeout(() => {
                        this.loading = false
                    }, 500)

                })
            },
            onClickLeft () {
                this.$router.push({name: "audit-list"})
            },
            pass () {
                Dialog.confirm({
                    title: '同意该产品立项',
                    message: '',
                })
                    .then(() => {
                        // on confirm
                        this.handleAudit(true)
                    })
                    .catch(() => {
                        // on cancel
                        return false
                    });
            },
            reject () {
                if (!this.memo) {
                    Toast('请填写否决意见')
                    return false
                }
                this.handleAudit(false)
            },
            handleAudit (isAccept) {
                Toast.loading("处理中...")
                const data = { is_accept: isAccept, memo: this.memo }
                auditProject(this.projectID, data)
                    .then((res) => {
                        Toast.clear()
                        Toast.success({
                            message: "审批已完成",
                            onClose: () => {
                                this.$router.push({name: "audit-list"})
                            }
                        })
                    })
                    .catch(err => {
                    this.requestFail(err)
                })
            },
            requestFail (err) {
                console.log(err)
            }
        }
    }
</script>

<style scoped>
    .action {
        text-align: center;
        margin-top: 35px;
    }
</style>
