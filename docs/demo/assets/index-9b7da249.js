import{_ as L,e as y,o,b as n,g as d,t as v,n as p,l as c,F as h,r as u,z as C,a4 as P,a5 as I,v as x,m as S,H as R,i as w,k,w as T,A as F,a6 as A,a7 as E,ai as N,s as m,x as D,u as B}from"./index-0c1d77fd.js";const O={name:"tree-node",props:{model:Object,expandedResourceIds:Array,getModelCaption:Function,onExpand:Function,onCollapse:Function,onSelect:Function,isLeaf:Function,getModelChildren:Function,isLevelSelectable:Function},computed:{caption(){return this.getModelCaption(this.model)},selectable(){return this.isLevelSelectable(this.model)},expandable(){return!this.isLeaf(this.model)},expanded(){return this.expandedResourceIds.indexOf(this.model.get("id"))>=0},children(){return this.expandable&&this.expanded?this.getModelChildren(this.model):[]}},methods:{toggleNode(){this.expanded?this.onCollapse(this.model):this.onExpand(this.model)}}},Q={key:1,class:"active"};function V(e,t,s,r,f,l){const g=y("tree-node",!0);return o(),n("li",null,[d("button",{type:"button",onClick:t[0]||(t[0]=a=>s.onSelect(s.model)),class:p([{selectableItem:l.selectable},"nBtn listItem"])},v(l.caption),3),l.expandable?(o(),n("button",{key:0,onClick:t[1]||(t[1]=(...a)=>l.toggleNode&&l.toggleNode(...a)),type:"button",class:p(["treeBtn nBtn icr",l.expanded?"iconMinus":"iconPlus"])},null,2)):c("",!0),l.expanded?(o(),n("ul",Q,[(o(!0),n(h,null,u(l.children,a=>(o(),C(g,{key:a.get("id"),model:a,expandedResourceIds:s.expandedResourceIds,getModelCaption:s.getModelCaption,onExpand:s.onExpand,onCollapse:s.onCollapse,onSelect:s.onSelect,isLeaf:s.isLeaf,isLevelSelectable:s.isLevelSelectable,getModelChildren:s.getModelChildren},null,8,["model","expandedResourceIds","getModelCaption","onExpand","onCollapse","onSelect","isLeaf","isLevelSelectable","getModelChildren"]))),128))])):c("",!0)])}const j=L(O,[["render",V],["__file","treeNode.vue"]]);const z={elementType:"nestedSelect",components:{ElementWrapper:P,TreeNode:j},mixins:[I,x],props:{modelValue:{type:String,default:""},mapCaptionTo:{type:[String,Function],default:"title"},mapSearchCaptionTo:{type:[String,Function]},mapParentTo:{type:[String,Function],default:"parent"},mapChildrenTo:{type:[String,Function],default:"children"},mapIsLeafTo:{type:[String,Function]},mapLevelTo:{type:[String,Function]},mapPositionTo:{type:[Function,String]},selectableLevel:{type:[String,Array,Function],default:"leaf"},getCollectionType:{type:Function,default:()=>S.Collection},getModelType:{type:Function,default:()=>S.Model},modelQuery:{type:Object},collectionQuery:{type:Object},select:{type:String,default:"one"},selectText:{type:String,default:()=>R("formElements.nestedSelect.selectText")},searchPlaceholder:{type:String,default:()=>R("formElements.nestedSelect.searchPlaceholder")}},data:()=>({loading:!1,relatedModels:void 0,dropdownActive:!1,resourceCollection:void 0,searchQuery:"",searchResults:void 0,searchPosition:0,expandedResourceIds:[]}),computed:{resourceName(){return this.relation&&this.relation.resourceName||this.name},selectsOne(){return this.relation&&this.relation.type?this.relation.type==="hasOne":this.select==="one"},sortComparator(){const e=typeof this.mapPositionTo<"u"?this.mapPositionTo:()=>0;return typeof e=="function"?e:(t,s)=>t.get(e)-s.get(e)},rootResourceModels(){return this.resourceCollection?this.resourceCollection.filter(e=>this.getModelLevel(e)===0).sort(this.sortComparator):[]},inputWrapperAttributes(){const e=this.normalizeAttributes(this.attributes.inputWrapper);return e.class=["nestedSelectElement",this.selectsOne?"hasOne":"hasMany",this.relatedModels&&"hasItems",this.dropdownActive&&"active",this.searchIsActive&&"searchActive",this.loading&&"loading",e.class||""].filter(t=>t).join(" "),e},searchIsActive(){return this.searchQuery.length>0&&this.searchResults}},watch:{modelValue:"syncRelatedModels",searchQuery:"runSearch"},created(){this.syncRelatedModels()},methods:{getModelCaption(e){return typeof this.mapCaptionTo=="function"?this.mapCaptionTo(e):e.get(this.mapCaptionTo)},getModelSearchCaption(e){if(this.mapSearchCaptionTo)return typeof this.mapSearchCaptionTo=="function"?this.mapSearchCaptionTo(e):e.get(this.mapSearchCaptionTo)},expandNode(e){this.expandedResourceIds.push(e.get("id"))},collapseNode(e){this.expandedResourceIds=this.expandedResourceIds.filter(t=>t!==e.get("id"))},selectModel(e){this.isLevelSelectable(e)&&(this.selectsOne?(this.relatedModels=[e],this.closeDropdown()):this.relatedModels?this.relatedModels.filter(s=>s.get("id")===e.get("id")).length>0||this.relatedModels.push(e):this.relatedModels=[e],this.$emit("update:modelValue",this.relatedModels.map(t=>t.get("id")).join(",")))},deselectModel(e){return this.relatedModels&&(this.relatedModels=this.relatedModels.filter(t=>t.get("id")!==e.get("id")),this.relatedModels.length===0&&(this.relatedModels=void 0)),this.$emit("update:modelValue",this.relatedModels?this.relatedModels.map(t=>t.get("id")).join(","):""),this},toggleDropdown(){this.dropdownActive?this.closeDropdown():this.openDropdown()},openDropdown(){this.dropdownActive=!0,this.getResourceCollection().then(()=>this.$nextTick()).then(()=>this.$refs.searchInput.focus())},closeDropdown(){this.dropdownActive=!1,this.searchPosition=0},isLevelSelectable(e){const t=this.selectableLevel;if(t==="leaf")return this.isLeaf(e);if(t==="all")return!0;if(Array.isArray(t))return t.indexOf(this.getModelLevel(e))>=0;if(typeof t=="function")return t({model:e,nestedSelect:this})},isLeaf(e){return this.mapIsLeafTo?typeof this.mapIsLeafTo=="function"?this.mapIsLeafTo(e,this.resourceCollection):e.get(this.mapIsLeafTo):this.getModelChildren(e).length===0},getModelLevel:function(e){if(this.mapLevelTo)return typeof this.mapLevelTo=="function"?this.mapLevelTo(e):e.get(this.mapLevelTo);{const t=e.get(this.mapParentTo);return t?1+this.getModelLevel(t):0}},getModelChildren(e){const t=typeof this.mapChildrenTo=="function"?this.mapChildrenTo(e,this.resourceCollection):e.get(this.mapChildrenTo);return t?t.models?t.models:t:[]},syncRelatedModels(){const e=this.modelValue.split(",").filter(s=>s.length),t=this.getModelType();if(e.length===0)return this.relatedModels=void 0,Promise.resolve(this.relatedModels);if(this.relatedModels&&this.areCollectionsAligned(e,this.relatedModels))return Promise.resolve(this.relatedModels);if(this.resourceModel){const s=this.resourceModel.get(this.name);if(s){const r=s.models||[s];if(this.areCollectionsAligned(e,r))return this.relatedModels=r,Promise.resolve(this.relatedModels)}}return this.loading=!0,Promise.all(e.map(s=>t.getFromApi({type:this.resourceName,id:s,query:this.modelQuery}))).then(s=>(this.loading=!1,this.relatedModels=s,s))},areCollectionsAligned(e,t){const s=e.length===t.length,r=e.every(f=>t.filter(l=>l.get("id")===f).length===1);return s&&r},getResourceCollection(){const e=this.getCollectionType();return this.resourceCollectionPromise||(this.loading=!0,this.resourceCollectionPromise=e.getFromApi({type:this.resourceName,query:this.collectionQuery}).then(t=>(this.loading=!1,this.resourceCollection=t,t))),this.resourceCollectionPromise},setupSearchEngine(){return this.searchEnginePromise||(this.searchEnginePromise=w(()=>import("./fuse.esm-7d6937a9.js"),[]).then(({default:e})=>{const t=this.resourceCollection.filter(s=>this.isLevelSelectable(s)).map(s=>({id:s.get("id"),caption:this.getModelCaption(s),searchCaption:this.getModelSearchCaption(s)}));return new e(t,{keys:["caption"],threshold:.4})})),this.searchEnginePromise},runSearch(){clearTimeout(this.searchTimeout),this.searchQuery.length!==0&&(this.searchTimeout=setTimeout(()=>{this.searchPosition=0,this.getResourceCollection().then(()=>this.setupSearchEngine()).then(e=>{this.searchResults=e.search(this.searchQuery).map((t,s)=>(t.item.selected=s===0,t.item))})},100))},selectFocusedItem(){this.searchResults&&this.selectSearchResult(this.searchResults[this.searchPosition])},selectSearchResult(e){this.selectModel(this.resourceCollection.getModel(e.id))},focusNextResult(){this.focusSearchResult(this.searchPosition+1)},focusPrevResult(){this.focusSearchResult(this.searchPosition-1)},focusSearchResult(e){if(this.searchResults&&this.searchResults.length){const t=this.searchResults.length-1;e<0?e=t:e>t&&(e=0),this.searchPosition=e,this.searchResults.forEach((s,r)=>{s.selected=r===e})}}}},H={class:"controls"},W=["onClick"],K={key:0,class:"dropdown"},q={class:"search iconSearch"},U=["placeholder"],G={key:0,class:"searchResults"},J=["innerHTML","onMouseover","onClick"],X={key:0,class:"noSearchResults"},Y={class:"itemList"};function Z(e,t,s,r,f,l){const g=y("tree-node"),a=y("element-wrapper"),b=k("on-dismiss");return T((o(),C(a,A(E(e.elementWrapperProps)),{default:F(()=>[d("div",H,[(o(!0),n(h,null,u(e.relatedModels,i=>(o(),n("div",{key:i.get("id"),class:"item"},[N(v(l.getModelCaption(i))+" ",1),e.isInteractive?(o(),n("button",{key:0,type:"button",onClick:M=>e.isInteractive&&l.deselectModel(i),class:"removeBtn iconClose icr nBtn"},null,8,W)):c("",!0)]))),128)),d("button",{type:"button",onClick:t[0]||(t[0]=i=>e.isInteractive&&l.toggleDropdown()),class:p(["openBtn nBtn",{iconMoreHorizontal:e.isInteractive}])},v(s.modelValue?"":s.selectText),3)]),e.dropdownActive&&e.isInteractive&&!e.loading?(o(),n("div",K,[d("div",q,[T(d("input",{type:"text",class:"searchInput","onUpdate:modelValue":t[1]||(t[1]=i=>e.searchQuery=i),ref:"searchInput",placeholder:s.searchPlaceholder,onKeyup:[t[2]||(t[2]=m(i=>l.focusNextResult(),["down"])),t[3]||(t[3]=m(i=>l.focusPrevResult(),["up"]))],onKeydown:t[4]||(t[4]=m(D((...i)=>l.selectFocusedItem&&l.selectFocusedItem(...i),["prevent"]),["enter"]))},null,40,U),[[B,e.searchQuery]]),e.searchResults?(o(),n("div",G,[(o(!0),n(h,null,u(e.searchResults,(i,M)=>(o(),n("span",{key:i.id,class:p(["searchResultItem",{focused:i.selected}]),innerHTML:i.searchCaption||i.caption,onMouseover:_=>l.focusSearchResult(M),onClick:_=>l.selectSearchResult(i)},null,42,J))),128)),e.searchResults.length===0?(o(),n("p",X,"No results")):c("",!0)])):c("",!0)]),d("ul",Y,[(o(!0),n(h,null,u(l.rootResourceModels,i=>(o(),C(g,{key:i.get("id"),model:i,expandedResourceIds:e.expandedResourceIds,getModelCaption:l.getModelCaption,onExpand:l.expandNode,onCollapse:l.collapseNode,onSelect:l.selectModel,isLeaf:l.isLeaf,isLevelSelectable:l.isLevelSelectable,getModelChildren:l.getModelChildren},null,8,["model","expandedResourceIds","getModelCaption","onExpand","onCollapse","onSelect","isLeaf","isLevelSelectable","getModelChildren"]))),128))])])):c("",!0)]),_:1},16)),[[b,{callback:l.closeDropdown,watch:e.dropdownActive}]])}const ee=L(z,[["render",Z],["__file","index.vue"]]);export{ee as default};
