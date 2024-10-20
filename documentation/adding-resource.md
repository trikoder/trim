# Adding resource
We will examine typical scenario where new resource is ready on backend API and admin user interface has to be created.
Steps needed to complete UI for this new resource:
- examine resource API
- create resource controller
- add resource route
- add navigation link
- register controller as service

For simple resources this can be completed in less then 5 minutes.

## Examine resource API
Make sure that resource backend API is ready to handle get, post, and put requests.
Check that backend properly outputs relation includes, make sure that filtering and validation rules are respected.
Examine new resource attributes and relations and decide what list and form elements have to be used.

Everything works? Then lets build resource UI controller.

## Create resource controller
Let’s say new resource in need of UI is `tag` entity.
We will need a component to describe how resource is browsed, filtered and sorted in list, what form fields are rendered when resource is created or updated.

For this purpose we will build a tag resource controller in 'src/controllers/tag.js' file:

```js
export default {

    resourceName: 'tag',

    setupList: function({list}) {

        this.addCreateControl('Create new tag');

        // --------------------------------------------------------------
        // Filters
        // --------------------------------------------------------------
        list.addFilter('TextFormElement', {
            name: 'title',
            label: 'Title'
        });

        // --------------------------------------------------------------
        // List items
        // --------------------------------------------------------------
        list.addItem('TextListItem', {
            attributes: {class: 'textListItemType1 hiddenOnMobile'},
            caption: 'ID',
            mapTo: 'id'
        });

        list.addItem('LinkListItem', {
            caption: 'Title',
            mapTo: 'title',
            action: 'editItem'
        });

        // --------------------------------------------------------------
        // Context menu
        // --------------------------------------------------------------
        list.addItem('ContextMenuListItem', {
            caption: 'Actions',
            items: [{caption: 'Edit', action: 'editItem'}]
        });

    },

    setupEdit: function({edit}) {

        this.addToIndexControl().addSaveControl();

        edit.addField('TextFormElement', {
            label: 'Title',
            name: 'title'
        });

    }

};
```
---

Read up on how [resource controllers](/core-concepts-and-api.html#resource-controller) work, examine how to build [resource list](/list-elements.html) and [form elements](/form-elements.html).

## Add resource route
Open your routes file (src/routes.js) and add new resource route:
```js
...
router.resource('tag');
...
```
Browse [router docs](/core-concepts-and-api.html#router) to learn more.


## Add navigation item
Open your main navigation component (src/mainNavigation.js) and add new navigation item:
```js
getNavigationItems: router => [

    {
        caption: 'Tags',
        key: 'tag',
        url: router.url('resource.tag.index'),
        icon: 'Misc'
    }

],
```
Read more about [main navigation](/core-concepts-and-api.html#navigation) if you want to learn more.

## Register controller as service
Open up your services file (src/services.js) and add new tag resource controller to registry.
Use dynamic import to load controller code and its dependencies only when controller is actually rendered.
```js
...
TagController: () => import('./controllers/tag.js'),
...
```
Done! Read up on [services](/core-concepts-and-api.html#services) if you want to learn more.
