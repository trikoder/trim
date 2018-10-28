# Editing resource

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