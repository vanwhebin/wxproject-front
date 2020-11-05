<template>
    <div>
        <van-nav-bar :title="curObject.name"></van-nav-bar>
        <van-skeleton title :row="15" :loading="loading" class="skeleton">
            <div v-if="projects" style="margin-bottom: 50px">
                <van-cell-group>
                    <van-cell
                        icon="records"
                        :title="item.model_type"
                        :label="item.creator_name"
                        :key="key" v-for="(item, key) in projects"
                        @click="goCheck(item)"
                        is-link>
                        <van-tag type="success" v-if="item.result">已完成</van-tag>
                        <van-tag type="warning" v-else>未审批</van-tag>
                    </van-cell>
                </van-cell-group>
            </div>
            <div v-else>
                <van-empty description="数据为空"></van-empty>
            </div>
        </van-skeleton>
        <van-pagination
            style="position:fixed;bottom: 5px;width: 100%;"
            @change="getData"
            v-model="pagination.page"
            :total-items="pagination.total"
            :items-per-page="pagination.num">
        </van-pagination>
    </div>
</template>

<script>
    import { getProjects, login } from '@/api/api'
    import config from '@/config'
    import { setSessionStore, getSessionStore } from '@/utils/storage'
    import { Cell, CellGroup, Skeleton, Toast, Button, NavBar, Pagination, Tag, Empty }  from 'vant'
    export default {
        name: "AuditList",
        components: {
            [Empty.name]: Empty,
            [Button.name]: Button,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Tag.name]: Tag,
            [Toast.name]: Toast,
            [NavBar.name]: NavBar,
            [Pagination.name]: Pagination,
            [Skeleton.name]: Skeleton
        },
        mounted () {
            if (!getSessionStore(config.ACCESS_TOKEN)) {
                this.getUserInfo()
            } else {
                this.getData()
            }
        },
        data () {
            return {
                curObject: {
                    name: "立项申请列表"
                },
                pagination: {
                    num: 10,
                    page: 1,
                    total: 0

                },
                projects: [],
                loading: true,
            }
        },
        methods: {
            getData () {
                const params = { num: this.pagination.num, page: this.pagination.page }
                getProjects(params).then((res) => {
                    console.log(res)
                    this.projects = res.results
                    this.pagination.total = res.count
                    setTimeout(() => {
                        this.loading = false
                    }, 500)
                })
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
                        const accessToken = response.data.access_token
                        setSessionStore(config.ACCESS_TOKEN, accessToken)
                        this.getData()
                    })
                }
            },
            goCheck (item) {
                this.$router.push({name: "product-audit", params: { projectID: item.id}})
            }
        }
    }
</script>

<style scoped>
    .skeleton {
        margin-bottom: 10px;
    }
</style>
