import{_ as v,I as D,af as g,b as A,Q as h,ae as _,a4 as B,a5 as E,j,k as b,g as y,o as d,A as f,B as V,c as x,r as $,F as k,C as P}from"./index-f949a84d.js";import{l as w}from"./html.vue_vue_type_style_index_0_lang-c57439ba.js";const O="ComponentSelector",T={props:{content:String,clientId:String,editorConfig:Object,inputAttributes:Object,type:String,components:Array,context:Object},data(){return{editorContent:this.content}},watch:{content(e){e!==this.editorContent&&this.editor&&(this.editorContent=e,this.editor.setData(e))}},mounted(){this.setupEditor()},beforeUnmount(){this.editor&&this.editor.destroy()},methods:{setupEditor(){return w().then(e=>{const t=Object.assign({startupShowBorders:!1,toolbar:[{name:"basicstyles",items:["Bold","Italic","Strike","RemoveFormat"]},{name:"paragraph",items:["NumberedList","BulletedList",O]},{name:"links",items:["Link","Unlink"]},{name:"format",items:["Format"]},{name:"document",items:["Sourcedialog"]}],removePlugins:"magicline",format_tags:"p;h1;h2;h3"},this.editorConfig),o=this.editor=e.inline(this.$refs.content,t);return o.on("instanceReady",()=>o.setReadOnly(!1)),o.on("change",()=>{const n=o.getData();this.editorContent=n,this.$emit("updateContent",{clientId:this.clientId,content:n})}),this.setupInsertDropdown(o,e),o})},setupInsertDropdown(e,t){const o=D("formElements.htmlComponents.insertComponentCaption"),n=this.components.filter(s=>!!s),i=this;n.length!==0&&e.ui.addRichCombo(O,{label:o,title:o,voiceLabel:o,className:"ck_add_components",panel:{css:t.customStyles.richCombo},init:function(){n.forEach(s=>{this.add(s.componentType,g(s.insertCaption),g(s.insertCaption))})},onClick:function(s){i.prepareInsertEvent(s,e.getSelection().getRanges()[0]),e.focusManager.blur(!0)}})},splitContentByIndex(e){const t=["",""];let o=0,n=this.editor.container.getChild(0);for(;n;){const i=n.getOuterHtml().trim();t[o<e?0:1]+=i,n=n.getNext(),o++}return t},prepareInsertEvent(e,t){const o=this.components.find(i=>i.componentType===e);let n=t.startContainer;for(;n.getParent().$!==this.editor.element.$;)n=n.getParent();o.prepareDataModel(i=>{let s=null;const r={clientId:this.clientId,component:Object.assign({type:o.componentType},i)};if(t.startOffset===0&&!n.hasPrevious()?r.placement="before":t.startOffset===0&&n.hasPrevious()?(r.placement="split",s=n.getPrevious()):n.hasNext()?(r.placement="split",s=n):r.placement="after",s){const m=[],l=[s];let p=s;for(;p.hasPrevious();)p=p.getPrevious(),l.push(p);for(p=s;p.hasNext();)p=p.getNext(),m.push(p);r.content=l.reverse().filter(a=>a.getText().trim()).map(a=>a.getOuterHtml()).join("").trim(),r.contentCut=m.filter(a=>a.getText().trim()).map(a=>a.getOuterHtml()).join("").trim()}this.$emit("insertComponent",r)},this.context)}}};function S(e,t,o,n,i,s){return t[0]||(_(-1),t[0]=A("div",h({ref:"content"},o.inputAttributes,{innerHTML:o.content}),null,16,["innerHTML"]),_(1),t[0])}const W=v(T,[["render",S],["__file","html.vue"]]);let z=0;const u=()=>(Date.now()+ ++z).toString(),L={elementType:"htmlComponents",components:{ElementWrapper:B,HtmlEditor:W},mixins:[E],props:{modelValue:{type:Array,default:()=>[{clientId:u(),type:"html",content:""}]},components:{type:Array,default:()=>[]},editorConfig:{type:Object},context:{type:Object}},computed:{sanitizedInputAttributes(){const e=Object.assign({},this.inputAttributes);return["id","name"].forEach(t=>delete e[t]),e}},mounted(){const e=this.$watch("modelValue",t=>{t.length>1&&this.$nextTick(()=>{this.setupDragAndDrop(),e()})},{immediate:!0,deep:!0});this.modelValue.length===0&&this.$emit("update:modelValue",[{clientId:u(),type:"html",content:""}])},beforeUnmount(){this.drake&&this.drake.destroy()},methods:{getComponent(e){return this.components.find(t=>t.componentType===e.type)},updateComponent(e){this.$emit("update:modelValue",this.modelValue.map(t=>t.clientId===e.clientId?Object.assign({},t,e):t))},insertComponent(e){this.$emit("update:modelValue",this.normalize(this.prepInsert(this.modelValue,e)))},prepInsert(e,t){const o=n=>Object.assign({clientId:u()},n);return e.reduce((n,i)=>(i.clientId===t.clientId?t.placement==="after"?(n.push(i),n.push(o(t.component))):t.placement==="before"?(n.push(o(t.component)),n.push(i)):t.placement==="split"&&(n.push(Object.assign({},i,{content:t.content})),n.push(o(t.component)),t.contentCut&&n.push({clientId:u(),type:"html",content:t.contentCut})):n.push(i),n),[])},deleteComponent(e){this.$emit("update:modelValue",this.normalize(this.modelValue.filter(t=>t.clientId!==e)))},normalize(e){const t=e.reduce((n,i)=>{const s=n.length,r=s>=1?n[s-1]:null;return i.type==="html"&&r&&r.type==="html"?n[s-1]=Object.assign({},r,{content:r.content+i.content}):n.push(i),n},[]),o=t.length;return(o===0||t[o-1].type!=="html")&&t.push({clientId:u(),type:"html",content:""}),t},setupDragAndDrop(){const e=this.$refs.inputWrapper;j(()=>import("./dragula-b7beab56.js").then(t=>t.d),["assets/dragula-b7beab56.js","assets/index-f949a84d.js","assets/index-119ad4cc.css"]).then(({default:t})=>{this.drake=t([e],{isContainer:o=>!!o.getAttribute("contenteditable")||o===e,moves:(o,n,i,s)=>{const r=!!i.getAttribute("data-sort-handle"),m=e.contains(i);return r&&m},mirrorContainer:e,direction:"vertical"}),this.drake.on("drop",(o,n,i,s)=>{let r=this.modelValue;if(n.getAttribute("contenteditable")){this.drake.cancel(()=>!1);const m=this.getComponentByEl(o),l=this.getComponentByEl(n),p=r.find(c=>c.clientId===m.clientId);let a,C,I;if(r=r.filter(c=>c.clientId!==m.clientId),s){const c=b(s);c===0?a="before":(a="split",[C,I]=l.splitContentByIndex(c))}else a="after";r=this.prepInsert(r,{clientId:l.clientId,component:p,placement:a,content:C,contentCut:I})}else r.sort((m,l)=>{const p=this.getComponentDomIndex(m.clientId),a=this.getComponentDomIndex(l.clientId);return p-a});this.$emit("update:modelValue",this.normalize(r))})})},getComponentByEl(e){return this.$refs.componentInstances.find(t=>t.$el===e)},getComponentDomIndex(e){const t=this.$refs.componentInstances.find(o=>o.clientId===e);return b(t.$el)}}};function N(e,t,o,n,i,s){const r=y("html-editor"),m=y("element-wrapper");return d(),f(m,h({renderInputWrapper:!1},e.elementWrapperProps),{default:V(()=>[A("div",h(e.inputWrapperAttributes,{ref:"inputWrapper"}),[(d(!0),x(k,null,$(o.modelValue,l=>(d(),x(k,null,[l.type==="html"?(d(),f(r,h({key:0},l,{context:o.context,inputAttributes:s.sanitizedInputAttributes,editorConfig:o.editorConfig,key:l.clientId,components:o.components,ref_for:!0,ref:"componentInstances",onUpdateContent:s.updateComponent,onInsertComponent:s.insertComponent}),null,16,["context","inputAttributes","editorConfig","components","onUpdateContent","onInsertComponent"])):(d(),f(P(e.toRawComponentProps(s.getComponent(l))),h({key:1},l,{context:o.context,key:l.clientId,ref_for:!0,ref:"componentInstances",class:"htmlCustomComponent",onUpdateComponent:s.updateComponent,onDeleteComponent:s.deleteComponent}),null,16,["context","onUpdateComponent","onDeleteComponent"]))],64))),256))],16)]),_:1},16)}const U=v(L,[["render",N],["__file","index.vue"]]);export{U as default};
