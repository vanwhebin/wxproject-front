(function(t){function e(e){for(var n,r,s=e[0],c=e[1],l=e[2],f=0,m=[];f<s.length;f++)r=s[f],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&m.push(o[r][0]),o[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(m.length)m.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,s=1;s<a.length;s++){var c=a[s];0!==o[c]&&(n=!1)}n&&(i.splice(e--,1),t=r(r.s=a[0]))}return t}var n={},o={app:0},i=[];function r(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=n,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(a,n,function(e){return t[e]}.bind(null,n));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var u=c;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"42a5":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("a133"),a("ed0d"),a("f09c"),a("e117");var n=a("2b0e"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},i=[],r={name:"App",components:{}},s=r,c=a("2877"),l=Object(c["a"])(s,o,i,!1,null,null,null),u=l.exports,f=a("4fb5"),m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-nav-bar",{attrs:{title:t.curObject.name}}),a("ApplyForm",{attrs:{formData:t.form}})],1)},p=[],d=(a("ecb4"),a("053b"),a("e35a"),a("9cf3"),a("ade3")),h=(a("35d0"),a("0c7e")),v=(a("1281"),a("dc18")),g=(a("475c"),a("9350")),_=(a("8abe"),a("d4bd")),b=(a("c64f"),a("cf6b")),E=(a("4feb"),a("9950")),O=(a("b4c8"),a("ff9b")),y=(a("ba45"),a("5d79")),T=(a("995e"),a("4d3b")),j=(a("b4fb"),a("e18c"),a("5976")),D=a.n(j),w={token:"token",apiUrl:"http://tk.freebie-queen.com",uploadUrl:"http://tk.freebie-queen.com/api/v1/upload/",version:"/v1",login_page:"/api/login",tokenExpire:{access_token:72e5,refresh_token:864e5},ACCESS_TOKEN:"Access-Token",REFRESH_TOKEN:"Refresh-Token",storageOptions:{namespace:"pro__",name:"ls",storage:"local"}},x=function(t,e){t&&("string"!==typeof e&&(e=JSON.stringify(e)),window.sessionStorage.setItem(t,e))},L=function(t){if(t)return window.sessionStorage.getItem(t)};function S(t,e,a){return new Promise((function(n,o){D()({headers:{"Content-Type":"application/json;charset=UTF-8"},method:t,url:e,data:"POST"===t||"PUT"===t||"PATCH"===t?a:null,params:"GET"===t||"DELETE"===t?a:null,withCredentials:!1}).then((function(t){console.log(t),n(t.data)})).catch((function(t){console.log(t),o(t)}))}))}D.a.defaults.baseURL="/api",D.a.defaults.timeout=2e4,D.a.defaults.headers.post["Content-Type"]="application/json",D.a.defaults.headers.put["Content-Type"]="application/json",D.a.interceptors.request.use((function(t){t.headers.Accept="application/json";var e=L(w.ACCESS_TOKEN);return console.log(e),e&&(t.headers.Authorization="Bearer "+e),t}),(function(t){return Promise.reject(t)})),D.a.interceptors.response.use((function(t){console.log(t);var e=t.data,a=t.status;return{data:e,status:a}}),(function(t){if(console.log(t.response),t.response)return 401===t.response.status&&h["a"].alert({title:"授权失败",message:"企业微信授权失败，请重新打开页面"}).then((function(){window.close()})),Promise.reject(t)}));var k,A,C,F,I={get:function(t,e){return S("GET",t,e)},post:function(t,e){return S("POST",t,e)},put:function(t,e){return S("PUT",t,e)},delete:function(t,e){return S("DELETE",t,e)},patch:function(t,e){return S("PATCH",t,e)}},G=w.version,R=function(t){return I.post("/login/",t)},N=function(t){return I.post("".concat(G,"/upload/"),t)},H=function(t){return I.post("".concat(G,"/project/create"),t)},U=function(t){return I.get("".concat(G,"/project/list"),t)},P=function(t){return I.get("".concat(G,"/project/").concat(t))},B=function(t,e){return I.patch("".concat(G,"/project/audit/").concat(t),e)},M=function(t){return I.get("".concat(G,"/project/right/").concat(t))},$=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticStyle:{"margin-top":"20px"}},[a("van-steps",{attrs:{active:t.active,"active-color":t.activeColor,"active-icon":t.activeIcon}},t._l(t.stepList,(function(e){return a("van-step",[t._v(t._s(e))])})),1),a("van-field",{directives:[{name:"show",rawName:"v-show",value:t.rejectReason,expression:"rejectReason"}],attrs:{readonly:Boolean(t.rejectReason),label:"驳回意见: ",value:t.rejectReason,type:"textarea",row:"2",autosize:""}}),a("van-form",{staticClass:"form",on:{submit:t.onSubmit}},[t.auditNow?a("van-field",{attrs:{readonly:Boolean(t.formData.creator_name),value:t.formData.creator_name,label:"创建人"}}):t._e(),t.auditNow?a("van-field",{attrs:{readonly:Boolean(t.formData.create_time),value:t.formData.create_time,label:"创建时间"}}):t._e(),a("div",{staticClass:"field-label"},[a("span",{staticClass:"field-label-require"},[t._v("*")]),t._v("产品细分类目")]),a("van-field",{attrs:{readonly:Boolean(t.form.category),placeholder:"请填写产品细分类目",name:"category",rules:[{required:!0}]},model:{value:t.form.category,callback:function(e){t.$set(t.form,"category",e)},expression:"form.category"}}),a("div",{staticClass:"field-label"},[a("span",{staticClass:"field-label-require"},[t._v("*")]),t._v("产品型号")]),a("van-field",{attrs:{readonly:Boolean(t.form.model_type),placeholder:"请填写产品型号",name:"model_type",rules:[{required:!0}]},model:{value:t.form.model_type,callback:function(e){t.$set(t.form,"model_type",e)},expression:"form.model_type"}}),a("div",{staticClass:"field-label"},[a("span",{staticClass:"field-label-require"},[t._v("*")]),t._v("市场大盘容量及市占分析")]),a("van-field",{attrs:{readonly:Boolean(t.form.market_share_analysis),placeholder:"请填写容量及市占分析",rows:"3",name:"market_share_analysis",autosize:"",type:"textarea",rules:[{required:!0}]},model:{value:t.form.market_share_analysis,callback:function(e){t.$set(t.form,"market_share_analysis",e)},expression:"form.market_share_analysis"}},[t._v("> ")]),a("div",{staticClass:"field-label"},[a("span",{staticClass:"field-label-require"},[t._v("*")]),t._v("产品主要参数和配置")]),a("van-field",{attrs:{readonly:Boolean(t.form.context_analysis),placeholder:"请描述该产品主要参数和配置",rows:"3",name:"context_analysis",autosize:"",type:"textarea",rules:[{required:!0}]},model:{value:t.form.context_analysis,callback:function(e){t.$set(t.form,"context_analysis",e)},expression:"form.context_analysis"}},[t._v("> ")]),a("van-uploader",{directives:[{name:"show",rawName:"v-show",value:!t.auditNow,expression:"!auditNow"}],staticStyle:{padding:"15px",width:"100%"},attrs:{accept:t.acceptType,"max-count":5,"max-size":t.maxSize,"after-read":t.uploadFile,"before-read":t.showReading},on:{oversize:t.onOversize},model:{value:t.uploadFileList,callback:function(e){t.uploadFileList=e},expression:"uploadFileList"}},[a("van-button",{attrs:{icon:"upgrade",type:"primary"}},[t._v("上传文件")])],1),t._l(t.formData.attachments,(function(e,n){return a("div",{key:n,staticStyle:{"text-align":"center","margin-top":"20px","font-size":"14px",cursor:"pointer","margin-bottom":"20px"},on:{click:function(a){return t.downloadFile(e)}}},[a("van-icon",{directives:[{name:"show",rawName:"v-show",value:t.auditNow,expression:"auditNow"}],key:n,attrs:{name:"newspaper-o",size:"15px"}},[t._v("附件"+t._s(n+1)+" ")])],1)})),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.auditNow,expression:"!auditNow"}],staticStyle:{margin:"16px"}},[a("van-button",{staticStyle:{width:"100%"},attrs:{round:"",block:"",type:"info","native-type":"submit",disabled:t.submitDisable}},[t._v(" 提交 ")])],1)],2)],1)])},z=[],q=(a("fe59"),a("08ba"),a("ac8a"),a("9ec1")),K=(a("67d6"),a("5e3e")),W=(a("df24"),a("b8a7")),X={name:"ApplyForm",components:(k={},Object(d["a"])(k,T["a"].name,T["a"]),Object(d["a"])(k,O["a"].name,O["a"]),Object(d["a"])(k,E["a"].name,E["a"]),Object(d["a"])(k,b["a"].name,b["a"]),Object(d["a"])(k,W["a"].name,W["a"]),Object(d["a"])(k,K["a"].name,K["a"]),Object(d["a"])(k,_["a"].name,_["a"]),Object(d["a"])(k,q["a"].name,q["a"]),Object(d["a"])(k,g["a"].name,g["a"]),Object(d["a"])(k,v["a"].name,v["a"]),Object(d["a"])(k,h["a"].name,h["a"]),k),props:{formData:{type:Object,default:{}}},data:function(){return{curObject:{name:"发起立项流程"},maxSize:10485760,acceptType:"image/*,.doc,.docx,.pdf,.ppt,.xlsx,.xls",auditor:["1","2"],uploadFileList:[],submitDisable:!1,form:{category:"",model_type:"",context_analysis:"",attachments:[],create_time:"",market_share_analysis:""},stepList:["提交申请","流程审批","审批结果"],rejectReason:"",activeColor:"#07c160",activeIcon:"checked"}},mounted:function(){if(console.log(this.formData),this.formData.id){this.stepList=["提交申请"],this.formData.attachments="string"===typeof this.formData.attachments?JSON.parse(this.formData.attachments):[],this.form=this.formData;for(var t=this.formData.result,e=0;e<t.length;e++)if(this.stepList.push("审批（".concat(t[e].auditor,"）")),"reject"===t[e].is_accept)return this.stepList.push("立项申请不通过"),this.rejectReason=t[e].memo,this.activeColor="#C12021",this.activeIcon="clear",!0;this.formData.is_done?this.stepList.push("立项申请通过"):this.stepList.push("审批结果")}},computed:{auditNow:function(){return Boolean(this.formData.id)},active:function(){if(this.formData.id){for(var t=this.formData.result,e=0;e<t.length;e++){if("reject"===t[e].is_accept)return this.stepList.length-1;if(null===t[e].is_accept)return e+1}return this.stepList.length-1}return 0}},methods:{onSubmit:function(t){var e=this;_["a"].loading("正在执行，请稍侯..."),console.log("submit",t),console.log("submit",this.form),this.uploadFileList.length>0&&this.uploadFileList.forEach((function(t){return e.form.attachments.push(t.file.url),t})),t.attachments=JSON.stringify(this.form.attachments),H(t).then((function(t){console.log(t),h["a"].alert({message:"流程创建成功"}).then((function(){e.resetForm()})).catch((function(t){console.log(t),_["a"].fail("创建出错，请稍候再试")}))}))},resetForm:function(){this.form.category="",this.form.model_type="",this.form.context_analysis="",this.form.market_share_analysis="",this.form.attachments=[],this.uploadFileList=[]},onOversize:function(t){console.log(t),Object(_["a"])("文件大小不能超过 10M")},uploadFile:function(t){var e=this;console.log(t);var a=new FormData;a.append("file",t.file),N(a).then((function(t){if(console.log(t),"ok"!==t.msg)return _["a"].fail(t.msg),!1;var a=e.uploadFileList.pop();a.file.url=t.data.file,e.uploadFileList.push(a),_["a"].success("上传成功"),console.log(e.uploadFileList)})).catch((function(t){console.log(t),_["a"].clear(),_["a"].fail(t.msg)})),this.submitDisable=!1},downloadFile:function(t){console.log(t),window.open(t)},showReading:function(){return this.submitDisable=!0,_["a"].loading({message:"上传中...",forbidClick:!0,duration:1e4}),!0}}},Y=X,J=(a("59e5"),Object(c["a"])(Y,$,z,!1,null,"4dad99b2",null)),V=J.exports,Q={name:"Apply",components:(A={},Object(d["a"])(A,T["a"].name,T["a"]),Object(d["a"])(A,y["a"].name,y["a"]),Object(d["a"])(A,O["a"].name,O["a"]),Object(d["a"])(A,E["a"].name,E["a"]),Object(d["a"])(A,b["a"].name,b["a"]),Object(d["a"])(A,_["a"].name,_["a"]),Object(d["a"])(A,g["a"].name,g["a"]),Object(d["a"])(A,v["a"].name,v["a"]),Object(d["a"])(A,h["a"].name,h["a"]),Object(d["a"])(A,"ApplyForm",V),A),data:function(){return{curObject:{name:"发起立项流程"},maxSize:10485760,acceptType:".doc,.docx, .pdf, .ppt, .jpg, .jpeg, .png",auditor:["1","2"],form:{category:"",creator:{},model_type:"",context_analysis:"",attachments:[],market_share_analysis:""}}},mounted:function(){this.getUserInfo()},methods:{getUserInfo:function(){var t,e=/code=.+/.exec(window.location.search);if(e){var a=e[0].substr(5),n=a.indexOf("&");t=-1!==n?a.substr(0,n):a,R({code:t}).then((function(t){console.log(t);var e=t.data.access_token;x(w.ACCESS_TOKEN,e)}))}}}},Z=Q,tt=Object(c["a"])(Z,m,p,!1,null,"5afaa1d2",null),et=tt.exports,at=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-nav-bar",{attrs:{title:t.curObject.name}}),a("van-skeleton",{staticClass:"skeleton",attrs:{title:"",row:15,loading:t.loading}},[t.projects?a("div",{staticStyle:{"margin-bottom":"50px"}},[a("van-cell-group",t._l(t.projects,(function(e,n){return a("van-cell",{key:n,attrs:{icon:"records",title:e.model_type,label:e.creator_name,"is-link":""},on:{click:function(a){return t.goCheck(e)}}},[e.result?a("van-tag",{attrs:{type:"success"}},[t._v("已完成")]):a("van-tag",{attrs:{type:"warning"}},[t._v("未审批")])],1)})),1)],1):a("div",[a("van-empty",{attrs:{description:"数据为空"}})],1)]),a("van-pagination",{staticStyle:{position:"fixed",bottom:"5px",width:"100%"},attrs:{"total-items":t.pagination.total,"items-per-page":t.pagination.num},on:{change:t.getData},model:{value:t.pagination.page,callback:function(e){t.$set(t.pagination,"page",e)},expression:"pagination.page"}})],1)},nt=[],ot=(a("40f7"),a("bd4d")),it=(a("bc88"),a("dc1e")),rt=(a("e37b"),a("841e")),st=(a("76f5"),a("ebaf")),ct=(a("49a0"),a("fc4f")),lt=(a("cd28"),a("7a86")),ut={name:"AuditList",components:(C={},Object(d["a"])(C,lt["a"].name,lt["a"]),Object(d["a"])(C,O["a"].name,O["a"]),Object(d["a"])(C,ct["a"].name,ct["a"]),Object(d["a"])(C,st["a"].name,st["a"]),Object(d["a"])(C,rt["a"].name,rt["a"]),Object(d["a"])(C,_["a"].name,_["a"]),Object(d["a"])(C,y["a"].name,y["a"]),Object(d["a"])(C,it["a"].name,it["a"]),Object(d["a"])(C,ot["a"].name,ot["a"]),C),mounted:function(){L(w.ACCESS_TOKEN)?this.getData():this.getUserInfo()},data:function(){return{curObject:{name:"立项申请列表"},pagination:{num:10,page:1,total:0},projects:[],loading:!0}},methods:{getData:function(){var t=this,e={num:this.pagination.num,page:this.pagination.page};U(e).then((function(e){console.log(e),t.projects=e.results,t.pagination.total=e.count,setTimeout((function(){t.loading=!1}),500)}))},getUserInfo:function(){var t,e=this,a=/code=.+/.exec(window.location.search);if(a){var n=a[0].substr(5),o=n.indexOf("&");t=-1!==o?n.substr(0,o):n,R({code:t}).then((function(t){console.log(t);var a=t.data.access_token;x(w.ACCESS_TOKEN,a),e.getData()}))}},goCheck:function(t){this.$router.push({name:"product-audit",params:{projectID:t.id}})}}},ft=ut,mt=(a("c45a"),Object(c["a"])(ft,at,nt,!1,null,"f6e460e8",null)),pt=mt.exports,dt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"margin-bottom":"35px"}},[a("van-nav-bar",{directives:[{name:"show",rawName:"v-show",value:t.ownRight,expression:"ownRight"}],attrs:{title:t.curObject.name,"left-text":"返回","left-arrow":""},on:{"click-left":t.onClickLeft}}),a("van-skeleton",{staticClass:"skeleton",attrs:{title:"",row:15,loading:t.loading}},[a("ApplyForm",{attrs:{formData:t.formData}}),a("div",{staticClass:"action"},[t.toggleReject?a("div",[a("van-field",{attrs:{rows:"3",name:"memo",autosize:"",autofocus:!0,label:"否决意见",type:"textarea",placeholder:"请填写否决意见"},model:{value:t.memo,callback:function(e){t.memo=e},expression:"memo"}}),a("div",{staticClass:"van-hairline--bottom",staticStyle:{"margin-bottom":"20px"}}),a("van-button",{attrs:{type:"primary"},on:{click:function(e){t.toggleReject=!1}}},[t._v(" 取消")]),a("van-button",{staticStyle:{"margin-left":"35px"},attrs:{type:"info"},on:{click:t.reject}},[t._v("确认")])],1):a("div",[a("div",{directives:[{name:"show",rawName:"v-show",value:t.ownRight,expression:"ownRight"}]},[a("van-button",{attrs:{type:"primary"},on:{click:t.pass}},[t._v(" 同意")]),a("van-button",{staticStyle:{"margin-left":"35px"},attrs:{type:"info"},on:{click:function(e){t.toggleReject=!0}}},[t._v("否决")])],1)])])],1)],1)},ht=[],vt={name:"Audit",components:(F={ApplyForm:V},Object(d["a"])(F,y["a"].name,y["a"]),Object(d["a"])(F,E["a"].name,E["a"]),Object(d["a"])(F,O["a"].name,O["a"]),Object(d["a"])(F,ot["a"].name,ot["a"]),Object(d["a"])(F,h["a"].name,h["a"]),Object(d["a"])(F,_["a"].name,_["a"]),F),data:function(){return{toggleReject:!1,ownRight:!1,memo:"",curObject:{name:"审批立项申请"},loading:!0,projectID:0,formData:{}}},mounted:function(){var t=this,e=this.$route.params;console.log(e),void 0!==e.projectID?(this.projectID=e.projectID,L(w.ACCESS_TOKEN)?this.getProject(this.projectID):this.getUserInfo()):h["a"].alert({message:"项目链接错误"}).then((function(){t.$router.push({name:"audit-list"})}))},methods:{getUserInfo:function(){var t,e=this,a=/code=.+/.exec(window.location.search);if(a){var n=a[0].substr(5),o=n.indexOf("&");t=-1!==o?n.substr(0,o):n,R({code:t}).then((function(t){console.log(t);var a=t.data.access_token;x(w.ACCESS_TOKEN,a),e.getProject(e.projectID)}))}},getProject:function(t){var e=this;P(t).then((function(a){console.log(a),M(t).then((function(t){t.data&&(e.ownRight=!0)})),e.formData=a.data,setTimeout((function(){e.loading=!1}),500)}))},onClickLeft:function(){this.$router.push({name:"audit-list"})},pass:function(){var t=this;h["a"].confirm({title:"同意该产品立项",message:""}).then((function(){t.handleAudit(!0)})).catch((function(){return!1}))},reject:function(){if(!this.memo)return Object(_["a"])("请填写否决意见"),!1;this.handleAudit(!1)},handleAudit:function(t){var e=this;_["a"].loading("处理中...");var a={is_accept:t,memo:this.memo};B(this.projectID,a).then((function(t){_["a"].clear(),_["a"].success({message:"审批已完成",onClose:function(){e.$router.push({name:"audit-list"})}})})).catch((function(t){e.requestFail(t)}))},requestFail:function(t){console.log(t)}}},gt=vt,_t=(a("9bac"),Object(c["a"])(gt,dt,ht,!1,null,"641d5846",null)),bt=_t.exports,Et=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("van-empty",{attrs:{description:"页面不存在"}})},Ot=[],yt={name:"NotFound",components:Object(d["a"])({},lt["a"].name,lt["a"])},Tt=yt,jt=Object(c["a"])(Tt,Et,Ot,!1,null,"277e7832",null),Dt=jt.exports,wt=[{path:"/product/flow",name:"product-flow",component:et},{path:"/product/auditlist",name:"audit-list",component:pt},{path:"/product/audit/:projectID([1-9]\\d*)?",name:"product-audit",component:bt},{path:"*",name:"notFound",component:Dt}];n["a"].use(f["a"]);var xt=new f["a"]({mode:"history",routes:wt}),Lt=xt,St=a("8505"),kt=a.n(St),At=a("9f3a"),Ct="SIDEBAR_TYPE",Ft="DEFAULT_THEME",It="DEFAULT_LAYOUT_MODE",Gt="DEFAULT_COLOR",Rt="DEFAULT_COLOR_WEAK",Nt="DEFAULT_FIXED_HEADER",Ht="DEFAULT_FIXED_SIDEMENU",Ut="DEFAULT_FIXED_HEADER_HIDDEN",Pt="DEFAULT_CONTENT_WIDTH_TYPE",Bt="DEFAULT_MULTI_TAB",Mt={state:{sidebar:!0,device:"desktop",theme:"",layout:"",contentWidth:"",fixedHeader:!1,fixSiderbar:!1,autoHideHeader:!1,color:null,weak:!1,multiTab:!0},mutations:{SET_SIDEBAR_TYPE:function(t,e){t.sidebar=e,n["a"].ls.set(Ct,e)},CLOSE_SIDEBAR:function(t){n["a"].ls.set(Ct,!0),t.sidebar=!1},TOGGLE_DEVICE:function(t,e){t.device=e},TOGGLE_THEME:function(t,e){n["a"].ls.set(Ft,e),t.theme=e},TOGGLE_LAYOUT_MODE:function(t,e){n["a"].ls.set(It,e),t.layout=e},TOGGLE_FIXED_HEADER:function(t,e){n["a"].ls.set(Nt,e),t.fixedHeader=e},TOGGLE_FIXED_SIDERBAR:function(t,e){n["a"].ls.set(Ht,e),t.fixSiderbar=e},TOGGLE_FIXED_HEADER_HIDDEN:function(t,e){n["a"].ls.set(Ut,e),t.autoHideHeader=e},TOGGLE_CONTENT_WIDTH:function(t,e){n["a"].ls.set(Pt,e),t.contentWidth=e},TOGGLE_COLOR:function(t,e){n["a"].ls.set(Gt,e),t.color=e},TOGGLE_WEAK:function(t,e){n["a"].ls.set(Rt,e),t.weak=e},TOGGLE_MULTI_TAB:function(t,e){n["a"].ls.set(Bt,e),t.multiTab=e}},actions:{setSidebar:function(t,e){var a=t.commit;a("SET_SIDEBAR_TYPE",e)},CloseSidebar:function(t){var e=t.commit;e("CLOSE_SIDEBAR")},ToggleDevice:function(t,e){var a=t.commit;a("TOGGLE_DEVICE",e)},ToggleTheme:function(t,e){var a=t.commit;a("TOGGLE_THEME",e)},ToggleLayoutMode:function(t,e){var a=t.commit;a("TOGGLE_LAYOUT_MODE",e)},ToggleFixedHeader:function(t,e){var a=t.commit;e||a("TOGGLE_FIXED_HEADER_HIDDEN",!1),a("TOGGLE_FIXED_HEADER",e)},ToggleFixSiderbar:function(t,e){var a=t.commit;a("TOGGLE_FIXED_SIDERBAR",e)},ToggleFixedHeaderHidden:function(t,e){var a=t.commit;a("TOGGLE_FIXED_HEADER_HIDDEN",e)},ToggleContentWidth:function(t,e){var a=t.commit;a("TOGGLE_CONTENT_WIDTH",e)},ToggleColor:function(t,e){var a=t.commit;a("TOGGLE_COLOR",e)},ToggleWeak:function(t,e){var a=t.commit;a("TOGGLE_WEAK",e)},ToggleMultiTab:function(t,e){var a=t.commit;a("TOGGLE_MULTI_TAB",e)}}},$t=Mt,zt={state:{token:"",refresh:"",name:"",info:{}},mutations:{SET_TOKEN:function(t,e){t.token=e},SET_REFRESH_TOKEN:function(t,e){t.refresh=e},SET_INFO:function(t,e){t.info=e}},actions:{Login:function(t,e){t.commit;return new Promise((function(t,a){R(e).then((function(e){setUserToken(e.data.access_token,e.data.refresh_token),t()})).catch((function(t){a(t)}))}))}}},qt=zt,Kt={token:function(t){return t.user.token},userInfo:function(t){return t.user.info}},Wt=Kt;n["a"].use(At["a"]);var Xt=new At["a"].Store({modules:{app:$t,user:qt},state:{},mutations:{},actions:{},getters:Wt});n["a"].use(kt.a,w.storageOptions),n["a"].config.productionTip=!1,new n["a"]({router:Lt,store:Xt,components:{App:u},render:function(t){return t(u)}}).$mount("#app")},"59e5":function(t,e,a){"use strict";var n=a("7c7e"),o=a.n(n);o.a},"7c7e":function(t,e,a){},"9bac":function(t,e,a){"use strict";var n=a("b767"),o=a.n(n);o.a},b767:function(t,e,a){},c45a:function(t,e,a){"use strict";var n=a("42a5"),o=a.n(n);o.a}});
//# sourceMappingURL=app.b1260e23.js.map