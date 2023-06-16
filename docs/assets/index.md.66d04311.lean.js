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
const _hoisted_6 = /* @__PURE__ */ createStaticVNode("", 5);
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
