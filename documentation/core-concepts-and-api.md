# Core concepts and api
Understanding of how core components work is essential for building applications with Trikoder Trim.
This chapter provides insight into resource controller, resource list, resource edit, router, navigation, service container and application object.

## Resource controller
Resource controller component is a central place to define user interface for given resource.
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

A list of controller properties and methods is examined bellow:

### resourceName
Controller property where we name the resource handled (tag, article, page...)
```js
resourceName: 'tag'
```

### resourceCaption
Controller property where we define resource caption mapping, default value is null. It is currently used only in mass actions component as a value for 'mapSelectedCaptionsTo' (if it is null, then it fallbacks to 'id') so it's recommended to always set resource caption value.
```js
resourceCaption: 'title'
```

### resourceÅlias
When 2 or more different UI controllers that connect to same resource (resourceName) are needed this property is used to separate them logically.
Resource alias will be used to construct different controller routes and to bind correct selected main navigation item.
```js
resourceCaption: 'userTag'
```

### createRequiresDraft
Property where we define if draft resource is needed when resource is created.
When createRequiresDraft is set to true controller will save empty resource object before creating interface is displayed.
Saved draft resource will receive id and be able to support related objects. False is default value.
```js
createRequiresDraft: false
```

### createRelatedStrategy
Property which defines which strategy is used for persisting main and related resources:
- relatedFirst: related resources are saved before main resource (default behavior)
- relatedLast: related resources are saved after main resource is persisted

```js
createRelatedStrategy: 'relatedFirst'
````

### includedRelationships
Specify relationships to include in api payload for resource listing (index) and editing (edit)
Previously named "includeApiData" in versions up to v0.77, now deprecated.
```js
includedRelationships: {
    index: ['category'],
    edit: ['category', 'author']
}
````

### includedFields (sparse fieldsets)
Specify fields to include in api payload for resource listing (index) and editing (edit)
```js
includedFields: {
    index: {
        article: ['title', 'intro', 'author', 'tags'],
        user: ['email']
    }
}
````

### setupList
Controller method where we define how resource is browsed, filtered and sorted in list view.

```js
setupList: function({list, query}) {

    this.addCreateControl('Create new tag');

    list.addFilter('TextFormElement', {
        name: 'title',
        label: 'Title'
    });

    list.addItem('TextListItem', {
        caption: 'ID',
        mapTo: 'id'
    });

    list.addItem('LinkListItem', {
        caption: 'Title',
        mapTo: 'title',
        action: 'editItem'
    });
},
```
Following arguments are available:
- list: instance of [resourceList](#resource-list) object
- query: current resource query parameters (filters, sort, page...)

### setupEdit
Controller method where we define form fields rendered when resource is created or updated.

```js
setupEdit: function({edit, method, resourceModel}) {

    this.addToIndexControl().addSaveControl();

    edit.addField('TextFormElement', {
        label: 'Title',
        name: 'title'
    });

}
```
Following arguments are available:
- edit: instance of [editHandler](#resource-edit) object
- method: current resource authoring context ('edit' or 'create')
- resourceModel: instance of resource model that is currently edited (or created)

### openIndex
Controller instance method which opens resource index or listing.

```js
controller.openIndex(queryParams);
```

### openEdit
Controller instance method which opens resource editing.

```js
controller.openEdit(routeParams, queryParams);
```

### openCreate
Controller instance method which opens resource create.

```js
controller.openCreate(queryParams);
```

### addCreateControl
Controller instance method which adds resource create control.

```js
controller.addCreateControl(caption);
```

### addSaveControl
Controller instance method which adds resource save control.

```js
controller.addSaveControl(caption);
```

### addToIndexControl
Controller instance method which adds resource list control.

```js
controller.addToIndexControl();
```

### addControl
Controller instance method which adds generic resource control.

```js
controller.addControl({
    caption: 'myControl',
    url: this.getCreateUrl(),
    className: 'accented iconPlus',
    action: this.openCreate
});
```

### addDropdownControl
Controller instance method which adds generic dropdown resource control.

```js
controller.addDropdownControl(params);
```


## Resource list
Resource list is component responsible for handling resource browsing, filtering and sorting.
Examine [list elements](/list-elements.html) chapter to find out how each list element is configured.


### addItem
Method for defining what elements are displayed when resource is listed:

```js
list.addItem('TextListItem', {
    caption: 'Title',
    mapTo: 'title'
});
```

### addFilter
Method for adding filter form elements when resource is listed:

```js
list.addFilter('TextFormElement', {
    name: 'title',
    label: 'Title'
});
```

### addSort
Method for adding sort options on resource list:

```js
list.addSort([
    {
        label: 'By title',
        field: '-title'
    },
    {
        label: 'By date',
        field: '-date'
    }
]);
```

### filterAlwaysBy
Method for setting persistent api filters.

```js
list.filterAlwaysBy('deleted', 'no');
// or
list.filterAlwaysBy({deleted: 'no'});
```

### filterInitiallyBy
Method for setting initial api and UI filters.

```js
list.filterInitiallyBy('published', 'yes');
// or
list.filterInitiallyBy({published: 'yes'});
```

### refreshItems
Call to refresh current list context content

```js
list.refreshItems();
```

### setTemplate
Method for choosing which template is used for resource listing ('table' and 'cards' are currently supported).

```js
list.setTemplate('cards');
```

### addMassAction
Method for adding mass actions to resource list.

```js
list.addMassAction([
    {
        caption: 'Publish',
        updateAttributes: {published: true}
    }
]);
```

## Resource edit
Resource edit is component responsible for handling how resource is created or updated.

### addField
Method for defining what form elements are mapped to resource attributes and relations when resource is edited or created.
Examine [form elements](/form-elements.html) chapter to find out how each form element is configured.

```js
edit.addField('TextFormElement', {
    label: 'Title',
    name: 'title'
});
```

### showField
Show edit form field:
```js
edit.showField('title');
```

### hideField
Show edit form field:
```js
edit.hideField('title');
```

### toggleField
Toggle edit form field (use second boolean argument to show or hide field)
```js
edit.toggleField('title', true);
```

### updateField
Update edit field value and options / props
```js
edit.updateField('title', {
    value: 'Foo'
});
```

### updateAllFields
Update all edit fields options
```js
edit.updateAllFields({
    editable: false
});
```

### observe
Observe and respond to form field value changes:
```js
edit.observe('formData.title', value => {
    console.log('Title changed: ' + value);
})
```

### allowSave
Allow or disallow resource saving:
```js
edit.allowSave(false);
```

### configureLayout
Method for configuring edit and create layout. Supports tabs, regions and groups (all items are auto generated from layout reference).
```js
// assign form element to layout region (main and side regions are supported) position with layoutReference
edit.addField(TextFormElement, {
    label: 'Title',
    name: 'title',
    layoutReference: 'mainRegion'
});

edit.addField(TextFormElement, {
    label: 'Meta data',
    name: 'meta',
    layoutReference: 'sideRegion'
});
```
Altering layout configuration to set tab captions:

```js
// configure tab layout caption
edit.configureLayout({
    'mainTab.caption': 'Content and settings',
    'seoTab.caption': 'SEO and meta data'
});

// assign form element to layout position with layoutReference
editHandler.addField(TextFormElement, {
    label: 'Title',
    name: 'title',
    layoutReference: 'mainTab.mainRegion'
});
```

### selectTab
Select edit layout tab:
```js
edit.selectTab('main');
```

## Services
Application utilizes simple service container to register and locate components and services.
All form and list components are registered and retrieved from service container by default.

Your resource controllers should also be registered as services.
We encourage you to do so with dynamic import to utilize webpack code splitting and load controller code only when it is requested.

A typical service container with navigation and few registered controllers looks something like this:

```js
export default {
    MainNavigation: () => import('./controllers/mainNavigation.js'),
    PageController: () => import('./controllers/page.js'),
    TagController: () => import('./controllers/tag.js')
};
```
If you need to access service container manually somewhere in your code:
```js
import serviceContainer from 'trim/library/serviceContainer.js';

serviceContainer.register('myService', () => {foo: 'bar'});

serviceContainer.get('myService').then(myService => {
    console.log(myService.foo); // outputs bar
});
```

## Router
Application utilizes extended [VueJS router](https://router.vuejs.org/) for linking and routing needs.
Your application routes typically look something like this:

```js
export default router => {

    router.controller('/', 'dashboard', 'Page@index');

    router.resource('page');
    router.resource('tag');

    router.controller('my-settings', 'mySettings', 'MySettings');

};
```
### Router.controller
Method for defining routes with controller components.
```js
router.controller(path, routeName, controllerString);
// ... is somewhat equivalent to...
this.addRoute({
    path: '/' + path,
    name: routeName,
    component: AdminDefault,
    props: => {
        // set controller from service registry as child component of Default Admin component
        // if method is defined it will be called after component is created
    }
});
```

### Router.resource
Router resource method is a shortcut for defining 3 most used routes for resource:

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
Navigation component is used to define main user navigation UI element.
Navigation links, user panel links, application name and current username are all defined in navigation component.


### Code example
```js
export default {

    getNavigationItems: router => [

        {
            caption: 'Pages',
            key: 'page',
            url: router.url('resource.page.index'),
            icon: 'Home'
        },

        {
            caption: 'Articles',
            key: 'article',
            url: router.url('resource.article.index'),
            icon: 'Copy'
        },

        {
            caption: 'Misc',
            icon: 'ThreeDots',
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
            caption: 'Public pages',
            url: 'http://mySite.com'',
            newTab: true
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
Method "getNavigationItems" takes array of objects with following keys:
* caption: for item caption
* key: prefix for "Link" class name
* url: url to point to
* icon: adds sufix to element icon classname (all current icon suffixes can be found in "/src/scss/library/_variables.scss" file, under $icons variable)


### getUserNavigationItems
Method "getUserNavigationItems" takes array of objects with following keys:
* caption: for item caption
* url : url to point to
* action: if url is ommited, application calls this function with mainNavigation as argument
* appLink: Boolean value, true is in app link
* newTab: adds target="_blank" attribute to link
* icon: adds sufix to element icon classname (all current icon suffixes can be found in "/src/scss/library/_variables.scss" file, under $icons variable)


### getProjectCaption
Use method "getProjectCaption" to set CMS project name.


### getUserCaption
Use method "getUserCaption" to set current user caption.

## Application
Application object is glue that ties all CMS components and services together.
It is used to connect services and routes, load translations, inject boot (config) data and start application.

### Code example
```js
import app from 'trim/app.js';
import translations from 'trim/lang/english.js';
import routes from './routes.js';
import services from './services.js';

import './scss/main.scss';

app
    .loadTranslations(translations, 'en')
    .registerServices(services)
    .registerRoutes(routes)
    .start();

```

### registerServices
Used to register user defined services to service container.


### registerRoutes
Used to register user defined routes to route registry.


### loadTranslations
Used to import translation data for specific locale.


### setLocale
Used to set application locale.
```js
app.setLocale('hr'); // en by default
```

### getLocale
Used to get application locale.
```js
app.getLocale() // en by default;
```

### beforeAdminEnter
Used to set Promise function before creating admin instance.
```js
app.beforeAdminEnter(() => { return Promise.resolve(); });
```

### start
Once called application will setup router, services and main view components.

## Configuration
Trim based application is configured by setting boot (or config) data in your main entry point.
Anything can be inserted in boot data storage, only "baseUrl" and "baseApiUrl" are mandatory.

```js
app.setBootData({
    baseUrl: process.env.BASE_URL,
    baseApiUrl: process.env.BASE_API_URL
})
````
### Use browser history api
Configure Trim application to use browser history api.
```js
app.setBootData({
    usesPushState: true
})
````

### Using patch for resource updates
Api adapter can be instructed to use 'PATCH' insted of 'PUT' method when updating JSON api resources.
```js
app.setBootData({
    usePatchForUpdate: true
})
````

### Configuring resource url slugs
JSON api resource url slugs can be customized via 'resourceToApiMap' config property.
Used this when JSON api resource type is not directly mapped to resource api url.
```js
app.setBootData({
    resourceToApiMap: {
        article: 'articles'
        user: 'users'
    }
})
````

### Api pagination strategies
Trim comes with offset (default) and page based pagination strategies included.
Customize offset based strategy (creates api query like ?page[offset]=0&page[limit]=15):
```js
app.setBootData({
    apiPagination: {
        strategy: 'offsetBased',
        offsetKey: 'offset',
        limitKey: 'limit'
    }
})
````
Set and customize page based strategy (creates api query like ?page[number]=1&page[size]=15):
```js
app.setBootData({
    apiPagination: {
        strategy: 'pageBased',
        numberKey: 'number',
        limitKey: 'size'
    }
})
````

### Validation error field
Configure error message lookup field when resource model has validation errors.
```js
app.setBootData({
    validationErrorField: 'detail'
});
````

### Other boot data keys
```js
app.setBootData({
    toggleColumnsVisibility: true, // activate toggle list table columns visibility feature, default is FALSE
    itemsPerPage: 15, // default number of items per page
    googleMapsApiKey: '123123', // api key for google maps
    ckEditorPath: 'https://cdn.ckeditor.com/4.10.0/standard-all/' // ckeditor CDN
})
````

### Access boot data outside of main entry point.
Boot data can later be retrieved like so:
```js
import bootData from 'trim/library/bootData.js';
bootData('baseUrl'); // outputs boot data baseUrl value
```

## Authentication
To authenticating users to your app you have to implement simple authentication driver.
Default view for authenticating with username and password is included in Trim.
Examine [base auth api](https://github.com/trikoder/trim/tree/master/src/js/library/auth.js) for full implementation details.
Simple driver implementation is shown bellow:

```js
import api from 'trim/library/api.js';
import auth from 'trim/library/auth.js';

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
import auth from './auth.js';
...
app.useAuth(auth);
```


