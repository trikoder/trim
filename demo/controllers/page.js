import {PagePreview} from 'cmf/js/components/pagePreview';

export default {

    resourceName: 'page',
    resourceCaption: 'title',

    setupList({list}) {

        this.addCreateControl('Create new page');

        // --------------------------------------------------------------
        // Filters
        // --------------------------------------------------------------

        list.addFilter([
            ['TextFormElement', {
                name: 'title',
                label: 'Title'
            }],
            ['DateFormElement', {
                name: 'publishDate',
                label: 'Date'
            }],
            ['SelectFormElement', {
                name: 'published',
                label: 'Status',
                selectOptions: [
                    {caption: 'All pages', value: ''},
                    {caption: 'Published', value: 'true'},
                    {caption: 'Unpublished', value: 'false'}
                ]
            }],
            ['SelectFormElement', {
                name: 'author',
                label: 'Author',
                selectOptions: {
                    resource: 'user',
                    mapCaptionTo: 'email',
                    prepend: [{caption: 'All', value: ''}]
                }
            }],
            ['ExternalAdminFormElement', {
                name: 'tags',
                label: 'Tags',
                mapCaptionTo: 'title',
                relation: {type: 'hasOne', resourceName: 'tag'}
            }],
            ['CheckboxFormElement', {
                name: 'special',
                label: 'Special'
            }]
        ]);

        // --------------------------------------------------------------
        // Mass action
        // --------------------------------------------------------------
        list.addMassAction([{
            caption: 'Publish',
            updateAttributes: {published: true},
            updateMessage: {
                success: params => 'Total tems published: ' + params.resolutions.length,
                error: params => 'Failed to publish: ' + params.rejections.length
            }
        }, {
            caption: 'Unpublish',
            updateAttributes: {published: false}
        }, {
            caption: 'Delete',
            action: model => model.destroy(),
            confirm: true,
            updateMessage: {success: 'All selected items are deleted'}
        }]);

        // --------------------------------------------------------------
        // Sort
        // --------------------------------------------------------------
        list.addSort([{
            label: 'By title',
            field: '-title'
        }, {
            label: 'By date',
            field: '-date'
        }]);

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

        list.addItem('DateListItem', {
            caption: 'Date',
            mapTo: 'publishDate',
            ifEmpty: model => 'Date for page ' + model.get('id') + ' not set.'
        });

        list.addItem({
            Type: 'DateTimeListItem',
            options: {
                caption: 'Date and time',
                mapTo: 'publishDate',
                ifEmpty: 'Date time not set'
            }
        });

        list.addItem([
            ['TextListItem', {
                caption: 'Author',
                mapTo: 'author.email'
            }],
            {
                Type: 'TextListItem',
                options: {
                    caption: 'Tags',
                    mapTo: 'tags.title',
                    ifEmpty: '<span style="opacity: 0.5">No tags</span>'
                }
            }
        ]);

        list.addItem('BlipListItem', {
            caption: 'Published',
            mapTo: 'published'
        });

        list.addItem('ButtonListItem', {
            caption: 'View',
            useIcon: 'externalLink',
            action: model => PagePreview('http://trikoder.net/'),
            addIf: this.screenIsLarge
        });

        list.addItem('ContextMenuListItem', {
            caption: 'Actions',
            items: [
                {caption: 'Edit', action: 'editItem'},
                {caption: 'Delete', action: 'deleteItem', confirm: true},
                {
                    caption: model => model.get('published') ? 'Unpublish' : 'Publish',
                    updateAttributes: model => ({published: !model.get('published')})
                }
            ]
        });

    },

    setupEdit({edit}) {

        this.addToIndexControl().addSaveControl();

        edit.addField('TextFormElement', {
            label: 'Title',
            name: 'title',
            attributes: {input: {class: 'inputType2 size2'}},
            layoutReference: 'mainRegion'
        });

        edit.addField('MultipleSelectFormElement', {
            name: 'tags',
            label: 'Tags',
            relation: {type: 'hasMany', resourceName: 'tag'},
            selectOptions: {resource: 'tag', mapCaptionTo: 'title'},
            layoutReference: 'mainRegion'
        });

        edit.addField('HtmlFormElement', {
            label: 'Body text',
            name: 'bodyText',
            layoutReference: 'mainRegion'
        });

        edit.addField('ExternalAdminFormElement', {
            name: 'author',
            label: 'Author',
            mapCaptionTo: 'email',
            relation: {type: 'hasOne', resourceName: 'user'},
            layoutReference: 'sideRegion'
        });

        edit.addField('DateTimeFormElement', {
            name: 'publishDate',
            label: 'Date',
            layoutReference: 'sideRegion'
        });

    }

};
