import{i as h,W as d,a as u,_ as f,a4 as _,a5 as v,K as b,ah as n,H as l,e as k,o as p,z as L,A as M,a6 as y,a7 as P,g,O as $,b as T,l as V,ae as m}from"./index-613732e6.js";let o;function w(){return o||(o=h(()=>import("./index-4615633d.js"),[]).then(({Loader:e})=>new e(d("googleMapsApiKey"),{libraries:["places"],language:u.getLocale()}).load().then(a=>a)),o)}const C={elementType:"map",components:{ElementWrapper:_},mixins:[v],props:{modelValue:{type:String,default:""},zoom:{type:Number,default:12},delimiter:{type:String,default:","},initialLat:{type:Number,default:45.79815157817745},initialLng:{type:Number,default:15.970237255096436},search:{type:Boolean,default:!0},mapOptions:{type:Object}},data(){return{shouldDisplayMap:this.visible}},watch:{modelValue(e){this.shouldDisplayMap&&(e?this.setMarker(this.parseLatLng(e)):this.removeMarker())}},mounted(){const e=this.$watch("visible",t=>{t&&(this.shouldDisplayMap=!0,this.$nextTick(()=>{e(),this.bootstrapMap()}))},{immediate:!0})},methods:{parseLatLng(e){const t=e.split(this.delimiter).map(a=>parseFloat(a));return{lat:t[0],lng:t[1]}},bootstrapMap(){return this.bootstrapMapPromise?this.bootstrapMapPromise:(this.bootstrapMapPromise=w().then(e=>{const t=this.modelValue?this.parseLatLng(this.modelValue):{lat:this.initialLat,lng:this.initialLng},a=this.map=new e.maps.Map(this.$refs.mapContainer,b({center:t,zoom:this.zoom,disableDefaultUI:!0},this.mapOptions));return this.modelValue&&this.setMarker(t),this.search&&this.setupSearch(e,a),e.maps.event.addListener(a,"click",s=>{this.$emit("update:modelValue",[s.latLng.lat(),s.latLng.lng()].join(this.delimiter))}),{map:a,google:e}}),this.bootstrapMapPromise)},setupSearch(e,t){const a=n(`
                <div class="mapSearch iconSearch">
                    <input placeholder="${l("formElements.map.searchPlaceholder")}" type="text" />
                </div>
            `),s=a.querySelector("input");s.addEventListener("keydown",r=>{r.which===13&&(r.preventDefault(),r.stopPropagation())}),t.controls[e.maps.ControlPosition.TOP_LEFT].push(a);const i=new e.maps.places.SearchBox(s);e.maps.event.addListener(i,"places_changed",()=>{const r=i.getPlaces()[0].geometry.location;this.$emit("update:modelValue",[r.lat(),r.lng()].join(this.delimiter))})},setMarker:function(e){this.bootstrapMap().then(({map:t,google:a})=>{if(!this.marker){this.marker=new a.maps.Marker({map:t,draggable:!0,position:e}),a.maps.event.addListener(this.marker,"dragend",i=>{this.$emit("update:modelValue",[i.latLng.lat(),i.latLng.lng()].join(this.delimiter))});const s=n(`
                        <button type="button" class="removeMarker nBtn iconClose">
                            ${l("formElements.map.removeMarkerCaption")}
                        </button>
                    `);s.addEventListener("click",()=>this.$emit("update:modelValue","")),t.controls[a.maps.ControlPosition.TOP_RIGHT].push(s)}this.marker.setPosition(e),t.panTo(e)})},removeMarker(){this.bootstrapMap().then(({map:e,google:t})=>{e.controls[t.maps.ControlPosition.TOP_RIGHT].clear(),this.marker&&this.marker.setMap(null),delete this.marker})}}},E={key:0,class:"disableOverlay"};function B(e,t,a,s,i,r){const c=k("element-wrapper");return p(),L(c,y(P(e.elementWrapperProps)),{default:M(()=>[t[0]||(m(-1),t[0]=g("div",$({ref:"mapContainer"},e.inputAttributes,{class:"container"}),null,16),m(1),t[0]),e.isInteractive?V("",!0):(p(),T("div",E))]),_:1},16)}const S=f(C,[["render",B],["__file","map.vue"]]);export{S as default};
