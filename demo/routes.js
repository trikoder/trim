export default router => {

    router.controller('/', 'dashboard', 'Article@index');

    router.resource('article');
    router.resource('page');
    router.resource('user');
    router.resource('tag');
    router.resource('category');
    router.resource('snippet');
    router.resource({name: 'media', hasCreateRoute: ['image', 'videoEmbed', 'file']});

    router.controller('my-settings', 'mySettings', 'MySettings');

};
