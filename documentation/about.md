# About
Trikoder Trim is user interface framework for building headless content management systems that connect to JSON API powered backend.

Content management systems built with Trikoder Trim are decoupled from server side technology stack.
Any server side technology that can process and render json api dataset compliant with [json:api specification](http://jsonapi.org/) will work with UI framework.

Trim enables you to quickly build administration CRUD (create, read, update, delete) interface for your application resources. Resulting CMS is responsive and fast single page application. All styles and behavior for standard use cases come included - programmers job is only to define how each application resource is listed and edited.

Sensible dependency on standardized backend api enables us to use CMS domain specific api in javascript that is pretty much decoupled from libraries and frameworks used underneath. Any capable programmer should be able to define complete interface for resource in need of administration.


## Technology overview
Trikoder Trim is built on following open source stack:

* [Vue](https://vuejs.org/), [Vue Router](https://router.vuejs.org/) and [Vuex](https://vuex.vuejs.org/) are used for application views, routing and store management.
* [Axios](https://github.com/axios/axios) is used as http client
* [JSON api resource](https://dbrekalo.github.io/json-api-resource/) is used for querying and persisting resources
* [Webpack](https://webpack.js.org/) is used for module bundling and code splitting
* [Karma](https://karma-runner.github.io/) is used as test runner and [Mocha](https://mochajs.org/) as test framework.

## Code sneek peek
Lets assume your application has a simple "tag" resource and backend api for this resource is ready.
You want to show list of tags that can be filtered by title.
Additionally you want to setup create and edit interface with input for setting tag title.
Your code should end up looking something like this:

```js
export default {

    resourceName: 'tag',

    setupList: function({list}) {

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

    setupEdit: function({edit}) {

        this.addToIndexControl().addSaveControl();

        edit.addField('TextFormElement', {
            label: 'Title',
            name: 'title'
        });

    }

};
```

## Demo application
Visit [demo application](https://trikoder.github.io/trim/demo/index.html) to get a feeling how CMS built with Trikoder CMF looks and behaves. Is is completely safe to browse, edit and delete items - backend api on demo pages is running on client json api server that stores data in browser memory - so no harm can be done. Dataset can be reset by clicking "reset demo data" control in lower left corner of administration UI. Examine how everything is coded in [demo codebase](https://github.com/trikoder/trim/tree/master/demo).

Feel free to browse, cut and paste from demo codebase and / or use it as reference.
