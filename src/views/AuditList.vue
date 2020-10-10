<template>
    <div>
        <van-nav-bar :title="curObject.name"></van-nav-bar>
        <van-skeleton title :row="15" :loading="loading" class="skeleton">
            <div>
                <van-cell-group>
                    <van-cell
                        icon="records"
                        :title="item.model_type"
                        :label="item.creator.username"
                        :key="key" v-for="(item, key) in projects"
                        @click="goCheck(item)"
                        is-link>
                        <van-tag type="success" v-if="item.result">已完成</van-tag>
                        <van-tag type="warning" v-else>未审批</van-tag>
                    </van-cell>
                </van-cell-group>
            </div>
        </van-skeleton>
        <van-pagination
            style="position:absolute;bottom: 10px;margin:auto;width: 100%;"
            @change="getData"
            v-model="pagination.page"
            :total-items="pagination.total"
            :items-per-page="pagination.num">
        </van-pagination>
    </div>
</template>

<script>
    import { getProjects } from '@/api/api'
    import { Cell, CellGroup, Skeleton, Toast, Button, NavBar, Pagination, Tag }  from 'vant'
    export default {
        name: "AuditList",
        components: {
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
            this.getData()
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
            change (num) {
                console.log(num)
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
