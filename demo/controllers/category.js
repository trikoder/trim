export default {

    resourceName: 'category',
    extendsController: 'BaseNestedResource',
    mapParentTo: 'parentCategory',
    mapChildrenTo: 'childCategories',

    setupList: function({list}) {

        this.addCreateControl('Create new category');

        // --------------------------------------------------------------
        // Filters
        // --------------------------------------------------------------
        list.addFilter('TextFormElement', {
            name: 'title',
            label: 'Title'
        });

        list.addFilter('NestedSelectFormElement', {
            name: 'parentCategory',
            label: 'Parent category',
            mapCaptionTo: 'title',
            mapParentTo: 'parentCategory',
            mapChildrenTo: 'childCategories',
            selectableLevel: 'all',
            relation: {resourceName: 'category'}
        });

        // --------------------------------------------------------------
        // Mass action
        // --------------------------------------------------------------
        list.addMassAction([{
            caption: 'Publish',
            updateAttributes: {published: true}
        }, {
            caption: 'Unpublish',
            updateAttributes: {published: false}
        }]);

        // --------------------------------------------------------------
        // List items
        // --------------------------------------------------------------
        list.addItem('LinkListItem', {
            caption: 'Title',
            mapTo: 'title',
            action: 'editItem'
        });

        list.addItem('TextListItem', {
            caption: 'Description',
            mapTo: 'description'
        });

        list.addItem('BlipListItem', {
            caption: 'Published',
            mapTo: 'published',
            addIf: this.screenIsLarge
        });

        list.addItem('ContextMenuListItem', {
            caption: 'Actions',
            items: [{caption: 'Edit', action: 'editItem'}]
        });

    },

    setupEdit: function({edit}) {

        this.addToIndexControl().addSaveControl();

        edit.addField('TextFormElement', {
            label: 'Title',
            name: 'title',
            attributes: {input: {class: 'inputType2 size2'}},
            layoutReference: 'mainRegion'
        });

        edit.addField('TextareaFormElement', {
            label: 'Description',
            name: 'description',
            layoutReference: 'mainRegion'
        });

        edit.addField('FileAttachmentFormElement', {
            label: 'Image',
            name: 'image',
            mapThumbnailTo: 'imageThumbnailUrl',
            mapCurrentFileUrlTo: 'imageOriginalUrl',
            layoutReference: 'mainRegion'
        });

        edit.addField('NestedSelectFormElement', {
            readOnly: true,
            name: 'parentCategory',
            label: 'Parent category',
            mapCaptionTo: 'title',
            mapParentTo: 'parentCategory',
            mapChildrenTo: 'childCategories',
            selectableLevel: 'all',
            relation: {type: 'hasOne', resourceName: 'category'},
            layoutReference: 'sideRegion'
        });

        edit.addField('SelectFormElement', {
            label: 'Published status',
            name: 'published',
            selectOptions: [
                {caption: 'Published', value: true},
                {caption: 'Not published', value: false}
            ],
            layoutReference: 'sideRegion'
        });

    }

};
