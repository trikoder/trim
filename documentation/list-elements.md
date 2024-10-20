# List elements
When resource is browsed, filtered and sorted a subset of attributes and relation data is shown in table or list view.
We use list elements to define what goes into this list.
This usually includes a combination of textual and graphical data and some list item actions.

In most cases we add list element definitions via [resource list](core-concepts-and-api.html#resource-list) handler inside resource controller setupList method.
All list elements are Vue components found in [listElement folder](https://github.com/trikoder/trim/tree/master/src/js/listElements) in trim codebase.

## Shared options
All list elements accept following set of options:

* **caption**: used to define cell heading content.
* **mapTo**: used for mapping list item content to resource attribute or relationship data. Can be string of function. When defined as string it will fetch model value under that key. Learn how to use [JSON:API resource](https://dbrekalo.github.io/json-api-resource/) to query and transform data.
* **attributes**: List of DOM element attributes.

---

```js
list.addItem('TextListItem', {
    caption: 'title',
    mapTo: 'title'
});

list.addItem('TextListItem', {
    caption: 'Full name',
    attributes: {
        title: 'First and last name',
        style: 'letter-spacing: 0.3em;'
    },
    mapTo: model => model.get('firstName') + ' ' + model.get('lastName'),
    prependCaption: this.screenIsSmall
});
```

## Text
Text list element is used for displaying textual data.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/listElements/text.vue).

```js
list.addItem('TextListItem', {
    caption: 'tags',
    mapTo: 'tags.title'
});
```

### Options:
* **escapeHtml**: escapes html entities (default true)
* **limitCharacters**: set number of characters to display before text is truncated (Integer or boolean, default false)
* **limitWords**: set number of words to display before text is truncated (Integer or boolean, default false)
* **stripTags**: remove html tags in string (boolean, default false),
* **collectionDelimiter**: set delimiter to be used when collection elements are joined (string, default ', ')
* **ifEmpty**: text to display when element value is empty (string, default '')
* **prependCaption**: optional boolean to hint if caption is to be prepended to element content mapping. Usefull for small screens.

```js
list.addItem('TextListItem', {
    caption: 'Full name',
    mapTo: model => model.get('firstName') + ' ' + model.get('lastName'),
    limitCharacters: 100,
    ifEmpty: 'N/A'
});

list.addItem('TextListItem', {
    caption: 'Description',
    mapTo: 'article.html',
    stripTags: true,
    limitWords: 20
});
```

## Link
Link list element is used for rendering links pointing inside or outside CMS.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/listElements/link.vue).

```js
list.addItem('LinkListItem', {
    caption: 'Title',
    mapTo: 'title',
    action: 'editItem'
});
```
### Options:
* **action**: callback to run when link is clicked, accepts string "editItem" which calls edit UI (function or string, default undefined)
* **isExternalLink**: set to true for links outside CMS and application router domain (boolean, default false)
* **url**: where links points to (function or string, default string)
* **escapeHtml**: escapes html entities (default true)
* **limitCharacters**: set number of characters to display before text is truncated (Integer or boolean, default false)
* **limitWords**: set number of words to display before text is truncated (Integer or boolean, default false)
* **stripTags**: remove html tags in string (boolean, default false),
* **collectionDelimiter**: set delimiter to be used when collection elements are joined (string, default ', ')
* **ifEmpty**: text to display when element value is empty (string, default '')

```js
list.addItem('LinkListItem', {
    caption: 'Title',
    mapTo: 'title',
    url: 'http://my-site.com',
    isExternalLink: true
});
```

## Date time
List element used for displaying date time data.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/listElements/dateTime.vue).

```js
list.addItem('DateTimeListItem', {
    caption: 'Date and time',
    mapTo: 'publishDate'
});
```
### Options:
* **format**: used to define display format (string, default 'DD.MM.YYYY HH:mm')
* **ifEmpty**: text shown when model mapping is empty (string, default '')

```js
list.addItem('DateTimeListItem', {
    caption: 'Date and time',
    mapTo: 'publishDate',
    format: 'DD.MM.YYYY HH:mm'
});
```

## Date
List element used for displaying date data.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/listElements/date.vue).

```js
list.addItem('DateListItem', {
    caption: 'Date and time',
    mapTo: 'publishDate'
});
```

### Options:
* **format**: used to define display format (string, default 'DD.MM.YYYY')
* **ifEmpty**: text shown when model mapping is empty (string, default '')

```js
list.addItem('DateListItem', {
    caption: 'Date and time',
    mapTo: 'publishDate',
    format: 'DD.MM.YYYY'
});
```

## Blip
List element used for graphical rendering of Boolean or enumerated data.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/listElements/blip.vue).

```js
list.addItem('BlipListItem', {
    caption: 'Published',
    mapTo: 'published'
});
```

### States option:
Array of object with following keys:

* **value**: value matching model value
* **caption**: string which sets title attribute when state is active
* **color**: element background color when state is active

```js
list.addItem('BlipListItem', {
    caption: 'Published',
    mapTo: 'publishedState',
    states: [
        {value: 0, caption: 'Unpublished', color: '#ededed'},
        {value: 1, caption: 'Published', color: 'green'},
        {value: 2, caption: 'Archived', color: 'red'}
    ]
});
```

## Button
List element used for adding button control with custom action.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/listElements/button.vue).

```js
list.addItem('ButtonListItem', {
    caption: 'Buttons',
    mapTo: () => 'Quick edit',
    action: model => { console.log(model); }
});
```

## Context menu
List element used for adding dropdown control with list item actions.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/listElements/contextMenu.vue).

```js
list.addItem('ContextMenu', {
    caption: 'Actions',
    items: [
        {caption: 'Edit', action: 'editItem'},
        {caption: 'Delete', action: 'deleteItem', confirm: true}
    ]
});
```
### Items option
Array of objects with following keys:
* **caption**: item action caption in context menu dropdown
* **action**: callback to run when action is clicked. Receives current item model as argument. Accepts 'editItem' and 'deleteItem' strings for predefined actions.
* **url**: string or function generating string for use cases when action has link.
* **confirm**: brings confirm dialog up for action if set to true. Accept string for with custom confirm question.
* **showIf**: optional callback to decide if action is to be shown for this list item. Receives current item model as argument

```js
list.addItem('ContextMenu', {
    caption: 'Actions',
    items: [
        {caption: 'Edit', action: 'editItem'},
        {caption: 'Delete', action: 'deleteItem', confirm: 'Are you sure you want to delete item?'},
        {
            caption: 'Publish',
            action: model => model.saveAttribute('published', true).then(
                () => list.refreshItems()
            ),
            showIf: model => model.get('published') === false
        },
    ]
});
```


## Media
List element used for presenting media items (image, video, audio, file).
Best used with card resource list template.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/listElements/media.vue).

```js
list.addItem('MediaListItem', {
    caption: 'Main media'
});
```

### Options:
* **mapImageTo**: where to look for image thumbnail in model (default 'thumbnailUrl').
* **mapLargeImageTo**: where to look for large image in model when zooming image with lightbox.
* **mapMediaTypeTo**: what attribute should be used for resolving media type  (default 'mediaType')
* **backgroundImage**: used if media type is image, audio or video embbed. Can be path or function with entity model as argument that returns asset path
* **mediaRelation**:  if set, media model will be retrieved from  model relation

```js
list.addItem('MediaListItem', {
    caption: 'Main media',
    mapImageTo: 'previewUrl',
    mapLargeImageTo: 'originalUrl',
    mediaTypeAttribute: 'type',
    mediaRelation: 'media'
});
```
