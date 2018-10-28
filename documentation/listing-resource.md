# Listing resource

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


### createRequiresDraft
Property where we define if draft resource is needed when resource is created.
When createRequiresDraft is set to true controller will save empty resource object before creating interface is displayed.
Saved draft resource will recieve id and be able to support related objects. False is default value.
```js
createRequiresDraft: false
```


### setupList
Controller method where we define how resource is browsed, filtered and sorted in list view.
Controller injects current [listHandler](#resource-list) instance when method is called.

```js
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
```

### setupEdit
Controller method where we define form fields rendered when resource is created or updated.
Controller injects current [editHandler](#resource-edit) instance when method is called, method (edit or create) and resource model when called in editing context.

```js
setupEdit: function({edit, method, resourceModel}) {

    this.addToIndexControl().addSaveControl();

    edit.addField('TextFormElement', {
        label: 'Title',
        name: 'title'
    });

}
```

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
