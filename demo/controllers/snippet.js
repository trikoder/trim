export default {

    resourceName: 'snippet',
    resourceCaption: 'title',

    setupList: function({list}) {

        this.addCreateControl('Create new snippet');

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
            caption: 'ID',
            mapTo: 'id',
            addIf: this.screenIsLarge
        });

        list.addItem('LinkListItem', {
            caption: 'Title',
            mapTo: 'title',
            action: 'editItem'
        });

        list.addItem('TextListItem', {
            caption: 'Code',
            mapTo: 'code'
        });

        list.addItem('TextListItem', {
            caption: 'Content',
            mapTo: 'content',
            limitCharacters: 130,
            stripTags: true
        });

        list.addItem('ContextMenuListItem', {
            caption: 'Actions',
            items: [{caption: 'Edit', action: 'editItem'}]
        });

    },

    setupEdit: function({edit}) {

        this.addToIndexControl().addSaveControl();

        edit.addField('TextareaFormElement', {
            label: 'Title',
            name: 'title',
            attributes: {input: {class: 'inputType2 size2 fontBold'}}
        });

        edit.addField('TextFormElement', {
            label: 'Code',
            name: 'code'
        });

        edit.addField('CodeFormElement', {
            label: 'Content',
            name: 'content'
        });

    }

};
