<template>
    <div>
        <Drawer
                title="编辑SKU信息"
                v-model="showDrawer"
                width="720"
                :closable="false"
                :mask-closable="false"
                :styles="styles"
        >
            <Form :model="formData" :rules="rule" ref="skuForm">
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="供应商" label-position="top" prop="supplier">
                            <label>
                                <Input v-model="formData.supplier" placeholder="" />
                            </label>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="SKU" label-position="top" prop="sku">
                            <label>
                                <Input v-model="formData.sku" placeholder="" />
                            </label>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="型号" label-position="top" prop="model">
                            <label>
                                <Input v-model="formData.model" placeholder="" />
                            </label>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="名称" label-position="top" prop="title">
                            <label>
                                <Input v-model="formData.title" placeholder="" />
                            </label>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="采购" label-position="top" prop="purchaser">
                            <label>
                                <Input v-model="formData.purchaser" placeholder="" />
                            </label>
                        </FormItem>
                    </Col>

                    <Col span="12">
                        <FormItem label="需求单数量" label-position="top" prop="qty">
                            <label>
                                <InputNumber :max="1000000" :min="1" v-model="formData.qty" style="width:100%"></InputNumber>
                            </label>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="含税单价" label-position="top" prop="price_with_tax">
                            <label>
                                <InputNumber
                                        style="width:100%"
                                        :max="10000"
                                        v-model="formData.price_with_tax"
                                        :formatter="value => `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                        :parser="value => value.replace(/\$\s?|(,*)/g, '')"></InputNumber>
                            </label>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="含税金额" label-position="top" prop="amount_with_tax">
                            <label>
                                <InputNumber
                                        style="width:100%"
                                        :max="10000"
                                        v-model="formData.amount_with_tax"
                                        :formatter="value => `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                        :parser="value => value.replace(/\$\s?|(,*)/g, '')"></InputNumber>
                            </label>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="可售天数" label-position="top" prop="sell_day">
                            <InputNumber :max="1000" :min="0" v-model="formData.sell_day" style="width:100%"></InputNumber>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="30天销量" label-position="top" prop="qty_within_30">
                            <InputNumber :max="1000000" :min="0" v-model="formData.qty_within_30" style="width:100%"></InputNumber>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="库存" label-position="top" prop="inventory">
                            <InputNumber :max="1000000" :min="0" v-model="formData.inventory" style="width:100%"></InputNumber>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="采购在途" label-position="top" prop="coming_inventory">
                            <InputNumber :max="1000000" :min="0" v-model="formData.coming_inventory" style="width:100%"></InputNumber>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="8">
                        <FormItem label="毛利率" label-position="top" prop="gross_profit_rate">
                            <InputNumber
                                style="width:100%"
                                :max="100"
                                v-model="formData.gross_profit_rate"
                                :formatter="value => `${value}%`"
                                :parser="value => value.replace('%', '')">
                            </InputNumber>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="客退率" label-position="top" prop="return_rate">
                            <InputNumber
                                    style="width:100%"
                                    :max="100"
                                    v-model="formData.return_rate"
                                    :formatter="value => `${value}%`"
                                    :parser="value => value.replace('%', '')">
                            </InputNumber>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="是否新品" label-position="top" prop="is_new">
                            <label>
                                <RadioGroup v-model="formData.is_new" style="width:100%" type="button">
                                    <Radio label="是">是</Radio>
                                    <Radio label="否">否</Radio>
                                </RadioGroup>
                            </label>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="备注" label-position="top" prop="memo">
                    <label>
                        <Input type="textarea" v-model="formData.memo" :rows="4" placeholder="简要描述" />
                    </label>
                </FormItem>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="toggle">取消</Button>
                <Button type="primary" @click="handleSubmit">提交</Button>
            </div>
        </Drawer>
    </div>
</template>
<script>
    export default {
        name: "InfoDrawer",
        props: {
            showDrawer: {
                type: Boolean,
                require: false,
                default: false
            },
            formData: {
                type: Object,
                require: true,
                default: {}
            }
        },
        data () {
            return {
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                form: {
                    "id": null,
                    "supplier": "",
                    "sku": "",
                    "model": "",
                    "title": "",
                    "is_new": "",
                    "qty": 0,
                    "price_with_tax": 0,
                    "amount_with_tax": 0,
                    "sell_day": 12,
                    "qty_within_30": 0,
                    "inventory": 0,
                    "coming_inventory": 0,
                    "gross_profit_rate": 0.0,
                    "return_rate": 0.0,
                    "memo": "",
                    "create_time": null,
                    "purchaser": ""
                },
                rule: {
                    supplier: [{ required: true, message: '请提供供应商名称' }],
                    sku: [{ required: true, message: '请提供SKU' }],
                    model: [{ required: true, message: '请提供SKU型号' }],
                    title: [{ required: true, message: '请提供SKU名称' }],
                    is_new: [{ required: true, message: '请确认是否为新品' }],
                    qty: [{ required: true, message: '请提供需求单数量' }],
                    price_with_tax: [{ required: true, message: '请提供含税单价' }],
                    amount_with_tax: [{ required: true, message: '请提供含税总金额' }],
                    sell_day: [{ required: true, message: '请提供可售天数' }],
                    qty_within_30: [{ required: true, message: '请提供30天销量' }],
                    inventory: [{ required: true, message: '请提供库存' }],
                    coming_inventory: [{ required: true, message: '请提供采购在途' }],
                    gross_profit_rate: [{ required: true, message: '请提供毛利率' }],
                    return_rate: [{ required: true, message: '请提供客退率' }],
                    memo: [{ required: true, message: '请提供备注' }],
                    purchaser: [{ required: true, message: '请提供采购名称' }],
                }
            }
        },
        methods: {
            toggle () {
                this.$emit('toggleDrawer')
            },
            handleSubmit () {
                console.log(this.formData)
                this.$refs['skuForm'].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        this.$emit('submit', this.formData)
                    } else {
                        this.$Message.error('表单验证失败');
                    }
                })
            },
            resetForm () {
                this.$refs.skuForm.resetFields()
            }
        }
    }
</script>
<style>
    .demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
</style>
