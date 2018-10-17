module.exports = {
    dest: 'docs',
    title: 'Trikoder Trim',
    description: 'Responsive UI framework for building content management systems with simple authoring api. Designed to run as a browser application connected to json:api powered backend.',
    base: '/trim/',
    head: [
        ['link', {rel: 'shortcut icon', href: `/favicon.ico`}],
        ['link', {rel: 'apple-touch-icon-precomposed', sizes: '152x152', href: '/apple-touch-icon-152x152.png'}],
        ['link', {rel: 'icon', sizes: '196x196', href: '/favicon-196x196.png'}]
    ],
    themeConfig: {
        nav: [
            { text: 'Documentation', link: '/about' },
            { text: 'Demo', link: 'https://trikoder.github.io/trim/demo/index.html' },
            { text: 'Github', link: 'https://github.com/trikoder/trim' }
        ],
        sidebar: [
            ['/', 'Home'],
            ['/about', 'About'],
            ['/getting-started', 'Getting started'],
            ['/core-concepts-and-api', 'Core concepts and api'],
            ['/adding-resource', 'Adding resource'],
            ['/form-elements', 'Form elements'],
            ['/list-elements', 'List elements'],
            ['/base-controllers', 'Base controllers'],
            ['/changelog', 'Changelog']
        ]
    }
};
