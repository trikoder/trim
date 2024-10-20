const baseAbsoluteUrl = process.env.CI ? 'https://trikoder.github.io' : 'http://localhost:3000';

export default {
    outDir: '../docs',
    title: 'Trikoder Trim',
    description: 'Responsive UI framework for building content management systems with simple authoring API. Designed to run as a browser application connected to JSON:API powered backend.',
    base: '/trim/',
    head: [
        ['link', {rel: 'shortcut icon', href: `/favicon.ico`}],
        ['link', {rel: 'apple-touch-icon-precomposed', sizes: '152x152', href: '/apple-touch-icon-152x152.png'}],
        ['link', {rel: 'icon', sizes: '196x196', href: '/favicon-196x196.png'}]
    ],
    themeConfig: {
        nav: [
            { text: 'Documentation', link: '/about' },
            { text: 'Demo', link: baseAbsoluteUrl + '/trim/demo/index.html' },
            { text: 'GitHub', link: 'https://github.com/trikoder/trim' }
        ],
        sidebar: [
            {text: 'Home', link: '/'},
            {text: 'About', link: '/about'},
            {text: 'Getting started', link: '/getting-started'},
            {text: 'Core concepts and API', link: '/core-concepts-and-api'},
            {text: 'Adding resource', link: '/adding-resource'},
            {text: 'Form elements', link: '/form-elements'},
            {text: 'List elements', link: '/list-elements'},
            {text: 'Base controllers', link: '/base-controllers'},
            {text: 'Changelog', link: '/changelog'}
        ]
    },
    appearance: false,
    markdown: {
        theme: 'github-dark'
    },
    vite: {
        define: {
            // Probably related to https://github.com/vuejs/vitepress/commit/9794877347140c7b4955d735cd8867c260a5089d
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
        }
    }
};
