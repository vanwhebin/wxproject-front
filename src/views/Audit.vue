<template>
    <div>
        <van-nav-bar :title="curObject.name" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <van-skeleton title :row="15" :loading="loading" class="skeleton">
            <ApplyForm :formData="formData"></ApplyForm>
        </van-skeleton>
        <div class="action">
            <van-button type="primary" >同意</van-button>
            <van-button type="info"  style="margin-left:25px">否决</van-button>
        </div>
    </div>
</template>

<script>
    import { getProject } from '@/api/api'
    import ApplyForm from './module/ApplyForm'
    import { Button, NavBar, Toast, Dialog, Skeleton } from 'vant'
    export default {
        name: "Audit",
        components: {
            ApplyForm,
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [Skeleton.name]: Skeleton,
            [Dialog.name]: Dialog,
            [Toast.name]: Toast,
        },
        mounted () {
            const params = this.$route.params
            console.log(params)
            if (params.projectID !== undefined) {
                this.getProject(params.projectID)
            } else {
                Dialog.alert({
                    message: '项目链接错误',
                }).then(() => {
                    this.$router.push({name: "audit-list"})
                });
            }
        },
        data () {
            return {
                curObject: {
                    name: "审批立项申请"
                },
                loading: true,
                formData: {}
            }
        },
        methods: {
            getProject (projectID) {
                getProject(projectID).then((res) => {
                    console.log(res)
                    this.formData = res.data
                    this.loading = false
                })
            },
            onClickLeft () {
                this.$router.push({name: "audit-list"})
            }
        }
    }
</script>

<style scoped>
    .action {
        text-align: center;
        margin-top: 20px;
    }
</style>
