(self.webpackChunk_trikoder_trim=self.webpackChunk_trikoder_trim||[]).push([[696],{8823:function(e,t,i){"use strict";i.r(t);var r=i(8081),n=i.n(r),o=i(3645),u=i.n(o)()(n());u.push([e.id,".codeInputType1 .CodeMirror{font-size:1.6em;line-height:1.5;border:1px solid #ddd;border-radius:.25em;height:auto}.codeInputType1 .CodeMirror-scroll{min-height:8em}.codeInputType1 .cm-s-default .cm-atom{color:#e03431}",""]),t.default=u},9696:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return c}});var r=i(6252),n=i(3577),o=i(7784),u=i(7231),d=i(6564),s=i(5953),a=i.n(s),l=(i(6531),i(5861),{elementType:"code",components:{ElementWrapper:u.Z},mixins:[o.Z],props:{modelValue:{type:String,default:""},editorConfig:{type:Object}},data:function(){return{editorValue:this.modelValue}},watch:{modelValue:function(e){e!==this.editorValue&&this.editor&&(this.editorValue=e,this.editor.setValue(e))},isInteractive:function(){this.editor&&this.editor.setOption("readOnly",!this.isInteractive)}},mounted:function(){var e=this,t=this.$watch("visible",(function(i){i&&e.$nextTick((function(){t(),e.setupEditor()}))}),{immediate:!0})},methods:{setupEditor:function(){var e=this,t=(0,d.f0)({lineNumbers:!0},this.editorConfig,{readOnly:!this.isInteractive,value:this.modelValue}),i=this.editor=a()(this.$refs.content,t);i.on("change",(function(){var t=i.getValue();e.editorValue=t,e.$emit("update:modelValue",t)}))}}});i(8463);var c=(0,i(3744).Z)(l,[["render",function(e,t,i,o,u,d){var s=(0,r.up)("element-wrapper");return(0,r.wg)(),(0,r.j4)(s,(0,n.vs)((0,r.F4)(e.elementWrapperProps)),{default:(0,r.w5)((function(){return[t[0]||((0,r.qZ)(-1),t[0]=(0,r._)("div",(0,r.dG)({ref:"content"},e.inputAttributes),null,16),(0,r.qZ)(1),t[0])]})),_:1},16)}]])},8463:function(e,t,i){var r=i(8823);r.__esModule&&(r=r.default),"string"==typeof r&&(r=[[e.id,r,""]]),r.locals&&(e.exports=r.locals),(0,i(5346).Z)("47d66cc7",r,!0,{})}}]);