import{_ as p,a4 as o,a5 as u,g as l,o as m,A as i,B as c,a6 as d,a7 as _,b as f,Q as b}from"./index-405e8ead.js";const v={elementType:"number",components:{ElementWrapper:o},mixins:[u],props:{modelValue:{validator:e=>typeof e=="number"||e===null,default:null}},methods:{processInputEvent(e){const t=parseFloat(e.target.value);this.$emit("update:modelValue",typeof t=="number"&&!isNaN(t)?t:null)}}},y=["type","value"];function V(e,t,a,g,B,n){const r=l("element-wrapper");return m(),i(r,d(_(e.elementWrapperProps)),{default:c(()=>[f("input",b(e.inputAttributes,{type:e.inputAttributes.type||"number",value:a.modelValue,onInput:t[0]||(t[0]=(...s)=>n.processInputEvent&&n.processInputEvent(...s))}),null,16,y)]),_:1},16)}const I=p(v,[["render",V],["__file","number.vue"]]);export{I as default};