(function(t){function e(e){for(var n,r,s=e[0],c=e[1],u=e[2],m=0,f=[];m<s.length;m++)r=s[m],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&f.push(o[r][0]),o[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);l&&l(e);while(f.length)f.shift()();return i.push.apply(i,u||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,s=1;s<a.length;s++){var c=a[s];0!==o[c]&&(n=!1)}n&&(i.splice(e--,1),t=r(r.s=a[0]))}return t}var n={},o={app:0},i=[];function r(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=n,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(a,n,function(e){return t[e]}.bind(null,n));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"32e8":function(t,e,a){"use strict";var n=a("4a20"),o=a.n(n);o.a},"4a20":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("a133"),a("ed0d"),a("f09c"),a("e117");var n=a("2b0e"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},i=[],r={name:"App",components:{}},s=r,c=a("2877"),u=Object(c["a"])(s,o,i,!1,null,null,null),l=u.exports,m=a("4fb5"),f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-nav-bar",{attrs:{title:t.curObject.name}}),a("ApplyForm",{attrs:{formData:t.form}})],1)},d=[],p=(a("ecb4"),a("053b"),a("e35a"),a("9cf3"),a("ade3")),h=(a("35d0"),a("0c7e")),g=(a("1281"),a("dc18")),v=(a("475c"),a("9350")),b=(a("8abe"),a("d4bd")),_=(a("c64f"),a("cf6b")),E=(a("4feb"),a("9950")),O=(a("b4c8"),a("ff9b")),T=(a("ba45"),a("5d79")),y=(a("995e"),a("4d3b")),j=(a("b4fb"),a("e18c"),a("5976")),w=a.n(j),D={token:"token",apiUrl:"http://tk.freebie-queen.com",uploadUrl:"http://tk.freebie-queen.com/api/v1/upload/",version:"/v1",login_page:"/api/login",tokenExpire:{access_token:72e5,refresh_token:864e5},ACCESS_TOKEN:"Access-Token",REFRESH_TOKEN:"Refresh-Token",storageOptions:{namespace:"pro__",name:"ls",storage:"local"}},x=function(t,e){t&&("string"!==typeof e&&(e=JSON.stringify(e)),window.sessionStorage.setItem(t,e))},k=function(t){if(t)return window.sessionStorage.getItem(t)};function S(t,e,a){return new Promise((function(n,o){w()({headers:{"Content-Type":"application/json;charset=UTF-8"},method:t,url:e,data:"POST"===t||"PUT"===t||"PATCH"===t?a:null,params:"GET"===t||"DELETE"===t?a:null,withCredentials:!1}).then((function(t){console.log(t),n(t.data)})).catch((function(t){console.log(t),o(t)}))}))}w.a.defaults.baseURL="/api",w.a.defaults.timeout=2e4,w.a.defaults.headers.post["Content-Type"]="application/json",w.a.defaults.headers.put["Content-Type"]="application/json",w.a.interceptors.request.use((function(t){t.headers.Accept="application/json";var e=k(D.ACCESS_TOKEN);return console.log(e),e&&(t.headers.Authorization="Bearer "+e),t}),(function(t){return Promise.reject(t)})),w.a.interceptors.response.use((function(t){console.log(t);var e=t.data,a=t.status;return{data:e,status:a}}),(function(t){if(console.log(t.response),t.response)return 401===t.response.status&&h["a"].alert({title:"授权失败",message:"企业微信授权失败，请重新打开页面"}).then((function(){window.close()})),Promise.reject(t)}));var L,A,F,I,G={get:function(t,e){return S("GET",t,e)},post:function(t,e){return S("POST",t,e)},put:function(t,e){return S("PUT",t,e)},delete:function(t,e){return S("DELETE",t,e)},patch:function(t,e){return S("PATCH",t,e)}},N=D.version,C=function(t){return G.post("/login/",t)},R=function(t){return G.post("".concat(N,"/upload/"),t)},H=function(t){return G.post("".concat(N,"/project/create"),t)},U=function(t){return G.get("".concat(N,"/project/list"),t)},P=function(t){return G.get("".concat(N,"/project/").concat(t))},M=function(t,e){return G.patch("".concat(N,"/project/audit/").concat(t),e)},$=function(t){return G.get("".concat(N,"/project/right/").concat(t))},z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticStyle:{"margin-top":"20px"}},[a("van-form",{on:{submit:t.onSubmit}},[t.auditNow?a("van-field",{attrs:{value:t.formData.creator.username,label:"创建人"}}):t._e(),t.auditNow?a("van-field",{attrs:{value:t.formData.create_time,label:"创建时间"}}):t._e(),a("van-field",{attrs:{name:"category",label:"产品细分类目",rules:[{required:!0,message:"请填写产品细分类目"}]},model:{value:t.form.category,callback:function(e){t.$set(t.form,"category",e)},expression:"form.category"}}),a("van-field",{attrs:{name:"model_type",label:"产品型号",rules:[{required:!0,message:"请填写产品型号"}]},model:{value:t.form.model_type,callback:function(e){t.$set(t.form,"model_type",e)},expression:"form.model_type"}}),a("van-field",{attrs:{rows:"5",name:"market_share_analysis",autosize:"",label:"市场大盘容量及市占分析",type:"textarea",rules:[{required:!0,message:"请填写容量及市占分析"}]},model:{value:t.form.market_share_analysis,callback:function(e){t.$set(t.form,"market_share_analysis",e)},expression:"form.market_share_analysis"}},[t._v("> ")]),a("van-field",{attrs:{rows:"5",name:"context_analysis",autosize:"",label:"场景分析",type:"textarea",rules:[{required:!0,message:"请简要描述该产品场景分析"}]},model:{value:t.form.context_analysis,callback:function(e){t.$set(t.form,"context_analysis",e)},expression:"form.context_analysis"}},[t._v("> ")]),a("van-checkbox-group",{directives:[{name:"show",rawName:"v-show",value:!t.auditNow,expression:"!auditNow"}],staticStyle:{padding:"15px",width:"100%"},attrs:{direction:"horizontal",disabled:""},model:{value:t.auditor,callback:function(e){t.auditor=e},expression:"auditor"}},[a("span",{staticStyle:{"margin-right":"10px","font-size":"14px",color:"#646566"}},[t._v("审批 ")]),a("van-checkbox",{attrs:{name:"1"}},[t._v("邓望明")]),a("van-checkbox",{attrs:{name:"2"}},[t._v("杜波")])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.auditNow,expression:"!auditNow"}],staticClass:"van-hairline--bottom"}),a("van-uploader",{directives:[{name:"show",rawName:"v-show",value:!t.auditNow,expression:"!auditNow"}],staticStyle:{padding:"15px",width:"100%"},attrs:{accept:t.acceptType,"max-count":5,"max-size":t.maxSize,"after-read":t.uploadFile,"before-read":t.showReading},on:{oversize:t.onOversize},model:{value:t.uploadFileList,callback:function(e){t.uploadFileList=e},expression:"uploadFileList"}},[a("van-button",{attrs:{icon:"upgrade",type:"primary"}},[t._v("上传文件")])],1),t._l(t.formData.attachments,(function(e,n){return a("div",{key:n,staticStyle:{"text-align":"center","margin-top":"20px","font-size":"14px",cursor:"pointer"},on:{click:function(a){return t.downloadFile(e)}}},[a("van-icon",{directives:[{name:"show",rawName:"v-show",value:t.auditNow,expression:"auditNow"}],key:n,attrs:{name:"newspaper-o",size:"15px"}},[t._v("附件"+t._s(n+1)+" ")])],1)})),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.auditNow,expression:"!auditNow"}],staticStyle:{margin:"16px"}},[a("van-button",{staticStyle:{width:"100%"},attrs:{round:"",block:"",type:"info","native-type":"submit",disabled:t.submitDisable}},[t._v(" 提交 ")])],1)],2)],1)])},B=[],K=(a("fe59"),a("08ba"),a("ac8a"),a("9ec1")),W={name:"ApplyForm",components:(L={},Object(p["a"])(L,y["a"].name,y["a"]),Object(p["a"])(L,O["a"].name,O["a"]),Object(p["a"])(L,E["a"].name,E["a"]),Object(p["a"])(L,_["a"].name,_["a"]),Object(p["a"])(L,b["a"].name,b["a"]),Object(p["a"])(L,K["a"].name,K["a"]),Object(p["a"])(L,v["a"].name,v["a"]),Object(p["a"])(L,g["a"].name,g["a"]),Object(p["a"])(L,h["a"].name,h["a"]),L),props:{formData:{type:Object,default:{}}},mounted:function(){this.formData&&(this.formData.attachments="string"===typeof this.formData.attachments?JSON.parse(this.formData.attachments):[],this.form=this.formData)},data:function(){return{curObject:{name:"发起立项流程"},maxSize:10485760,acceptType:"image/*,.doc,.docx,.pdf,.ppt,.xlsx,.xls",auditor:["1","2"],uploadFileList:[],submitDisable:!1,form:{category:"",model_type:"",context_analysis:"",attachments:[],market_share_analysis:""}}},computed:{auditNow:function(){return Boolean(this.formData.id)}},methods:{onSubmit:function(t){var e=this;if(0===this.uploadFileList.length)return b["a"].fail("请上传附件"),!1;b["a"].loading("正在执行，请稍侯..."),console.log("submit",t),console.log("submit",this.form),this.uploadFileList.forEach((function(t){return e.form.attachments.push(t.file.url),t})),t.attachments=JSON.stringify(this.form.attachments),H(t).then((function(t){console.log(t),h["a"].alert({message:"流程创建成功"}).then((function(){e.resetForm()})).catch((function(t){console.log(t),b["a"].fail("创建出错，请稍候再试")}))}))},resetForm:function(){this.form.category="",this.form.model_type="",this.form.context_analysis="",this.form.market_share_analysis="",this.form.attachments=[],this.uploadFileList=[]},onOversize:function(t){console.log(t),Object(b["a"])("文件大小不能超过 10M")},uploadFile:function(t){var e=this;console.log(t);var a=new FormData;a.append("file",t.file),R(a).then((function(t){if(console.log(t),"ok"!==t.msg)return b["a"].fail(t.msg),!1;var a=e.uploadFileList.pop();a.file.url=t.data.file,e.uploadFileList.push(a),b["a"].success("上传成功"),console.log(e.uploadFileList)})).catch((function(t){console.log(t),b["a"].clear(),b["a"].fail(t.msg)})),this.submitDisable=!1},downloadFile:function(t){console.log(t),window.open(t)},showReading:function(){return this.submitDisable=!0,b["a"].loading({message:"上传中...",forbidClick:!0,duration:1e4}),!0}}},X=W,q=Object(c["a"])(X,z,B,!1,null,"1d52d954",null),Y=q.exports,J={name:"Apply",components:(A={},Object(p["a"])(A,y["a"].name,y["a"]),Object(p["a"])(A,T["a"].name,T["a"]),Object(p["a"])(A,O["a"].name,O["a"]),Object(p["a"])(A,E["a"].name,E["a"]),Object(p["a"])(A,_["a"].name,_["a"]),Object(p["a"])(A,b["a"].name,b["a"]),Object(p["a"])(A,v["a"].name,v["a"]),Object(p["a"])(A,g["a"].name,g["a"]),Object(p["a"])(A,h["a"].name,h["a"]),Object(p["a"])(A,"ApplyForm",Y),A),data:function(){return{curObject:{name:"发起立项流程"},maxSize:10485760,acceptType:".doc,.docx, .pdf, .ppt, .jpg, .jpeg, .png",auditor:["1","2"],form:{category:"",creator:{},model_type:"",context_analysis:"",attachments:[],market_share_analysis:""}}},mounted:function(){this.getUserInfo()},methods:{getUserInfo:function(){var t,e=/code=.+/.exec(window.location.search);if(e){var a=e[0].substr(5),n=a.indexOf("&");t=-1!==n?a.substr(0,n):a,C({code:t}).then((function(t){console.log(t);var e=t.data.access_token;x(D.ACCESS_TOKEN,e)}))}}}},V=J,Q=Object(c["a"])(V,f,d,!1,null,"5afaa1d2",null),Z=Q.exports,tt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-nav-bar",{attrs:{title:t.curObject.name}}),a("van-skeleton",{staticClass:"skeleton",attrs:{title:"",row:15,loading:t.loading}},[a("div",[a("van-cell-group",t._l(t.projects,(function(e,n){return a("van-cell",{key:n,attrs:{icon:"records",title:e.model_type,label:e.creator.username,"is-link":""},on:{click:function(a){return t.goCheck(e)}}},[e.result?a("van-tag",{attrs:{type:"success"}},[t._v("已完成")]):a("van-tag",{attrs:{type:"warning"}},[t._v("未审批")])],1)})),1)],1)]),a("van-pagination",{staticStyle:{position:"absolute",bottom:"10px",margin:"auto",width:"100%"},attrs:{"total-items":t.pagination.total,"items-per-page":t.pagination.num},on:{change:t.getData},model:{value:t.pagination.page,callback:function(e){t.$set(t.pagination,"page",e)},expression:"pagination.page"}})],1)},et=[],at=(a("40f7"),a("bd4d")),nt=(a("bc88"),a("dc1e")),ot=(a("e37b"),a("841e")),it=(a("76f5"),a("ebaf")),rt=(a("49a0"),a("fc4f")),st={name:"AuditList",components:(F={},Object(p["a"])(F,O["a"].name,O["a"]),Object(p["a"])(F,rt["a"].name,rt["a"]),Object(p["a"])(F,it["a"].name,it["a"]),Object(p["a"])(F,ot["a"].name,ot["a"]),Object(p["a"])(F,b["a"].name,b["a"]),Object(p["a"])(F,T["a"].name,T["a"]),Object(p["a"])(F,nt["a"].name,nt["a"]),Object(p["a"])(F,at["a"].name,at["a"]),F),mounted:function(){this.getUserInfo()},data:function(){return{curObject:{name:"立项申请列表"},pagination:{num:10,page:1,total:0},projects:[],loading:!0}},methods:{getData:function(){var t=this,e={num:this.pagination.num,page:this.pagination.page};U(e).then((function(e){console.log(e),t.projects=e.results,t.pagination.total=e.count,setTimeout((function(){t.loading=!1}),500)}))},getUserInfo:function(){var t,e=this,a=/code=.+/.exec(window.location.search);if(a){var n=a[0].substr(5),o=n.indexOf("&");t=-1!==o?n.substr(0,o):n,C({code:t}).then((function(t){console.log(t);var a=t.data.access_token;x(config.ACCESS_TOKEN,a),e.getData()}))}},goCheck:function(t){this.$router.push({name:"product-audit",params:{projectID:t.id}})}}},ct=st,ut=(a("ae7c"),Object(c["a"])(ct,tt,et,!1,null,"57e7e7dd",null)),lt=ut.exports,mt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-nav-bar",{attrs:{title:t.curObject.name,"left-text":"返回","left-arrow":""},on:{"click-left":t.onClickLeft}}),a("van-skeleton",{staticClass:"skeleton",attrs:{title:"",row:15,loading:t.loading}},[a("ApplyForm",{attrs:{formData:t.formData}}),a("div",{staticClass:"action"},[t.toggleReject?a("div",[a("van-field",{attrs:{rows:"3",name:"memo",autosize:"",autofocus:!0,label:"否决意见",type:"textarea",placeholder:"请填写否决意见"},model:{value:t.memo,callback:function(e){t.memo=e},expression:"memo"}}),a("div",{staticClass:"van-hairline--bottom",staticStyle:{"margin-bottom":"20px"}}),a("van-button",{attrs:{type:"primary"},on:{click:function(e){t.toggleReject=!1}}},[t._v(" 取消")]),a("van-button",{staticStyle:{"margin-left":"35px"},attrs:{type:"info"},on:{click:t.reject}},[t._v("确认")])],1):a("div",[a("div",{directives:[{name:"show",rawName:"v-show",value:t.ownRight,expression:"ownRight"}]},[a("van-button",{attrs:{type:"primary"},on:{click:t.pass}},[t._v(" 同意")]),a("van-button",{staticStyle:{"margin-left":"35px"},attrs:{type:"info"},on:{click:function(e){t.toggleReject=!0}}},[t._v("否决")])],1)])])],1)],1)},ft=[],dt={name:"Audit",components:(I={ApplyForm:Y},Object(p["a"])(I,T["a"].name,T["a"]),Object(p["a"])(I,E["a"].name,E["a"]),Object(p["a"])(I,O["a"].name,O["a"]),Object(p["a"])(I,at["a"].name,at["a"]),Object(p["a"])(I,h["a"].name,h["a"]),Object(p["a"])(I,b["a"].name,b["a"]),I),data:function(){return{toggleReject:!1,ownRight:!1,memo:"",curObject:{name:"审批立项申请"},loading:!0,projectID:0,formData:{}}},mounted:function(){var t=this,e=this.$route.params;console.log(e),void 0!==e.projectID?(this.projectID=e.projectID,this.getUserInfo()):h["a"].alert({message:"项目链接错误"}).then((function(){t.$router.push({name:"audit-list"})}))},methods:{getUserInfo:function(){var t,e=this,a=/code=.+/.exec(window.location.search);if(a){var n=a[0].substr(5),o=n.indexOf("&");t=-1!==o?n.substr(0,o):n,C({code:t}).then((function(t){console.log(t);var a=t.data.access_token;x(config.ACCESS_TOKEN,a),e.getProject(e.projectID)}))}},getProject:function(t){var e=this;P(t).then((function(a){console.log(a),$(t).then((function(t){t.data&&(e.ownRight=!0)})),e.formData=a.data,setTimeout((function(){e.loading=!1}),500)}))},onClickLeft:function(){this.$router.push({name:"audit-list"})},pass:function(){var t=this;h["a"].confirm({title:"同意该产品立项",message:""}).then((function(){t.handleAudit(!0)})).catch((function(){return!1}))},reject:function(){if(!this.memo)return Object(b["a"])("请填写否决意见"),!1;this.handleAudit(!1)},handleAudit:function(t){var e=this,a={is_accept:t,memo:this.memo};M(this.projectID,a).then((function(t){b["a"].success({message:"审批已完成",onClose:function(){e.$router.push({name:"audit-list"})}})})).catch((function(t){e.requestFail(t)}))},requestFail:function(t){console.log(t)}}},pt=dt,ht=(a("32e8"),Object(c["a"])(pt,mt,ft,!1,null,"06adfc30",null)),gt=ht.exports,vt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("van-empty",{attrs:{description:"页面不存在"}})},bt=[],_t=(a("cd28"),a("7a86")),Et={name:"NotFound",components:Object(p["a"])({},_t["a"].name,_t["a"])},Ot=Et,Tt=Object(c["a"])(Ot,vt,bt,!1,null,"277e7832",null),yt=Tt.exports,jt=[{path:"/product/flow",name:"product-flow",component:Z},{path:"/product/auditlist",name:"audit-list",component:lt},{path:"/product/audit/:projectID([1-9]\\d*)?",name:"product-audit",component:gt},{path:"*",name:"notFound",component:yt}];n["a"].use(m["a"]);var wt=new m["a"]({mode:"history",routes:jt}),Dt=wt,xt=a("8505"),kt=a.n(xt),St=a("9f3a"),Lt="SIDEBAR_TYPE",At="DEFAULT_THEME",Ft="DEFAULT_LAYOUT_MODE",It="DEFAULT_COLOR",Gt="DEFAULT_COLOR_WEAK",Nt="DEFAULT_FIXED_HEADER",Ct="DEFAULT_FIXED_SIDEMENU",Rt="DEFAULT_FIXED_HEADER_HIDDEN",Ht="DEFAULT_CONTENT_WIDTH_TYPE",Ut="DEFAULT_MULTI_TAB",Pt={state:{sidebar:!0,device:"desktop",theme:"",layout:"",contentWidth:"",fixedHeader:!1,fixSiderbar:!1,autoHideHeader:!1,color:null,weak:!1,multiTab:!0},mutations:{SET_SIDEBAR_TYPE:function(t,e){t.sidebar=e,n["a"].ls.set(Lt,e)},CLOSE_SIDEBAR:function(t){n["a"].ls.set(Lt,!0),t.sidebar=!1},TOGGLE_DEVICE:function(t,e){t.device=e},TOGGLE_THEME:function(t,e){n["a"].ls.set(At,e),t.theme=e},TOGGLE_LAYOUT_MODE:function(t,e){n["a"].ls.set(Ft,e),t.layout=e},TOGGLE_FIXED_HEADER:function(t,e){n["a"].ls.set(Nt,e),t.fixedHeader=e},TOGGLE_FIXED_SIDERBAR:function(t,e){n["a"].ls.set(Ct,e),t.fixSiderbar=e},TOGGLE_FIXED_HEADER_HIDDEN:function(t,e){n["a"].ls.set(Rt,e),t.autoHideHeader=e},TOGGLE_CONTENT_WIDTH:function(t,e){n["a"].ls.set(Ht,e),t.contentWidth=e},TOGGLE_COLOR:function(t,e){n["a"].ls.set(It,e),t.color=e},TOGGLE_WEAK:function(t,e){n["a"].ls.set(Gt,e),t.weak=e},TOGGLE_MULTI_TAB:function(t,e){n["a"].ls.set(Ut,e),t.multiTab=e}},actions:{setSidebar:function(t,e){var a=t.commit;a("SET_SIDEBAR_TYPE",e)},CloseSidebar:function(t){var e=t.commit;e("CLOSE_SIDEBAR")},ToggleDevice:function(t,e){var a=t.commit;a("TOGGLE_DEVICE",e)},ToggleTheme:function(t,e){var a=t.commit;a("TOGGLE_THEME",e)},ToggleLayoutMode:function(t,e){var a=t.commit;a("TOGGLE_LAYOUT_MODE",e)},ToggleFixedHeader:function(t,e){var a=t.commit;e||a("TOGGLE_FIXED_HEADER_HIDDEN",!1),a("TOGGLE_FIXED_HEADER",e)},ToggleFixSiderbar:function(t,e){var a=t.commit;a("TOGGLE_FIXED_SIDERBAR",e)},ToggleFixedHeaderHidden:function(t,e){var a=t.commit;a("TOGGLE_FIXED_HEADER_HIDDEN",e)},ToggleContentWidth:function(t,e){var a=t.commit;a("TOGGLE_CONTENT_WIDTH",e)},ToggleColor:function(t,e){var a=t.commit;a("TOGGLE_COLOR",e)},ToggleWeak:function(t,e){var a=t.commit;a("TOGGLE_WEAK",e)},ToggleMultiTab:function(t,e){var a=t.commit;a("TOGGLE_MULTI_TAB",e)}}},Mt=Pt,$t={state:{token:"",refresh:"",name:"",info:{}},mutations:{SET_TOKEN:function(t,e){t.token=e},SET_REFRESH_TOKEN:function(t,e){t.refresh=e},SET_INFO:function(t,e){t.info=e}},actions:{Login:function(t,e){t.commit;return new Promise((function(t,a){C(e).then((function(e){setUserToken(e.data.access_token,e.data.refresh_token),t()})).catch((function(t){a(t)}))}))}}},zt=$t,Bt={token:function(t){return t.user.token},userInfo:function(t){return t.user.info}},Kt=Bt;n["a"].use(St["a"]);var Wt=new St["a"].Store({modules:{app:Mt,user:zt},state:{},mutations:{},actions:{},getters:Kt});n["a"].use(kt.a,D.storageOptions),n["a"].config.productionTip=!1,new n["a"]({router:Dt,store:Wt,components:{App:l},render:function(t){return t(l)}}).$mount("#app")},a5b4:function(t,e,a){},ae7c:function(t,e,a){"use strict";var n=a("a5b4"),o=a.n(n);o.a}});
//# sourceMappingURL=app.f1820a95.js.map