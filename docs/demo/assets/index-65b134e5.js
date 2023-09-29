import{_ as f,e as x,o as s,c as r,F as C,r as v,d as b,t as F,f as V,E as k,g as h,h as m,b as n,p as T,i as w,T as R,S as $,j as L,k as S,v as M,l as B,w as E,m as I}from"./index-405e8ead.js";const N={props:{controls:Array},methods:{getIconClass(e){return e.icon?"icon"+x(e.icon):null},runControlAction(e){e.action&&e.action()}}},U={class:"componentControls"},O=["title","data-sort-handle","onClick"];function P(e,t,o,p,g,a){return s(),r("div",U,[(s(!0),r(C,null,v(o.controls,(d,c)=>(s(),r("button",{key:c,type:"button",class:b(["buttonControl nBtn icr",a.getIconClass(d)]),title:d.caption,"data-sort-handle":d.isSortHandle?"true":null,onClick:u=>a.runControlAction(d)},F(d.caption),11,O))),128))])}const z=f(N,[["render",P],["__scopeId","data-v-b7664912"],["__file","componentControls.vue"]]),q={components:{ComponentControls:z},props:{type:{type:String,required:!0},clientId:{type:String,required:!0},context:{type:Object}},computed:{defaultControls(){return[{icon:"move",isSortHandle:!0},{icon:"trash",action:()=>this.confirmRemove(()=>this.removeComponent())}]}},methods:{confirmRemove(e,t){V({message:t,onAccept:e,parent:this})},removeComponent(){this.$emit("deleteComponent",this.clientId)},updateComponent(e){this.$emit("updateComponent",Object.assign({clientId:this.clientId},e))}}},y=f(q,[["__file","baseComponent.vue"]]);const H={mixins:[y],componentType:"image",insertCaption:"Image component",props:{imageId:String,alignment:String,caption:String},computed:{imageControls(){return[{icon:"move",isSortHandle:!0},this.alignment==="central"?{icon:"arrowLeft",action:()=>this.updateComponent({alignment:"left"})}:{icon:"arrowRight",action:()=>this.updateComponent({alignment:"central"})},{icon:"trash",action:()=>this.confirmRemove(()=>this.removeComponent())}]}},prepareDataModel(e){k.select("media",t=>{e({imageId:t.get("id"),alignment:"central"})},{controllerMethodParams:[{},{mediaType:"image"}]})}},W=e=>(T("data-v-d26e8dcf"),e=e(),w(),e),j=W(()=>n("img",{src:"http://picsum.photos/1200/900?random=1"},null,-1)),G=["value"];function Q(e,t,o,p,g,a){const d=h("component-controls");return s(),r("figure",{class:b(["imageComponent",o.alignment+"Aligned"])},[j,m(d,{controls:a.imageControls},null,8,["controls"]),n("input",{class:"caption",type:"text",placeholder:"Enter image caption",value:o.caption,onInput:t[0]||(t[0]=c=>e.updateComponent({caption:c.target.value}))},null,40,G)],2)}const J=f(H,[["render",Q],["__scopeId","data-v-d26e8dcf"],["__file","imageInContent.vue"]]);const K={mixins:[y],components:{TextareaFormElement:R},componentType:"qoute",insertCaption:"Quote component",props:{text:String,author:String},prepareDataModel(e){e({text:"",author:""})}},X={class:"quoteComponent"},Y=["value"];function Z(e,t,o,p,g,a){const d=h("textarea-form-element"),c=h("component-controls");return s(),r("div",X,[m(d,{modelValue:o.text,attributes:{input:{class:"inputType2",placeholder:"Enter qoute text",spellcheck:!1}},"onUpdate:modelValue":t[0]||(t[0]=u=>e.updateComponent({text:u}))},null,8,["modelValue"]),n("input",{class:"author",type:"text",placeholder:"Enter qoute author",value:o.author,onInput:t[1]||(t[1]=u=>e.updateComponent({author:u.target.value}))},null,40,Y),m(c,{controls:e.defaultControls},null,8,["controls"])])}const ee=f(K,[["render",Z],["__scopeId","data-v-6e3867d4"],["__file","quoteInContent.vue"]]);const te={mixins:[y],components:{TextareaFormElement:R,SelectFormElement:$},componentType:"gallery",insertCaption:"Gallery",props:{type:String,title:String,template:String,items:Array},mounted(){this.setupReordering()},beforeUnmount(){this.drake&&this.drake.destroy()},methods:{updateItemCaption(e,t){this.updateComponent({items:this.items.map(o=>e===o?Object.assign({},o,{caption:t}):o)})},removeItem(e){this.confirmRemove(()=>{this.updateComponent({items:this.items.filter(t=>t!==e)})})},addItems(){this.$options.prepareDataModel(e=>{const t=this.items.map(p=>p.mediaId),o=e.items.filter(p=>t.indexOf(p.mediaId)<0);this.updateComponent({items:this.items.concat(o)})})},setupReordering(){const e=this.$refs.galleryItems;L(()=>import("./dragula-f0bbf3a7.js").then(t=>t.d),["assets/dragula-f0bbf3a7.js","assets/index-405e8ead.js","assets/index-119ad4cc.css"]).then(({default:t})=>{this.drake=t([e],{moves:(o,p,g,a)=>!!g.getAttribute("data-gallery-move-handle"),mirrorContainer:e,direction:"vertical"}),this.drake.on("drop",()=>{this.updateComponent({items:this.items.sort((o,p)=>S(this.$refs["galleryItem-"+o.mediaId][0])-S(this.$refs["galleryItem-"+p.mediaId][0]))})})})}},prepareDataModel(e){k.selectMany("media",t=>{e({title:"",template:"default",items:t.filter(o=>o.get("mediaType")==="image").map(o=>({mediaId:o.get("id"),caption:o.get("title")}))})},{controllerMethodParams:[{},{mediaType:"image"}]})}},oe=e=>(T("data-v-175d7c19"),e=e(),w(),e),ne={class:"galleryComponent"},ae={class:"galleryItems",ref:"galleryItems"},le=["src"],ie={class:"itemControls"},se=oe(()=>n("button",{type:"button","data-gallery-move-handle":"true",class:"itemControl nBtn icr iconMove"},"Move",-1)),re=["onClick"],de={class:"bottomControls"};function pe(e,t,o,p,g,a){const d=h("textarea-form-element"),c=h("select-form-element"),u=h("component-controls");return s(),r("div",ne,[m(d,{modelValue:o.title,attributes:{input:{class:"inputType2 fontBold",style:{fontSize:"20px",border:0},placeholder:"Gallery title",spellcheck:!1}},"onUpdate:modelValue":t[0]||(t[0]=l=>e.updateComponent({title:l}))},null,8,["modelValue"]),n("ul",ae,[(s(!0),r(C,null,v(o.items,l=>(s(),r("li",{key:l.mediaId,class:"galleryItem",ref_for:!0,ref:"galleryItem-"+l.mediaId},[n("img",{class:"galleryImage",src:"http://picsum.photos/200/150?random="+l.mediaId},null,8,le),m(d,{class:"galleryCaption",modelValue:l.caption,attributes:{input:{class:"inputType2",style:{border:0},placeholder:"Enter caption",spellcheck:!1}},"onUpdate:modelValue":i=>a.updateItemCaption(l,i)},null,8,["modelValue","onUpdate:modelValue"]),n("div",ie,[se,n("button",{type:"button",onClick:i=>a.removeItem(l),class:"itemControl nBtn icr iconTrash"},"Remove",8,re)])]))),128))],512),n("div",de,[n("button",{type:"button",class:"nBtn",onClick:t[1]||(t[1]=(...l)=>a.addItems&&a.addItems(...l))}," Add new items "),m(c,{modelValue:o.template,class:"templateSelect",selectOptions:[{caption:"Default template",value:"default"},{caption:"Fullscreen template",value:"fullscreen"}],attributes:{inputWrapper:{class:"selectType2 fullWidth"}},"onUpdate:modelValue":t[2]||(t[2]=l=>e.updateComponent({template:l}))},null,8,["modelValue"])]),m(u,{controls:e.defaultControls},null,8,["controls"])])}const me=f(te,[["render",pe],["__scopeId","data-v-175d7c19"],["__file","galleryInContent.vue"]]);const ce={mixins:[y,M],components:{TextareaFormElement:R},componentType:"table",insertCaption:"Table",props:{title:String,rows:Array},data:()=>({activeDropdown:null}),methods:{getRowsCopy(){return this.rows.map(e=>e.slice(0))},addRow(e){const t=this.getRowsCopy(),o=t[0].slice(0).map(p=>"");t.splice(e,0,o),this.updateComponent({rows:t}),this.closeDropdown()},removeRow(e){const t=this.getRowsCopy();t.splice(e,1),this.updateComponent({rows:t}),this.closeDropdown()},addColumn(){const e=this.getRowsCopy();e.forEach(t=>t.push("")),this.updateComponent({rows:e})},removeColumn(e){const t=this.getRowsCopy();t.forEach(o=>{o.splice(e,1)}),this.updateComponent({rows:t})},getInputAttributes(e){return{input:{class:"inputType2 "+(e==="heading"?"fontBold":""),style:{fontSize:"13px",border:0,padding:"0.8em"},placeholder:e==="heading"?"Heading":void 0}}},updateCell(e,t,o){const p=this.getRowsCopy();p[e][t]=o,this.updateComponent({rows:p})},toggleDropdown(e){this.activeDropdown===e?this.activeDropdown=null:this.activeDropdown=e},closeDropdown(){this.activeDropdown=null}},prepareDataModel(e){e({title:"",rows:[["Column","Column"],["",""],["",""]]})}},ue=e=>(T("data-v-2e94a0ae"),e=e(),w(),e),_e={class:"tableComponent"},he={class:"tableWrapper"},ge={class:"headCellWrapper"},Ce=["onClick"],fe={key:0,class:"dropdownList"},ve=["onClick"],be=ue(()=>n("th",{class:"dropdownCell"},null,-1)),ye={class:"dropdownCell"},Ie=["onClick"],Te={key:0,class:"dropdownList"},we=["onClick"],Re=["onClick"],De=["onClick"],Se={class:"bottomControls"};function Ee(e,t,o,p,g,a){const d=h("textarea-form-element"),c=h("component-controls"),u=B("on-dismiss");return s(),r("div",_e,[m(d,{modelValue:o.title,attributes:{input:{class:"inputType2 fontBold",style:{fontSize:"20px",border:0},placeholder:"Table title"}},"onUpdate:modelValue":t[0]||(t[0]=l=>e.updateComponent({title:l}))},null,8,["modelValue"]),m(c,{controls:e.defaultControls},null,8,["controls"]),n("div",he,[n("table",null,[n("thead",null,[n("tr",null,[(s(!0),r(C,null,v(o.rows[0],(l,i)=>(s(),r("th",{key:i},[n("div",ge,[m(d,{modelValue:l,attributes:a.getInputAttributes("heading"),"onUpdate:modelValue":_=>a.updateCell(0,i,_)},null,8,["modelValue","attributes","onUpdate:modelValue"]),n("div",{class:b(["dropdown",{active:e.activeDropdown==="column"+i}])},[n("button",{type:"button",onClick:_=>a.toggleDropdown("column"+i),class:"dropdownToggle nBtn icr iconMoreHorizontal",tabindex:"-1"},"More",8,Ce),e.activeDropdown==="column"+i?E((s(),r("ul",fe,[n("li",{onClick:_=>a.removeColumn(i)},"Remove column",8,ve)])),[[u,a.closeDropdown]]):I("",!0)],2)])]))),128)),be])]),n("tbody",null,[(s(!0),r(C,null,v(o.rows,(l,i)=>(s(),r(C,null,[i!==0?(s(),r("tr",{key:i},[(s(!0),r(C,null,v(l,(_,D)=>(s(),r("td",{key:D},[m(d,{modelValue:_,attributes:a.getInputAttributes("cell"),"onUpdate:modelValue":A=>a.updateCell(i,D,A)},null,8,["modelValue","attributes","onUpdate:modelValue"])]))),128)),n("td",ye,[n("div",{class:b(["dropdown",{active:e.activeDropdown==="row"+i}])},[n("button",{type:"button",onClick:_=>a.toggleDropdown("row"+i),class:"dropdownToggle nBtn icr iconMoreHorizontal",tabindex:"-1"},"More",8,Ie),e.activeDropdown==="row"+i?E((s(),r("ul",Te,[n("li",{onClick:_=>a.removeRow(i)},"Remove row",8,we),n("li",{onClick:_=>a.addRow(i)},"Insert row above",8,Re),n("li",{onClick:_=>a.addRow(i+1)},"Insert row bellow",8,De)])),[[u,a.closeDropdown]]):I("",!0)],2)])])):I("",!0)],64))),256))])])]),n("div",Se,[n("button",{type:"button",class:"nBtn",onClick:t[1]||(t[1]=l=>a.addRow(o.rows.length))}," Add new row "),n("button",{type:"button",class:"nBtn",onClick:t[2]||(t[2]=(...l)=>a.addColumn&&a.addColumn(...l))}," Add new column ")])])}const ke=f(ce,[["render",Ee],["__scopeId","data-v-2e94a0ae"],["__file","tableInContent.vue"]]),xe={resourceName:"article",resourceCaption:"title",cssClass:"articleResourceController",includedRelationships:{index:["author","tags"],edit:["author","media","tags"]},includedFields:{index:{article:["title","publishDate","published","intro","author","tags"]}},setupList({list:e}){this.addCreateControl("Create new article"),e.addFilter([["TextFormElement",{name:"title",label:"Title"}],["DateFormElement",{name:"publishDate",label:"Date"}],["SelectFormElement",{name:"published",label:"Status",selectOptions:[{caption:"All pages",value:""},{caption:"Published",value:"true"},{caption:"Unpublished",value:"false"}]}],["SelectFormElement",{name:"author",label:"Author",selectOptions:{resource:"user",mapCaptionTo:"email",prepend:[{caption:"All",value:""}]}}],["MultipleSelectFormElement",{name:"tags",label:"Tags",selectOptions:{resource:"tag",mapCaptionTo:"title"}}]]),e.addMassAction([{caption:"Publish",updateAttributes:{published:!0}},{caption:"Unpublish",updateAttributes:{published:!1}}]),e.addItem([["TextListItem",{caption:"ID",mapTo:"id",addIf:this.screenIsLarge}],["LinkListItem",{caption:"Title",mapTo:"title",action:"editItem",limitWords:7}],["TextListItem",{caption:"Intro text",mapTo:"intro",limitWords:20,attributes:{style:{marginBottom:"5px"}},addIf:this.screenIsSmall}],["DateListItem",{caption:"Date",mapTo:"publishDate",prependCaption:this.screenIsSmall}],["TextListItem",{caption:"Author",mapTo:"author.email"}],["TextListItem",{caption:"Tags",mapTo:"tags.title",prependCaption:this.screenIsSmall,ifEmpty:'<span style="opacity: 0.5">No tags</span>'}],["BlipListItem",{caption:"Published",mapTo:"published"}],["ContextMenuListItem",{caption:"Actions",items:[{caption:"Edit",action:"editItem"},{caption:"Delete",action:"deleteItem",confirm:!0}]}]])},setupEdit({edit:e}){this.addToIndexControl().addSaveControl(),e.observe("formData.title",t=>{e.toggleField("leadTitle",t!=="hideLeadTitle"),t==="freeze"&&(e.updateAllFields({editable:!1}),setTimeout(()=>{e.updateAllFields({editable:!0}),e.updateField("title",{value:"unfreeze"})},5e3))}).listen("definitionsResolved",()=>{}).configureLayout({"mainTab.caption":"Content and settings","seoTab.caption":"SEO and meta data"}),e.addField([["TextFormElement",{name:"leadTitle",attributes:{input:{placeholder:"Lead title",title:"Lead title",style:{border:0,textTransform:"uppercase",color:"#999999",letterSpacing:"0.02em"}},wrapper:{style:{margin:this.screenIsLarge?"1.5em 0 0 0":"0 0 0 0"}}},layoutReference:"mainTab.mainRegion"}],["TextareaFormElement",{name:"title",attributes:{input:{class:"inputType2 size2 fontBold",placeholder:"Article title",title:"Title",style:{border:"0"}},wrapper:{style:{margin:"0 0 -0.5em 0"}}},layoutReference:"mainTab.mainRegion"}],["TextareaFormElement",{name:"intro",attributes:{input:{placeholder:"Enter article intro text",title:"Intro",style:{border:0,lineHeight:"1.5",fontSize:this.screenIsLarge?"2em":void 0}}},layoutReference:"mainTab.mainRegion"}],["MediaFormElement",{label:"Main media",name:"media",mediaControllerQuery:{mediaType:"image"},relation:{resourceName:"media"},layoutReference:"mainTab.mainRegion"}],["HtmlComponentsFormElement",{label:"Content",name:"contentComponents",components:[J,ee,me,ke],context:{lang:"en"},layoutReference:"mainTab.mainRegion"}],["ExternalAdminFormElement",{name:"author",label:"Author",mapCaptionTo:"email",relation:{type:"hasOne",resourceName:"user"},layoutReference:"mainTab.sideRegion.group1"}],["DateFormElement",{name:"publishDate",label:"Date",layoutReference:"mainTab.sideRegion.group2"}],["StateSelectFormElement",{label:"Proof read",name:"proofreadStatus",updateEntityOnChange:!0,states:[{value:"0",name:"notProofread",caption:"Not proofread",actionCaption:"Proofread not needed",transitions:["proofreadNeeded"]},{value:"1",name:"proofreadNeeded",caption:"Proofread needed",transitions:["proofreadDone","notProofread"]},{value:"2",name:"proofreadDone",caption:"Proofread done",transitions:null}],addOnCreate:!1,hint:"Updates are saved on status change",layoutReference:"mainTab.sideRegion.group4"}],["StateSelectFormElement",{label:"Graphics status",name:"graphicsStatus",states:[{value:"0",name:"notApproved",caption:"Not approved",actionCaption:"Approve not needed",transitions:["approveNeeded"]},{value:"1",name:"approveNeeded",caption:"Approve Needed",transitions:["approved","notApproved"]},{value:"2",name:"approved",caption:"Approved",transitions:null}],layoutReference:"mainTab.sideRegion.group4"}],["CheckboxFormElement",{label:"Article is published",name:"published",layoutReference:"mainTab.sideRegion.group3"}],["TextFormElement",{name:"metaTitle",label:"Article meta title",layoutReference:"seoTab"}],["TextareaFormElement",{name:"metaDescription",label:"Article meta description",layoutReference:"seoTab"}],["MapFormElement",{label:"Location on map",name:"location",layoutReference:"seoTab"}]])}};export{xe as default};