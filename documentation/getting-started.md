# Getting started
Before digging into UI code make sure you have a basic understanding of core JSON:API concepts (how relations, attributes, getting, creating and updating resources work). A functional backend API compliant with JSON:API standard is prerequisite for building UI.
Browse [JSON:API webpage](http://jsonapi.org/) and [examples](http://jsonapi.org/examples/) to familiarize yourself with standard.

Everything explained in this chapter has concrete implementation details in demo application codebase.
Feel free to [browse demo codebase](https://github.com/trikoder/trim/tree/master/demo) and take what you need.

## Starter template
Starter template for bootstrapping projects built with Trikoder Trim is available at [trim-starter git repository](https://github.com/trikoder/trim-starter/).

```bash
git clone git@github.com:trikoder/trim-starter.git my-cms-project
```

Make sure you have Node.js (8.x and up) and NPM installed.

```bash
cd my-cms-project
npm install
```

Once modules are installed run dev command.
```sh
npm run dev
```

Your new CMS project should greet you now with welcome page running at localhost.
