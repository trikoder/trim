import{_ as s,ak as a,a5 as c,g as m,o as p,A as i,B as d,Q as u,b as _,n as f}from"./index-405e8ead.js";const y={elementType:"color",components:{TextFormElement:a},mixins:[c],props:{modelValue:{type:String,default:""}},computed:{isValidColor(){const e=document.createElement("div");return e.style.color=this.modelValue,!!e.style.color}}};function v(e,o,t,x,V,l){const r=m("text-form-element");return p(),i(r,u(e.$props,{onInput:o[0]||(o[0]=n=>e.$emit("update:modelValue",n))}),{inputWrapperEnd:d(()=>[_("div",{class:"colorPreview",style:f({backgroundColor:t.modelValue,opacity:l.isValidColor?1:0})},null,4)]),_:1},16)}const B=s(y,[["render",v],["__file","color.vue"]]);export{B as default};