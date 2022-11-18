import MainNavigation from './mainNavigation.js';

export default {
    MainNavigation: () => MainNavigation,
    PageController: () => import('./controllers/page.js'),
    ArticleController: () => import('./controllers/article/index.js'),
    TagController: () => import('./controllers/tag.js'),
    UserController: () => import('./controllers/user.js'),
    CategoryController: () => import('./controllers/category.js'),
    MediaController: () => import('./controllers/media.js'),
    SnippetController: () => import('./controllers/snippet.js'),
    MySettingsController: () => import('./controllers/mySettings.js')
};
