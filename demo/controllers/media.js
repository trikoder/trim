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

        // --------------------------------------------------------------
        // Filters
        // --------------------------------------------------------------
        list.addFilter('TextFormElement', {
            name: 'title',
            label: 'Title'
        });

        list.addFilter('TextFormElement', {
            name: 'caption',
            label: 'Caption'
        });

        // --------------------------------------------------------------
        // List items
        // --------------------------------------------------------------

        list.addItem('MediaListItem', {
            caption: 'Main media',
            mapTo: 'thumbnailUrl',
            mapLargeImageTo: 'originalUrl'
        });

        list.addItem('LinkListItem', {
            caption: 'Title',
            mapTo: 'title',
            action: 'editItem'
        });

        list.addItem('TextListItem', {
            caption: 'Caption',
            mapTo: 'caption',
            escapeHtml: false
        });

        list.addItem('TextListItem', {
            caption: 'Type',
            attributes: {class: 'textListItemType1 mod1'},
            mapTo: model => 'Type: ' + model.get('mediaType')
        });

        list.addItem('ContextMenuListItem', {
            caption: 'Actions',
            items: [{caption: 'Edit', action: 'editItem'}]
        });

    },

    setupImageEdit({edit}) {

        this.addToIndexControl().addSaveControl();

        edit.addField('MediaPreviewFormElement', {
            label: 'Photography',
            name: 'mediaPreview'
        });

        edit.addField('TextFormElement', {
            label: 'Title',
            name: 'title',
            attributes: {input: {class: 'inputType2 size2'}}
        });

        edit.addField('TextFormElement', {
            label: 'Caption',
            name: 'caption'
        });

    },

    setupVideoEmbedEdit({edit}) {

        this.addToIndexControl().addSaveControl();

        edit.addField('TextFormElement', {
            label: 'Title',
            name: 'title'
        });

        edit.addField('TextareaFormElement', {
            label: 'Embed code',
            name: 'embedCode'
        });

    },

    setupFileEdit({edit}) {

        this.addToIndexControl().addSaveControl();

        edit.addField('TextFormElement', {
            label: 'Title',
            name: 'title'
        });

    }

};
