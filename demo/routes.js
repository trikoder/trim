export default router => {

    router.controller('/', 'dashboard', 'Page@index');

    router.resource('page');
    router.resource('article');
    router.resource('user');
    router.resource('tag');
    router.resource('category');
    router.resource({name: 'media', hasCreateRoute: ['image', 'videoEmbed', 'file']});

    router.controller('my-settings', 'mySettings', 'MySettings');

};
