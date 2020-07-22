# Base controllers
Trim includes a number of predefined UI base controllers for common use cases.
Beside resource controller that is most frequently extended base controllers for resource edit, nested resource and media resource are available.

## Resource controller
Used when you need to define how resource is browsed, filtered and sorted in list, what form fields are rendered when resource is created or updated.
Example [demo controller](https://trikoder.github.io/trim/demo/index.html#page) and [codebase](https://github.com/trikoder/trim/tree/master/demo/controllers/page.js).

Code example:
```js
export default {

    resourceName: 'tag',

    setupList({list}) {
        // how is resource listed?
    },

    setupEdit({edit}) {
        // how is resource edited?
    }

};
```

Sometimes empty resource is required for meaningful create admin interface.
In this case draft resource is created on api (with id but no attributes and relation data) and edited in UI immediately.

```js
export default {

    resourceName: 'tag',
    createRequiresDraft: true,
    ...

};
```

Explicit included relations and data can be specifed on resource controller index and edit actions:

```js
export default {

    resourceName: 'tag',

    includedRelationships: {
        index: ['media', 'author'],
        edit: ['media', 'author', 'author.media']
    },

    ...

};
```
Default behaviour for resource saving is for related resources to be saved before main resource.
Alternate save strategy for main and related resources when resource is created is available by
settting 'createRelatedStrategy' property on controller to 'relatedLast' value.

```js
export default {

    resourceName: 'user',
    createRelatedStrategy: 'relatedLast',
    ...

};
```

## Resource edit controller
Used when you want to edit one specific resource and listing is not available.
Implement "getModel" method and provide model instance to edit.
Example [demo controller](https://trikoder.github.io/trim/demo/index.html#my-settings) and [codebase](https://github.com/trikoder/trim/tree/master/demo/controllers/mySettings.js).
Code example:

```js
export default {

    extendsController: 'BaseResourceEdit',

    getModel: Model => Model.getFromApi({type: 'user', id: 1}),

    setupEdit({edit}) {

        this.setPageTitle('My settings').addSaveControl();

        edit.addField('TextFormElement', {
            label: 'Email',
            name: 'email'
        });

    }

};
```

## Nested resource controller
Used for hierarchal resources that can be presented in nested tree view form.
Categories as resources usually have parent and child categories.
Example [demo controller](https://trikoder.github.io/trim/demo/index.html#category) and [codebase](https://github.com/trikoder/trim/tree/master/demo/controllers/category.js).

Lets examine category api response:
```js
{
    type: 'category',
    id: '1',
    attributes: {
        title: 'Category 1',
        description: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi.',
        published: true,
        imageThumbnailUrl: 'http://pipsum.com/400x300.jpg?v=1',
        imageOriginalUrl: 'http://pipsum.com/1200x900.jpg?v=1'
    },
    relationships: {
        parentCategory: {
            data: {id: '2', type: 'category'}
        },
        childCategories: {
            data: [
                {id: '7', type: 'category'}
            ]
        }
    }
}
```
Resource hierarchy is defined via parentCategory and childCategories relations.

Our category resource controller should extend base nested resource controller.
Via resourceConfig property we define parent and children relation mappings.
```js
export default {

    resourceName: 'category',
    extendsController: 'BaseNestedResource',
    mapParentTo: 'parentCategory',
    mapChildrenTo: 'childCategories',

    setupList({list}) {
        // how is resource listed?
    },

    setupEdit({edit}) {
        // how is resource edited?
    }

};
```

Resource config has following defaults:
```js
{
    mapParentTo: 'parent',
    mapChildrenTo: 'children',
    mapLevelTo: undefined,
    mapIsLeafTo: undefined,
},
```
Properties mapChildrenTo, mapLevelTo, mapIsLeafTo can be defined as strings or functions if needed.


## Media resource controller
Used for browse, create (upload) and edit media resources sush as images or files.
Example [demo controller](https://trikoder.github.io/trim/demo/index.html#media) and [codebase](https://github.com/trikoder/trim/tree/master/demo/controllers/media.js).

Lets examine typical media api response:
```js
{
    type: 'media',
    id: '1',
    attributes: {
        title: 'Media item 1',
        caption: 'Aenean gravida, orci in sagittis tincidunt, dolor quam pellentesque dolor, nec viverra neque nunc id mi.',
        mediaType: 'image',
        thumbnailUrl: 'http://pipsum.com/400x300.jpg,
        originalUrl: 'http://pipsum.com/1200x900.jpg
    }
}
```
Example media controller is shown bellow.
Via resource config propery we define list of media types (image, file, videoEmbed) our controller is handling.
For each media type a method for edit handling is defined (setup[MediaType]Edit).

```js
export default {

    extendsController: 'BaseMediaResource',
    resourceName: 'media',
    resourceCaption: 'title',
    mediaTypes: ['image', 'file', {
        name: 'videoEmbed',
        createPageTitle: 'Create video embed',
        hasUploadUi: false
    }],

    setupList({list}) {

        this.addCreateImageControl('Create new image').addDropdownControl([{
            caption: 'Create video embed',
            action: this.openCreateVideoEmbed
        }, {
            caption: 'Upload file',
            action: this.openCreateFile
        }]);

        ...

    },

    setupImageEdit({edit}) {

        this.addToIndexControl().addSaveControl();

        edit.addField('MediaPreviewFormElement', {
            label: 'Photography',
            name: 'mediaPreview'
        });

        ...

    },

    setupVideoEmbedEdit({edit}) {

        ...

    },

    setupFileEdit({edit}) {

        ...

    }

};

```

For our media controller to work properly we have to define following route:

```js
router.resource({name: 'media', hasCreateRoute: ['image', 'videoEmbed', 'file']});
```
