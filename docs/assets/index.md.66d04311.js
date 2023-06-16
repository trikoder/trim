import { _ as _export_sfc, o as openBlock, c as createElementBlock, z as createBaseVNode, C as createCommentVNode, O as createStaticVNode, M as pushScopeId, N as popScopeId, G as createVNode } from "./chunks/framework.3d88779c.js";
const HomeCustom_vue_vue_type_style_index_0_scoped_5ba61264_lang = "";
const HomeCustom_vue_vue_type_style_index_1_lang = "";
const _sfc_main$1 = {
  data: () => ({
    iframeOverlayEnabled: true
  }),
  methods: {
    disableIframeOverlay() {
      this.iframeOverlayEnabled = false;
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-5ba61264"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "teaser" };
const _hoisted_2 = { class: "topBlock" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "textTeaser" }, [
  /* @__PURE__ */ createBaseVNode("h2", { class: "title" }, "Modernize your content management system"),
  /* @__PURE__ */ createBaseVNode("p", { class: "text" }, " Trikoder Trim is user interface framework for building headless content management systems that connect to JSON API powered backend. Craft responsive single page applications that work on all devices. ")
], -1));
const _hoisted_4 = { class: "iframeCont" };
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("iframe", {
  frameborder: "0",
  src: "https://trikoder.github.io/trim/demo/index.html"
}, null, -1));
const _hoisted_6 = /* @__PURE__ */ createStaticVNode('<div class="featuresAccented" data-v-5ba61264><ul data-v-5ba61264><li data-v-5ba61264><h3 class="title" data-v-5ba61264>Headless and powered by JSON API standard</h3><p class="text" data-v-5ba61264> Client applications built with Trikoder Trim are decoupled from server side technology stack. Develop with any backend that can process json api datasets compliant with json:api specification. </p></li><li data-v-5ba61264><h3 class="title" data-v-5ba61264>Responsive UI for all screen sizes and devices</h3><p class="text" data-v-5ba61264> Admin panels built with Trikoder Trim framework are responsive single page applications powered by Vue.js. Extend components or write custom ones using powerful Vue dev tools and environment. </p></li><li data-v-5ba61264><h3 class="title" data-v-5ba61264>Open source, free and battle tested</h3><p class="text" data-v-5ba61264> Trikoder Trim is open source project and can be used in private or commercial projects free of charge. Library is developed, maintained and used by leading Croatian development agency Trikoder. </p></li></ul></div><h3 class="quote" data-v-5ba61264> Elevate developer and user experience by decoupling frontend and agreeing on standardized api. </h3><div class="features" data-v-5ba61264><ul data-v-5ba61264><li data-v-5ba61264><h3 class="title" data-v-5ba61264>Communicate with backend efficiently</h3><p class="text" data-v-5ba61264> JSON API standard defines how attribute and relation data is structured, how resources are created and updated. By agreeing on standardized input / output with your backend colleges and following shared conventions you can increase productivity and focus on your application. </p></li><li data-v-5ba61264><h3 class="title" data-v-5ba61264>Build resource UI in minutes</h3><p class="text" data-v-5ba61264> Define how resource is browsed, filtered and sorted in list, what form fields are rendered when resource is created or updated. All this is done inside one javascript file via domain specific language or api that anyone can easily read and write. </p></li><li data-v-5ba61264><h3 class="title" data-v-5ba61264>Design with built-in performance</h3><p class="text" data-v-5ba61264> Vue.js is doing its magic underneath all Trim controllers and components. To ensure maximum performance and scalability every controller and its resources are loaded on demand by utilizing webback&#39;s code splitting features. No css framework is used and css is component scoped. Browser only downloads css and js related to currently viewed page. </p></li><li data-v-5ba61264><h3 class="title" data-v-5ba61264>Integrate your own components</h3><p class="text" data-v-5ba61264> Custom components and controllers can be easily injected to your Trim application. You can use standard Vue development environment with single file authoring format for composing component template, logic and styles. </p></li></ul></div><section class="contributors" data-v-5ba61264><h3 class="title" data-v-5ba61264>Contributors</h3><ul data-v-5ba61264><li data-v-5ba61264><a class="person" href="https://github.com/dbrekalo" data-v-5ba61264><img src="https://s.gravatar.com/avatar/32754a476fb3db1c5a1f9ad80c65d89d?s=100" alt="Damir Brekalo" data-v-5ba61264></a></li><li data-v-5ba61264><a class="person" href="https://github.com/davoreric" data-v-5ba61264><img src="https://s.gravatar.com/avatar/3024633e44d412a635dfe9adde700e17?s=100" alt="Davor Erić" data-v-5ba61264></a></li><li data-v-5ba61264><a class="person" href="https://github.com/alenpokos" data-v-5ba61264><img src="https://s.gravatar.com/avatar/e3b6f47be05e23b4c29531b382fecfbd?s=100" alt="Davor Erić" data-v-5ba61264></a></li><li data-v-5ba61264><a class="person" href="https://hr.linkedin.com/in/vedrankrizek" data-v-5ba61264><img src="https://s.gravatar.com/avatar/43e4f34c2fb55c49c20781c49c14a0f3?s=100" alt="Vedran Križek" data-v-5ba61264></a></li></ul></section><footer class="mainFooter" data-v-5ba61264> Made with love by Trikoder 2018. </footer>', 5);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      _hoisted_3,
      createBaseVNode("div", _hoisted_4, [
        _hoisted_5,
        _ctx.iframeOverlayEnabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          onClick: _cache[0] || (_cache[0] = (...args) => $options.disableIframeOverlay && $options.disableIframeOverlay(...args)),
          class: "overlay"
        })) : createCommentVNode("", true)
      ])
    ]),
    _hoisted_6
  ]);
}
const HomeCustom = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-5ba61264"]]);
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","pageClass":"homeCustom"},"headers":[],"relativePath":"index.md","filePath":"index.md"}');
const __default__ = { name: "index.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(HomeCustom)
      ]);
    };
  }
});
export {
  __pageData,
  _sfc_main as default
};
