(function(e){function t(t){for(var o,r,s=t[0],c=t[1],l=t[2],f=0,d=[];f<s.length;f++)r=s[f],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&d.push(n[r][0]),n[r]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);u&&u(t);while(d.length)d.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],o=!0,s=1;s<a.length;s++){var c=a[s];0!==n[c]&&(o=!1)}o&&(i.splice(t--,1),e=r(r.s=a[0]))}return e}var o={},n={app:0},i=[];function r(t){if(o[t])return o[t].exports;var a=o[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=o,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(a,o,function(t){return e[t]}.bind(null,o));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"1cae":function(e,t,a){"use strict";var o=a("215b"),n=a.n(o);n.a},"215b":function(e,t,a){},"42a5":function(e,t,a){},"540f":function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var o=a("2b0e"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},i=[],r={name:"App",components:{}},s=r,c=a("2877"),l=Object(c["a"])(s,n,i,!1,null,null,null),u=l.exports,f=a("8c4f"),d=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("van-nav-bar",{attrs:{title:e.curObject.name}}),a("ApplyForm",{attrs:{formData:e.form}})],1)},p=[],m=(a("c975"),a("b0c0"),a("ac1f"),a("841c"),a("ade3")),h=(a("e17f"),a("2241")),v=(a("a909"),a("3acc")),_=(a("3c32"),a("417e")),g=(a("e7e5"),a("d399")),b=(a("e930"),a("8f80")),O=(a("be7f"),a("565f")),E=(a("66b9"),a("b650")),y=(a("5246"),a("6b41")),T=(a("38d5"),a("772a")),w=(a("99af"),a("d3b7"),a("bc3a")),j=a.n(w),x={token:"token",apiUrl:"http://tk.freebie-queen.com",uploadUrl:"http://tk.freebie-queen.com/api/v1/upload/",version:"/v1",login_page:"/api/login",tokenExpire:{access_token:72e5,refresh_token:864e5},ACCESS_TOKEN:"Access-Token",REFRESH_TOKEN:"Refresh-Token",storageOptions:{namespace:"pro__",name:"ls",storage:"local"}},D=function(e,t){e&&("string"!==typeof t&&(t=JSON.stringify(t)),window.sessionStorage.setItem(e,t))},L=function(e){if(e)return window.sessionStorage.getItem(e)};function k(e,t,a){return new Promise((function(o,n){j()({headers:{"Content-Type":"application/json;charset=UTF-8"},method:e,url:t,data:"POST"===e||"PUT"===e||"PATCH"===e?a:null,params:"GET"===e||"DELETE"===e?a:null,withCredentials:!1}).then((function(e){console.log(e),o(e.data)})).catch((function(e){console.log(e),n(e)}))}))}j.a.defaults.baseURL="/api",j.a.defaults.timeout=2e4,j.a.defaults.headers.post["Content-Type"]="application/json",j.a.defaults.headers.put["Content-Type"]="application/json",j.a.interceptors.request.use((function(e){e.headers.Accept="application/json";var t=L(x.ACCESS_TOKEN);return console.log(t),t&&(e.headers.Authorization="Bearer "+t),e}),(function(e){return Promise.reject(e)})),j.a.interceptors.response.use((function(e){console.log(e);var t=e.data,a=e.status;return{data:t,status:a}}),(function(e){if(console.log(e.response),e.response)return 401===e.response.status&&h["a"].alert({title:"授权失败",message:"企业微信授权失败，请重新打开页面"}).then((function(){window.close()})),Promise.reject(e)}));var S,F,I,C,A={get:function(e,t){return k("GET",e,t)},post:function(e,t){return k("POST",e,t)},put:function(e,t){return k("PUT",e,t)},delete:function(e,t){return k("DELETE",e,t)},patch:function(e,t){return k("PATCH",e,t)}},R=x.version,N=function(e){return A.post("/login/",e)},G=function(e){return A.post("".concat(R,"/upload/"),e)},H=function(e){return A.post("".concat(R,"/project/create"),e)},U=function(e){return A.get("".concat(R,"/project/list"),e)},P=function(e){return A.get("".concat(R,"/project/").concat(e))},z=function(e,t){return A.patch("".concat(R,"/project/audit/").concat(e),t)},$=function(e){return A.get("".concat(R,"/project/right/").concat(e))},q=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticStyle:{"margin-top":"20px"}},[a("van-steps",{attrs:{active:e.active,"active-color":e.activeColor,"active-icon":e.activeIcon}},e._l(e.stepList,(function(t){return a("van-step",[e._v(e._s(t))])})),1),a("van-field",{directives:[{name:"show",rawName:"v-show",value:e.rejectReason,expression:"rejectReason"}],attrs:{readonly:Boolean(e.rejectReason),label:"驳回意见: ",value:e.rejectReason,type:"textarea",row:"2",autosize:""}}),a("van-form",{staticClass:"form",on:{submit:e.onSubmit}},[e.auditNow?a("van-field",{attrs:{readonly:e.auditNow,value:e.formData.creator_name,label:"创建人"}}):e._e(),e.auditNow?a("van-field",{attrs:{readonly:e.auditNow,value:e.formData.create_time,label:"创建时间"}}):e._e(),a("div",{staticClass:"field-label"},[a("span",{staticClass:"field-label-require"},[e._v("*")]),e._v("产品细分类目")]),a("van-field",{attrs:{readonly:e.auditNow,placeholder:"请填写产品细分类目",name:"category",rules:[{required:!0}]},model:{value:e.form.category,callback:function(t){e.$set(e.form,"category",t)},expression:"form.category"}}),a("div",{staticClass:"field-label"},[a("span",{staticClass:"field-label-require"},[e._v("*")]),e._v("市场容量")]),a("van-field",{attrs:{readonly:e.auditNow,placeholder:"请填写产品型号",name:"type"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[a("div",{attrs:{slot:"input"},slot:"input"},[a("van-radio-group",{attrs:{direction:"horizontal"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[a("van-radio",{attrs:{name:"1"}},[e._v("小于300万美金")]),a("van-radio",{attrs:{name:"2"}},[e._v("大于等于300万美金")])],1)],1)]),a("div",{staticClass:"field-label"},[a("span",{staticClass:"field-label-require"},[e._v("*")]),e._v("产品型号")]),a("van-field",{attrs:{readonly:e.auditNow,placeholder:"请填写产品型号",name:"model_type",rules:[{required:!0}]},model:{value:e.form.model_type,callback:function(t){e.$set(e.form,"model_type",t)},expression:"form.model_type"}}),a("div",{staticClass:"field-label"},[a("span",{staticClass:"field-label-require"},[e._v("*")]),e._v("市场大盘容量及市占分析")]),a("van-field",{attrs:{readonly:e.auditNow,placeholder:"请填写容量及市占分析",rows:"3",name:"market_share_analysis",autosize:"",type:"textarea",rules:[{required:!0}]},model:{value:e.form.market_share_analysis,callback:function(t){e.$set(e.form,"market_share_analysis",t)},expression:"form.market_share_analysis"}},[e._v("> ")]),a("div",{staticClass:"field-label"},[a("span",{staticClass:"field-label-require"},[e._v("*")]),e._v("产品主要参数和配置")]),a("van-field",{attrs:{readonly:e.auditNow,placeholder:"请描述该产品主要参数和配置",rows:"3",name:"context_analysis",autosize:"",type:"textarea",rules:[{required:!0}]},model:{value:e.form.context_analysis,callback:function(t){e.$set(e.form,"context_analysis",t)},expression:"form.context_analysis"}},[e._v("> ")]),a("div",{staticClass:"field-label"},[a("span",{staticClass:"field-label-require"},[e._v("*")]),e._v("首单数量")]),a("van-field",{attrs:{readonly:e.auditNow,type:"number",maxlength:"10",placeholder:"请填写首单数量",name:"first_orders",rules:[{required:!0}]},model:{value:e.form.first_orders,callback:function(t){e.$set(e.form,"first_orders",t)},expression:"form.first_orders"}}),a("div",{staticClass:"field-label"},[a("span",{staticClass:"field-label-require"},[e._v("*")]),e._v("月销量预测")]),a("van-field",{attrs:{readonly:e.auditNow,placeholder:"请简要描述该产品月销量预测",rows:"3",name:"orders_estimate",autosize:"",type:"textarea",rules:[{required:!0}]},model:{value:e.form.orders_estimate,callback:function(t){e.$set(e.form,"orders_estimate",t)},expression:"form.orders_estimate"}}),a("van-field",{directives:[{name:"show",rawName:"v-show",value:!e.auditNow,expression:"!auditNow"}],attrs:{readonly:!0,center:"",name:"roi_report",required:!0,label:"ROI报告",placeholder:"请上传ROI分析报告",rules:[{required:!0}]},scopedSlots:e._u([{key:"button",fn:function(){return[a("van-uploader",{staticStyle:{padding:"15px",width:"100%"},attrs:{accept:e.acceptType,"max-size":e.maxSize,"max-count":1,"after-read":e.uploadROIFile,"before-read":e.showReading},on:{oversize:e.onOversize},model:{value:e.uploadFileROIList,callback:function(t){e.uploadFileROIList=t},expression:"uploadFileROIList"}},[a("van-button",{attrs:{size:"small",type:"primary"}},[e._v("上传")])],1)]},proxy:!0}]),model:{value:e.roi_report,callback:function(t){e.roi_report=t},expression:"roi_report"}}),a("van-uploader",{directives:[{name:"show",rawName:"v-show",value:!e.auditNow,expression:"!auditNow"}],staticStyle:{padding:"15px",width:"100%"},attrs:{accept:e.acceptType,"max-count":5,"max-size":e.maxSize,"after-read":e.uploadOtherFile,"before-read":e.showReading},on:{oversize:e.onOversize},model:{value:e.uploadFileList,callback:function(t){e.uploadFileList=t},expression:"uploadFileList"}},[a("van-button",{attrs:{icon:"upgrade",type:"default"}},[e._v("其他附件")])],1),a("div",{staticStyle:{"text-align":"center","margin-top":"20px","font-size":"14px",cursor:"pointer","margin-bottom":"20px"},on:{click:function(t){return e.downloadFile(e.formData.roi_report)}}},[a("van-icon",{directives:[{name:"show",rawName:"v-show",value:e.auditNow,expression:"auditNow"}],attrs:{name:"newspaper-o",size:"15px"}},[e._v("ROI分析")])],1),e._l(e.formData.attachments,(function(t,o){return a("div",{key:o,staticStyle:{"text-align":"center","margin-top":"20px","font-size":"14px",cursor:"pointer","margin-bottom":"20px"},on:{click:function(a){return e.downloadFile(t.url)}}},[a("van-icon",{directives:[{name:"show",rawName:"v-show",value:e.auditNow,expression:"auditNow"}],key:o,attrs:{name:"newspaper-o",size:"15px"}},[e._v(e._s(t.name)+" ")])],1)})),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.auditNow,expression:"!auditNow"}],staticStyle:{margin:"16px"}},[a("van-button",{staticStyle:{width:"100%"},attrs:{round:"",block:"",type:"info","native-type":"submit",disabled:e.submitDisable}},[e._v(" 提交 ")])],1)],2)],1)])},M=[],B=(a("4160"),a("159b"),a("4ddd"),a("9f14")),K=(a("a44c"),a("e27c")),W=(a("c3a6"),a("ad06")),X=(a("77f8"),a("dc0f")),Y=(a("1f87"),a("510b")),J={name:"ApplyForm",components:(S={},Object(m["a"])(S,T["a"].name,T["a"]),Object(m["a"])(S,E["a"].name,E["a"]),Object(m["a"])(S,O["a"].name,O["a"]),Object(m["a"])(S,b["a"].name,b["a"]),Object(m["a"])(S,Y["a"].name,Y["a"]),Object(m["a"])(S,X["a"].name,X["a"]),Object(m["a"])(S,g["a"].name,g["a"]),Object(m["a"])(S,W["a"].name,W["a"]),Object(m["a"])(S,_["a"].name,_["a"]),Object(m["a"])(S,K["a"].name,K["a"]),Object(m["a"])(S,B["a"].name,B["a"]),Object(m["a"])(S,v["a"].name,v["a"]),Object(m["a"])(S,h["a"].name,h["a"]),S),props:{formData:{type:Object,default:{}}},data:function(){return{curObject:{name:"发起立项流程"},maxSize:10485760,acceptType:"image/*,.doc,.docx,.pdf,.ppt,.xlsx,.xls",auditor:["1","2"],uploadFileList:[],uploadFileROIList:[],submitDisable:!1,roi_report:"",form:{category:"",model_type:"",type:"",roi_report:"",first_orders:"",orders_estimate:"",context_analysis:"",attachments:[],create_time:"",market_share_analysis:""},stepList:["提交申请","流程审批","审批结果"],rejectReason:"",activeColor:"#07c160",activeIcon:"checked"}},mounted:function(){if(console.log(this.formData),this.formData.id){this.stepList=["提交申请"],this.formData.attachments="string"===typeof this.formData.attachments?JSON.parse(this.formData.attachments):[],this.form=this.formData;for(var e=this.formData.result,t=0;t<e.length;t++)if(this.stepList.push("审批（".concat(e[t].auditor,"）")),"reject"===e[t].is_accept)return this.stepList.push("立项申请不通过"),this.rejectReason=e[t].memo,this.activeColor="#C12021",this.activeIcon="clear",!0;this.formData.is_done?this.stepList.push("立项申请通过"):this.stepList.push("审批结果")}},computed:{auditNow:function(){return Boolean(this.formData.id)},active:function(){if(this.formData.id){for(var e=this.formData.result,t=0;t<e.length;t++){if("reject"===e[t].is_accept)return this.stepList.length-1;if(null===e[t].is_accept)return this.activeColor="#468EFF",this.activeIcon="clock",t+1}return this.stepList.length-1}return 0}},methods:{onSubmit:function(e){var t=this;return g["a"].loading("正在执行，请稍侯..."),console.log("submit",e),console.log("submit",this.form),this.uploadFileList.length>0&&this.uploadFileList.forEach((function(e){return t.form.attachments.push({name:e.file.name,url:e.file.url}),e})),this.roi_report.length>0&&this.form.roi_report?(e.roi_report=this.form.roi_report,e.type?(e.attachments=JSON.stringify(this.form.attachments),void H(e).then((function(e){console.log(e),h["a"].alert({message:"流程创建成功"}).then((function(){t.resetForm()})).catch((function(e){console.log(e),g["a"].fail("创建出错，请稍候再试")}))}))):(g["a"].fail("请选择市场容量"),!1)):(g["a"].fail("请上传ROI分析"),!1)},resetForm:function(){this.form.category="",this.form.model_type="",this.form.type="",this.form.first_orders="",this.form.orders_estimate="",this.form.context_analysis="",this.form.market_share_analysis="",this.form.attachments=[],this.uploadFileList=[]},onOversize:function(e){console.log(e),Object(g["a"])("文件大小不能超过 10M")},uploadROIFile:function(e){var t=this;this.uploadFile(e,(function(e){if(console.log(e),e){var a=t.uploadFileROIList.pop();a.file.url=e.file,t.uploadFileROIList.push(a),t.form.roi_report=e.file,t.roi_report="   ",console.log(t.form)}}))},uploadOtherFile:function(e){var t=this;this.uploadFile(e,(function(e){if(console.log(e),e){var a=t.uploadFileList.pop();a.file.url=e.file,t.uploadFileList.push(a)}}))},uploadFile:function(e,t){var a=this;console.log(e);var o=new FormData;o.append("file",e.file),G(o).then((function(e){if(console.log(e),"ok"!==e.msg)return g["a"].fail(e.msg),!1;a.submitDisable=!1,g["a"].success("上传成功"),t(e.data)})).catch((function(e){return console.log(e),g["a"].fail(e.msg),!1}))},downloadFile:function(e){console.log(e),window.open(e)},showReading:function(){return this.submitDisable=!0,g["a"].loading({message:"上传中...",forbidClick:!0,duration:1e4}),!0}}},V=J,Q=(a("6c45"),Object(c["a"])(V,q,M,!1,null,"62b48724",null)),Z=Q.exports,ee={name:"Apply",components:(F={},Object(m["a"])(F,T["a"].name,T["a"]),Object(m["a"])(F,y["a"].name,y["a"]),Object(m["a"])(F,E["a"].name,E["a"]),Object(m["a"])(F,O["a"].name,O["a"]),Object(m["a"])(F,b["a"].name,b["a"]),Object(m["a"])(F,g["a"].name,g["a"]),Object(m["a"])(F,_["a"].name,_["a"]),Object(m["a"])(F,v["a"].name,v["a"]),Object(m["a"])(F,h["a"].name,h["a"]),Object(m["a"])(F,"ApplyForm",Z),F),data:function(){return{curObject:{name:"发起立项流程"},maxSize:10485760,acceptType:".doc,.docx, .pdf, .ppt, .jpg, .jpeg, .png",auditor:["1","2"],form:{category:"",creator:{},model_type:"",context_analysis:"",attachments:[],market_share_analysis:""}}},mounted:function(){this.getUserInfo()},methods:{getUserInfo:function(){var e,t=/code=.+/.exec(window.location.search);if(t){var a=t[0].substr(5),o=a.indexOf("&");e=-1!==o?a.substr(0,o):a,N({code:e}).then((function(e){console.log(e);var t=e.data.access_token;D(x.ACCESS_TOKEN,t)}))}}}},te=ee,ae=Object(c["a"])(te,d,p,!1,null,"5afaa1d2",null),oe=ae.exports,ne=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("van-nav-bar",{attrs:{title:e.curObject.name}}),a("van-skeleton",{staticClass:"skeleton",attrs:{title:"",row:15,loading:e.loading}},[e.projects?a("div",{staticStyle:{"margin-bottom":"50px"}},[a("van-cell-group",e._l(e.projects,(function(t,o){return a("van-cell",{key:o,attrs:{icon:"records",title:t.model_type,label:t.creator_name,"is-link":""},on:{click:function(a){return e.goCheck(t)}}},[t.result?a("van-tag",{attrs:{type:"success"}},[e._v("已完成")]):a("van-tag",{attrs:{type:"warning"}},[e._v("未审批")])],1)})),1)],1):a("div",[a("van-empty",{attrs:{description:"数据为空"}})],1)]),a("van-pagination",{staticStyle:{position:"fixed",bottom:"5px",width:"100%"},attrs:{"total-items":e.pagination.total,"items-per-page":e.pagination.num},on:{change:e.getData},model:{value:e.pagination.page,callback:function(t){e.$set(e.pagination,"page",t)},expression:"pagination.page"}})],1)},ie=[],re=(a("0209"),a("7d5e")),se=(a("6a39"),a("f240")),ce=(a("5f1a"),a("a3e2")),le=(a("0653"),a("34e9")),ue=(a("c194"),a("7744")),fe=(a("91d5"),a("f0ca")),de={name:"AuditList",components:(I={},Object(m["a"])(I,fe["a"].name,fe["a"]),Object(m["a"])(I,E["a"].name,E["a"]),Object(m["a"])(I,ue["a"].name,ue["a"]),Object(m["a"])(I,le["a"].name,le["a"]),Object(m["a"])(I,ce["a"].name,ce["a"]),Object(m["a"])(I,g["a"].name,g["a"]),Object(m["a"])(I,y["a"].name,y["a"]),Object(m["a"])(I,se["a"].name,se["a"]),Object(m["a"])(I,re["a"].name,re["a"]),I),mounted:function(){L(x.ACCESS_TOKEN)?this.getData():this.getUserInfo()},data:function(){return{curObject:{name:"立项申请列表"},pagination:{num:10,page:1,total:0},projects:[],loading:!0}},methods:{getData:function(){var e=this,t={num:this.pagination.num,page:this.pagination.page};U(t).then((function(t){console.log(t),e.projects=t.results,e.pagination.total=t.count,setTimeout((function(){e.loading=!1}),500)}))},getUserInfo:function(){var e,t=this,a=/code=.+/.exec(window.location.search);if(a){var o=a[0].substr(5),n=o.indexOf("&");e=-1!==n?o.substr(0,n):o,N({code:e}).then((function(e){console.log(e);var a=e.data.access_token;D(x.ACCESS_TOKEN,a),t.getData()}))}},goCheck:function(e){this.$router.push({name:"product-audit",params:{projectID:e.id}})}}},pe=de,me=(a("c45a"),Object(c["a"])(pe,ne,ie,!1,null,"f6e460e8",null)),he=me.exports,ve=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{"margin-bottom":"35px"}},[a("van-nav-bar",{directives:[{name:"show",rawName:"v-show",value:e.ownRight,expression:"ownRight"}],attrs:{title:e.curObject.name,"left-text":"返回","left-arrow":""},on:{"click-left":e.onClickLeft}}),a("van-skeleton",{staticClass:"skeleton",attrs:{title:"",row:15,loading:e.loading}},[a("ApplyForm",{attrs:{formData:e.formData}}),a("div",{staticClass:"action"},[e.toggleReject?a("div",[a("van-field",{attrs:{rows:"3",name:"memo",autosize:"",autofocus:!0,label:"否决意见",type:"textarea",placeholder:"请填写否决意见"},model:{value:e.memo,callback:function(t){e.memo=t},expression:"memo"}}),a("div",{staticClass:"van-hairline--bottom",staticStyle:{"margin-bottom":"20px"}}),a("van-button",{attrs:{type:"primary"},on:{click:function(t){e.toggleReject=!1}}},[e._v(" 取消")]),a("van-button",{staticStyle:{"margin-left":"35px"},attrs:{type:"info"},on:{click:e.reject}},[e._v("确认")])],1):a("div",[a("div",{directives:[{name:"show",rawName:"v-show",value:e.ownRight,expression:"ownRight"}]},[a("van-button",{attrs:{type:"primary"},on:{click:e.pass}},[e._v(" 同意")]),a("van-button",{staticStyle:{"margin-left":"35px"},attrs:{type:"info"},on:{click:function(t){e.toggleReject=!0}}},[e._v("否决")])],1)])])],1)],1)},_e=[],ge={name:"Audit",components:(C={ApplyForm:Z},Object(m["a"])(C,y["a"].name,y["a"]),Object(m["a"])(C,O["a"].name,O["a"]),Object(m["a"])(C,E["a"].name,E["a"]),Object(m["a"])(C,re["a"].name,re["a"]),Object(m["a"])(C,h["a"].name,h["a"]),Object(m["a"])(C,g["a"].name,g["a"]),C),data:function(){return{toggleReject:!1,ownRight:!1,memo:"",curObject:{name:"审批立项申请"},loading:!0,projectID:0,formData:{}}},mounted:function(){var e=this,t=this.$route.params;console.log(t),void 0!==t.projectID?(this.projectID=t.projectID,L(x.ACCESS_TOKEN)?this.getProject(this.projectID):this.getUserInfo()):h["a"].alert({message:"项目链接错误"}).then((function(){e.$router.push({name:"audit-list"})}))},methods:{getUserInfo:function(){var e,t=this,a=/code=.+/.exec(window.location.search);if(a){var o=a[0].substr(5),n=o.indexOf("&");e=-1!==n?o.substr(0,n):o,N({code:e}).then((function(e){console.log(e);var a=e.data.access_token;D(x.ACCESS_TOKEN,a),t.getProject(t.projectID)}))}},getProject:function(e){var t=this;P(e).then((function(a){console.log(a),$(e).then((function(e){e.data&&(t.ownRight=!0)})),t.formData=a.data,setTimeout((function(){t.loading=!1}),500)}))},onClickLeft:function(){this.$router.push({name:"audit-list"})},pass:function(){var e=this;h["a"].confirm({title:"同意该产品立项",message:""}).then((function(){e.handleAudit(!0)})).catch((function(){return!1}))},reject:function(){if(!this.memo)return Object(g["a"])("请填写否决意见"),!1;this.handleAudit(!1)},handleAudit:function(e){var t=this;g["a"].loading("处理中...");var a={is_accept:e,memo:this.memo};z(this.projectID,a).then((function(e){g["a"].success({message:"审批已完成",onClose:function(){t.$router.push({name:"audit-list"})}})})).catch((function(e){t.requestFail(e)}))},requestFail:function(e){console.log(e)}}},be=ge,Oe=(a("1cae"),Object(c["a"])(be,ve,_e,!1,null,"668aa07c",null)),Ee=Oe.exports,ye=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("van-empty",{attrs:{description:"页面不存在"}})},Te=[],we={name:"NotFound",components:Object(m["a"])({},fe["a"].name,fe["a"])},je=we,xe=Object(c["a"])(je,ye,Te,!1,null,"277e7832",null),De=xe.exports,Le=[{path:"/product/flow",name:"product-flow",component:oe},{path:"/product/auditlist",name:"audit-list",component:he},{path:"/product/audit/:projectID([1-9]\\d*)?",name:"product-audit",component:Ee},{path:"*",name:"notFound",component:De}];o["a"].use(f["a"]);var ke=new f["a"]({mode:"history",routes:Le}),Se=ke,Fe=a("c16e"),Ie=a.n(Fe),Ce=a("2f62"),Ae="SIDEBAR_TYPE",Re="DEFAULT_THEME",Ne="DEFAULT_LAYOUT_MODE",Ge="DEFAULT_COLOR",He="DEFAULT_COLOR_WEAK",Ue="DEFAULT_FIXED_HEADER",Pe="DEFAULT_FIXED_SIDEMENU",ze="DEFAULT_FIXED_HEADER_HIDDEN",$e="DEFAULT_CONTENT_WIDTH_TYPE",qe="DEFAULT_MULTI_TAB",Me={state:{sidebar:!0,device:"desktop",theme:"",layout:"",contentWidth:"",fixedHeader:!1,fixSiderbar:!1,autoHideHeader:!1,color:null,weak:!1,multiTab:!0},mutations:{SET_SIDEBAR_TYPE:function(e,t){e.sidebar=t,o["a"].ls.set(Ae,t)},CLOSE_SIDEBAR:function(e){o["a"].ls.set(Ae,!0),e.sidebar=!1},TOGGLE_DEVICE:function(e,t){e.device=t},TOGGLE_THEME:function(e,t){o["a"].ls.set(Re,t),e.theme=t},TOGGLE_LAYOUT_MODE:function(e,t){o["a"].ls.set(Ne,t),e.layout=t},TOGGLE_FIXED_HEADER:function(e,t){o["a"].ls.set(Ue,t),e.fixedHeader=t},TOGGLE_FIXED_SIDERBAR:function(e,t){o["a"].ls.set(Pe,t),e.fixSiderbar=t},TOGGLE_FIXED_HEADER_HIDDEN:function(e,t){o["a"].ls.set(ze,t),e.autoHideHeader=t},TOGGLE_CONTENT_WIDTH:function(e,t){o["a"].ls.set($e,t),e.contentWidth=t},TOGGLE_COLOR:function(e,t){o["a"].ls.set(Ge,t),e.color=t},TOGGLE_WEAK:function(e,t){o["a"].ls.set(He,t),e.weak=t},TOGGLE_MULTI_TAB:function(e,t){o["a"].ls.set(qe,t),e.multiTab=t}},actions:{setSidebar:function(e,t){var a=e.commit;a("SET_SIDEBAR_TYPE",t)},CloseSidebar:function(e){var t=e.commit;t("CLOSE_SIDEBAR")},ToggleDevice:function(e,t){var a=e.commit;a("TOGGLE_DEVICE",t)},ToggleTheme:function(e,t){var a=e.commit;a("TOGGLE_THEME",t)},ToggleLayoutMode:function(e,t){var a=e.commit;a("TOGGLE_LAYOUT_MODE",t)},ToggleFixedHeader:function(e,t){var a=e.commit;t||a("TOGGLE_FIXED_HEADER_HIDDEN",!1),a("TOGGLE_FIXED_HEADER",t)},ToggleFixSiderbar:function(e,t){var a=e.commit;a("TOGGLE_FIXED_SIDERBAR",t)},ToggleFixedHeaderHidden:function(e,t){var a=e.commit;a("TOGGLE_FIXED_HEADER_HIDDEN",t)},ToggleContentWidth:function(e,t){var a=e.commit;a("TOGGLE_CONTENT_WIDTH",t)},ToggleColor:function(e,t){var a=e.commit;a("TOGGLE_COLOR",t)},ToggleWeak:function(e,t){var a=e.commit;a("TOGGLE_WEAK",t)},ToggleMultiTab:function(e,t){var a=e.commit;a("TOGGLE_MULTI_TAB",t)}}},Be=Me,Ke={state:{token:"",refresh:"",name:"",info:{}},mutations:{SET_TOKEN:function(e,t){e.token=t},SET_REFRESH_TOKEN:function(e,t){e.refresh=t},SET_INFO:function(e,t){e.info=t}},actions:{Login:function(e,t){e.commit;return new Promise((function(e,a){N(t).then((function(t){setUserToken(t.data.access_token,t.data.refresh_token),e()})).catch((function(e){a(e)}))}))}}},We=Ke,Xe={token:function(e){return e.user.token},userInfo:function(e){return e.user.info}},Ye=Xe;o["a"].use(Ce["a"]);var Je=new Ce["a"].Store({modules:{app:Be,user:We},state:{},mutations:{},actions:{},getters:Ye});o["a"].use(Ie.a,x.storageOptions),o["a"].config.productionTip=!1,new o["a"]({router:Se,store:Je,components:{App:u},render:function(e){return e(u)}}).$mount("#app")},"6c45":function(e,t,a){"use strict";var o=a("540f"),n=a.n(o);n.a},c45a:function(e,t,a){"use strict";var o=a("42a5"),n=a.n(o);n.a}});
//# sourceMappingURL=app.8fed5e4d.js.map