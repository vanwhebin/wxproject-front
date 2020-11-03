<template>
    <Card>
        <Button @click="handleSelectAll(true)">Set all selected</Button>
        <Button @click="handleSelectAll(false)">Cancel all selected</Button>
        <Table border ref="selection" :columns="columns4" :data="data1"></Table>
    </Card>
</template>
<script>
    import { login } from '@/api/api'
    import config from '@/config'
    import { setSessionStore } from '@/utils/storage'
    export default {
        data () {
            return {
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },
        methods: {
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
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
                    })
                }
            }
        }
    }
</script>
