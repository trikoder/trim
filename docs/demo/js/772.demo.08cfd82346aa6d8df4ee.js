(self.webpackChunk_trikoder_trim=self.webpackChunk_trikoder_trim||[]).push([[772],{4212:function(t,e,n){"use strict";n.r(e);var a=n(8081),i=n.n(a),o=n(3645),r=n.n(o)()(i());r.push([t.id,'.stateSelectElement[data-v-f741e388]{display:inline-block;position:relative;background-color:#fff;border:1px solid #ddd;border-radius:.3em;overflow:hidden}.stateSelectElement.withNoOptions[data-v-f741e388]{background-color:#f9f9f9}.stateSelectElement.fullWidth[data-v-f741e388]{display:block}.stateSelectElement .stateCaption[data-v-f741e388]{font-size:1.4em;padding:.5714285714em .7142857143em}.stateSelectElement .stateCaption>span[data-v-f741e388]{animation:slideDownFadeIn .5s;display:block}.stateSelectElement .select[data-v-f741e388]{animation:slideDownFadeIn .5s;display:inline-block;position:relative;width:100%}.stateSelectElement .select[data-v-f741e388]:before{font-family:"cmsIconFont";speak:none;font-style:normal;font-weight:normal;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;position:absolute;left:0;top:50%;margin:0;width:30px;height:30px;line-height:30px;margin-top:-15px;text-align:center;text-indent:0;content:"";left:auto;right:0;font-size:1.2em;color:#e03431}.stateSelectElement .select>button[data-v-f741e388]{margin:0;padding:0;border:0;cursor:pointer;background:none;font-size:1.4em;padding:.5714285714em 2.1428571429em .5714285714em .7142857143em;color:#303030;opacity:.7}.stateSelectElement .select>button[data-v-f741e388]::-moz-focus-inner{padding:0;border:0}.stateSelectElement .select>select[data-v-f741e388]{position:absolute;left:0;top:0;width:100%;height:100%;cursor:pointer;opacity:0;font-size:1.6em}.stateSelectElement .select.fullWidth[data-v-f741e388]{display:block}.stateSelectElement .select.disabled[data-v-f741e388]{opacity:.5}.stateSelectElement .controls[data-v-f741e388]{display:table;width:100%;background-color:#f9f9f9;border-top:1px solid #ddd}.stateSelectElement .updateBtn[data-v-f741e388]{display:table-cell;vertical-align:middle;font-size:1.2em;padding:.8333333333em .8333333333em;color:#666;text-transform:uppercase;letter-spacing:.03em;border-left:1px solid #ddd}.stateSelectElement .updateBtn[data-v-f741e388]:hover{color:#e03431}.stateSelectElement .selectContainer[data-v-f741e388]{width:100%;display:table-cell;vertical-align:middle}',""]),e.default=r},6772:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return b}});var a=n(6252),i=n(3577),o={class:"stateCaption"},r={key:0,class:"controls"},l={class:"selectContainer"},s={class:"select"},u={type:"button"},c=["value"],d=["value"],p=n(7784),f=n(6564),h=n(5511),m=n(7231),v=n(640),g={elementType:"stateSelect",components:{ElementWrapper:m.Z},mixins:[p.Z],props:{modelValue:[String,Boolean,Number],updateEntityOnChange:{type:Boolean,default:!1},updateControlCaption:{type:String,default:function(){return(0,h.Z)("formElements.stateSelect.updateControlCaption")}},nextStatePlaceholderCaption:{type:String,default:function(){return(0,h.Z)("formElements.stateSelect.nextStatePlaceholderCaption")}},states:{type:Array,required:!0,validator:function(t){return t.length>=2}}},data:function(){return{currentState:this.getStateFromValue(this.modelValue)}},getInitialValue:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return void 0!==t.value?t.value:t.states[0].value},created:function(){if(this.updateEntityOnChange&&(!this.resourceModel||this.resourceModel.isNew()))throw new Error("Existing resource model required for state select in live update mode")},beforeUpdate:function(){this.syncCurrentStateToModel()},computed:{selectableOptions:function(){var t=this;if("all"===this.currentState.transitions){var e=this.states.map((function(e){return t.getStateKey(e)})).filter((function(e){return e!==t.getStateKey(t.currentState)}));return this.getTransitionsOptions(e)}return this.getTransitionsOptions(this.currentState.transitions||[])},selectValue:function(){var t=this;if(this.updateEntityOnChange){var e=(0,f.sE)(this.selectableOptions,(function(e){return e.value===t.modelValue}));return e?e.value:this.selectableOptions.length&&this.selectableOptions[0].value}return this.modelValue},selectCaption:function(){var t=this,e=(0,f.sE)(this.selectableOptions,(function(e){return e.value===t.selectValue}));return e.value===this.currentState.value?this.nextStatePlaceholderCaption:e.caption},inputWrapperAttributes:function(){var t=this.normalizeAttributes(this.attributes.inputWrapper);return 0===this.selectableOptions.length&&this.addToAttribute(t,"class","withNoOptions"),t}},methods:{processInputEvent:function(t){var e=this.states[0].value,n=t.target.value;"number"==typeof e?n=parseFloat(n):"boolean"==typeof e&&(n="true"===n),this.$emit("update:modelValue",n)},syncCurrentStateToModel:function(){if(this.resourceModel){var t=this.resourceModel.get(this.name);void 0!==t&&(this.currentState=this.getStateFromValue(t))}},getStateKey:function(t){return t.name||t.value},getStateFromValue:function(t){return(0,f.sE)(this.states,(function(e){return e.value===t}))},persistState:function(){var t=this;v.H.create().setId(this.resourceModel.get("id")).setType(this.resourceModel.getType()).saveAttribute(this.name,this.selectValue).then((function(e){var n=e.get(t.name);t.resourceModel.setAttribute(t.name,n),t.$emit("update:modelValue",n),t.currentState=t.getStateFromValue(n)}))},getTransitionsOptions:function(){var t=this,e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).map((function(e){var n=t.states.find((function(n){return t.getStateKey(n)===e}));return{caption:n.actionCaption||n.caption,value:n.value,key:n.value.toString()}}));return!this.updateEntityOnChange&&e.length&&e.unshift({caption:this.currentState.caption,value:this.currentState.value,key:this.currentState.value.toString()}),e}}};n(2447);const S=(0,n(3744).Z)(g,[["render",function(t,e,n,p,f,h){var m=(0,a.up)("element-wrapper");return(0,a.wg)(),(0,a.j4)(m,(0,a.dG)({renderInputWrapper:!1},t.elementWrapperProps),{default:(0,a.w5)((function(){return[(0,a._)("div",(0,a.dG)({class:"stateSelectElement"},h.inputWrapperAttributes),[(0,a._)("p",o,[(0,a._)("span",null,(0,i.zw)(f.currentState.caption),1)]),h.selectableOptions.length&&t.isInteractive?((0,a.wg)(),(0,a.iD)("div",r,[(0,a._)("div",l,[(0,a._)("div",s,[(0,a._)("button",u,"↳  "+(0,i.zw)(h.selectCaption),1),(0,a._)("select",{value:h.selectValue,onInput:e[0]||(e[0]=function(){return h.processInputEvent&&h.processInputEvent.apply(h,arguments)})},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(h.selectableOptions,(function(t){return(0,a.wg)(),(0,a.iD)("option",{key:t.key,value:t.value},(0,i.zw)(t.caption),9,d)})),128))],40,c)])]),n.updateEntityOnChange?((0,a.wg)(),(0,a.iD)("button",{key:0,type:"button",class:"updateBtn nBtn",onClick:e[1]||(e[1]=function(){return h.persistState&&h.persistState.apply(h,arguments)})},(0,i.zw)(n.updateControlCaption),1)):(0,a.kq)("",!0)])):(0,a.kq)("",!0)],16)]})),_:1},16)}],["__scopeId","data-v-f741e388"]]);var b=S},2447:function(t,e,n){var a=n(4212);a.__esModule&&(a=a.default),"string"==typeof a&&(a=[[t.id,a,""]]),a.locals&&(t.exports=a.locals),(0,n(5346).Z)("02d22140",a,!0,{})}}]);