import{_ as I,q as y,k as v,w as a,o as n,b as r,g as i,s as l,u as g,F as T,r as q,l as p,n as h,x as c,v as R}from"./index-613732e6.js";const o={mixins:[R],props:{getSearchItems:{type:Function,required:!0},typeTimeout:{type:Number,default:100}},data(){return{query:"",selectedItemIndex:0,isOpened:!1,results:[]}},watch:{query:"runQuery",selectedItemIndex(){this.results.forEach((e,s)=>{e.selected=this.selectedItemIndex===s})}},mounted(){this.open(),this.$watch("$route",()=>{this.close()})},methods:{runQuery(){if(clearTimeout(this.queryTimeout),this.selectedItemIndex=0,!this.query){this.results=[];return}this.queryTimeout=setTimeout(()=>{Promise.resolve(this.getSearchItems(this.query)).then(e=>{this.results=e.map((s,u)=>Object.assign({},s.item,{selected:this.selectedItemIndex===u}))})},this.typeTimeout)},selectNextResult(){this.results.length!==0&&(this.selectedItemIndex+1>=this.results.length?this.selectedItemIndex=0:this.selectedItemIndex++)},selectPrevResult(){this.results.length!==0&&(this.selectedItemIndex<=0?this.selectedItemIndex=this.results.length-1:this.selectedItemIndex--)},openResult(){const e=this.results[this.selectedItemIndex];e&&(e.action?e.action():e.url&&e.appLink?this.$router.navigateTo(e.url):e.url&&window.location.assign(e.url),this.close())},open(){return this.isOpened||(this.isOpened=!0,this.$refs.input.focus()),this},close(){return this.isOpened&&(this.query="",this.selectedItemIndex=0,this.isOpened=!1),this.$emit("closeModal"),this}}};o.open=function(e,s){return y({props:()=>e,component:()=>o,parent:()=>s})};const k=o,w={key:0,class:"results"},M=["onMouseover","href"],$=["innerHTML"],S=["innerHTML"];function x(e,s,u,C,O,L){const m=v("on-dismiss");return a((n(),r("form",{class:h(["appSearchType1 iconSearch",{opened:e.results.length>0}]),onSubmit:s[5]||(s[5]=c(()=>{},["prevent"]))},[a(i("input",{ref:"input","onUpdate:modelValue":s[0]||(s[0]=t=>e.query=t),onKeyup:[s[1]||(s[1]=l((...t)=>e.selectNextResult&&e.selectNextResult(...t),["down"])),s[2]||(s[2]=l((...t)=>e.selectPrevResult&&e.selectPrevResult(...t),["up"])),s[3]||(s[3]=l((...t)=>e.openResult&&e.openResult(...t),["enter"]))],placeholder:"Search"},null,544),[[g,e.query,void 0,{trim:!0}]]),e.results.length?(n(),r("ul",w,[(n(!0),r(T,null,q(e.results,(t,f)=>(n(),r("li",{key:t.key},[i("a",{class:h(["resultItem",{focused:t.selected}]),onMouseover:d=>e.selectedItemIndex=f,onClick:s[4]||(s[4]=c((...d)=>e.openResult&&e.openResult(...d),["prevent"])),href:t.url},[t.parentCaption?(n(),r("span",{key:0,class:"parentCaption",innerHTML:t.parentCaption},null,8,$)):p("",!0),i("span",{innerHTML:t.caption},null,8,S)],42,M)]))),128))])):p("",!0)],34)),[[m,{callback:e.close,watch:e.isOpened}]])}const b=I(k,[["render",x],["__scopeId","data-v-4fe13fe1"],["__file","appSearch.vue"]]);export{b as default};
