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
            caption: 'ID',
            mapTo: 'id',
            addIf: this.screenIsLarge
        });

        list.addItem('LinkListItem', {
            caption: 'Title',
            mapTo: 'title',
            action: 'editItem'
        });

        list.addItem('ContextMenuListItem', {
            caption: 'Actions',
            items: [{caption: 'Edit', action: 'editItem'}]
        });

    },

    setupEdit: function({edit}) {

        this.addToIndexControl().addSaveControl();

    }

};
