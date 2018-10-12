import auth from './auth';

export default {

    getNavigationItems: router => [

        {
            caption: 'Pages',
            key: 'page',
            url: router.url('resource.page.index'),
            icon: 'sidebar'
        },

        {
            caption: 'Articles',
            key: 'article',
            url: router.url('resource.article.index'),
            icon: 'file'
        },

        {
            caption: 'Multimedia',
            key: 'media',
            url: router.url('resource.media.index'),
            icon: 'instagram'
        },

        {
            caption: 'Application users',
            key: 'user',
            url: router.url('resource.user.index'),
            icon: 'user'
        },

        {
            caption: 'Miscellaneous',
            icon: 'moreHorizontal',
            subItems: [

                {
                    caption: 'Categories',
                    key: 'category',
                    url: router.url('resource.category.index')
                },

                {
                    caption: 'Tags',
                    key: 'tag',
                    url: router.url('resource.tag.index')
                }

            ]
        }

    ],

    getUserNavigationItems: router => [

        {
            caption: 'My settings',
            url: router.url('mySettings'),
            appLink: true
        },

        {
            caption: 'Show search <span style="opacity: 0.4;">(Shift + l)</span>',
            action: mainNavigation => mainNavigation.showSearch().close()
        },

        {
            caption: 'Logout',
            action: () => auth.logout()
        }

    ],

    getProjectCaption: () => 'Trikoder Trim CMS',

    getUserCaption: () => 'Demo user'

};
