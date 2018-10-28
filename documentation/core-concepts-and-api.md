# Core concepts and api
Understanding of how core components work is essential for building applications with Trikoder Trim.
This chapter provides insight into resource controller, router, navigation, service container and application object.

## Resource controller
Resource controller is a central place to define user interface and logic for given resource.
Here we define how resource is browsed, filtered and sorted in list, what form fields are rendered when resource is created or updated.

In most use cases controller looks like a simple configuration file.
This configuration based architecture delegates most of the work to components that are composed out of our sight.
Resource controller is a container component which calls service components for listing and editing resources who build their own component subtrees - all that is abstracted from user via simple and easy to use api.

All resource controllers share same basic skeleton. We define what resource type controller is handling (resourceName) and implement methods for resource listing (setupList) and resource editing (setupEdit):

```js
export default {

    resourceName: 'tag',

    setupList: function({list}) {
        // how is resource listed?
    },

    setupEdit: function({edit}) {
         // how is resource edited?
    }

};
```
Learn how [resource is listed](listing-resource.html) and [edited](editing-resource.html).


## Services
Application utilizes simple service container to register and locate components and services.
Form and list elements are usually registered to and retrieved from service container.

Your controllers should also be registered as services.
We encourage you to do so with dynamic import to utilize webpack code splitting and load controller codebase only when it is requested.

A typical file with container services looks something like this:

```js
// services.js
export default {
    PageController: () => import('./controllers/page'),
    TagController: () => import('./controllers/tag')
};
```

## Router
Application utilizes extended [VueJS router](https://router.vuejs.org/) for routing and linking needs.
Your application routes typically look something like this:

```js
// routes.js
export default router => {

    router.controller('/', 'dashboard', 'Page@index');

    router.resource('page');
    router.resource('tag');

    router.controller('my-settings', 'mySettings', 'MySettings');

};
```
### Controller routes
Use 'controller' router method to define routes with controller components:
```js
router.controller(path, routeName, controllerString);
// ... is somewhat equivalent to following vue api...
this.addRoutes([{
    path: '/' + path,
    name: routeName,
    component: AdminDefault,
    props: => {
        // set controller from service registry as child
        // component of AdminDefault component. if method
        // is defined it will be called after component is created
    }
}]);
```

### Resource routes
Use 'resource' router method as a shortcut for defining 3 most used routes for resource:

```js
router.resource('tag');
// ... is equivalent to...
router.controller('tag/create', 'resource.tag.create', 'Tag@create');
router.controller('tag/:id', 'resource.tag.edit', 'Tag@edit');
router.controller('tag', 'resource.tag.index', 'Tag@index');
```

### Generating links
Generate links with router via route names and params:
```js
router.url('resource.tag.index') // /tag;
router.url('resource.tag.edit', {id: 2}) // /tag/2;
router.url('resource.tag.edit', {id: 2}, {foo: 3}) // /tag/2?foo=3;
```

## Navigation
Navigation links and UI elements are defined in navigation component.

```js
// mainNavigation.js
export default {

    getNavigationItems: router => [

        {
            caption: 'Pages',
            key: 'page',
            url: router.url('resource.page.index'),
            icon: 'home'
        },

        {
            caption: 'Misc',
            icon: 'threeDots',
            subItems: [

                {
                    caption: 'Categories',
                    key: 'category',
                    url: router.url('resource.category.index')
                }

            ]
        }

    ],

    getUserNavigationItems: router => [

        {
            caption: 'My settings',
            url: router.url('mySettings'),
        },

        {
            caption: 'Public pages',
            url: 'http://mySite.com''
        },

        {
            caption: 'Show search',
            action: mainNavigation => mainNavigation.showSearch().close()
        }

    ],

    getProjectCaption: () => 'Trikoder CMS',

    getUserCaption: () => 'Demo user'

};
```


### getNavigationItems
Method "getNavigationItems" should return array of objects with following structure:
* caption: for item caption
* key: for identifying and setting selected item
* url: url to point to
* icon: for defining item icon (see all [available icons]())

### getUserNavigationItems
Method "getUserNavigationItems" takes array of objects with following keys:
* caption: for item caption
* url : url to point to
* action: optional callback called when item is clicked with main navigation instance as argument
* appLink: Boolean, true by default, set to false for links pointing outside application

### getProjectCaption
Used for setting project caption.

### getUserCaption
Used for setting current user caption

## Application
Application object is glue that ties all CMS components and services together.
It is used to connect services and routes, load translations, inject boot (config) data and start application.

### Example
```js
// main.js
import app from 'cmf/js/app';
import translations from 'cmf/js/lang/english';
import routes from './routes';
import services from './services';

import './scss/main.scss';

app
    .setBootData({
        usesPushState: true,
        baseUrl: process.env.BASE_URL,
        baseApiUrl: process.env.BASE_API_URL
    })
    .loadTranslations(translations, 'en')
    .registerServices(services)
    .registerRoutes(routes)
    .start();

```

## Configuration
Application is configured by injecting boot or config data on bootstrap.

```js
// main.js
app.setBootData({
    baseUrl: '/app/' // application base url
    baseApiUrl: '/api/', // api base url
    usesPushState: true,
});
```

**Mandatory keys:**
* baseUrl: for setting application base url
* baseApiUrl: for setting api base url

**Optional keys:**
* usesPushState: for using history (Boolean true) or 'hash' (Boolean false) api for navigation
* usePatchForUpdate: for using HTTP patch method when updating resources (put is used by default)
* googleMapsApiKey: set if using map form element
* resourceToApiMap: for setting custom resource api slugs
* itemsPerPage: for setting default number of items per page on resource listing

If you need some data from api endpoint before admin UI is bootstrapped you do so by providing 'beforeAdminEnter' callback to application.

### Full configuration example:
```js
app
    .setBootData({
        baseUrl: '/app/' // application base url
        baseApiUrl: '/api/', // api base url
        usesPushState: true,
        usePatchForUpdate: true,
        googleMapsApiKey: 'my-api-key',
        itemsPerPage: 30,
        resourceToApiMap: {
            article: 'articles',
            tag: 'tags'
        }
    })
    .beforeAdminEnter(() => http.get('api/boot-data').then(apiData => {
        app.setBootData(apiData)
    }))
```

Configuration or boot values can later be retrieved like so:
```js
import bootData from 'cmf/js/library/bootData';
bootData('baseUrl'); // outputs boot data baseUrl value
```

## Localization
Trim includes English and Croatian translation files for common UI elements.
Localization is configured during application bootstrap.
Translations are simple key-value javascript files.

```js
// main.js
import translations from 'cmf/js/lang/english';

app.loadTranslations(translations, 'en');
app.setLocale('en'); // en by default
app.getLocale() // en by default;
```

Translation api can be used throughout application like so:
```js
import translate from 'cmf/js/library/translate';

translate('translation.key');
```

## Authentication
To authenticate users to your app you have to implement simple authentication driver.
Default view for authenticating with username and password is included in Trim.
Examine [base auth api](https://github.com/trikoder/trim/tree/master/src/js/library/auth.js) for full implementation details.
Example of dummy driver implementation is shown bellow:

```js
import api from 'cmf/js/library/api';
import auth from 'cmf/js/library/auth';

export default auth.extend({

    isUserLogged() {

        return Boolean(localStorage.getItem('accessToken'));

    },

    loginWithCredentials(credentials) {

        return new Promise((resolve, reject) => {

            if (credentials.username.length && credentials.password.length) {
                localStorage.setItem('accessToken', 'testToken');
                resolve();
            } else {
                reject(new Error('Login failed'));
            }

        });

    },

    onAuthorization() {

        api.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('accessToken');

    },

    onDeauthorization() {

        localStorage.removeItem('accessToken');
        delete api.defaults.headers.common.Authorization;

    }

});
```

Inform application that you want to use auth driver you implemented:

```js
// app.js
import auth from './auth';
...
app.useAuth(auth);
```


