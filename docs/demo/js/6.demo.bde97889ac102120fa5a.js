(window.webpackJsonp=window.webpackJsonp||[]).push([[6,13],{233:function(t,n,e){var o=e(245);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,e(4).default)("82a4a07c",o,!0,{})},235:function(t,n,e){"use strict";e.d(n,"a",function(){return r});var o=e(6),i=e(16);function r(){return window.CKEDITOR_BASEPATH=Object(o.a)("ckEditorPath","https://cdn.ckeditor.com/4.11.4/standard-all/"),e.e(24).then(e.t.bind(null,264,7)).then(function(){var t=i.a.getLocale(),n=window.CKEDITOR;return n.disableAutoInline=!0,n.config.defaultLanguage=t,n.config.language=t,n.config.extraPlugins="sourcedialog",n.config.entities=!1,n.customStyles={richCombo:"\n                .body, html { margin: 0; padding: 0; }\n                .cke_panel_block { padding: 5px 0; outline: none !important; }\n                .cke_panel_list { list-style:none; padding: 0; margin: 0; }\n                .cke_panel_listItem { padding: 0; margin; 0; }\n                .cke_panel_listItem a { font-family: Arial; display:block; padding: 5px 10px; text-decoration:none; font-size: 13px; color: #303030; }\n                .cke_panel_listItem a:hover { background-color: #ededed; }\n            "},n})}},244:function(t,n,e){"use strict";var o=e(233);e.n(o).a},245:function(t,n,e){(t.exports=e(3)(!1)).push([t.i,".htmlInputType1 {\n  font-family: Roboto, sans-serif;\n  font-weight: 400;\n  font-style: normal;\n  font-size: 1.6em;\n  outline: none;\n  margin-bottom: 1.875em;\n  min-height: 1.375em;\n  padding: 0.625em 0;\n  border-bottom: 1px solid #dddddd;\n}\n.htmlInputType1 > p, .htmlInputType1 > ul, .htmlInputType1 > ol {\n    margin-bottom: 1.5625em;\n    line-height: 1.4;\n    color: #303030;\n}\n.htmlInputType1 > p:last-child, .htmlInputType1 > ul:last-child, .htmlInputType1 > ol:last-child {\n      margin-bottom: 0;\n}\n.htmlInputType1 > ul > li {\n    padding-left: 1.25em;\n    position: relative;\n    margin-bottom: 0.625em;\n}\n.htmlInputType1 > ul > li:before {\n      content: '';\n      position: absolute;\n      left: 0;\n      top: 0.5em;\n      width: 0.3125em;\n      height: 0.3125em;\n      background: #303030;\n      border-radius: 50%;\n}\n.htmlInputType1 > ol {\n    list-style-type: decimal;\n}\n.htmlInputType1 > ol > li {\n    list-style-type: decimal;\n    padding-left: 0.9375em;\n    margin-left: 1.25em;\n    margin-bottom: 0.625em;\n}\n.htmlInputType1 > h1, .htmlInputType1 > h2, .htmlInputType1 > h3 {\n    font-size: 1.5625em;\n    margin-bottom: 1em;\n    line-height: 1.3;\n}\n.htmlInputType1 > h1 {\n    font-size: 1.625em;\n}\n.htmlInputType1 > h2 {\n    font-size: 1.375em;\n}\n.htmlInputType1 > h3 {\n    font-size: 1.125em;\n}\n.htmlInputType1 a {\n    color: #303030;\n    text-decoration: underline;\n    -webkit-text-decoration-color: #e03431;\n       -moz-text-decoration-color: #e03431;\n            text-decoration-color: #e03431;\n}\n.htmlInputType1:empty:before {\n    font-size: 1.6em;\n    content: attr(placeholder);\n    display: block;\n    color: #666;\n    pointer-events: none;\n}\n",""])},246:function(t,n,e){var o=e(283);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,e(4).default)("685171fa",o,!0,{})},247:function(t,n,e){var o=e(285);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,e(4).default)("0554bfe8",o,!0,{})},265:function(t,n,e){"use strict";e.r(n);var o=e(11),i=e(12),r=e(235),a=e(0),s={elementType:"html",components:{ElementWrapper:i.a},mixins:[o.a],props:{value:{type:String,default:""},editorConfig:{type:Object}},data:function(){return{editorValue:this.value}},watch:{value:function(t){t!==this.editorValue&&this.editor&&(this.editorValue=t,this.editor.setData(t))}},mounted:function(){var t=this;this.$watch("isInteractive",function(n){n?t.setupEditor():t.disableEditor()},{immediate:!0})},beforeDestroy:function(){this.disableEditor()},methods:{disableEditor:function(){this.editor&&this.editor.destroy(),delete this.editor},setupEditor:function(){var t=this;return Object(r.a)().then(function(n){var e=Object(a.b)({startupShowBorders:!0,toolbar:[{name:"basicstyles",items:["Bold","Italic","Strike","RemoveFormat"]},{name:"paragraph",items:["NumberedList","BulletedList"]},{name:"links",items:["Link","Unlink"]},{name:"format",items:["Format"]},{name:"document",items:["Sourcedialog"]}],removePlugins:"magicline",format_tags:"p;h1;h2;h3"},t.editorConfig),o=t.editor=n.inline(t.$refs.content,e);return o.on("instanceReady",function(){return o.setReadOnly(!1)}),o.on("change",function(){var n=o.getData();t.editorValue=n,t.$emit("input",n)}),o})}}},l=(e(244),e(1)),c=Object(l.a)(s,function(){var t=this.$createElement;return(this._self._c||t)("element-wrapper",this._b({},"element-wrapper",this.elementWrapperProps,!1),[this._m(0)])},[function(){var t=this.$createElement;return(this._self._c||t)("div",this._b({ref:"content",attrs:{contenteditable:this.isInteractive},domProps:{innerHTML:this._s(this.value)}},"div",this.inputAttributes,!1))}],!1,null,null,null);n.default=c.exports},282:function(t,n,e){"use strict";var o=e(246);e.n(o).a},283:function(t,n,e){(t.exports=e(3)(!1)).push([t.i,".ck_add_components .cke_combo_text {\n  width: auto;\n}\n",""])},284:function(t,n,e){"use strict";var o=e(247);e.n(o).a},285:function(t,n,e){(t.exports=e(3)(!1)).push([t.i,'.htmlComponentsType1::after {\n  clear: both;\n  content: "";\n  display: table;\n}\n.htmlComponentsType1 .htmlInputType1 > .htmlCustomComponent {\n  font-size: 0.625em;\n}\n.htmlComponentsType1 .htmlInputType1:not(:last-child) {\n  margin-bottom: 0.9375em;\n  border: 0;\n}\n.htmlComponentsType1 .htmlInputType1:last-child {\n  margin-bottom: 0;\n}\n',""])},347:function(t,n,e){"use strict";e.r(n);var o=e(11),i=e(12),r=e(0),a=e(235),s=e(2),l=(e(265),{props:{content:String,clientId:String,editorConfig:Object,inputAttributes:Object,type:String,components:Array,context:Object},data:function(){return{editorContent:this.content}},watch:{content:function(t){t!==this.editorContent&&this.editor&&(this.editorContent=t,this.editor.setData(t))}},mounted:function(){this.setupEditor()},beforeDestroy:function(){this.editor&&this.editor.destroy()},methods:{setupEditor:function(){var t=this;return Object(a.a)().then(function(n){var e=Object.assign({startupShowBorders:!1,toolbar:[{name:"basicstyles",items:["Bold","Italic","Strike","RemoveFormat"]},{name:"paragraph",items:["NumberedList","BulletedList","ComponentSelector"]},{name:"links",items:["Link","Unlink"]},{name:"format",items:["Format"]},{name:"document",items:["Sourcedialog"]}],removePlugins:"magicline",format_tags:"p;h1;h2;h3"},t.editorConfig),o=t.editor=n.inline(t.$refs.content,e);return o.on("instanceReady",function(){return o.setReadOnly(!1)}),o.on("change",function(){var n=o.getData();t.editorContent=n,t.$emit("updateContent",{clientId:t.clientId,content:n})}),t.setupInsertDropdown(o,n),o})},setupInsertDropdown:function(t,n){var e=Object(s.a)("formElements.htmlComponents.insertComponentCaption"),o=this.components.filter(function(t){return Boolean(t)}),i=this;0!==o.length&&t.ui.addRichCombo("ComponentSelector",{label:e,title:e,voiceLabel:e,className:"ck_add_components",panel:{css:n.customStyles.richCombo},init:function(){var t=this;o.forEach(function(n){t.add(n.componentType,Object(r.x)(n.insertCaption),Object(r.x)(n.insertCaption))})},onClick:function(n){i.prepareInsertEvent(n,t.getSelection().getRanges()[0]),t.focusManager.blur(!0)}})},splitContentByIndex:function(t){for(var n=["",""],e=0,o=this.editor.container.getChild(0);o;){var i=o.getOuterHtml().trim();n[e<t?0:1]+=i,o=o.getNext(),e++}return n},prepareInsertEvent:function(t,n){for(var e=this,o=this.components.find(function(n){return n.componentType===t}),i=n.startContainer;i.getParent().$!==this.editor.element.$;)i=i.getParent();o.prepareDataModel(function(t){var r=null,a={clientId:e.clientId,component:Object.assign({type:o.componentType},t)};if(0!==n.startOffset||i.hasPrevious()?0===n.startOffset&&i.hasPrevious()?(a.placement="split",r=i.getPrevious()):i.hasNext()?(a.placement="split",r=i):a.placement="after":a.placement="before",r){for(var s=[],l=[r],c=r;c.hasPrevious();)c=c.getPrevious(),l.push(c);for(c=r;c.hasNext();)c=c.getNext(),s.push(c);a.content=l.reverse().filter(function(t){return t.getText().trim()}).map(function(t){return t.getOuterHtml()}).join("").trim(),a.contentCut=s.filter(function(t){return t.getText().trim()}).map(function(t){return t.getOuterHtml()}).join("").trim()}e.$emit("insertComponent",a)},this.context)}}}),c=(e(282),e(1)),u=Object(c.a)(l,function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement;return(this._self._c||t)("div",this._b({ref:"content",domProps:{innerHTML:this._s(this.content)}},"div",this.inputAttributes,!1))}],!1,null,null,null).exports;function p(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var e=[],o=!0,i=!1,r=void 0;try{for(var a,s=t[Symbol.iterator]();!(o=(a=s.next()).done)&&(e.push(a.value),!n||e.length!==n);o=!0);}catch(t){i=!0,r=t}finally{try{o||null==s.return||s.return()}finally{if(i)throw r}}return e}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var m=0,d=function(){return(Date.now()+ ++m).toString()},h={elementType:"htmlComponents",components:{ElementWrapper:i.a,HtmlEditor:u},mixins:[o.a],props:{value:{type:Array,default:function(){return[{clientId:d(),type:"html",content:""}]}},components:{type:Array,default:function(){return[]}},editorConfig:{type:Object},context:{type:Object}},computed:{sanitizedInputAttributes:function(){var t=Object.assign({},this.inputAttributes);return["id","name"].forEach(function(n){return delete t[n]}),t}},mounted:function(){var t=this,n=this.$watch("value",function(e){e.length>1&&t.$nextTick(function(){t.setupDragAndDrop(),n()})},{immediate:!0});0===this.value.length&&this.$emit("input",[{clientId:d(),type:"html",content:""}])},beforeDestroy:function(){this.drake&&this.drake.destroy()},methods:{getComponent:function(t){return this.components.find(function(n){return n.componentType===t.type})},updateComponent:function(t){this.$emit("input",this.value.map(function(n){return n.clientId===t.clientId?Object.assign({},n,t):n}))},insertComponent:function(t){this.$emit("input",this.normalize(this.prepInsert(this.value,t)))},prepInsert:function(t,n){var e=function(t){return Object.assign({clientId:d()},t)};return t.reduce(function(t,o){return o.clientId===n.clientId?"after"===n.placement?(t.push(o),t.push(e(n.component))):"before"===n.placement?(t.push(e(n.component)),t.push(o)):"split"===n.placement&&(t.push(Object.assign({},o,{content:n.content})),t.push(e(n.component)),n.contentCut&&t.push({clientId:d(),type:"html",content:n.contentCut})):t.push(o),t},[])},deleteComponent:function(t){this.$emit("input",this.normalize(this.value.filter(function(n){return n.clientId!==t})))},normalize:function(t){var n=t.reduce(function(t,n){var e=t.length,o=e>=1?t[e-1]:null;return"html"===n.type&&o&&"html"===o.type?t[e-1]=Object.assign({},o,{content:o.content+n.content}):t.push(n),t},[]),e=n.length;return 0!==e&&"html"===n[e-1].type||n.push({clientId:d(),type:"html",content:""}),n},setupDragAndDrop:function(){var t=this,n=this.$refs.inputWrapper;e.e(0).then(e.t.bind(null,335,7)).then(function(e){var o=e.default;t.drake=o([n],{isContainer:function(t){return Boolean(t.getAttribute("contenteditable"))||t===n},moves:function(t,e,o,i){var r=Boolean(o.getAttribute("data-sort-handle")),a=n.contains(o);return r&&a},mirrorContainer:n,direction:"vertical"}),t.drake.on("drop",function(n,e,o,i){var a=t.value;if(e.getAttribute("contenteditable")){t.drake.cancel(function(){return!1});var s,l,c,u=t.getComponentByEl(n),m=t.getComponentByEl(e),d=a.find(function(t){return t.clientId===u.clientId});if(a=a.filter(function(t){return t.clientId!==u.clientId}),i){var h=Object(r.i)(i);if(0===h)s="before";else{s="split";var f=p(m.splitContentByIndex(h),2);l=f[0],c=f[1]}}else s="after";a=t.prepInsert(a,{clientId:m.clientId,component:d,placement:s,content:l,contentCut:c})}else a.sort(function(n,e){return t.getComponentDomIndex(n.clientId)-t.getComponentDomIndex(e.clientId)});t.$emit("input",t.normalize(a))})})},getComponentByEl:function(t){return this.$refs.componentInstances.find(function(n){return n.$el===t})},getComponentDomIndex:function(t){var n=this.$refs.componentInstances.find(function(n){return n.clientId===t});return Object(r.i)(n.$el)}}},f=(e(284),Object(c.a)(h,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("element-wrapper",t._b({attrs:{renderInputWrapper:!1}},"element-wrapper",t.elementWrapperProps,!1),[e("div",t._b({ref:"inputWrapper"},"div",t.inputWrapperAttributes,!1),[t._l(t.value,function(n){return["html"===n.type?e("html-editor",t._b({key:n.clientId,ref:"componentInstances",refInFor:!0,attrs:{context:t.context,inputAttributes:t.sanitizedInputAttributes,editorConfig:t.editorConfig,components:t.components},on:{updateContent:t.updateComponent,insertComponent:t.insertComponent}},"html-editor",n,!1)):e(t.getComponent(n),t._b({key:n.clientId,ref:"componentInstances",refInFor:!0,tag:"component",staticClass:"htmlCustomComponent",attrs:{context:t.context},on:{updateComponent:t.updateComponent,deleteComponent:t.deleteComponent}},"component",n,!1))]})],2)])},[],!1,null,null,null));n.default=f.exports}}]);