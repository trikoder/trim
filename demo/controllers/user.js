export default {

    resourceName: 'user',
    resourceCaption: 'email',
    createRequiresDraft: true,
    // createRelatedStrategy: 'relatedLast',

    setupList({list}) {

        this.addCreateControl('Create new user');

        // --------------------------------------------------------------
        // Filters
        // --------------------------------------------------------------
        list.addFilter('TextFormElement', {
            name: 'email',
            label: 'Email'
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
            caption: 'Email',
            mapTo: 'email',
            action: 'editItem'
        });

        list.addItem('TextListItem', {
            caption: 'Contact data',
            mapTo: model => model.get('contactData') && model.get('contactData').map(item => {
                return item.get('label') + ': ' + item.get('entry');
            }).join(' / '),
            ifEmpty: 'No contact data'
        });

        list.addItem('ContextMenuListItem', {
            caption: 'Actions',
            items: [{caption: 'Edit', action: 'editItem'}]
        });

    },

    setupEdit({edit}) {

        this.addToIndexControl().addSaveControl();

        edit.addField('TextFormElement', {
            label: 'Email',
            name: 'email',
            attributes: {input: {class: 'inputType2 size2'}}
        });

        edit.addField('IncludedAdminFormElement', {
            label: 'Contacts',
            name: 'contactData',
            updatePosition: true,
            setupEdit: ({editIncluded}) => {

                editIncluded.addField('TextFormElement', {
                    label: 'Contact label',
                    name: 'label'
                });

                editIncluded.addField('TextFormElement', {
                    label: 'Contact entry',
                    name: 'entry'
                });

            },
            relation: {resourceName: 'userContactEntry'}
        });

    }

};
