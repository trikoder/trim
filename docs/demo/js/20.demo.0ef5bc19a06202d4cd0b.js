(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{320:function(o,t,e){var n=e(374);"string"==typeof n&&(n=[[o.i,n,""]]),n.locals&&(o.exports=n.locals);(0,e(6).default)("916bb004",n,!0,{})},373:function(o,t,e){"use strict";var n=e(320);e.n(n).a},374:function(o,t,e){(t=e(5)(!1)).push([o.i,".colorInputType1{position:relative}.colorInputType1>.colorPreview{width:1em;height:1em;margin-top:-0.5em;position:absolute;right:1em;top:50%;border-radius:50%;-webkit-box-shadow:0 .1em .3em rgba(0,0,0,.15);box-shadow:0 .1em .3em rgba(0,0,0,.15);-webkit-transition:background-color .3s,opacity .3s;-o-transition:background-color .3s,opacity .3s;transition:background-color .3s,opacity .3s}",""]),o.exports=t},425:function(o,t,e){"use strict";e.r(t);var n=e(13),r={elementType:"color",components:{TextFormElement:e(113).a},mixins:[n.a],props:{value:{type:String,default:""}},computed:{isValidColor:function(){var o=document.createElement("div");return o.style.color=this.value,Boolean(o.style.color)}}},i=(e(373),e(2)),a=Object(i.a)(r,(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("text-form-element",o._b({on:{input:function(t){return o.$emit("input",t)}}},"text-form-element",o.$props,!1),[e("template",{slot:"inputWrapperEnd"},[e("div",{staticClass:"colorPreview",style:{backgroundColor:o.value,opacity:o.isValidColor?1:0}})])],2)}),[],!1,null,null,null);t.default=a.exports}}]);