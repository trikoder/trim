<template>
    <element-wrapper :renderInputWrapper="false" v-bind="elementWrapperProps">
        <div ref="inputWrapper" v-bind="inputWrapperAttributes">
            <resource-edit ref="rows" class="includedAdminRow"
                v-for="row in rows"
                :tag="'section'"
                :model="row.model"
                :ModelType="RowModelType"
                :configure="row.configure"
                :key="row.id"
                :class="{withControls: row.controls.length > 0}"
            >
                <template slot="bottomControls" v-if="row.controls.length">
                    <div class="itemControls">
                        <button type="button" class="control nBtn icr"
                            v-for="(control, index) in row.controls"
                            :key="index"
                            :class="control.class"
                            @click.prevent="runRowControl(row, control)"
                            v-bind="control.attributes"
                        ></button>
                    </div>
                </template>
            </resource-edit>
            <div
                v-if="controls.length"
                :class="['includedAdminControls', {noRows: rows.length === 0}]"
            >
                <button type="button" class="includedAdminBtn nBtn icr"
                    v-for="(control, index) in controls"
                    :key="index"
                    v-bind="control.attributes"
                    @click="isInteractive && control.action()"
                ></button>
            </div>
        </div>
    </element-wrapper>
</template>

<script>
import base from './base.vue';
import ElementWrapper from './elementWrapper.vue';
import {find, elementMatches, elementIndex} from '../library/toolkit.js';
import {Model} from '../library/resource.js';
import ResourceEdit from '../components/resourceEdit/index.vue';

export default {

    elementType: 'includedAdmin',

    components: {ElementWrapper, ResourceEdit},

    mixins: [base],

    props: {
        value: {type: String, default: ''},
        ModelType: {type: Function},
        setupEdit: {type: Function, required: true},
        updatePosition: {type: [Boolean, String], default: false},
        removeItems: {type: Boolean, default: true},
        addItems: {type: Boolean, default: true}
    },

    data() {
        return {
            models: [],
            rows: [],
            controls: this.prepareControls(),
            RowModelType: this.ModelType || Model.extend({type: this.getResourceName()})
        };
    },

    watch: {
        value: {
            handler: 'syncModels',
            immediate: true
        },
        models: {
            handler: 'syncRows',
            immediate: true
        }
    },

    mounted() {

        if (this.updatePosition) {
            this.setupPositioningUI();
        }

    },

    beforeDestroy() {

        if (this.drake) {
            this.drake.destroy();
        }

    },

    methods: {

        syncRows() {

            this.rows = this.rows.filter(row => this.models.indexOf(row.model) >= 0);

            this.models.forEach(model => {

                const currentItem = find(this.rows, row => row.model === model);

                if (!currentItem) {

                    const position = this.updatePosition
                        ? model.get(this.getPositionFieldName())
                        : this.rows.length
                    ;

                    this.rows.push({
                        position,
                        id: model.cid,
                        model: model,
                        configure: params => this.getConfigurator(params),
                        controls: this.prepareRowControls(model)
                    });

                }

            });

            this.sortRows();

            return this;

        },

        sortRows() {

            this.rows.sort((row1, row2) => row1.position - row2.position);
            return this;

        },

        prepareRowControls(model) {

            const controls = [];

            if (!this.isInteractive) {
                return controls;
            }

            if (this.updatePosition) {
                controls.push({
                    class: 'sortHandle iconMove'
                });
            }

            if (this.removeItems) {
                controls.push({
                    class: 'iconTrash',
                    action: () => this.removeModel(model)
                });
            }

            return controls;

        },

        runRowControl(row, control) {

            if (control.action) {
                control.action({
                    model: row.model,
                    editHandler: this.getModelEditHandler(row.model),
                    includedAdmin: this
                });
            }

        },

        prepareControls() {

            const controls = [];

            if (this.addItems) {
                controls.push({
                    caption: 'Add',
                    attributes: {class: 'iconPlus'},
                    action: () => this.addNewIncludedItem()
                });
            }

            return controls;

        },

        getConfigurator(params) {

            const model = params.resourceModel;
            const editIncluded = params.edit;
            const reverseRelationName = this.relation && this.relation.reverseRelationName;

            if (model.isNew()) {
                editIncluded.addField('HiddenFormElement', {
                    name: reverseRelationName || this.resourceModel.getType(),
                    relation: {
                        type: 'hasOne',
                        resourceName: this.resourceModel.getType()
                    }
                });
            }

            if (this.updatePosition) {
                editIncluded.addField('HiddenFormElement', {
                    name: this.getPositionFieldName()
                });
            }

            return Promise.resolve(this.setupEdit({
                edit: editIncluded,
                editIncluded,
                method: params.method,
                resourceModel: model,
                includedAdmin: this
            })).then(result => {

                if (!this.isInteractive) {
                    editIncluded.definitions.fields.forEach(definition => {
                        definition.options.editable = false;
                    });
                }

                return result;

            });

        },

        getPositionFieldName() {

            return typeof this.updatePosition === 'string'
                ? this.updatePosition
                : 'position'
            ;

        },

        removeModel(model) {

            this.models = this.models.filter(currentModel => model !== currentModel);
            this.modelsToValue();
            this.$nextTick(() => this.updatePositionFields());

            return this;

        },

        getModelEditHandler(model) {

            return find(this.getRowInstances(), editComponent => editComponent.resourceModel === model);

        },

        modelsToValue() {

            this.$emit('input',
                this.models
                    .map(model => model.get('id'))
                    .filter(id => typeof id !== 'undefined')
                    .join(',')
            );

            return this;

        },

        getResourceName() {

            return this.relation && this.relation.resourceName || this.name;

        },

        setupPositioningUI() {

            const inputWrapper = this.$refs.inputWrapper;

            import('dragula').then(({default: dragula}) => {

                this.drake = dragula([inputWrapper], {
                    moves: (el, source, handle, sibling) => {

                        const isSortHandle = elementMatches(handle, '.sortHandle');
                        const isInside = inputWrapper.contains(handle);
                        return isSortHandle && isInside;

                    },
                    mirrorContainer: inputWrapper,
                    direction: 'vertical'
                });

                this.drake.on('drop', () => {
                    this.updatePositionFields().sortRows();
                });

            });

            return this;

        },

        getRowInstances() {

            return this.$refs.rows ? this.$refs.rows : [];

        },

        updatePositionFields() {

            const positionField = this.getPositionFieldName();

            this.getRowInstances().forEach((editHandler, index) => {

                const position = elementIndex(editHandler.$el) + 1;
                const row = find(this.rows, row => row.model === editHandler.resourceModel);

                editHandler.formData[positionField] = position;
                row.position = position;

            });

            return this;

        },

        addNewIncludedItem(model) {

            return Promise.resolve(model || this.prepareNewModel()).then(newModel => {
                this.models.push(newModel);
                this.modelsToValue();
            });

        },

        prepareNewModel() {

            const ModelType = this.RowModelType;
            const model = ModelType.create();
            const reverseRelationName = this.relation && this.relation.reverseRelationName || this.resourceModel.getType();

            model.setRelationship(reverseRelationName, this.resourceModel);

            if (this.updatePosition) {
                model.setAttribute(this.getPositionFieldName(), this.models.length + 1);
            }

            return model;

        },

        setMainRelationReference(id) {

            const reverseRelationName = this.relation && this.relation.reverseRelationName;
            const fieldName = reverseRelationName || this.resourceModel.getType();

            this.getRowInstances().forEach(row => {

                if (typeof row.formData[fieldName] !== 'undefined') {
                    row.formData[fieldName] = id;
                }

            });

        },

        saveRelatedResources() {

            return Promise.all(
                this.getRowInstances().map(row => row.save())
            ).then(() => this.modelsToValue());

        },

        syncModels() {

            const modelIds = this.value.split(',').filter(item => item.length);

            let newModelIds = modelIds.filter(
                id => this.models.filter(model => model.get('id') === id).length === 0
            );

            // remove deleted ones
            this.models = this.models.filter(model => {
                const id = model.get('id');
                return typeof id !== 'undefined'
                    ? modelIds.indexOf(id) >= 0
                    : true
                ;
            });

            // no new models
            if (newModelIds.length === 0) {
                return Promise.resolve(this.models);
            }

            // check if resource model contains related models
            if (this.resourceModel) {

                const collection = this.resourceModel.get(this.relation && this.relation.name || this.name);

                if (collection && collection.models) {

                    collection.forEach(model => {
                        const id = model.get('id');
                        if (modelIds.indexOf(id) >= 0) {
                            this.models.push(model);
                            newModelIds = newModelIds.filter(newModelId => newModelId !== id);
                        }
                    });

                }

            }
            // retrieve rest from api
            if (newModelIds.length) {

                return Promise.all(newModelIds.map(
                    id => this.RowModelType.getFromApi(id)
                )).then(models => {
                    this.models = this.models.concat(models);
                    return this.models;
                });

            } else {
                return Promise.resolve(this.models);
            }

        }

    }

};
</script>

<style lang="scss">

    @import url('dragula/dist/dragula.css');

    .includedAdminElement {

        min-height: 2em;
        border: 1px dashed darken($colorGrayLight2, 5%); border-radius: 0.3em; background-color: #fff;

        .includedAdminRow {

            position: relative; padding: 1em 1em 0.1em; box-sizing: border-box;
            border-bottom: 1px dashed darken($colorGrayLight2, 5%);

            > .layoutContainer {

                @include clearfix;
                min-height: 7em;

            }

            &.withControls {

                padding-right: 6em;

            }

            &.gu-mirror {

                box-shadow: 0 0.1em 0.5em rgba(#000, 0.2); border-radius: 0.3em; background-color: #fff;

            }

            .messageType1 {

                border: 1px solid rgba(#000, 0.1); margin-bottom: em(10,14); border-radius: em(3,14);

            }

            &:last-child { border: 0; }

            @include mediaMinWidth($breakpointMedium) {

                padding: 2em 2em 0.1em;

            }

        }

        .itemControls {

            position: absolute; right: 0; top: 0;
            border: 1px dashed darken($colorGrayLight2, 5%); border-width: 0 0 1px 1px; border-radius: 0 0 0 0.3em;

            > .control {

                font-size: 1.3em; display: block; width: em(40,13); height: em(40,13);
                color: darken($colorGrayLight2, 15%);

                &:hover { color: darken($colorGrayLight2, 30%); }

                &:before { font-size: 1.3em; }

                &.saveIncludedItemBtn:before { font-size: 1em; }

            }

            > .sortHandle {

                cursor: move;

            }

        }

        .includedAdminControls {

            position: relative; z-index: 10; overflow: hidden;
            margin-top: -0.1em; margin: -0.1em;
            border: 1px solid $colorGrayLight1; border-radius: 0 0 0.3em 0.3em;
            background-color: #f5f5f5;

            &.noRows { border-radius: 0.3em; }

        }

        .includedAdminBtn {

            display: block; position: relative; width: 100%; height: 5.5em;
            color: $colorGrayDark2;

            &:before { font-size: 2.2em; }

            &:hover:before { color: darken($colorGrayDark2,20%); }

        }

    }

</style>
