# Form elements
Form elements are used to map values to resource model attributes or relations.
In most use cases we add form element definitions via [resource edit](/core-concepts-and-api.html#resource-edit) handler inside resource controller setupEdit method.

All form elements are standard Vue components usually composed of some kind of input control (text input, select dropdown, checkbox...), label and error message shown when form element has validation error.
They share following html structure when rendered:

```html
<div class="wrapper">
    <label for="formElement1">Label</label>
    <div class="inputWrapper">
        <input id="formElement1" type="text" />
    </div>
    <p class="errorMessage">Validation error</p>
</div>
```

## Shared options
All form elements accept following set of options:

* **name**: key used to map form element value to resource model attribute or relation.
* **label**: form element label content.
* **relation**: sets form element value as relation mapping.
* **attributes**: Adds html attributes to following elements (defined as object keys) 'input', 'inputWrapper', 'label', 'wrapper' and 'errorMessage'
* **layoutReference**: Pointer to layout area
* **disabled**: Used to set form element as "disabled". When resource is created or updated mappings with "disabled" option will be excluded from put / post / patch requests.
* **readOnly**: Used to set form element as "read only". Values will not be persisted when resource is saved.
* **editable**: Used to disable form element interactivity. Values will be persisted when resource is saved.
---
"name" is only required form element option.

## Mapping attributes
Form element "name" option is used to connect form field value to resource model attribute.

## Mapping relationships
"relation" option is used to describe relationship mapping beetween form element and resource model.
"name" option is used to define resource relationship name.
"relation" option can be written to hint "one to one" or "one to many" relationships as described bellow:
```js
edit.addField('SelectFormElement', {
    name: 'category',
    label: 'Category',
    relation: {
        type: 'hasOne', // one to one relationships
        resourceName: 'tag'
    }
});

edit.addField('MultipleSelectFormElement', {
    name: 'tags',
    label: 'Tags',
    relation: {
        type: 'hasMany', // one to many relationships
        resourceName: 'tag'
    }
});
```
"resourceName" in relation can be ommited if value is same as one defined in field name option.

```js
edit.addField('TextFormElement', {
    name: 'title',
    label: 'Article title',
    readOnly: true,
    attributes: {input: {placeholder: 'Please enter title'}},
    layoutReference: 'mainTab.mainRegion.group1'
});
```

## Text input
Text input element is used for handling textual data presented as HTML form input element.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/text.vue).

```js
edit.addField('TextFormElement', {
    label: 'Article title',
    name: 'title'
});
```

## Hidden input

Hidden input element is used for handling textual data presented as HTML hidden input element.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/hidden.vue).

```js
edit.addField('HiddenFormElement', {
    name: 'title'
});
```

## Textarea input

Textarea element is used for handling text data presented as HTML textarea element.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/textarea.vue).

```js
edit.addField('TextareaFormElement', {
    name: 'title',
    label: 'Article title'
});
```

## Checkbox input

Checkbox input element is used for handling data presented as HTML checkbox element.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/checkbox.vue).

```js
edit.addField('CheckboxFormElement', {
    label: 'Article is published',
    name: 'published',
    valueMap: {checked: true, unchecked: false}
});
```

### Options:
valueMap object
* **checked:** Boolean or string representing value for checked state. Default is true.
* **unchecked:** Boolean or string representing value for unchecked state. Default is false.

## Date input
Date input element is used for handling date data presented as HTML input element with attached datepicker.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/date.vue).

```js
edit.addField('DateFormElement', {
    label: 'Date',
    name: 'publishDate'
});
```

## Date time input
Date input element is used for handling date data presented as HTML input element with attached date and time picker.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/dateTime.vue).

```js
edit.addField('DateTimeFormElement', {
    label: 'Date',
    name: 'publishDateTime'
});
```

### Options:
* **emptyValue:** value that will be sent if no value is defined. Default is null.
* **format:** UI date format, default is 'DD.MM.YYYY HH:mm'
* **serverFormat:** function that will be called with server value and options format arguments, and it is used to return parsed value.

## Html
Html input element is used for handling HTML data presented as textarea with rich text editor.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/html.vue).

```js
edit.addField('HtmlFormElement', {
    label: 'Content',
    name: 'html'
});
```

## Html components
Html components form element is used for extending raw html input with custom defined components.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/htmlComponents/index.vue).

```js
import ImageInContent from './imageInContent';
import QuoteInContent from './quoteInContent';

edit.addField('HtmlComponentsFormElement', {
    label: 'Content',
    name: 'contentComponents',
    components: [
        ImageInContent,
        QuoteInContent
    ]
});
```

Expects api attribute structure similar to one defined bellow:

```js
[{
    type: 'html',
    clientId: '1',
    content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>'
}, {
    type: 'qoute',
    clientId: '2',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    author: 'Lorem ipsum'
}, {
    type: 'html'
    clientId: '3',
    content: '<p>Proin interdum sagittis sem in elementum.</p>',
}]
````

[Demo examples](https://github.com/trikoder/trim/tree/master/demo/controllers/article) are available for inspiration on how to design and code your components.

## Code
Use code form element to render and edit mixed html content with syntax highlighting.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/code.vue).

```js
edit.addField('CodeFormElement', {
    label: 'Code',
    name: 'content'
});
```

## Color
Color form element is text form element enhanced with visual color preview.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/color.vue).

```js
edit.addField('ColorFormElement', {
    label: 'Color',
    name: 'color'
});
```

## Map
Map element is used for handling geolocation data presented as google map.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/map.vue).

```js
edit.addField('MapFormElement', {
    label: 'Location on map',
    name: 'location',
    delimiter: '|',
    search: false
});
```

### Options:
* **zoom:** zoom level for goggle map (default 12)
* **delimiter:** delimiter used when splitting value to latitude and longitude (default ',')
* **initialLat:** latitude used for centering map if data is null (default '45.79815157817745')
* **initialLng:** longitude used for centering map if data is null (default '15.970237255096436')
* **search:** Boolean value, if true goggle map will have text location search widget (default true)
* **mapOptions:** options object that will be passed when initializing Google map (zoom and center coordinates options are passed by default)


## Select
Select form element is used for handling option data presented as HTML select element.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/select.vue).

```js
edit.addField('SelectFormElement', {
    label: 'Status',
    name: 'published',
    selectOptions: [
        {caption: 'All pages', value: ''},
        {caption: 'Published', value: true},
        {caption: 'Unpublished', value: false}
    ]
});
```
### Options:
Array of objects under selectOptions key:
* **caption:** option caption
* **value:** option value

```js
edit.addField('SelectFormElement', {
    label: 'User',
    name: 'user',
    selectOptions: {
        resource: 'user',
        query: {active: true},
        mapCaptionTo: 'email',
        prepend: {caption: 'Select', value: ''}
    }
});
```

Object under selectOptions key:
* **resource** name of resource
* **query** query for resource endpoint (optional)
* **url:** API path to desired resource collection (optional override)
* **mapCaptionTo:** for mapping caption to resource model (default is 'name')
* **mapValueTo:** for mapping value to resource model (default is 'id')
* **prepend:** Array of objects representing option items that will be prepended to collection list


## Multiple select
Multiple select form element is used for selecting multiple values.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/multipleSelect.vue).

```js
edit.addField('MultipleSelectFormElement', {
    name: 'tags',
    label: 'Tags',
    relation: {
        type: 'hasMany',
        resourceName: 'tag'
    },
    selectOptions: {
        resource: 'tag',
        mapCaptionTo: 'title'
    }
});
```

## Nested select
Nested select element is used for selecting data in hierarchical structure.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/nestedSelect.vue).

```js
edit.addField('NestedSelectFormElement', {
    name: 'parentCategory',
    label: 'Parent category',
    mapCaptionTo: 'title',
    mapParentTo: 'parentCategory',
    mapChildrenTo: 'childCategories',
    selectableLevel: 'all',
    relation: {resourceName: 'category'}
});
```

## State select
State select element is used for handling state machine data types.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/stateSelect.vue).

```js
edit.addField('StateSelectFormElement', {
    label: 'Proof read',
    name: 'proofreadStatus',
    updateEntityOnChange: true,
    readOnly: true,
    states: [{
        value: '0',
        name: 'notProofread',
        caption: 'Not proofread',
        actionCaption: 'Proofread not needed',
        transitions: ['proofreadNeeded']
    }, {
        value: '1',
        name: 'proofreadNeeded',
        caption: 'Proofread needed',
        transitions: ['proofreadDone', 'notProofread']
    }, {
        value: '2',
        name: 'proofreadDone',
        caption: 'Proofread done',
        transitions: null
    }]
});
```

### Options:
* **updateEntityOnChange:** boolean value, if set to true update status button is added, and attribute is modified without submitting whole resource. Default is false
* **updateControlCaption:** string value for update button caption.
* **nextStatePlaceholderCaption:** string value for current item caption in select input.

Array of objects with all possible states:
* **value:** string with state value data
* **name:** string value for state name. If name is not defined, value is used
* **caption:** string value for state caption
* **actionCaption:** string value for state caption in select element
* **transitions:** array of possible state transition mapped to other state name (in case name is omitted value is used)

## External admin
External admin element is used for selecting related values through another resource controller opened in model.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/externalAdmin.vue).

```js
list.addFilter('ExternalAdminFormElement', {
    name: 'tags',
    label: 'Tags',
    mapCaptionTo: 'title',
    relation: {type: 'hasMany', resourceName: 'tag'}
});
```

### Options:
* **mapCaptionTo:** string value for key in related model with caption value. Default is 'name'
* **placeholderText:** caption shown when no items are selected.
* **showEditControl:** boolean, if set to true edit button for selected resource is enabled. Available on one to one relations.

Object under relation key defines relationship resource:
* **type:** 'hasMany' for one to many 'hasOne' for one to one relations
* **resourceName:** desired resource name type

## Included admin
Included admin element is used for handling related data through embedded admin interface inside current resource create or edit UI.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/includedAdmin.vue).

```js
edit.addField('IncludedAdminFormElement', {
    label: 'Contacts',
    name: 'contactData',
    updatePosition: true,
    setupEdit: ({editIncluded}) => {

        editIncluded.addField(''TextFormElement'', {
            label: 'Contact label',
            name: 'label'
        });

        editIncluded.addField(''TextFormElement'', {
            label: 'Contact entry',
            name: 'entry'
        });

    },
    relation: {resourceName: 'userContactEntry'}
});
```

### Options:
* **updatePosition:** boolean value, if true sort functionality is enabled (default false)
* **removeItems:** boolean value, if true remove item functionality is enabled (default true)
* **addItems:** boolean value, if true add item functionality is enabled. (default true)
* **setupEdit:** method with editHandler, method and id arguments. Behaves and works same as "setupEdit" method on resource controller

Object under relation key defines relationship resource:
* **type:** 'hasMany' for one to many 'hasOne' for one to one relations
* **resourceName:**  included resource name


## Media preview
Media preview element is used for presenting media image entity in resource edit/crate view with zoom functionality.
Possible media types are "image", "audio", "file" and "animatedGif".
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/mediaPreview.vue).

```js
edit.addField('MediaPreviewFormElement', {
    label: 'Photography',
    name: 'mediaPreview'
});
```

### Options:
* **mapImageTo:** model mapping to thumbnail url. Default value is "thumbnailUrl". Used only with media type "image" and "animatedGif"
* **mapLargeImageTo:** model mapping to large image url. Default value is "originalUrl". Used only with media type "image" and "animatedGif"

## Media
Media element is used for attaching media data presented as HTML widget with preview, attach and upload media functionality.
[Code reference](https://github.com/trikoder/trim/tree/master/src/js/formElements/media.vue).

```js
edit.addField('MediaFormElement', {
    label: 'Main media',
    name: 'media',
    relation: {type: 'hasOne', resourceName: 'media'}
});
```

### Options:

* **mapCaptionTo:** mapping for caption in resource model (default 'name')
* **mapThumbnailTo:** string value for thumb path in API model (default 'thumbnailUrl')
* **mapPreviewTo:** string value for full size image path in API model (default 'originalUrl')
* **changeImageCaption:** string value for change image caption
* **chooseImageCaption:** string value for choose image caption
* **uploadImageCaption:** string value for upload image caption
* **separatorCaption:** string value for separator caption
* **onSelect:** function with model argument that is called when item/items are selected (default ExternalAdmin.prototype.defaults.onSelect),
* **assignWhenEditDone:** boolean value which determines if media resource will be assigned to main resource when edit is done (default false)
* **fileUploadParamName:** value is passed to file upload plugin "Dropzone.js" (default 'binary')
* **fileUploadHeaders:** value is passed to file upload plugin "Dropzone.js" (default null)
* **formatUploadErrorMessage:** : value is passed to file upload plugin "Dropzone.js"

Object under relation key defines relationship resource:
* **type:** must be string value 'hasOne'
* **resourceName:** resource name
