import MainNavigation from './mainNavigation.js';

export default {
    MainNavigation: () => MainNavigation,
    PageController: () => import('./controllers/page'),
    ArticleController: () => import('./controllers/article'),
    TagController: () => import('./controllers/tag'),
    UserController: () => import('./controllers/user'),
    CategoryController: () => import('./controllers/category'),
    MediaController: () => import('./controllers/media'),
    SnippetController: () => import('./controllers/snippet'),
    MySettingsController: () => import('./controllers/mySettings')
};
