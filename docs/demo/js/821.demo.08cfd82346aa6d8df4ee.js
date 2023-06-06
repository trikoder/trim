"use strict";(self.webpackChunk_trikoder_trim=self.webpackChunk_trikoder_trim||[]).push([[821],{4834:function(e,t,i){var n=i(8081),l=i.n(n),s=i(3645),o=i.n(s)()(l());o.push([e.id,'\n\n  fieldset[disabled] .multiselect {\n    pointer-events: none;\n  }\n\n  .multiselect__spinner {\n    position: absolute;\n    right: 1px;\n    top: 1px;\n  width: 40px;\n  height: 38px;\n    background: #fff;\n    display: block;\n  }\n\n  .multiselect__spinner::before,\n  .multiselect__spinner::after {\n    position: absolute;\n    content: "";\n    top: 50%;\n    left: 50%;\n    margin: -8px 0 0 -8px;\n    width: 16px;\n    height: 16px;\n    border-radius: 100%;\n    border-color: #41b883 transparent transparent;\n    border-style: solid;\n    border-width: 2px;\n    box-shadow: 0 0 0 1px transparent;\n  }\n\n  .multiselect__spinner::before {\n    animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);\n    animation-iteration-count: infinite;\n  }\n\n  .multiselect__spinner::after {\n    animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);\n    animation-iteration-count: infinite;\n  }\n\n  .multiselect__loading-enter-active,\n  .multiselect__loading-leave-active {\n    transition: opacity 0.4s ease-in-out;\n    opacity: 1;\n  }\n\n  .multiselect__loading-enter,\n  .multiselect__loading-leave-active {\n    opacity: 0;\n  }\n\n  .multiselect,\n  .multiselect__input,\n  .multiselect__single {\n    font-family: inherit;\n    font-size: 16px;\n    touch-action: manipulation;\n  }\n\n  .multiselect {\n    box-sizing: content-box;\n    display: block;\n    position: relative;\n    width: 100%;\n    min-height: 40px;\n    text-align: left;\n    color: #35495e;\n  }\n\n  .multiselect * {\n    box-sizing: border-box;\n  }\n\n  .multiselect:focus {\n    outline: none;\n  }\n\n  .multiselect--disabled {\n    background: #ededed;\n    pointer-events: none;\n    opacity: 0.6;\n  }\n\n  .multiselect--active {\n    z-index: 50;\n  }\n\n  .multiselect--active:not(.multiselect--above) .multiselect__current,\n  .multiselect--active:not(.multiselect--above) .multiselect__input,\n  .multiselect--active:not(.multiselect--above) .multiselect__tags {\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n\n  .multiselect--active .multiselect__select {\n    transform: rotateZ(180deg);\n  }\n\n  .multiselect--above.multiselect--active .multiselect__current,\n  .multiselect--above.multiselect--active .multiselect__input,\n  .multiselect--above.multiselect--active .multiselect__tags {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n  }\n\n  .multiselect__input,\n  .multiselect__single {\n    position: relative;\n    display: inline-block;\n    min-height: 20px;\n    line-height: 20px;\n    border: none;\n    border-radius: 5px;\n    background: #fff;\n    padding: 0 0 0 5px;\n    width: calc(100%);\n    transition: border 0.1s ease;\n    box-sizing: border-box;\n    margin-bottom: 8px;\n    vertical-align: top;\n  }\n\n  .multiselect__input::placeholder {\n    color: #35495e;\n  }\n\n  .multiselect__tag ~ .multiselect__input,\n  .multiselect__tag ~ .multiselect__single {\n    width: auto;\n  }\n\n  .multiselect__input:hover,\n  .multiselect__single:hover {\n    border-color: #cfcfcf;\n  }\n\n  .multiselect__input:focus,\n  .multiselect__single:focus {\n    border-color: #a8a8a8;\n    outline: none;\n  }\n\n  .multiselect__single {\n    padding-left: 5px;\n    margin-bottom: 8px;\n  }\n\n  .multiselect__tags-wrap {\n    display: inline;\n  }\n\n  .multiselect__tags {\n    min-height: 40px;\n    display: block;\n    padding: 8px 40px 0 8px;\n    border-radius: 5px;\n    border: 1px solid #e8e8e8;\n    background: #fff;\n    font-size: 14px;\n  }\n\n  .multiselect__tag {\n    position: relative;\n    display: inline-block;\n    padding: 4px 26px 4px 10px;\n    border-radius: 5px;\n    margin-right: 10px;\n    color: #fff;\n    line-height: 1;\n    background: #41b883;\n    margin-bottom: 5px;\n    white-space: nowrap;\n    overflow: hidden;\n    max-width: 100%;\n    text-overflow: ellipsis;\n  }\n\n  .multiselect__tag-icon {\n    cursor: pointer;\n    margin-left: 7px;\n    position: absolute;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    font-weight: 700;\n    font-style: initial;\n    width: 22px;\n    text-align: center;\n    line-height: 22px;\n    transition: all 0.2s ease;\n    border-radius: 5px;\n  }\n\n  .multiselect__tag-icon::after {\n    content: "×";\n    color: #266d4d;\n    font-size: 14px;\n  }\n\n  /* // Remove these lines to avoid green closing button\n  //.multiselect__tag-icon:focus,\n  //.multiselect__tag-icon:hover {\n  //  background: #369a6e;\n  //} */\n\n  .multiselect__tag-icon:focus::after,\n  .multiselect__tag-icon:hover::after {\n    color: white;\n  }\n\n  .multiselect__current {\n    line-height: 16px;\n    min-height: 40px;\n    box-sizing: border-box;\n    display: block;\n    overflow: hidden;\n    padding: 8px 12px 0;\n    padding-right: 30px;\n    white-space: nowrap;\n    margin: 0;\n    text-decoration: none;\n    border-radius: 5px;\n    border: 1px solid #e8e8e8;\n    cursor: pointer;\n  }\n\n  .multiselect__select {\n    line-height: 16px;\n    display: block;\n    position: absolute;\n    box-sizing: border-box;\n    width: 40px;\n    height: 38px;\n    right: 1px;\n    top: 1px;\n    padding: 4px 8px;\n    margin: 0;\n    text-decoration: none;\n    text-align: center;\n    cursor: pointer;\n    transition: transform 0.2s ease;\n  }\n\n  .multiselect__select::before {\n    position: relative;\n    right: 0;\n    top: 65%;\n    color: #999;\n    margin-top: 4px;\n    border-style: solid;\n    border-width: 5px 5px 0 5px;\n    border-color: #999 transparent transparent transparent;\n    content: "";\n  }\n\n  .multiselect__placeholder {\n    color: #adadad;\n    display: inline-block;\n    margin-bottom: 10px;\n    padding-top: 2px;\n  }\n\n  .multiselect--active .multiselect__placeholder {\n    display: none;\n  }\n\n  .multiselect__content-wrapper {\n    position: absolute;\n    display: block;\n    background: #fff;\n    width: 100%;\n    max-height: 240px;\n    overflow: auto;\n    border: 1px solid #e8e8e8;\n    border-top: none;\n    border-bottom-left-radius: 5px;\n    border-bottom-right-radius: 5px;\n    z-index: 50;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .multiselect__content {\n    list-style: none;\n    display: inline-block;\n    padding: 0;\n    margin: 0;\n    min-width: 100%;\n    vertical-align: top;\n  }\n\n  .multiselect--above .multiselect__content-wrapper {\n    bottom: 100%;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n    border-top-left-radius: 5px;\n    border-top-right-radius: 5px;\n    border-bottom: none;\n    border-top: 1px solid #e8e8e8;\n  }\n\n  .multiselect__content::-webkit-scrollbar {\n    display: none;\n  }\n\n  .multiselect__element {\n    display: block;\n  }\n\n  .multiselect__option {\n    display: block;\n    padding: 12px;\n    min-height: 40px;\n    line-height: 16px;\n    text-decoration: none;\n    text-transform: none;\n    vertical-align: middle;\n    position: relative;\n    cursor: pointer;\n    white-space: nowrap;\n  }\n\n  .multiselect__option::after {\n    top: 0;\n    right: 0;\n    position: absolute;\n    line-height: 40px;\n    padding-right: 12px;\n    padding-left: 20px;\n    font-size: 13px;\n  }\n\n  .multiselect__option--highlight {\n    background: #41b883;\n    outline: none;\n    color: white;\n  }\n\n  .multiselect__option--highlight::after {\n    content: attr(data-select);\n    background: #41b883;\n    color: white;\n  }\n\n  .multiselect__option--selected {\n    background: #f3f3f3;\n    color: #35495e;\n    font-weight: bold;\n  }\n\n  .multiselect__option--selected::after {\n    content: attr(data-selected);\n    color: silver;\n  background: inherit;\n  }\n\n  .multiselect__option--selected.multiselect__option--highlight {\n    background: #ff6a6a;\n    color: #fff;\n  }\n\n  .multiselect__option--selected.multiselect__option--highlight::after {\n    background: #ff6a6a;\n    content: attr(data-deselect);\n    color: #fff;\n  }\n\n  .multiselect--disabled .multiselect__current,\n  .multiselect--disabled .multiselect__select {\n    background: #ededed;\n    color: #a6a6a6;\n  }\n\n  .multiselect__option--disabled {\n    background: #ededed !important;\n    color: #a6a6a6 !important;\n    cursor: text;\n    pointer-events: none;\n  }\n\n  .multiselect__option--group {\n    background: #ededed;\n    color: #35495e;\n  }\n\n  .multiselect__option--group.multiselect__option--highlight {\n    background: #35495e;\n    color: #fff;\n  }\n\n  .multiselect__option--group.multiselect__option--highlight::after {\n    background: #35495e;\n  }\n\n  .multiselect__option--disabled.multiselect__option--highlight {\n    background: #dedede;\n  }\n\n  .multiselect__option--group-selected.multiselect__option--highlight {\n    background: #ff6a6a;\n    color: #fff;\n  }\n\n  .multiselect__option--group-selected.multiselect__option--highlight::after {\n    background: #ff6a6a;\n    content: attr(data-deselect);\n    color: #fff;\n  }\n\n  .multiselect-enter-active,\n  .multiselect-leave-active {\n    transition: all 0.15s ease;\n  }\n\n  .multiselect-enter,\n  .multiselect-leave-active {\n    opacity: 0;\n  }\n\n  .multiselect__strong {\n    margin-bottom: 8px;\n    line-height: 20px;\n    display: inline-block;\n    vertical-align: top;\n  }\n\n  *[dir="rtl"] .multiselect {\n    text-align: right;\n  }\n\n  *[dir="rtl"] .multiselect__select {\n    right: auto;\n    left: 1px;\n  }\n\n  *[dir="rtl"] .multiselect__tags {\n    padding: 8px 8px 0 40px;\n  }\n\n  *[dir="rtl"] .multiselect__content {\n    text-align: right;\n  }\n\n  *[dir="rtl"] .multiselect__option::after {\n    right: auto;\n    left: 0;\n  }\n\n  *[dir="rtl"] .multiselect__clear {\n    right: auto;\n    left: 12px;\n  }\n\n  *[dir="rtl"] .multiselect__spinner {\n    right: auto;\n    left: 1px;\n  }\n\n  @keyframes spinning {\n    from {\n      transform: rotate(0);\n    }\n\n    to {\n      transform: rotate(2turn);\n    }\n  }\n',""]),t.Z=o},2444:function(e,t,i){var n=i(6252),l=i(9963),s=i(3577);function o(e){return!(0===e||(!Array.isArray(e)||0!==e.length)&&e)}function r(e,t,i,n){return t?e.filter((e=>{return l=n(e,i),s=t,void 0===l&&(l="undefined"),null===l&&(l="null"),!1===l&&(l="false"),-1!==l.toString().toLowerCase().indexOf(s.trim());var l,s})).sort(((e,t)=>n(e,i).length-n(t,i).length)):e}function a(e){return e.filter((e=>!e.$isLabel))}function p(e,t){return i=>i.reduce(((i,n)=>n[e]&&n[e].length?(i.push({$groupLabel:n[t],$isLabel:!0}),i.concat(n[e])):i),[])}const c=(...e)=>t=>e.reduce(((e,t)=>t(e)),t);var u={name:"vue-multiselect",mixins:[{data(){return{search:"",isOpen:!1,preferredOpenDirection:"below",optimizedHeight:this.maxHeight}},props:{internalSearch:{type:Boolean,default:!0},options:{type:Array,required:!0},multiple:{type:Boolean,default:!1},trackBy:{type:String},label:{type:String},searchable:{type:Boolean,default:!0},clearOnSelect:{type:Boolean,default:!0},hideSelected:{type:Boolean,default:!1},placeholder:{type:String,default:"Select option"},allowEmpty:{type:Boolean,default:!0},resetAfter:{type:Boolean,default:!1},closeOnSelect:{type:Boolean,default:!0},customLabel:{type:Function,default(e,t){return o(e)?"":t?e[t]:e}},taggable:{type:Boolean,default:!1},tagPlaceholder:{type:String,default:"Press enter to create a tag"},tagPosition:{type:String,default:"top"},max:{type:[Number,Boolean],default:!1},id:{default:null},optionsLimit:{type:Number,default:1e3},groupValues:{type:String},groupLabel:{type:String},groupSelect:{type:Boolean,default:!1},blockKeys:{type:Array,default(){return[]}},preserveSearch:{type:Boolean,default:!1},preselectFirst:{type:Boolean,default:!1},preventAutofocus:{type:Boolean,default:!1}},mounted(){!this.multiple&&this.max&&console.warn("[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false."),this.preselectFirst&&!this.internalValue.length&&this.options.length&&this.select(this.filteredOptions[0])},computed:{internalValue(){return this.modelValue||0===this.modelValue?Array.isArray(this.modelValue)?this.modelValue:[this.modelValue]:[]},filteredOptions(){const e=this.search||"",t=e.toLowerCase().trim();let i=this.options.concat();var n;return i=this.internalSearch?this.groupValues?this.filterAndFlat(i,t,this.label):r(i,t,this.label,this.customLabel):this.groupValues?p(this.groupValues,this.groupLabel)(i):i,i=this.hideSelected?i.filter((n=this.isSelected,(...e)=>!n(...e))):i,this.taggable&&t.length&&!this.isExistingOption(t)&&("bottom"===this.tagPosition?i.push({isTag:!0,label:e}):i.unshift({isTag:!0,label:e})),i.slice(0,this.optionsLimit)},valueKeys(){return this.trackBy?this.internalValue.map((e=>e[this.trackBy])):this.internalValue},optionKeys(){return(this.groupValues?this.flatAndStrip(this.options):this.options).map((e=>this.customLabel(e,this.label).toString().toLowerCase()))},currentOptionLabel(){return this.multiple?this.searchable?"":this.placeholder:this.internalValue.length?this.getOptionLabel(this.internalValue[0]):this.searchable?"":this.placeholder}},watch:{internalValue:{handler(){this.resetAfter&&this.internalValue.length&&(this.search="",this.$emit("update:modelValue",this.multiple?[]:null))},deep:!0},search(){this.$emit("search-change",this.search)}},emits:["open","search-change","close","select","update:modelValue","remove","tag"],methods:{getValue(){return this.multiple?this.internalValue:0===this.internalValue.length?null:this.internalValue[0]},filterAndFlat(e,t,i){return c(function(e,t,i,n,l){return s=>s.map((s=>{if(!s[i])return console.warn("Options passed to vue-multiselect do not contain groups, despite the config."),[];const o=r(s[i],e,t,l);return o.length?{[n]:s[n],[i]:o}:[]}))}(t,i,this.groupValues,this.groupLabel,this.customLabel),p(this.groupValues,this.groupLabel))(e)},flatAndStrip(e){return c(p(this.groupValues,this.groupLabel),a)(e)},updateSearch(e){this.search=e},isExistingOption(e){return!!this.options&&this.optionKeys.indexOf(e)>-1},isSelected(e){const t=this.trackBy?e[this.trackBy]:e;return this.valueKeys.indexOf(t)>-1},isOptionDisabled(e){return!!e.$isDisabled},getOptionLabel(e){if(o(e))return"";if(e.isTag)return e.label;if(e.$isLabel)return e.$groupLabel;const t=this.customLabel(e,this.label);return o(t)?"":t},select(e,t){if(e.$isLabel&&this.groupSelect)this.selectGroup(e);else if(!(-1!==this.blockKeys.indexOf(t)||this.disabled||e.$isDisabled||e.$isLabel)&&(!this.max||!this.multiple||this.internalValue.length!==this.max)&&("Tab"!==t||this.pointerDirty)){if(e.isTag)this.$emit("tag",e.label,this.id),this.search="",this.closeOnSelect&&!this.multiple&&this.deactivate();else{if(this.isSelected(e))return void("Tab"!==t&&this.removeElement(e));this.multiple?this.$emit("update:modelValue",this.internalValue.concat([e])):this.$emit("update:modelValue",e),this.$emit("select",e,this.id),this.clearOnSelect&&(this.search="")}this.closeOnSelect&&this.deactivate()}},selectGroup(e){const t=this.options.find((t=>t[this.groupLabel]===e.$groupLabel));if(t){if(this.wholeGroupSelected(t)){this.$emit("remove",t[this.groupValues],this.id);const e=this.internalValue.filter((e=>-1===t[this.groupValues].indexOf(e)));this.$emit("update:modelValue",e)}else{let e=t[this.groupValues].filter((e=>!(this.isOptionDisabled(e)||this.isSelected(e))));this.max&&e.splice(this.max-this.internalValue.length),this.$emit("select",e,this.id),this.$emit("update:modelValue",this.internalValue.concat(e))}this.closeOnSelect&&this.deactivate()}},wholeGroupSelected(e){return e[this.groupValues].every((e=>this.isSelected(e)||this.isOptionDisabled(e)))},wholeGroupDisabled(e){return e[this.groupValues].every(this.isOptionDisabled)},removeElement(e,t=!0){if(this.disabled)return;if(e.$isDisabled)return;if(!this.allowEmpty&&this.internalValue.length<=1)return void this.deactivate();const i="object"==typeof e?this.valueKeys.indexOf(e[this.trackBy]):this.valueKeys.indexOf(e);if(this.multiple){const e=this.internalValue.slice(0,i).concat(this.internalValue.slice(i+1));this.$emit("update:modelValue",e)}else this.$emit("update:modelValue",null);this.$emit("remove",e,this.id),this.closeOnSelect&&t&&this.deactivate()},removeLastElement(){-1===this.blockKeys.indexOf("Delete")&&0===this.search.length&&Array.isArray(this.internalValue)&&this.internalValue.length&&this.removeElement(this.internalValue[this.internalValue.length-1],!1)},activate(){this.isOpen||this.disabled||(this.adjustPosition(),this.groupValues&&0===this.pointer&&this.filteredOptions.length&&(this.pointer=1),this.isOpen=!0,this.searchable?(this.preserveSearch||(this.search=""),this.preventAutofocus||this.$nextTick((()=>this.$refs.search&&this.$refs.search.focus()))):this.preventAutofocus||void 0!==this.$el&&this.$el.focus(),this.$emit("open",this.id))},deactivate(){this.isOpen&&(this.isOpen=!1,this.searchable?void 0!==this.$refs.search&&this.$refs.search.blur():void 0!==this.$el&&this.$el.blur(),this.preserveSearch||(this.search=""),this.$emit("close",this.getValue(),this.id))},toggle(){this.isOpen?this.deactivate():this.activate()},adjustPosition(){if("undefined"==typeof window)return;const e=this.$el.getBoundingClientRect().top,t=window.innerHeight-this.$el.getBoundingClientRect().bottom;t>this.maxHeight||t>e||"below"===this.openDirection||"bottom"===this.openDirection?(this.preferredOpenDirection="below",this.optimizedHeight=Math.min(t-40,this.maxHeight)):(this.preferredOpenDirection="above",this.optimizedHeight=Math.min(e-40,this.maxHeight))}}},{data(){return{pointer:0,pointerDirty:!1}},props:{showPointer:{type:Boolean,default:!0},optionHeight:{type:Number,default:40}},computed:{pointerPosition(){return this.pointer*this.optionHeight},visibleElements(){return this.optimizedHeight/this.optionHeight}},watch:{filteredOptions(){this.pointerAdjust()},isOpen(){this.pointerDirty=!1},pointer(){this.$refs.search&&this.$refs.search.setAttribute("aria-activedescendant",this.id+"-"+this.pointer.toString())}},methods:{optionHighlight(e,t){return{"multiselect__option--highlight":e===this.pointer&&this.showPointer,"multiselect__option--selected":this.isSelected(t)}},groupHighlight(e,t){if(!this.groupSelect)return["multiselect__option--disabled",{"multiselect__option--group":t.$isLabel}];const i=this.options.find((e=>e[this.groupLabel]===t.$groupLabel));return i&&!this.wholeGroupDisabled(i)?["multiselect__option--group",{"multiselect__option--highlight":e===this.pointer&&this.showPointer},{"multiselect__option--group-selected":this.wholeGroupSelected(i)}]:"multiselect__option--disabled"},addPointerElement({key:e}="Enter"){this.filteredOptions.length>0&&this.select(this.filteredOptions[this.pointer],e),this.pointerReset()},pointerForward(){this.pointer<this.filteredOptions.length-1&&(this.pointer++,this.$refs.list.scrollTop<=this.pointerPosition-(this.visibleElements-1)*this.optionHeight&&(this.$refs.list.scrollTop=this.pointerPosition-(this.visibleElements-1)*this.optionHeight),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()),this.pointerDirty=!0},pointerBackward(){this.pointer>0?(this.pointer--,this.$refs.list.scrollTop>=this.pointerPosition&&(this.$refs.list.scrollTop=this.pointerPosition),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerBackward()):this.filteredOptions[this.pointer]&&this.filteredOptions[0].$isLabel&&!this.groupSelect&&this.pointerForward(),this.pointerDirty=!0},pointerReset(){this.closeOnSelect&&(this.pointer=0,this.$refs.list&&(this.$refs.list.scrollTop=0))},pointerAdjust(){this.pointer>=this.filteredOptions.length-1&&(this.pointer=this.filteredOptions.length?this.filteredOptions.length-1:0),this.filteredOptions.length>0&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()},pointerSet(e){this.pointer=e,this.pointerDirty=!0}}}],compatConfig:{MODE:3,ATTR_ENUMERATED_COERCION:!1},props:{name:{type:String,default:""},modelValue:{type:null,default(){return[]}},selectLabel:{type:String,default:"Press enter to select"},selectGroupLabel:{type:String,default:"Press enter to select group"},selectedLabel:{type:String,default:"Selected"},deselectLabel:{type:String,default:"Press enter to remove"},deselectGroupLabel:{type:String,default:"Press enter to deselect group"},showLabels:{type:Boolean,default:!0},limit:{type:Number,default:99999},maxHeight:{type:Number,default:300},limitText:{type:Function,default:e=>`and ${e} more`},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},openDirection:{type:String,default:""},showNoOptions:{type:Boolean,default:!0},showNoResults:{type:Boolean,default:!0},tabindex:{type:Number,default:0}},computed:{hasOptionGroup(){return this.groupValues&&this.groupLabel&&this.groupSelect},isSingleLabelVisible(){return(this.singleValue||0===this.singleValue)&&(!this.isOpen||!this.searchable)&&!this.visibleValues.length},isPlaceholderVisible(){return!(this.internalValue.length||this.searchable&&this.isOpen)},visibleValues(){return this.multiple?this.internalValue.slice(0,this.limit):[]},singleValue(){return this.internalValue[0]},deselectLabelText(){return this.showLabels?this.deselectLabel:""},deselectGroupLabelText(){return this.showLabels?this.deselectGroupLabel:""},selectLabelText(){return this.showLabels?this.selectLabel:""},selectGroupLabelText(){return this.showLabels?this.selectGroupLabel:""},selectedLabelText(){return this.showLabels?this.selectedLabel:""},inputStyle(){return this.searchable||this.multiple&&this.modelValue&&this.modelValue.length?this.isOpen?{width:"100%"}:{width:"0",position:"absolute",padding:"0"}:""},contentStyle(){return this.options.length?{display:"inline-block"}:{display:"block"}},isAbove(){return"above"===this.openDirection||"top"===this.openDirection||"below"!==this.openDirection&&"bottom"!==this.openDirection&&"above"===this.preferredOpenDirection},showSearchInput(){return this.searchable&&(!this.hasSingleSelectedSlot||!this.visibleSingleValue&&0!==this.visibleSingleValue||this.isOpen)}}};const h={ref:"tags",class:"multiselect__tags"},d={class:"multiselect__tags-wrap"},g={class:"multiselect__spinner"},m={key:0},b={class:"multiselect__option"},f={class:"multiselect__option"},_=(0,n.Uk)("No elements found. Consider changing the search query."),x={class:"multiselect__option"},v=(0,n.Uk)("List is empty.");u.render=function(e,t,i,o,r,a){return(0,n.wg)(),(0,n.j4)("div",{tabindex:e.searchable?-1:i.tabindex,class:[{"multiselect--active":e.isOpen,"multiselect--disabled":i.disabled,"multiselect--above":a.isAbove,"multiselect--has-options-group":a.hasOptionGroup},"multiselect"],onFocus:t[14]||(t[14]=t=>e.activate()),onBlur:t[15]||(t[15]=t=>!e.searchable&&e.deactivate()),onKeydown:[t[16]||(t[16]=(0,l.D2)((0,l.iM)((t=>e.pointerForward()),["self","prevent"]),["down"])),t[17]||(t[17]=(0,l.D2)((0,l.iM)((t=>e.pointerBackward()),["self","prevent"]),["up"]))],onKeypress:t[18]||(t[18]=(0,l.D2)((0,l.iM)((t=>e.addPointerElement(t)),["stop","self"]),["enter","tab"])),onKeyup:t[19]||(t[19]=(0,l.D2)((t=>e.deactivate()),["esc"])),role:"combobox","aria-owns":"listbox-"+e.id},[(0,n.WI)(e.$slots,"caret",{toggle:e.toggle},(()=>[(0,n.Wm)("div",{onMousedown:t[1]||(t[1]=(0,l.iM)((t=>e.toggle()),["prevent","stop"])),class:"multiselect__select"},null,32)])),(0,n.WI)(e.$slots,"clear",{search:e.search}),(0,n.Wm)("div",h,[(0,n.WI)(e.$slots,"selection",{search:e.search,remove:e.removeElement,values:a.visibleValues,isOpen:e.isOpen},(()=>[(0,n.wy)((0,n.Wm)("div",d,[((0,n.wg)(!0),(0,n.j4)(n.HY,null,(0,n.Ko)(a.visibleValues,((t,i)=>(0,n.WI)(e.$slots,"tag",{option:t,search:e.search,remove:e.removeElement},(()=>[((0,n.wg)(),(0,n.j4)("span",{class:"multiselect__tag",key:i},[(0,n.Wm)("span",{textContent:(0,s.zw)(e.getOptionLabel(t))},null,8,["textContent"]),(0,n.Wm)("i",{tabindex:"1",onKeypress:(0,l.D2)((0,l.iM)((i=>e.removeElement(t)),["prevent"]),["enter"]),onMousedown:(0,l.iM)((i=>e.removeElement(t)),["prevent"]),class:"multiselect__tag-icon"},null,40,["onKeypress","onMousedown"])]))])))),256))],512),[[l.F8,a.visibleValues.length>0]]),e.internalValue&&e.internalValue.length>i.limit?(0,n.WI)(e.$slots,"limit",{key:0},(()=>[(0,n.Wm)("strong",{class:"multiselect__strong",textContent:(0,s.zw)(i.limitText(e.internalValue.length-i.limit))},null,8,["textContent"])])):(0,n.kq)("v-if",!0)])),(0,n.Wm)(l.uT,{name:"multiselect__loading"},{default:(0,n.w5)((()=>[(0,n.WI)(e.$slots,"loading",{},(()=>[(0,n.wy)((0,n.Wm)("div",g,null,512),[[l.F8,i.loading]])]))])),_:3}),e.searchable?((0,n.wg)(),(0,n.j4)("input",{key:0,ref:"search",name:i.name,id:e.id,type:"text",autocomplete:"off",spellcheck:"false",placeholder:e.placeholder,style:a.inputStyle,value:e.search,disabled:i.disabled,tabindex:i.tabindex,onInput:t[2]||(t[2]=t=>e.updateSearch(t.target.value)),onFocus:t[3]||(t[3]=(0,l.iM)((t=>e.activate()),["prevent"])),onBlur:t[4]||(t[4]=(0,l.iM)((t=>e.deactivate()),["prevent"])),onKeyup:t[5]||(t[5]=(0,l.D2)((t=>e.deactivate()),["esc"])),onKeydown:[t[6]||(t[6]=(0,l.D2)((0,l.iM)((t=>e.pointerForward()),["prevent"]),["down"])),t[7]||(t[7]=(0,l.D2)((0,l.iM)((t=>e.pointerBackward()),["prevent"]),["up"])),t[9]||(t[9]=(0,l.D2)((0,l.iM)((t=>e.removeLastElement()),["stop"]),["delete"]))],onKeypress:t[8]||(t[8]=(0,l.D2)((0,l.iM)((t=>e.addPointerElement(t)),["prevent","stop","self"]),["enter"])),class:"multiselect__input","aria-controls":"listbox-"+e.id},null,44,["name","id","placeholder","value","disabled","tabindex","aria-controls"])):(0,n.kq)("v-if",!0),a.isSingleLabelVisible?((0,n.wg)(),(0,n.j4)("span",{key:1,class:"multiselect__single",onMousedown:t[10]||(t[10]=(0,l.iM)(((...t)=>e.toggle&&e.toggle(...t)),["prevent"]))},[(0,n.WI)(e.$slots,"singleLabel",{option:a.singleValue},(()=>[(0,n.Uk)((0,s.zw)(e.currentOptionLabel),1)]))],32)):(0,n.kq)("v-if",!0),a.isPlaceholderVisible?((0,n.wg)(),(0,n.j4)("span",{key:2,class:"multiselect__placeholder",onMousedown:t[11]||(t[11]=(0,l.iM)(((...t)=>e.toggle&&e.toggle(...t)),["prevent"]))},[(0,n.WI)(e.$slots,"placeholder",{},(()=>[(0,n.Uk)((0,s.zw)(e.placeholder),1)]))],32)):(0,n.kq)("v-if",!0)],512),(0,n.Wm)(l.uT,{name:"multiselect"},{default:(0,n.w5)((()=>[(0,n.wy)((0,n.Wm)("div",{class:"multiselect__content-wrapper",onFocus:t[12]||(t[12]=(...t)=>e.activate&&e.activate(...t)),tabindex:"-1",onMousedown:t[13]||(t[13]=(0,l.iM)((()=>{}),["prevent"])),style:{maxHeight:e.optimizedHeight+"px"},ref:"list"},[(0,n.Wm)("ul",{class:"multiselect__content",style:a.contentStyle,role:"listbox",id:"listbox-"+e.id},[(0,n.WI)(e.$slots,"beforeList"),e.multiple&&e.max===e.internalValue.length?((0,n.wg)(),(0,n.j4)("li",m,[(0,n.Wm)("span",b,[(0,n.WI)(e.$slots,"maxElements",{},(()=>[(0,n.Uk)("Maximum of "+(0,s.zw)(e.max)+" options selected. First remove a selected option to select another.",1)]))])])):(0,n.kq)("v-if",!0),!e.max||e.internalValue.length<e.max?((0,n.wg)(!0),(0,n.j4)(n.HY,{key:1},(0,n.Ko)(e.filteredOptions,((t,i)=>((0,n.wg)(),(0,n.j4)("li",{class:"multiselect__element",key:i,id:e.id+"-"+i,role:t&&(t.$isLabel||t.$isDisabled)?null:"option"},[t&&(t.$isLabel||t.$isDisabled)?(0,n.kq)("v-if",!0):((0,n.wg)(),(0,n.j4)("span",{key:0,class:[e.optionHighlight(i,t),"multiselect__option"],onClick:(0,l.iM)((i=>e.select(t)),["stop"]),onMouseenter:(0,l.iM)((t=>e.pointerSet(i)),["self"]),"data-select":t&&t.isTag?e.tagPlaceholder:a.selectLabelText,"data-selected":a.selectedLabelText,"data-deselect":a.deselectLabelText},[(0,n.WI)(e.$slots,"option",{option:t,search:e.search,index:i},(()=>[(0,n.Wm)("span",null,(0,s.zw)(e.getOptionLabel(t)),1)]))],42,["onClick","onMouseenter","data-select","data-selected","data-deselect"])),t&&(t.$isLabel||t.$isDisabled)?((0,n.wg)(),(0,n.j4)("span",{key:1,"data-select":e.groupSelect&&a.selectGroupLabelText,"data-deselect":e.groupSelect&&a.deselectGroupLabelText,class:[e.groupHighlight(i,t),"multiselect__option"],onMouseenter:(0,l.iM)((t=>e.groupSelect&&e.pointerSet(i)),["self"]),onMousedown:(0,l.iM)((i=>e.selectGroup(t)),["prevent"])},[(0,n.WI)(e.$slots,"option",{option:t,search:e.search,index:i},(()=>[(0,n.Wm)("span",null,(0,s.zw)(e.getOptionLabel(t)),1)]))],42,["data-select","data-deselect","onMouseenter","onMousedown"])):(0,n.kq)("v-if",!0)],8,["id","role"])))),128)):(0,n.kq)("v-if",!0),(0,n.wy)((0,n.Wm)("li",null,[(0,n.Wm)("span",f,[(0,n.WI)(e.$slots,"noResult",{search:e.search},(()=>[_]))])],512),[[l.F8,i.showNoResults&&0===e.filteredOptions.length&&e.search&&!i.loading]]),(0,n.wy)((0,n.Wm)("li",null,[(0,n.Wm)("span",x,[(0,n.WI)(e.$slots,"noOptions",{},(()=>[v]))])],512),[[l.F8,i.showNoOptions&&(0===e.options.length||!0===a.hasOptionGroup&&0===e.filteredOptions.length)&&!e.search&&!i.loading]]),(0,n.WI)(e.$slots,"afterList")],12,["id"])],36),[[l.F8,e.isOpen]])])),_:3})],42,["tabindex","aria-owns"])},t.ZP=u}}]);