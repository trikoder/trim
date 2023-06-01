import {Model} from 'trim/library/resource.js';

export default {

    resourceName: 'category',
    extendsController: 'BaseNestedResource',
    mapParentTo: 'parentCategory',
    mapChildrenTo: 'childCategories',
    mapPositionTo: 'position',

    setupList: function({list}) {

        this.addControl({
            caption: 'Create new category',
            className: 'accented iconEdit',
            action: () => this.openCreate({
                position: list.rootResourceModels.length + 1
            })
        });

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
            mapPositionTo: 'position',
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
            items: model => this.setupListContextMenu(list, model)
        });

    },

    setupEdit: function({edit, method, query}) {

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
            readOnly: method === 'edit',
            modelValue: '4',
            name: 'parentCategory',
            label: 'Parent category',
            mapCaptionTo: 'title',
            mapParentTo: 'parentCategory',
            mapChildrenTo: 'childCategories',
            mapPositionTo: 'position',
            selectableLevel: 'all',
            relation: {type: 'hasOne', resourceName: 'category'},
            hint: method === 'edit'
                ? 'Existing category parent cannot be updated'
                : '',
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

        edit.addField('HiddenFormElement', {
            name: 'position',
            addIf: method === 'create',
            value: query.position ? parseInt(query.position, 10) : 1
        });

    },

    setupListContextMenu(list, model) {

        const id = model.get('id');
        const parent = model.get('parentCategory');
        const children = model.get('childCategories');
        const sortItems = (m1, m2) => {
            const pos1 = m1.getAttribute('position');
            const pos2 = m2.getAttribute('position');
            return pos1 - pos2;
        };
        const siblingModels = parent
            ? parent.get('childCategories').models.sort(sortItems)
            : list.rootResourceModels
        ;
        const positionMap = siblingModels.map((sibling, index) => ({
            id: sibling.get('id'),
            position: index + 1
        }));
        const currentPosition = positionMap.find(item => item.id === id).position;
        const positions = positionMap.map(item => item.position);
        const minPosition = Math.min.apply(Math, positions);
        const maxPosition = Math.max.apply(Math, positions);

        const updatePosition = (syncModel, position) => {
            return Model.extend({
                type: 'category'
            }).create().setId(
                syncModel.get('id')
            ).saveAttribute('position', position).then(() => {
                syncModel.setAttribute('position', position);
            });
        };

        const swapPosition = offset => {
            return Promise.all(siblingModels.map((sibling, index) => {
                return sibling.get('position') !== index + 1
                    ? updatePosition(sibling, index + 1)
                    : null
                ;
            })).then(() => {
                const oldPosition = model.get('position');
                const newPosition = oldPosition + offset;
                const otherModel = siblingModels.find(
                    m => m.get('position') === newPosition
                );
                return Promise.all([
                    updatePosition(model, newPosition),
                    updatePosition(otherModel, oldPosition)
                ]);
            });
        };

        const items = [{
            caption: 'Edit category',
            url: model => this.getEditUrl({id}),
            action: model => this.openEdit({id})
        }, {
            caption: 'Add subcategory',
            url: model => this.getCreateUrl({
                parentCategoryId: id,
                position: children ? children.length + 1 : 1
            }),
            action: model => this.openCreate({
                parentCategoryId: id,
                position: children ? children.length + 1 : 1
            })
        }];

        if (currentPosition > minPosition) {
            items.push({
                caption: 'Move up',
                action: (model, menu) => {
                    menu.close();
                    return swapPosition(-1);
                }
            });
        }

        if (currentPosition < maxPosition) {
            items.push({
                caption: 'Move down',
                action: (model, menu) => {
                    menu.close();
                    return swapPosition(1);
                }
            });
        }

        return items;

    }

};
