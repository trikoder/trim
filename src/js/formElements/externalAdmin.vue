<template>
    <element-wrapper v-if="!isRenderPlaceholder" v-bind="elementWrapperProps">
        <template v-if="selectsOne">
            <span class="item" :class="{iconMoreHorizontal: isInteractive}" @click="isInteractive && open({onSelect})">
                {{ relatedModels ? getModelCaption(relatedModels[0]) : placeholderText }}
            </span>
            <button
                v-if="relatedModels && isInteractive"
                type="button"
                class="removeBtn nBtn iconClose icr"
                @click="remove(relatedModels[0])"
            ></button>
            <button
                v-if="relatedModels && showEditControl && isInteractive"
                type="button"
                class="editBtn nBtn iconEdit2 icr"
                @click="openEdit(relatedModels[0].get('id'))"
            ></button>
        </template>
        <template v-else>
            <div
                v-if="relatedModels"
                v-for="model in relatedModels"
                :key="model.get('id')"
                class="item"
            >
                {{ getModelCaption(model) }}
                <button
                    v-if="isInteractive"
                    type="button"
                    class="removeBtn iconX icr nBtn"
                    @click="remove(model)"
                ></button>
            </div>
            <button
                v-if="isInteractive"
                type="button"
                class="openBtn nBtn iconMoreHorizontal"
                :class="{icr: Boolean(relatedModels)}"
                @click="open({onSelect})"
            >
                {{ placeholderText }}
            </button>
        </template>
    </element-wrapper>
</template>

<script>
import base from './base.vue';
import {assign, ensureArray} from '../library/toolkit.js';
import translate from '../library/translate.js';
import ElementWrapper from './elementWrapper.vue';
import {Model} from '../library/resource.js';
import loadControllerType from '../library/loadControllerType.js';
import {pascal as pascalcase} from 'to-case';
import {Popup} from '../components/popup.vue';
import addModal from '../library/addModal.js';
import app from '../app.js';

const Component = {

    elementType: 'externalAdmin',

    components: {ElementWrapper},

    mixins: [base],

    props: {
        isRenderPlaceholder: {type: Boolean, default: false},
        modelValue: {type: String, default: ''},
        mapCaptionTo: {type: [String, Function], default: 'name'},
        select: {type: String, default: 'one'},
        showEditControl: {type: Boolean, default: false},
        placeholderText: {type: String, default: () => translate('formElements.externalAdmin.placeholderText')},
        controller: String,
        controllerMethod: {type: String, default: 'index'},
        controllerMethodParams: {type: Array, default: () => ([])},
        afterControllerMount: {type: Function},
        onSelect: {type: Function, default: function(m) { this.handleModelSelection(m); }}
    },

    data: () => ({
        loading: false,
        relatedModels: undefined
    }),

    computed: {

        resourceName() {

            return (this.relation && this.relation.resourceName) || this.name;

        },

        controllerName() {

            return this.controller || this.resourceName;

        },

        selectsOne() {

            return this.relation && this.relation.type
                ? this.relation.type === 'hasOne'
                : this.select === 'one'
            ;

        },

        inputWrapperAttributes() {

            return this.normalizeAttributes({
                class: [
                    'externalAdminElement',
                    this.selectsOne ? 'withOne' : 'withMany',
                    this.showEditControl && this.relatedModels ? 'withEditBtn' : ''
                ].filter(className => className).join(' ')
            }, this.attributes.inputWrapper);

        }

    },

    watch: {
        modelValue: 'syncRelatedModels'
    },

    mounted() {

        if (this.isRenderPlaceholder) {
            this.open();
        }

    },

    created() {

        this.syncRelatedModels();

    },

    beforeUnmount() {

        this.popup && this.popup.close();

    },

    methods: {

        open() {

            loadControllerType(
                pascalcase(this.controllerName)
            ).then(Controller => this.runController(Controller));

            return this;

        },

        openEdit(id) {

            this.constructor.open({
                controller: this.controllerName,
                controllerMethod: 'edit',
                controllerMethodParams: [{id}],
                parent: this
            });

            return this;

        },

        runController(ControllerType) {

            this.popup = Popup({
                component: ControllerType,
                props: {
                    indexTitle: this.onSelect ? this.placeholderText : undefined,
                    isExternal: true,
                    selectsResource: this.onSelect ? (this.selectsOne ? 'one' : 'many') : false
                },
                onComponentCreate: controller => {

                    if (this.onSelect) {
                        controller.$emitter.on('beforeIndexSetup', params => this.injectSelectionHandler(params));
                    }

                },
                afterMount: ({component: controller}) => {

                    if (this.afterControllerMount) {
                        this.afterControllerMount(controller, this);
                    }

                    if (this.controllerMethod) {
                        controller[this.controllerMethod].apply(controller, this.controllerMethodParams || []);
                    }

                },
                afterDestroy: () => {
                    if (this.isRenderPlaceholder) {
                        this.$emit('closeModal');
                    }
                    delete this.popup;
                },
                parent: this
            });

        },

        injectSelectionHandler({list}) {

            if (this.selectsOne) {

                list.addItem('ButtonListItem', {
                    caption: translate('formElements.externalAdmin.placeholderText'),
                    mapTo: () => translate('formElements.externalAdmin.placeholderText'),
                    cellClass: 'externalAdminPickerCell',
                    attributes: {class: 'externalAdminPicker icr iconArrowRightCircle nBtn'},
                    action: model => this.onSelect(model, this)
                });

            } else {

                list.addMassAction({
                    caption: translate('formElements.externalAdmin.chooseSelected'),
                    massAction: models => this.onSelect(models, this)
                });

                if (this.relatedModels && list.selectedModels.length === 0) {
                    list.selectModel(this.relatedModels);
                }

            }

        },

        handleModelSelection(selection) {

            this.relatedModels = ensureArray(selection);

            this.$emit('update:modelValue', this.relatedModels.map(model => model.get('id')).join(','));

            this.popup && this.popup.close();

        },

        remove(model) {

            if (this.relatedModels) {

                this.relatedModels = this.relatedModels.filter(relatedModel => {
                    return relatedModel.get('id') !== model.get('id');
                });

                if (this.relatedModels.length === 0) {
                    this.relatedModels = undefined;
                }

            }

            this.$emit('update:modelValue', this.relatedModels
                ? this.relatedModels.map(relatedModel => relatedModel.get('id')).join(',')
                : ''
            );

            return this;

        },

        getModelCaption(model) {

            return typeof this.mapCaptionTo === 'function'
                ? this.mapCaptionTo(model)
                : model.get(this.mapCaptionTo)
            ;

        },

        syncRelatedModels() {

            const modelIds = this.modelValue.split(',').filter(id => id.length);

            if (modelIds.length === 0) {
                this.relatedModels = undefined;
                return Promise.resolve(this.relatedModels);
            }

            // check if existing or previously selected models align
            if (this.relatedModels && this.areCollectionsAligned(modelIds, this.relatedModels)) {
                return Promise.resolve(this.relatedModels);
            }

            // check if models attached to resource model align
            if (this.resourceModel) {

                const relationData = this.resourceModel.get(this.name);

                if (relationData) {

                    const relatedModels = relationData.models || [relationData];

                    if (this.areCollectionsAligned(modelIds, relatedModels)) {
                        this.relatedModels = relatedModels;
                        return Promise.resolve(this.relatedModels);
                    }

                }

            }

            return this.fetchModels(modelIds);

        },

        fetchModels(modelIds) {

            this.loading = true;

            return Promise.all(modelIds.map(id => Model.getFromApi({
                type: this.resourceName,
                id
            }))).then(models => {
                this.loading = false;
                this.relatedModels = models;
            });

        },

        areCollectionsAligned(idCollection, modelCollection) {

            const areSameSize = idCollection.length === modelCollection.length;
            const haveSameIds = idCollection.every(id => {
                return modelCollection.filter(model => model.get('id') === id).length === 1;
            });

            return areSameSize && haveSameIds;

        }

    }

};

assign(Component, {

    select: function(controller, callback, params = {}) {

        return this.open(assign(params, {
            controller,
            controllerMethod: 'index',
            onSelect: function(model, externalAdmin) {
                externalAdmin.$destroy();
                callback(model);
            }
        }));

    },

    selectMany: function(controller, callback, params = {}) {

        return this.select(controller, callback, assign({select: 'many'}, params));

    },

    open: function(params = {}) {

        return addModal({
            props: () => assign({controllerMethod: null, onSelect: null, isRenderPlaceholder: true}, params),
            component: () => Component,
            parent: () => params.parent || app.rootView
        });

    }

});

export default Component;

</script>

<style lang="scss">

    .externalAdminElement {

        display: inline-block; position: relative;
        background-color: #fff; border: 1px solid $colorGrayLight2; border-radius: 0.3em;

        .loadingCaption {

            font-size: 1.3em; padding: em(8,13) em(5,13);
            color: $colorGrayDark1;

        }

        &.withOne {

            > .item {

                @include normalizeButton;

                font-size: 1.6em; display: inline-block; padding: em(8,16) em(30,16) em(8,16) em(10,16);
                color: $colorGrayDark1;

                &:before {

                    left: auto; right: 0; font-size: 1em; width: em(22,10); color: $colorMain1;

                }

                @include mediaMinWidth($breakpointMedium) {
                    font-size: 1.4em; padding: em(8,14) em(30,14) em(8,14) em(10,14);
                }

            }

            > .removeBtn {

                width: 2em; height: 2em; position: absolute; right: -0.8em; top: -0.8em;

                &:before {

                    content: '×'; width: 1.4em; height: 1.4em; line-height: 1em; box-sizing: border-box;
                    position: absolute; left: 50%; top: 50%; margin: -0.7em 0 0 -0.7em;
                    color: rgba(#000, 0.3); border: 1px solid rgba(#000, 0.15); border-radius: 50%;
                    background-color: #fff;

                }

                &:hover:before {
                    box-shadow: 0 0.2em 0.5em rgba(#000, 0.15);
                }

            }

            > .editBtn {

                width: 3.3em; height: auto; position: absolute; right: 3.1em; top: 0; bottom: 0;
                border: 1px solid $colorGrayLight1; border-width: 0 1px;
                cursor: pointer; color: darken($colorGrayLight2, 40%);

                &:hover { color: darken($colorGrayLight2, 60%); }
                &:before { font-size: 1.3em; }

            }

        }

        &.withEditBtn > .item {
            padding-right: em(70,14);
        }

        &.withMany {

            > .item {

                animation: fstAnimationEnter 0.2s;

                display: inline-block; font-size: 1.2em; position: relative;
                margin: 0 em(3,12); padding: em(4,12) em(6,12) em(4,12) em(18,12); margin: em(5,12) 0 0 em(5,12); vertical-align: top;
                border-radius: em(3,12);
                cursor: auto; color: #fff; letter-spacing: 0.02em;
                background-color: #9c9c9c;

                > .removeBtn {

                    font-size: em(10,12); position: absolute; left: 0; top: 50%;
                    width: em(20,10); line-height: em(20,10); height: em(20,10); margin-top: em(-10,10);
                    text-align: center; color: #fff;

                }

            }

            > .openBtn {

                font-size: 1.4em; text-align: left;
                display: inline-block; padding: 0 em(30,14) 0 em(10,14); margin-left: em(-2,14);
                color: $colorGrayDark1;
                width: 100%; height: 100%;

                &:before {

                    left: auto; right: 0; font-size: 1em; width: em(22,10); color: $colorMain1;

                }

                &.icr {

                    width: em(32,14); line-height: em(32,14); height: em(32,14);
                    padding: 0;

                }

            }

        }

    }

</style>
