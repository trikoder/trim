(self.webpackChunk_trikoder_trim=self.webpackChunk_trikoder_trim||[]).push([[809],{6659:function(e,t,r){"use strict";r.r(t);var o=r(8081),n=r.n(o),i=r(3645),a=r.n(i)()(n());a.push([e.id,".fileUploadType1{overflow:hidden;border:1px solid #e5e5e5;border-radius:.3em}.fileUploadType1>.handle{font-size:1.6em;display:block;box-sizing:border-box;width:100%;padding:3.125em 1.25em 1.25em;text-align:center;background-color:#f5f5f5;color:#666;cursor:pointer}.fileUploadType1>.handle:before{font-size:1.5625em;left:50%;top:1.2em;margin-left:-0.8em}.fileUploadType1 .dz-preview{padding:1em;position:relative}.fileUploadType1 .dz-image{display:inline-block;width:6em;height:6em;line-height:6em;margin-right:1em;background-color:#f5f5f5;text-align:center}.fileUploadType1 .dz-image>img{display:inline-block;max-width:6em;max-height:6em;vertical-align:middle;border-radius:.3em}.fileUploadType1 .dz-details{display:inline-block;vertical-align:middle;font-size:1.5em}.fileUploadType1 .dz-size{display:inline-block;vertical-align:middle}.fileUploadType1 .dz-filename{display:inline-block;vertical-align:middle}.fileUploadType1 .dz-progress{position:absolute;left:0;top:0;right:0;height:1px;background-color:#e5e5e5}.fileUploadType1 .dz-progress>.dz-upload{display:block;height:100%;background-color:#e03431}.fileUploadType1 .dz-error-message{font-size:1.4em;padding:1.4285714286em;background-color:#f8e6e5;color:#cd4b44;text-align:center;border-radius:.2307692308em;margin-top:1.1538461538em;border:1px solid #cd4b44;display:none}.fileUploadType1 .dz-error .dz-error-message{animation:slideDownFadeIn .2s;display:block}.fileUploadType1 .dz-success-mark,.fileUploadType1 .dz-error-mark{display:none}",""]),t.default=a},2809:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return O}});var o=r(6252),n=r(3577),i=r(9963),a={class:"layoutContainer"},l=r(4861),s=r(6564),d=r(9830),u=r(5511),c=r(7029),p=r(640),f=r(998),m={class:"fileUploadType1"},g={class:"handle iconUpload dz-clickable"},y=r(2025),h=r.n(y),v=r(5669),b={props:{uploadCaption:{type:String,required:!0},uploadUrl:{type:String,required:!0},clickableSelector:{type:String,default:".handle"},paramName:{type:String,default:"binary"},mediaType:{type:String,default:"image"},removePreviewOnUpload:{type:Boolean,default:!0},selectMultiple:{type:Boolean,default:!0},headers:Object,maxFiles:Number},mounted:function(){this.setupUpload()},beforeUnmount:function(){this.dropzone&&this.dropzone.destroy()},methods:{setupUpload:function(){var e=this,t=[].slice.call(this.$el.querySelectorAll(this.clickableSelector)),r=this.dropzone=new(h())(this.$el,{url:this.uploadUrl,params:this.mediaType&&{mediaType:this.mediaType},clickable:!t.length||t,maxFiles:this.maxFiles,paramName:this.paramName,headers:(0,s.f0)((0,s.bb)({},v.Z.defaults.headers.common,["Authorization"]),this.headers)});this.selectMultiple&&(r.hiddenFileInput.multiple=!0),r.on("sending",(function(t,o,n){e.$emit("sending",{file:t,xhr:o,formData:n}),e.selectMultiple&&(r.hiddenFileInput.multiple=!0)})).on("success",(function(t,o){e.$emit("upload",{file:t,response:o}),e.removePreviewOnUpload&&r.removeFile(t)})).on("error",(function(t,o){e.$emit("uploadError",{file:t,errorMessage:o}),e.removePreviewOnUpload&&r.removeFile(t)}))}}},C=(r(5030),r(3744)),T=(0,C.Z)(b,[["render",function(e,t,r,i,a,l){return(0,o.wg)(),(0,o.iD)("div",m,[(0,o._)("div",g,(0,n.zw)(r.uploadCaption),1)])}]]),U=r(5417),x=r(8868);function M(e){return M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},M(e)}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}function E(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function S(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?E(Object(r),!0).forEach((function(t){k(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):E(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function k(e,t,r){return(t=function(e){var t=function(e,t){if("object"!==M(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==M(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===M(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var I,z=S(S({},l.Z),{},{components:S(S({},l.Z.components),{},{FileUpload:T,IncludedAdmin:U.Z,Message:x.Z}),mixins:(I=l.Z.mixins,function(e){if(Array.isArray(e))return w(e)}(I)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(I)||function(e,t){if(e){if("string"==typeof e)return w(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?w(e,t):void 0}}(I)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),data:function(){var e,t=this;return S(S({},null===(e=l.Z.data)||void 0===e?void 0:e.bind(this)()),{},{mapMediaTypeTo:"mediaType",uploadParameter:"binary",uploadHeaders:void 0,mediaTypes:["image"],uploadControls:[{caption:(0,u.Z)("resourceControls.toIndex"),className:"withLeftIcon iconArrowLeft",action:function(){return t.openIndex(t.indexQuery)}},{isSaveControl:!0,caption:(0,u.Z)("resourceControls.save"),className:"accented iconUploadCloud",action:function(){return t.saveUploadedMedia()}}],uploadUrl:function(){var e=(0,c.Z)("baseApiUrl","/api/");return p.H.extend({type:this.resourceName},{baseUrl:e}).url()+"/upload"},prepareModelFromUpload:function(e,t){return p.H.getFromApi({url:e.xhr.getResponseHeader("Location")})},resolvedMediaTypes:[],uploadedIdentifiers:"",statusMessage:null})},computed:S(S({},l.Z.computed),{},{isStandardEditContext:function(){return["edit"].concat(this.resolvedMediaTypes.reduce((function(e,t){return!t.hasUploadUi&&e.push(t.createContext),e}),[])).indexOf(this.currentContext)>=0},currentResourceControls:function(){var e=this;return"index"===this.currentContext||this.isStandardEditContext?this.resourceControls:this.uploadControls.filter((function(t){return 0!==e.uploadedIdentifiers.length||!t.isSaveControl}))},currentUploadConfig:function(){var e=this;return(0,s.sE)(this.resolvedMediaTypes,(function(t){return t.createContext===e.currentContext}))}}),watch:S(S({},l.Z.watch),{},{currentContext:function(){this.uploadedIdentifiers="",this.statusMessage=null}}),created:function(){var e;null===(e=l.Z.created)||void 0===e||e.bind(this)(),this.resolveMediaTypes(),this.setupMediaTypeMethods()},methods:S(S({},l.Z.methods),{},{resolveMediaTypes:function(){var e=this;this.resolvedMediaTypes=this.mediaTypes.map((function(t){var r="string"==typeof t?{name:t}:t,o=r.name,n=(0,s.kC)((0,d.space)(o))+" "+(0,u.Z)("baseMediaController.uploadCaption");return(0,s.f0)({createPageTitle:n,createRouteName:["resource",e.resourceName,"create"+(0,d.pascal)(o)].join("."),uploadCaption:n,hasUploadUi:!0},r,{createContext:"create"+(0,d.pascal)(o)})}))},setupMediaTypeMethods:function(){var e=this;this.resolvedMediaTypes.forEach((function(t){var r="create"+(0,d.pascal)(t.name),o="open"+(0,d.pascal)(r),n="get"+(0,d.pascal)(r)+"Url",i="add"+(0,d.pascal)(r)+"Control";e[r]=function(e,o){this.resetContext(r,o),this.setPageTitle(t.createPageTitle),this.$emitter.emit("afterCreateSetup",{controller:this})},e[o]=function(e){var t=this;return this.isExternal?this[r](null,e):new Promise((function(r){t.$emitter.once("afterCreateSetup",(function(){return r()})),t.$router.navigateTo(t[n](e))}))},e[n]=function(e){return this.$router.url({name:t.createRouteName,query:e})},e[i]=function(e){var t=this;return this.addControl({caption:e||(0,u.Z)("resourceControls.create"),url:this[n](),className:"accented iconEdit",action:function(){return t[o]()}})}}))},getIndexConfigurator:function(){var e=this;return function(t){return e.resetResourceControls(),t.setTemplate("cards"),e.setupList({list:t,query:e.indexQuery})}},getEditConfigurator:function(){var e=this;return function(t){var r;if(e.resetResourceControls(),"edit"===e.currentContext){var o=t.resourceModel,n="function"==typeof e.mapMediaTypeTo?e.mapMediaTypeTo(o):o.get(e.mapMediaTypeTo);r="setup"+(0,d.pascal)(n)+"Edit"}else r="setup"+e.currentContext.replace("create","")+"Edit";return e[r]((0,s.f0)({query:e.currentQuery},t))}},processUploadedFile:function(e){var t=this;this.prepareModelFromUpload(e.file,e.response).then((function(e){t.$refs.includedMedia.addNewIncludedItem(e)}))},saveUploadedMedia:function(){var e=this;return this.$refs.includedMedia.saveRelatedResources().then((function(){window.scrollTo(0,0),e.statusMessage={text:(0,u.Z)("baseResourceController.entitySavedMessage"),type:"messageType1"},e.$emit("resourcesUploadedAndUpdated",{models:e.$refs.includedMedia.models})})).catch((function(e){}))}})});z.getDataKeys=function(){return["mapMediaTypeTo","mediaTypes","uploadParameter","uploadHeaders","uploadControls","uploadUrl","prepareModelFromUpload"]},z.toVueComponent=(0,f.Z)({extends:z,dataKeys:l.Z.getDataKeys().concat(z.getDataKeys())});var j=z,O=(0,C.Z)(j,[["render",function(e,t,r,l,s,d){var u=(0,o.up)("message"),c=(0,o.up)("file-upload"),p=(0,o.up)("included-admin");return(0,o.wg)(),(0,o.iD)("div",{class:(0,n.C_)(["resourceController",e.cssClass])},[((0,o.wg)(),(0,o.j4)((0,o.LL)(e.toComponent(e.getResourceHeaderType())),{breadcrumbs:e.breadcrumbs,hasBottomBorder:e.headerHasBorder},{default:(0,o.w5)((function(){return[((0,o.wg)(),(0,o.j4)((0,o.LL)(e.toComponent(e.getResourceControlsType())),{controls:e.currentResourceControls},null,8,["controls"]))]})),_:1},8,["breadcrumbs","hasBottomBorder"])),"index"===e.currentContext?((0,o.wg)(),(0,o.j4)((0,o.LL)(e.toComponent(e.getResourceListType())),{key:0,query:e.indexQuery,configure:e.getIndexConfigurator(),Collection:e.getCollectionType(),getEditUrl:e.getEditUrl,getIndexUrl:e.getIndexUrl,openEdit:e.openEdit,resourceCaption:e.resourceCaption,includedRelationships:e.includedRelationships.index,includedFields:e.includedFields.index,getEmptyListMessage:e.getEmptyListMessage,onQueryChange:e.openIndex,onBeforeConfigure:t[0]||(t[0]=function(t){return e.processIndexEvent("beforeConfigure",t)}),onAfterConfigure:t[1]||(t[1]=function(t){return e.processIndexEvent("afterConfigure",t)}),ref:"listHandler"},null,40,["query","configure","Collection","getEditUrl","getIndexUrl","openEdit","resourceCaption","includedRelationships","includedFields","getEmptyListMessage","onQueryChange"])):e.isStandardEditContext?((0,o.wg)(),(0,o.j4)((0,o.LL)(e.toComponent(e.getResourceEditType())),{key:1,class:"resourceEdit resourceEditType1",ModelType:e.getModelType(),configure:e.getEditConfigurator(),resourceId:e.editResourceId,createRequiresDraft:e.createRequiresDraft,createRelatedStrategy:e.createRelatedStrategy,resourceSavedMessage:e.resourceSavedMessage,resourceCreatedMessage:e.resourceCreatedMessage,onBeforeConfigure:t[2]||(t[2]=function(t){return e.processConfigureEvent("beforeConfigure",t)}),onAfterConfigure:t[3]||(t[3]=function(t){return e.processConfigureEvent("afterConfigure",t)}),onResourceModelSaved:t[4]||(t[4]=function(t){return e.processSaveEvent(t)}),ref:"editHandler"},null,40,["ModelType","configure","resourceId","createRequiresDraft","createRelatedStrategy","resourceSavedMessage","resourceCreatedMessage"])):((0,o.wg)(),(0,o.iD)("div",{key:e.currentContext,class:"mediaUploadType1 resourceEdit resourceEditType1"},[e.statusMessage?((0,o.wg)(),(0,o.j4)(u,(0,o.dG)({key:0},e.statusMessage,{onClose:t[5]||(t[5]=function(t){return e.statusMessage=null})}),null,16)):(0,o.kq)("",!0),(0,o._)("div",a,[e.currentUploadConfig?((0,o.wg)(),(0,o.j4)(c,{key:0,uploadCaption:e.currentUploadConfig.uploadCaption,mediaType:e.currentUploadConfig.name,uploadUrl:e.uploadUrl(),paramName:e.uploadParameter,headers:e.uploadHeaders,onUpload:e.processUploadedFile},null,8,["uploadCaption","mediaType","uploadUrl","paramName","headers","onUpload"])):(0,o.kq)("",!0),(0,o.wy)((0,o.Wm)(p,{ref:"includedMedia",name:"uploadedIdentifiers",modelValue:e.uploadedIdentifiers,"onUpdate:modelValue":t[6]||(t[6]=function(t){return e.uploadedIdentifiers=t}),setupEdit:e.getEditConfigurator(),removeItems:!1,addItems:!1,attributes:{wrapper:{class:"includedAdminBlockType1"},inputWrapper:{class:"includedAdminElement"}}},null,8,["modelValue","setupEdit"]),[[i.F8,e.uploadedIdentifiers.length>0]])])]))],2)}]])},5030:function(e,t,r){var o=r(6659);o.__esModule&&(o=o.default),"string"==typeof o&&(o=[[e.id,o,""]]),o.locals&&(e.exports=o.locals),(0,r(5346).Z)("53c87374",o,!0,{})}}]);