import{_ as n,ak as a,a5 as c,e as m,o as p,z as i,A as d,O as u,g as _,Z as f}from"./index-0c1d77fd.js";const y={elementType:"color",components:{TextFormElement:a},mixins:[c],props:{modelValue:{type:String,default:""}},computed:{isValidColor(){const e=document.createElement("div");return e.style.color=this.modelValue,!!e.style.color}}};function v(e,o,t,x,V,l){const r=m("text-form-element");return p(),i(r,u(e.$props,{onInput:o[0]||(o[0]=s=>e.$emit("update:modelValue",s))}),{inputWrapperEnd:d(()=>[_("div",{class:"colorPreview",style:f({backgroundColor:t.modelValue,opacity:l.isValidColor?1:0})},null,4)]),_:1},16)}const C=n(y,[["render",v],["__file","color.vue"]]);export{C as default};
