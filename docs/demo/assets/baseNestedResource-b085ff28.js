import{_ as f,G as b,o as n,b as r,g as a,l as p,F as l,r as h,n as m,t as k,Z as I,z as _,O as M,B as N,$ as T,a0 as x,a1 as q,a2 as P,y as v,N as L}from"./index-613732e6.js";const A={mixins:[b],props:{modelCollection:{type:Object,required:!0},definitions:{type:Object,required:!0},allModelsAreSelected:{type:Boolean,required:!0},selectAllModels:{type:Function,required:!0},deselectAllModels:{type:Function,required:!0},isModelSelected:{type:Function,required:!0},selectModel:{type:Function,required:!0},deselectModel:{type:Function,required:!0},treeItems:{type:Array,required:!0},expandNode:{type:Function,required:!0},collapseNode:{type:Function,required:!0}},methods:{toggleNode(e){e.expanded?this.collapseNode(e.model):this.expandNode(e.model)}}},R={key:0,class:"massActionCheckboxHeading"},F=["id","checked"],S=["for"],B={key:0,class:"massActionCheckboxCell"},E=["id","checked","onChange"],D=["for"],O=["onClick"];function z(e,t,s,g,y,c){return n(),r("table",{class:"tableType1 nested",key:s.modelCollection.cid},[a("thead",null,[s.definitions.massActions.length?(n(),r("th",R,[a("input",{type:"checkbox",id:"mac-"+s.modelCollection.cid,class:"checkboxType1 massActionCheckbox",checked:s.allModelsAreSelected,onChange:t[0]||(t[0]=o=>o.target.checked?s.selectAllModels():s.deselectAllModels())},null,40,F),a("label",{class:"icr iconCheck",for:"mac-"+s.modelCollection.cid},null,8,S)])):p("",!0),(n(!0),r(l,null,h(s.definitions.listItems,(o,i)=>(n(),r("th",{key:i,class:m(o.Type.elementType+"CellHeading")},k(o.options.caption),3))),128))]),a("tbody",null,[(n(!0),r(l,null,h(s.treeItems,o=>(n(),r("tr",{key:o.model.cid,style:I({marginLeft:e.screenIsSmall?(o.level-1)*20+"px":void 0}),class:m({indented:o.level>1})},[s.definitions.massActions.length?(n(),r("td",B,[a("input",{type:"checkbox",id:"mac-"+o.model.cid,class:"checkboxType1 massActionCheckbox",checked:s.isModelSelected(o.model),onChange:i=>i.target.checked?s.selectModel(o.model):s.deselectModel(o.model)},null,40,E),a("label",{class:"icr iconCheck",for:"mac-"+o.model.cid},null,8,D)])):p("",!0),(n(!0),r(l,null,h(s.definitions.listItems,(i,u)=>(n(),r("td",{key:u,class:m(i.Type.elementType+"Cell")},[u===0?(n(),r(l,{key:0},[(n(!0),r(l,null,h(o.spacers,C=>(n(),r("span",{key:C,class:"treeSpacer"}))),128)),o.expandable?(n(),r("button",{key:0,onClick:C=>c.toggleNode(o),type:"button",class:m(["treeBtn nBtn icr",o.expanded?"iconMinus":"iconPlus"])},null,10,O)):p("",!0)],64)):p("",!0),(n(),_(N(e.toRawComponentProps(i.Type)),M({resourceModel:o.model},i.options),null,16,["resourceModel"]))],2))),128))],6))),128))])])}const K=f(A,[["render",z],["__file","resourceListTree.vue"]]),Q={extends:T,props:{mapParentTo:{type:[Function,String],required:!0},mapChildrenTo:{type:[Function,String],required:!0},mapLevelTo:{type:[Function,String]},mapIsLeafTo:{type:[Function,String]},mapPositionTo:{type:[Function,String],required:!0},expandedResourceIds:{type:Array,required:!0},expandNode:{type:Function,required:!0},collapseNode:{type:Function,required:!0}},data(){return{useTreeTemplate:x(this.query)}},computed:{sortComparator(){const e=this.mapPositionTo;return typeof e=="function"?e:(t,s)=>t.get(e)-s.get(e)},queryIsEmpty(){return x(this.query)},showSort(){return this.queryIsEmpty?!1:this.resolvedDefinitions&&this.resolvedDefinitions.sorts.length>1},showPagination(){return this.queryIsEmpty?!1:this.paginationLimit&&this.modelsPresent},rootResourceModels(){return this.modelCollection?this.modelCollection.filter(e=>this.getModelLevel(e)===0).sort(this.sortComparator):[]},treeItems(){const e=[];return this.rootResourceModels.forEach(t=>this.buildTree(t,e,1)),e}},methods:{buildTree(e,t,s){const g=this.expandedResourceIds,y=!this.isLeaf(e),c=e.getId(),o=g.indexOf(c)>=0,i=y?s-1:s;t.push({id:c,spacers:i,expanded:o,expandable:y,model:e,level:s}),o&&this.getModelChildren(e).sort(this.sortComparator).forEach(u=>{this.buildTree(u,t,s+1)})},getModelLevel:function(e){if(this.mapLevelTo)return typeof this.mapLevelTo=="function"?this.mapLevelTo(e):e.get(this.mapLevelTo);{const t=e.get(this.mapParentTo);return t?1+this.getModelLevel(t):0}},isLeaf(e){return this.mapIsLeafTo?typeof this.mapIsLeafTo=="function"?this.mapIsLeafTo(e,this.modelCollection):e.get(this.mapIsLeafTo):this.getModelChildren(e).length===0},getModelChildren(e){const t=typeof this.mapChildrenTo=="function"?this.mapChildrenTo(e,this.modelCollection):e.get(this.mapChildrenTo);return t?t.models?t.models:t:[]},getAdditionalTemplateParams(){return this.useTreeTemplate?{treeItems:this.treeItems,expandNode:this.expandNode,collapseNode:this.collapseNode}:{}},getListTemplateType(){return this.useTreeTemplate?K:this.template==="table"?q:P},buildApiQuery(){const t=T.methods.buildApiQuery.apply(this,arguments);return this.queryIsEmpty&&delete t.page,t},runQuery(){return T.methods.runQuery.call(this).then(()=>{this.useTreeTemplate=this.queryIsEmpty})}}},V=f(Q,[["__file","resourceListNested.vue"]]),d={extends:L,data:()=>({mapParentTo:"parent",mapChildrenTo:"children",mapLevelTo:void 0,mapIsLeafTo:void 0,mapPositionTo:()=>0,expandedResourceIds:[]}),methods:{getResourceListType(){return V},getAdditionalListProps(){return{mapParentTo:this.mapParentTo,mapChildrenTo:this.mapChildrenTo,mapLevelTo:this.mapLevelTo,mapIsLeafTo:this.mapIsLeafTo,mapPositionTo:this.mapPositionTo,expandedResourceIds:this.expandedResourceIds,expandNode:e=>this.expandNode(e),collapseNode:e=>this.collapseNode(e)}},expandNode(e){this.expandedResourceIds.push(e.get("id"))},collapseNode(e){this.expandedResourceIds=this.expandedResourceIds.filter(t=>t!==e.get("id"))}}};d.getDataKeys=()=>["mapParentTo","mapChildrenTo","mapLevelTo","mapIsLeafTo","mapPositionTo"];d.toVueComponent=v({extends:d,dataKeys:L.getDataKeys().concat(d.getDataKeys())});const j=d,H=f(j,[["__file","baseNestedResource.vue"]]);export{H as default};
