(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{316:function(e,t,o){"use strict";o.r(t);var n=o(64),i=o(87),s=o(89),l=o(88),r={mixins:[o(17).a],props:{modelCollection:{type:Object,required:!0},definitions:{type:Object,required:!0},allModelsAreSelected:{type:Boolean,required:!0},selectAllModels:{type:Function,required:!0},deselectAllModels:{type:Function,required:!0},isModelSelected:{type:Function,required:!0},selectModel:{type:Function,required:!0},deselectModel:{type:Function,required:!0},treeItems:{type:Array,required:!0},expandNode:{type:Function,required:!0},collapseNode:{type:Function,required:!0}},methods:{toggleNode:function(e){e.expanded?this.collapseNode(e.model):this.expandNode(e.model)}}},d=o(1),a=Object(d.a)(r,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("table",{key:e.modelCollection.cid,staticClass:"tableType1 nested"},[o("thead",[e.definitions.massActions.length?o("th",{staticClass:"massActionCheckboxHeading"},[o("input",{staticClass:"checkboxType1 massActionCheckbox",attrs:{type:"checkbox",id:"mac-"+e.modelCollection.cid},domProps:{checked:e.allModelsAreSelected},on:{change:function(t){t.target.checked?e.selectAllModels():e.deselectAllModels()}}}),e._v(" "),o("label",{staticClass:"icr iconCheck",attrs:{for:"mac-"+e.modelCollection.cid}})]):e._e(),e._v(" "),e._l(e.definitions.listItems,function(t,n){return o("th",{key:n,class:t.Type.elementType+"CellHeading"},[e._v("\n            "+e._s(t.options.caption)+"\n        ")])})],2),e._v(" "),o("tbody",e._l(e.treeItems,function(t){return o("tr",{key:t.model.cid,class:{indented:t.level>1},style:{marginLeft:e.screenIsSmall?20*(t.level-1)+"px":void 0}},[e.definitions.massActions.length?o("td",{staticClass:"massActionCheckboxCell"},[o("input",{staticClass:"checkboxType1 massActionCheckbox",attrs:{type:"checkbox",id:"mac-"+t.model.cid},domProps:{checked:e.isModelSelected(t.model)},on:{change:function(o){o.target.checked?e.selectModel(t.model):e.deselectModel(t.model)}}}),e._v(" "),o("label",{staticClass:"icr iconCheck",attrs:{for:"mac-"+t.model.cid}})]):e._e(),e._v(" "),e._l(e.definitions.listItems,function(n,i){return o("td",{key:i,class:n.Type.elementType+"Cell"},[0===i?[e._l(t.spacers,function(e){return o("span",{key:e,staticClass:"treeSpacer"})}),t.expandable?o("button",{staticClass:"treeBtn nBtn icr iconPlus",attrs:{type:"button"},on:{click:function(o){return e.toggleNode(t)}}}):e._e()]:e._e(),e._v(" "),o(n.Type,e._b({tag:"component",attrs:{resourceModel:t.model}},"component",n.options,!1))],2)})],2)}),0)])},[],!1,null,null,null).exports,c=o(0),p={extends:i.a,props:{mapParentTo:{type:[Function,String],required:!0},mapChildrenTo:{type:[Function,String],required:!0},mapLevelTo:{type:[Function,String]},mapIsLeafTo:{type:[Function,String]},expandedResourceIds:{type:Array,required:!0},expandNode:{type:Function,required:!0},collapseNode:{type:Function,required:!0}},computed:{queryIsEmpty:function(){return Object(c.p)(this.query)},showSort:function(){return!this.queryIsEmpty&&(this.resolvedDefinitions&&this.resolvedDefinitions.sorts.length>1)},showPagination:function(){return!this.queryIsEmpty&&(this.paginationLimit&&this.modelsPresent)},rootResourceModels:function(){var e=this;return this.modelCollection?this.modelCollection.filter(function(t){return 0===e.getModelLevel(t)}):[]},treeItems:function(){var e=this,t=[];return this.rootResourceModels.forEach(function(o){return e.buildTree(o,t,1)}),t}},methods:{buildTree:function(e,t,o){var n=this,i=this.expandedResourceIds,s=!this.isLeaf(e),l=e.get("id"),r=i.indexOf(l)>=0,d=s?o-1:o;t.push({id:l,spacers:d,expanded:r,expandable:s,model:e,level:o}),r&&this.getModelChildren(e).forEach(function(e){n.buildTree(e,t,o+1)})},getModelLevel:function(e){if(this.mapLevelTo)return"function"==typeof this.mapLevelTo?this.mapLevelTo(e):e.get(this.mapLevelTo);var t=e.get(this.mapParentTo);return t?1+this.getModelLevel(t):0},isLeaf:function(e){return this.mapIsLeafTo?"function"==typeof this.mapIsLeafTo?this.mapIsLeafTo(e,this.modelCollection):e.get(this.mapIsLeafTo):!1===Boolean(this.getModelChildren(e))},getModelChildren:function(e){return"function"==typeof this.mapChildrenTo?this.mapChildrenTo(e,this.modelCollection):e.get(this.mapChildrenTo)},getAdditionalTemplateParams:function(){return this.queryIsEmpty?{treeItems:this.treeItems,expandNode:this.expandNode,collapseNode:this.collapseNode}:{}},getListTemplateType:function(){return this.queryIsEmpty?a:"table"===this.template?s.a:l.a},buildApiQuery:function(){var e=i.a.methods.buildApiQuery.apply(this,arguments);return this.queryIsEmpty&&delete e.page,e}}},u=Object(d.a)(p,void 0,void 0,!1,null,null,null).exports,h=o(61),m=n.a.extend({data:function(){return{mapParentTo:"parent",mapChildrenTo:"children",mapLevelTo:void 0,mapIsLeafTo:void 0,expandedResourceIds:[]}},methods:{getResourceListType:function(){return u},getAdditionalListProps:function(){var e=this;return{mapParentTo:this.mapParentTo,mapChildrenTo:this.mapChildrenTo,mapLevelTo:this.mapLevelTo,mapIsLeafTo:this.mapIsLeafTo,expandedResourceIds:this.expandedResourceIds,expandNode:function(t){return e.expandNode(t)},collapseNode:function(t){return e.collapseNode(t)}}},expandNode:function(e){this.expandedResourceIds.push(e.get("id"))},collapseNode:function(e){this.expandedResourceIds=this.expandedResourceIds.filter(function(t){return t!==e.get("id")})}}});m.getDataKeys=function(){return["mapParentTo","mapChildrenTo","mapLevelTo","mapIsLeafTo"]},m.toVueComponent=Object(h.a)({extends:m,dataKeys:n.a.getDataKeys().concat(m.getDataKeys())});var f=m,y=Object(d.a)(f,void 0,void 0,!1,null,null,null);t.default=y.exports}}]);