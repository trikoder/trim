import{_ as r,a4 as n,a5 as d,ad as l,e as m,o as p,z as u,A as c,a6 as h,a7 as f,g,O as b,ae as o}from"./index-58233bfe.js";import{l as _}from"./html.vue_vue_type_style_index_0_lang-e9ef1aea.js";const v={elementType:"html",components:{ElementWrapper:n},mixins:[d],props:{modelValue:{type:String,default:""},editorConfig:{type:Object}},data(){return{editorValue:this.modelValue}},watch:{modelValue(e){e!==this.editorValue&&this.editor&&(this.editorValue=e,this.editor.setData(e))}},mounted(){this.$watch("isInteractive",e=>{e?this.setupEditor():this.disableEditor()},{immediate:!0})},beforeUnmount(){this.disableEditor()},methods:{disableEditor(){this.editor&&this.editor.destroy(),delete this.editor},setupEditor(){return _().then(e=>{const i=l({startupShowBorders:!0,toolbar:[{name:"basicstyles",items:["Bold","Italic","Strike","RemoveFormat"]},{name:"paragraph",items:["NumberedList","BulletedList"]},{name:"links",items:["Link","Unlink"]},{name:"format",items:["Format"]},{name:"document",items:["Sourcedialog"]}],removePlugins:"magicline",format_tags:"p;h1;h2;h3"},this.editorConfig),t=this.editor=e.inline(this.$refs.content,i);return t.on("instanceReady",()=>t.setReadOnly(!1)),t.on("change",()=>{const a=t.getData();this.editorValue=a,this.$emit("update:modelValue",a)}),t})}}};function k(e,i,t,a,V,y){const s=m("element-wrapper");return p(),u(s,h(f(e.elementWrapperProps)),{default:c(()=>[i[0]||(o(-1),i[0]=g("div",b({ref:"content",contenteditable:e.isInteractive},e.inputAttributes,{innerHTML:t.modelValue}),null,16,["contenteditable","innerHTML"]),o(1),i[0])]),_:1},16)}const $=r(v,[["render",k],["__file","html.vue"]]);export{$ as default};