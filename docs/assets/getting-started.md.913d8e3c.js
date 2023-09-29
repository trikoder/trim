import { _ as _export_sfc, o as openBlock, c as createElementBlock, Q as createStaticVNode } from "./chunks/framework.50d1116b.js";
const __pageData = JSON.parse('{"title":"Getting started","description":"","frontmatter":{},"headers":[],"relativePath":"getting-started.md","filePath":"getting-started.md"}');
const _sfc_main = { name: "getting-started.md" };
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="getting-started" tabindex="-1">Getting started <a class="header-anchor" href="#getting-started" aria-label="Permalink to &quot;Getting started&quot;">​</a></h1><p>Before digging into UI code make sure you have a basic understanding of core json api concepts (how relations, attributes, getting, creating and updating resources work). A functional backend api compliant with json api standard is prerequisite for building UI. Browse <a href="http://jsonapi.org/" target="_blank" rel="noreferrer">json:api webpage</a> and <a href="http://jsonapi.org/examples/" target="_blank" rel="noreferrer">examples</a> to familiarize yourself with standard.</p><p>Everything explained in this chapter has concrete implementation details in demo application codebase. Feel free to <a href="https://github.com/trikoder/trim/tree/master/demo" target="_blank" rel="noreferrer">browse demo codebase</a> and take what you need.</p><h2 id="starter-template" tabindex="-1">Starter template <a class="header-anchor" href="#starter-template" aria-label="Permalink to &quot;Starter template&quot;">​</a></h2><p>Starter template for bootstrapping projects built with Trikoder Trim is available at <a href="https://github.com/trikoder/trim-starter/" target="_blank" rel="noreferrer">trim-starter git repository</a>.</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">clone</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">git@github.com:trikoder/trim-starter.git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">my-cms-project</span></span></code></pre></div><p>Make sure you have Node.js (8.x and up) and NPM installed.</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">my-cms-project</span></span>\n<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span></span></code></pre></div><p>Once modules are installed run dev command.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark"><code><span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">dev</span></span></code></pre></div><p>Your new CMS project should greet you now with welcome page running at localhost.</p>', 11);
const _hoisted_12 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, _hoisted_12);
}
const gettingStarted = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  gettingStarted as default
};