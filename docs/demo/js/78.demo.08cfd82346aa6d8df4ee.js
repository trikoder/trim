(self.webpackChunk_trikoder_trim=self.webpackChunk_trikoder_trim||[]).push([[78],{3078:function(e,o,i){"use strict";i.r(o),i.d(o,{Loader:function(){return r.a}});var r=i(5905),t=i(5645),n={};for(var s in t)["default","Loader"].indexOf(s)<0&&(n[s]=function(e){return t[e]}.bind(0,s));i.d(o,n)},5905:function(e,o,i){"use strict";i.d(o,{a:function(){return r}});class r{constructor(e=null,o={}){if(this.apiKey=e,this.options=o,"undefined"==typeof window)throw new Error("google-maps is supported only in browser environment")}load(){return void 0!==this.api?Promise.resolve(this.api):void 0!==this.loader?this.loader:(window[r.CALLBACK_NAME]=()=>{if(this.api=window.google,void 0===this.resolve)throw new Error("Should not happen");this.resolve(this.api)},window.gm_authFailure=()=>{if(void 0===this.reject)throw new Error("Should not happen");this.reject(new Error("google-maps: authentication error"))},this.loader=new Promise(((e,o)=>{this.resolve=e,this.reject=o;const i=document.createElement("script");i.src=this.createUrl(),i.async=!0,i.onerror=e=>o(e),document.head.appendChild(i)})))}createUrl(){const e=[`callback=${r.CALLBACK_NAME}`];this.apiKey&&e.push(`key=${this.apiKey}`);for(let o in this.options)if(this.options.hasOwnProperty(o)){let i=this.options[o];"version"===o&&(o="v"),"libraries"===o&&(i=i.join(",")),e.push(`${o}=${i}`)}return`https://maps.googleapis.com/maps/api/js?${e.join("&")}`}}r.CALLBACK_NAME="_dk_google_maps_loader_cb"},5645:function(){}}]);