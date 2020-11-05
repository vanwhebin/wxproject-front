<template>
    <Table border
           @on-select="onSelect"
           @on-select-cancel="onSelect"
           @on-select-all="onSelect"
           @on-select-all-cancel="onSelect"
           ref="selection"
           :columns="columns"
           :data="data"
           :loading="loading"
           style="min-height:500px"></Table>
</template>
<script>
    export default {
        name: "SkuTable",
        props:{
            data: {
                type: Array,
                default: [],
                require: true
            },
            loading: {
                type: Boolean,
                default: false,
                require: false
            }
        },
        data () {
            return {
                status: false,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '供应商',
                        key: 'supplier',
                        align: 'center'
                    },
                    {
                        title: 'SKU',
                        key: 'sku',
                        align: 'center'
                    },
                    {
                        title: '型号',
                        key: 'model',
                        align: 'center'
                    },
                    {
                        title: 'SKU名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '是否新品',
                        key: 'is_new',
                        align: 'center'
                    },
                    {
                        title: '需求单数量',
                        key: 'qty',
                        align: 'center'
                    },
                    {
                        title: '含税单价',
                        key: 'price_with_tax',
                        align: 'center'
                    },
                    {
                        title: '含税金额',
                        key: 'amount_with_tax',
                        align: 'center'
                    },
                    {
                        title: '可售天数',
                        key: 'sell_day',
                        align: 'center'
                    },
                    {
                        title: '30天销量',
                        key: 'qty_within_30',
                        align: 'center'
                    },
                    {
                        title: '库存',
                        key: 'inventory',
                        align: 'center'
                    },
                    {
                        title: '采购在途',
                        key: 'coming_inventory',
                        align: 'center'
                    },
                    {
                        title: '毛利率',
                        key: 'gross_profit_rate',
                        align: 'center'
                    },
                    {
                        title: '客退率',
                        key: 'return_rate',
                        align: 'center'
                    },
                    {
                        title: '备注',
                        key: 'memo',
                        align: 'center'
                    },
                    {
                        title: '采购',
                        key: 'purchaser',
                        align: 'center'
                    }
                ],
                selected: []
            }
        },
        methods: {
            selectAll () {
                this.status = !this.status
                this.$refs.selection.selectAll(this.status)
                this.$emit('selectAllCaption', this.status)
            },
            onSelect (selection, row) {
                console.log('onSelect')
                console.log(selection)
                console.log(row)
                this.selected = []
                selection.forEach((item) => {
                    this.selected.push(item.id)
                })
                this.$emit('onSelect', this.selected)
            }
        }
    }
</script>
