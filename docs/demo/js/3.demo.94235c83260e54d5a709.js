(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{239:function(e,t,i){var n=i(272);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,i(4).default)("35a10edc",n,!0,{})},240:function(e,t,i){var n=i(274);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,i(4).default)("ded9ae04",n,!0,{})},241:function(e,t,i){var n=i(276);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,i(4).default)("06bbca38",n,!0,{})},271:function(e,t,i){"use strict";var n=i(239);i.n(n).a},272:function(e,t,i){(e.exports=i(3)(!1)).push([e.i,'fieldset[disabled] .multiselect{pointer-events:none}.multiselect__spinner{position:absolute;right:1px;top:1px;width:48px;height:35px;background:#fff;display:block}.multiselect__spinner:after,.multiselect__spinner:before{position:absolute;content:"";top:50%;left:50%;margin:-8px 0 0 -8px;width:16px;height:16px;border-radius:100%;border:2px solid transparent;border-top-color:#41b883;box-shadow:0 0 0 1px transparent}.multiselect__spinner:before{animation:spinning 2.4s cubic-bezier(.41,.26,.2,.62);animation-iteration-count:infinite}.multiselect__spinner:after{animation:spinning 2.4s cubic-bezier(.51,.09,.21,.8);animation-iteration-count:infinite}.multiselect__loading-enter-active,.multiselect__loading-leave-active{transition:opacity .4s ease-in-out;opacity:1}.multiselect__loading-enter,.multiselect__loading-leave-active{opacity:0}.multiselect,.multiselect__input,.multiselect__single{font-family:inherit;font-size:16px;-ms-touch-action:manipulation;touch-action:manipulation}.multiselect{box-sizing:content-box;display:block;position:relative;width:100%;min-height:40px;text-align:left;color:#35495e}.multiselect *{box-sizing:border-box}.multiselect:focus{outline:none}.multiselect--disabled{background:#ededed;pointer-events:none;opacity:.6}.multiselect--active{z-index:50}.multiselect--active:not(.multiselect--above) .multiselect__current,.multiselect--active:not(.multiselect--above) .multiselect__input,.multiselect--active:not(.multiselect--above) .multiselect__tags{border-bottom-left-radius:0;border-bottom-right-radius:0}.multiselect--active .multiselect__select{transform:rotate(180deg)}.multiselect--above.multiselect--active .multiselect__current,.multiselect--above.multiselect--active .multiselect__input,.multiselect--above.multiselect--active .multiselect__tags{border-top-left-radius:0;border-top-right-radius:0}.multiselect__input,.multiselect__single{position:relative;display:inline-block;min-height:20px;line-height:20px;border:none;border-radius:5px;background:#fff;padding:0 0 0 5px;width:100%;transition:border .1s ease;box-sizing:border-box;margin-bottom:8px;vertical-align:top}.multiselect__input:-ms-input-placeholder{color:#35495e}.multiselect__input::placeholder{color:#35495e}.multiselect__tag~.multiselect__input,.multiselect__tag~.multiselect__single{width:auto}.multiselect__input:hover,.multiselect__single:hover{border-color:#cfcfcf}.multiselect__input:focus,.multiselect__single:focus{border-color:#a8a8a8;outline:none}.multiselect__single{padding-left:5px;margin-bottom:8px}.multiselect__tags-wrap{display:inline}.multiselect__tags{min-height:40px;display:block;padding:8px 40px 0 8px;border-radius:5px;border:1px solid #e8e8e8;background:#fff;font-size:14px}.multiselect__tag{position:relative;display:inline-block;padding:4px 26px 4px 10px;border-radius:5px;margin-right:10px;color:#fff;line-height:1;background:#41b883;margin-bottom:5px;white-space:nowrap;overflow:hidden;max-width:100%;text-overflow:ellipsis}.multiselect__tag-icon{cursor:pointer;margin-left:7px;position:absolute;right:0;top:0;bottom:0;font-weight:700;font-style:normal;width:22px;text-align:center;line-height:22px;transition:all .2s ease;border-radius:5px}.multiselect__tag-icon:after{content:"\\D7";color:#266d4d;font-size:14px}.multiselect__tag-icon:focus,.multiselect__tag-icon:hover{background:#369a6e}.multiselect__tag-icon:focus:after,.multiselect__tag-icon:hover:after{color:#fff}.multiselect__current{min-height:40px;overflow:hidden;padding:8px 30px 0 12px;white-space:nowrap;border-radius:5px;border:1px solid #e8e8e8}.multiselect__current,.multiselect__select{line-height:16px;box-sizing:border-box;display:block;margin:0;text-decoration:none;cursor:pointer}.multiselect__select{position:absolute;width:40px;height:38px;right:1px;top:1px;padding:4px 8px;text-align:center;transition:transform .2s ease}.multiselect__select:before{position:relative;right:0;top:65%;color:#999;margin-top:4px;border-color:#999 transparent transparent;border-style:solid;border-width:5px 5px 0;content:""}.multiselect__placeholder{color:#adadad;display:inline-block;margin-bottom:10px;padding-top:2px}.multiselect--active .multiselect__placeholder{display:none}.multiselect__content-wrapper{position:absolute;display:block;background:#fff;width:100%;max-height:240px;overflow:auto;border:1px solid #e8e8e8;border-top:none;border-bottom-left-radius:5px;border-bottom-right-radius:5px;z-index:50;-webkit-overflow-scrolling:touch}.multiselect__content{list-style:none;display:inline-block;padding:0;margin:0;min-width:100%;vertical-align:top}.multiselect--above .multiselect__content-wrapper{bottom:100%;border-bottom-left-radius:0;border-bottom-right-radius:0;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:none;border-top:1px solid #e8e8e8}.multiselect__content::webkit-scrollbar{display:none}.multiselect__element{display:block}.multiselect__option{display:block;padding:12px;min-height:40px;line-height:16px;text-decoration:none;text-transform:none;vertical-align:middle;position:relative;cursor:pointer;white-space:nowrap}.multiselect__option:after{top:0;right:0;position:absolute;line-height:40px;padding-right:12px;padding-left:20px;font-size:13px}.multiselect__option--highlight{background:#41b883;outline:none;color:#fff}.multiselect__option--highlight:after{content:attr(data-select);background:#41b883;color:#fff}.multiselect__option--selected{background:#f3f3f3;color:#35495e;font-weight:700}.multiselect__option--selected:after{content:attr(data-selected);color:silver}.multiselect__option--selected.multiselect__option--highlight{background:#ff6a6a;color:#fff}.multiselect__option--selected.multiselect__option--highlight:after{background:#ff6a6a;content:attr(data-deselect);color:#fff}.multiselect--disabled .multiselect__current,.multiselect--disabled .multiselect__select{background:#ededed;color:#a6a6a6}.multiselect__option--disabled{background:#ededed!important;color:#a6a6a6!important;cursor:text;pointer-events:none}.multiselect__option--group{background:#ededed;color:#35495e}.multiselect__option--group.multiselect__option--highlight{background:#35495e;color:#fff}.multiselect__option--group.multiselect__option--highlight:after{background:#35495e}.multiselect__option--disabled.multiselect__option--highlight{background:#dedede}.multiselect__option--group-selected.multiselect__option--highlight{background:#ff6a6a;color:#fff}.multiselect__option--group-selected.multiselect__option--highlight:after{background:#ff6a6a;content:attr(data-deselect);color:#fff}.multiselect-enter-active,.multiselect-leave-active{transition:all .15s ease}.multiselect-enter,.multiselect-leave-active{opacity:0}.multiselect__strong{margin-bottom:8px;line-height:20px;display:inline-block;vertical-align:top}[dir=rtl] .multiselect{text-align:right}[dir=rtl] .multiselect__select{right:auto;left:1px}[dir=rtl] .multiselect__tags{padding:8px 8px 0 40px}[dir=rtl] .multiselect__content{text-align:right}[dir=rtl] .multiselect__option:after{right:auto;left:0}[dir=rtl] .multiselect__clear{right:auto;left:12px}[dir=rtl] .multiselect__spinner{right:auto;left:1px}@keyframes spinning{0%{transform:rotate(0)}to{transform:rotate(2turn)}}\n',""])},273:function(e,t,i){"use strict";var n=i(240);i.n(n).a},274:function(e,t,i){(e.exports=i(3)(!1)).push([e.i,".loading[data-v-4547a6e6] {\n  display: inline-block;\n  padding: 0.38462em 0.76923em 0.38462em 0;\n  font-size: 1.3em;\n  color: #9c9c9c;\n}\n",""])},275:function(e,t,i){"use strict";var n=i(241);i.n(n).a},276:function(e,t,i){(e.exports=i(3)(!1)).push([e.i,".inputBlockType1 .multiselect--active, .inlineInputBlockType1 .multiselect--active {\n  z-index: 15;\n}\n.inputBlockType1 .multiselect__tags, .inlineInputBlockType1 .multiselect__tags {\n  padding-left: 0;\n  padding-right: 1em;\n  border: 0;\n  border-bottom: 1px solid #dddddd;\n  border-radius: 0;\n  background: transparent;\n}\n.inputBlockType1 .multiselect__single, .inputBlockType1 .multiselect__input, .inlineInputBlockType1 .multiselect__single, .inlineInputBlockType1 .multiselect__input {\n  font-size: 14px;\n  padding-left: 0;\n  padding-top: 1px;\n  padding-bottom: 1px;\n  background: transparent;\n  color: #b7b7b7;\n}\n.inputBlockType1 .multiselect__select, .inlineInputBlockType1 .multiselect__select {\n  display: none;\n}\n.inputBlockType1 .multiselect__tag, .inlineInputBlockType1 .multiselect__tag {\n  margin-right: 0.5em;\n  background-color: #a7a7a7;\n  border-radius: 3px;\n}\n.inputBlockType1 .multiselect__tag-icon:after, .inlineInputBlockType1 .multiselect__tag-icon:after {\n  color: #fff;\n}\n.inputBlockType1 .multiselect__tag-icon:focus, .inputBlockType1 .multiselect__tag-icon:hover, .inlineInputBlockType1 .multiselect__tag-icon:focus, .inlineInputBlockType1 .multiselect__tag-icon:hover {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n.inputBlockType1 .multiselect__content-wrapper, .inlineInputBlockType1 .multiselect__content-wrapper {\n  margin: 0.6em 0;\n  border: 1px solid #dddddd;\n  border-radius: 0.3em;\n  -webkit-box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.07);\n          box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.07);\n}\n.inputBlockType1 .multiselect__option--highlight, .inlineInputBlockType1 .multiselect__option--highlight {\n  background: #f5f5f5;\n  color: #303030;\n}\n.inputBlockType1 .multiselect__option--highlight:after, .inlineInputBlockType1 .multiselect__option--highlight:after {\n  content: '';\n  background: transparent;\n  color: #303030;\n}\n.inputBlockType1 .multiselect__option--selected, .inlineInputBlockType1 .multiselect__option--selected {\n  background: #fff;\n  color: #303030;\n  font-weight: bold;\n}\n.inputBlockType1 .multiselect__option--selected:after, .inlineInputBlockType1 .multiselect__option--selected:after {\n  content: '';\n  color: #303030;\n}\n.inputBlockType1 .multiselect__option--selected.multiselect__option--highlight, .inlineInputBlockType1 .multiselect__option--selected.multiselect__option--highlight {\n  background: #f5f5f5;\n  color: #303030;\n}\n.inputBlockType1 .multiselect__option--selected.multiselect__option--highlight:after, .inlineInputBlockType1 .multiselect__option--selected.multiselect__option--highlight:after {\n  background: #fff;\n  content: '';\n  color: #303030;\n}\n.inlineInputBlockType1 .multiselect {\n  min-height: 0;\n}\n.inlineInputBlockType1 .loading {\n  padding-left: 0.38462em;\n}\n.inlineInputBlockType1 .multiselect__tags {\n  border: 0;\n  padding-top: 0;\n  min-height: 0;\n  position: relative;\n  top: 4px;\n}\n.inlineInputBlockType1 .multiselect__single, .inlineInputBlockType1 .multiselect__input {\n  padding-left: 5px;\n}\n.multiselect.withOutline .multiselect__tags {\n  min-height: 0;\n  padding: 0.5em 0.5em 0 0.5em;\n  border: 1px solid #dddddd;\n  border-radius: 0.3em;\n  background: #fff;\n}\n.multiselect.withOutline .multiselect__tag {\n  margin-bottom: 4px;\n}\n.multiselect.withOutline .multiselect__content-wrapper {\n  margin: 0.3em 0;\n}\n",""])},324:function(e,t,i){"use strict";i.r(t);var n=i(9),l=i(0),o=i(2),r=i(14),c=i(10),a=i(270),s=i.n(a),p={elementType:"multipleSelect",components:{ElementWrapper:c.a,Multiselect:s.a},mixins:[n.a],props:{value:{type:[Array,String]},valueType:{default:function(){return String},validator:function(e){return[Array,String].indexOf(e)>=0}},selectOptions:{type:[Array,Object],required:!0}},data:function(){return{optionElements:[],translations:{loading:Object(o.a)("formElements.multipleSelect.loadingCaption")}}},getInitialValue:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.valueType;return e.value||t&&new t||""},computed:{placeholder:function(){var e=Object(o.a)("formElements.multipleSelect.placeholderText");return this.inputAttributes.placeholder||e},selectedOptionElements:function(){var e=(this.valueType===String?this.value.split(","):this.value).filter(function(e){return e});return this.optionElements.length?this.optionElements.filter(function(t){return e.indexOf(t.value)>=0}):[]}},created:function(){var e=this;this.getOptionElements(this.selectOptions).then(function(t){e.optionElements=t})},methods:{processInputEvent:function(e){var t=e.map(function(e){return e.value});this.$emit("input",this.valueType===String?t.join(","):t)},mapModel:function(e,t){return"function"==typeof e?e(t):t.get(e)},getOptionElements:function(e){var t=this;if(Array.isArray(e))return Promise.resolve(e);var i=(e=Object(l.a)({mapCaptionTo:"name",mapValueTo:"id"},e)).url?{url:e.url}:{type:e.resource,query:e.query};return r.a.getFromApi(i).then(function(i){return i.map(function(i){return{caption:t.mapModel(e.mapCaptionTo,i),value:t.mapModel(e.mapValueTo,i)}})})}}},u=(i(271),i(273),i(275),i(1)),d=Object(u.a)(p,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("element-wrapper",e._b({},"element-wrapper",e.elementWrapperProps,!1),[e.optionElements.length?i("multiselect",e._b({attrs:{value:e.selectedOptionElements,options:e.optionElements,multiple:!0,"close-on-select":!1,"clear-on-select":!1,"hide-selected":!1,"preserve-search":!0,"preselect-first":!1,"show-no-results":!1,placeholder:e.placeholder,label:"caption","track-by":"value"},on:{input:e.processInputEvent}},"multiselect",e.inputAttributes,!1)):i("span",{staticClass:"loading"},[e._v("\n        "+e._s(e.translations.loading)+"\n    ")])],1)},[],!1,null,"4547a6e6",null);t.default=d.exports}}]);