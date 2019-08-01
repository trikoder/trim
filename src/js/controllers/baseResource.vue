<template>
    <div class="resourceController">
        <component
            v-bind:is="getResourceHeaderType()"
            v-bind:breadcrumbs="breadcrumbs"
            v-bind:hasBottomBorder="headerHasBorder"
        >
            <component v-bind:is="getResourceControlsType()" v-bind:controls="resourceControls"></component>
        </component>
        <component
            v-if="currentContext === 'index'"
            v-bind:is="getResourceListType()"
            v-bind:query="indexQuery"
            v-bind:configure="getIndexConfigurator()"
            v-bind:Collection="getCollectionType()"
            v-bind:getEditUrl="getEditUrl"
            v-bind:getIndexUrl="getIndexUrl"
            v-bind:openEdit="openEdit"
            v-bind:resourceCaption="resourceCaption"
            v-bind:apiInclude="includeApiData.index"
            v-bind="getAdditionalListProps()"
            v-bind:selectsResource="selectsResource"
            v-on:queryChange="openIndex"
            v-on:beforeConfigure="processIndexEvent('beforeConfigure', $event)"
            v-on:afterConfigure="processIndexEvent('afterConfigure', $event)"
            v-on:systemError="handleListSystemError"
            ref="listHandler"
        ></component>
        <component class="resourceEdit resourceEditType1"
            v-if="currentContext === 'create' || currentContext === 'edit'"
            v-bind:is="getResourceEditType()"
            v-bind:ModelType="getModelType()"
            v-bind:configure="getEditConfigurator()"
            v-bind:resourceId="editResourceId"
            v-bind:createRequiresDraft="createRequiresDraft"
            v-bind:createRelatedStrategy="createRelatedStrategy"
            v-bind:resourceSavedMessage="resourceSavedMessage"
            v-bind:resourceCreatedMessage="resourceCreatedMessage"
            v-bind="getAdditionalEditProps()"
            v-on:beforeConfigure="processConfigureEvent('beforeConfigure', $event)"
            v-on:afterConfigure="processConfigureEvent('afterConfigure', $event)"
            v-on:resourceModelSaved="processSaveEvent($event)"
            v-on:systemError="handleEditSystemError"
            ref="editHandler"
        ></component>
    </div>
</template>

<script>

import Vue from 'vue';
import {assign} from '../library/toolkit';
import translate from '../library/translate';
import {confirm} from '../components/dialogModal';
import ResourceControls from '../components/resourceControls';
import ResourceHeader from '../components/resourceHeader';
import ResourceList from '../components/resourceList';
import ResourceEdit from '../components/resourceEdit';
import {Model, Collection} from '../library/resource';
import getVueComponentMapper from '../library/getVueComponentMapper';
import headerBorderListener from '../mixins/headerBorderListener';
import screenSize from '../mixins/screenSize';

const BaseResourceController = Vue.extend({

    mixins: [headerBorderListener, screenSize],

    props: {
        isExternal: {type: Boolean, default: false},
        selectsResource: {type: [String, Boolean], default: false},
        indexTitle: {type: String, default: () => translate('baseResourceController.indexTitle')}
    },

    data: () => ({
        resourceName: null,
        resourceCaption: undefined,
        includeApiData: {},
        createRequiresDraft: false,
        createRelatedStrategy: 'relatedFirst',
        currentContext: null,
        breadcrumbs: [],
        resourceControls: [],
        resourceCreatedMessage: translate('baseResourceController.entityCreatedMessage'),
        resourceSavedMessage: translate('baseResourceController.entitySavedMessage'),
        indexQuery: {},
        currentQuery: {},
        editResourceId: undefined
    }),

    created() {

        this.$emit('create', this);

    },

    mounted() {

        this.setNavSelected();

    },

    methods: {

        getModelType() {

            const includeApiData = this.includeApiData.edit;
            const extendParams = {type: this.resourceName};

            if (includeApiData) {

                extendParams.url = function() {
                    return this.constructor.url({
                        type: this.getType(),
                        id: this.get('id'),
                        query: {
                            include: includeApiData
                        }
                    });
                };

            }

            return Model.extend(extendParams);

        },

        getCollectionType() {

            return Collection.extend({Model: this.getModelType()});

        },

        getResourceControlsType() {

            return ResourceControls;

        },

        getResourceHeaderType() {

            return ResourceHeader;

        },

        getResourceListType() {

            return ResourceList;

        },

        getAdditionalListProps() {

            return undefined;

        },

        getAdditionalEditProps() {

            return undefined;

        },

        getResourceEditType() {

            return ResourceEdit;

        },

        setNavSelected(key) {

            if (!this.isExternal) {
                this.$store.commit('setNavSelected', key || this.resourceName);
            }

        },

        addControl(config) {

            this.resourceControls.push(
                assign({actionContext: this}, config)
            );

            return this;

        },

        addCreateControl: function(caption) {

            return this.addControl({
                caption: caption || translate('resourceControls.create'),
                url: this.getCreateUrl(),
                className: 'accented iconEdit',
                action: () => this.openCreate()
            });

        },

        addSaveControl: function(caption) {

            return this.addControl({
                caption: caption || translate('resourceControls.save'),
                className: 'accented iconUploadCloud',
                action: () => this.$refs.editHandler.save().catch(e => {
                    this.$refs.editHandler.handleSaveError(e);
                })
            });

        },

        addToIndexControl: function(caption) {

            return this.addControl({
                caption: caption || translate('resourceControls.toIndex'),
                className: 'withLeftIcon iconArrowLeft',
                action: () => this.openIndex(this.indexQuery)
            });

        },

        addDropdownControl: function(config) {

            if (Array.isArray(config)) {
                config = {items: config};
            }

            config.isDropdown = true;

            config.items.forEach(item => {
                item.actionContext = this;
            });

            this.resourceControls.push(config);

            return this;

        },

        setPageTitle(title) {

            this.setBreadcrumbs({caption: title});

            if (!this.isExternal) {
                window.document.title = this.formatWindowTitle(
                    this.breadcrumbs,
                    this.$store.state.projectCaption
                );
            }

            return this;

        },

        formatWindowTitle(breadcrumbs, projectCaption) {

            return breadcrumbs.map(item => {
                return item.caption;
            }).join(' / ') + ' - ' + projectCaption;

        },

        setBreadcrumbs(lastBreadCrumb) {

            const storeBreadcrumbs = this.$store.state.breadcrumbs[this.resourceName] || [];

            this.breadcrumbs = storeBreadcrumbs.map(item => {

                return assign({
                    action: item.url && item.url === this.getIndexUrl() ? () => this.openIndex() : undefined
                }, item);

            }).concat([lastBreadCrumb]);

            return this;

        },

        resetContext(context, query) {

            this.currentContext = context;
            this.currentQuery = assign({}, query);
            this.editResourceId = undefined;

            return this;

        },

        resetResourceControls() {

            this.resourceControls = [];
            return this;

        },

        index(routeParams, queryParams) {

            this.resetContext('index', queryParams);
            this.setPageTitle(this.indexTitle);
            this.indexQuery = this.currentQuery;

        },

        getIndexConfigurator() {

            return list => {

                this.resetResourceControls();
                return this.setupList({list, query: this.indexQuery});

            };

        },

        processIndexEvent(name, list) {

            const eventMap = {
                beforeConfigure: 'beforeIndexSetup',
                afterConfigure: 'afterIndexSetup'
            };

            this.$emit(eventMap[name], {controller: this, list});

        },

        create(routeParams, queryParams) {

            this.resetContext('create', queryParams);
            this.setPageTitle(translate('baseResourceController.createTitle'));

        },

        edit(routeParams, queryParams) {

            this.resetContext('edit', queryParams);
            this.setPageTitle(translate('baseResourceController.editTitle'));

            this.editResourceId = routeParams.id;

        },

        getEditConfigurator() {

            return editParams => {

                this.resetResourceControls();
                return this.setupEdit(assign({query: this.currentQuery}, editParams));

            };

        },

        processConfigureEvent(name, editHandler) {

            const eventMap = this.currentContext === 'create' ? {
                beforeConfigure: 'beforeCreateSetup',
                afterConfigure: 'afterCreateSetup'
            } : {
                beforeConfigure: 'beforeEditSetup',
                afterConfigure: 'afterEditSetup'
            };

            this.$emit(eventMap[name], {controller: this, editHandler});

        },

        processSaveEvent(data) {

            if (!this.isExternal) {
                window.scrollTo(0, 0);
            } else if (this.$refs.editHandler) {
                this.$refs.editHandler.$el.scrollTop = 0;
            }

            this.$emit('resourceSaved', data);
            this.openEdit({id: data.resourceModel.get('id')});

        },

        getIndexUrl(queryParams) {

            return this.$router.url({
                name: `resource.${this.resourceName}.index`,
                query: queryParams
            });

        },

        getCreateUrl(queryParams) {

            return this.$router.url({
                name: `resource.${this.resourceName}.create`,
                query: queryParams
            });

        },

        getEditUrl(routeParams, queryParams) {

            return this.$router.url({
                name: `resource.${this.resourceName}.edit`,
                params: routeParams,
                query: queryParams
            });

        },

        openIndex(queryParams) {

            if (!this.isExternal) {

                window.scrollTo(0, 0);

                return new Promise(resolve => {
                    this.$once('afterIndexSetup', () => resolve());
                    this.$router.push(this.getIndexUrl(queryParams));
                });

            } else {

                if (this.$refs.listHandler) {
                    this.$refs.listHandler.$el.scrollTop = 0;
                }

                return this.index(null, queryParams);
            }

        },

        openCreate(queryParams) {

            if (!this.isExternal) {

                return new Promise(resolve => {
                    this.$once('afterCreateSetup', () => resolve());
                    this.$router.push(this.getCreateUrl(queryParams));
                });

            } else {
                return this.create(null, queryParams);
            }

        },

        openEdit(routeParams, queryParams) {

            if (this.currentContext !== 'edit') {
                this.resetResourceControls();
            }

            if (!this.isExternal) {

                return new Promise(resolve => {
                    this.$once('afterEditSetup', () => resolve());
                    this.$router.push(this.getEditUrl(routeParams, queryParams));
                });

            } else {
                return this.edit(routeParams);
            }

        },

        handleSystemError(errorObj) {

            confirm({
                message: translate('validation.serverError'),
                acceptText: translate('prompt.continueText'),
                acceptOnly: true,
                parent: this
            });

        },

        handleListSystemError(errorObj) {

            return this.handleSystemError(errorObj);

        },

        handleEditSystemError(errorObj) {

            return this.handleSystemError(errorObj);

        }

    }

});

BaseResourceController.getDataKeys = () => ([
    'resourceName',
    'resourceCaption',
    'includeApiData',
    'createRequiresDraft',
    'createRelatedStrategy',
    'resourceCreatedMessage',
    'resourceSavedMessage'
]);

BaseResourceController.toVueComponent = getVueComponentMapper({
    extends: BaseResourceController,
    dataKeys: BaseResourceController.getDataKeys()
});

export default BaseResourceController;

</script>
