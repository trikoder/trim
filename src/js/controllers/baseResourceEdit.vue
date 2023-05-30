<template>
    <div class="resourceController" :class="cssClass">
        <component
            :is="toComponent(getResourceHeaderType())"
            :breadcrumbs="breadcrumbs"
            :hasBottomBorder="headerHasBorder"
        >
            <component :is="toComponent(getResourceControlsType())" :controls="resourceControls"></component>
        </component>
        <component class="resourceEdit resourceEditType1"
            v-if="resourceModel"
            :is="toComponent(getResourceEditType())"
            :ModelType="getModelType()"
            :configure="getEditConfigurator()"
            :model="resourceModel"
            :resourceSavedMessage="resourceSavedMessage"
            :resourceCreatedMessage="resourceCreatedMessage"
            :initialSelectedTab="currentQuery.tab"
            :getTabUrl="getTabUrl"
            @beforeConfigure="processConfigureEvent('beforeConfigure', $event)"
            @afterConfigure="processConfigureEvent('afterConfigure', $event)"
            @resourceModelSaved="processSaveEvent"
            @selectTab="processTabSelect"
            @systemError="handleEditSystemError"
            ref="editHandler"
        ></component>
    </div>
</template>

<script>

import Vue from 'vue';
import {assign} from '../library/toolkit.js';
import {confirm} from '../components/dialogModal.vue';
import translate from '../library/translate.js';
import ResourceControls from '../components/resourceControls.vue';
import ResourceHeader from '../components/resourceHeader.vue';
import ResourceEdit from '../components/resourceEdit/index.vue';
import {Model} from '../library/resource.js';
import getVueComponentMapper from '../library/getVueComponentMapper.js';
import headerBorderListener from '../mixins/headerBorderListener.js';
import screenSize from '../mixins/screenSize.js';

const BaseResourceEditController = Vue.extend({

    mixins: [headerBorderListener, screenSize],

    props: {
        isExternal: {type: Boolean, default: false}
    },

    data: () => ({
        resourceModel: undefined,
        cssClass: undefined,
        navigationKey: undefined,
        includedRelationships: undefined,
        includedFields: undefined,
        resourceCreatedMessage: translate('baseResourceController.entityCreatedMessage'),
        resourceSavedMessage: translate('baseResourceController.entitySavedMessage'),
        breadcrumbs: [],
        resourceControls: [],
        currentQuery: {}
    }),

    created() {

        this.$emit('create', this);
        this.setNavSelected();

        if (!this.isExternal) {
            this.currentQuery = this.$route.query;
        }

        this.bootstrapModel().catch(
            e => this.handleEditSystemError(e)
        );

    },

    mounted() {
        if (!this.isExternal) {
            this.$watch('$route', (newRoute, prevRoute) => {
                const newTab = newRoute.query[this.getTabQueryKey()];
                if (this.$refs.editHandler) {
                    this.$refs.editHandler.selectedTab = newTab;
                }
            });
        }
    },

    methods: {

        bootstrapModel() {

            return Promise.resolve(this.getModel(this.getModelType())).then(model => {
                this.resourceModel = model;
                return model;
            });

        },

        getModelType() {

            const includedRelationships = this.includedRelationships;
            const includedFields = this.includedFields;
            const extendParams = {};
            const query = {};

            if (includedRelationships || includedFields) {

                if (includedRelationships) {
                    query.include = includedRelationships;
                }
                if (includedFields) {
                    query.fields = includedFields;
                }

                extendParams.url = function() {
                    return this.constructor.url({
                        type: this.getType(),
                        id: this.get('id'),
                        query
                    });
                };

            }

            return Model.extend(extendParams);

        },

        getResourceControlsType() {

            return ResourceControls;

        },

        getResourceHeaderType() {

            return ResourceHeader;

        },

        getResourceEditType() {

            return ResourceEdit;

        },

        setNavSelected() {

            if (!this.isExternal) {
                this.$store.commit('setNavSelected', this.navigationKey);
            }

        },

        addControl(config) {

            this.resourceControls.push(
                assign({actionContext: this}, config)
            );

            return this;

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

            this.breadcrumbs = [lastBreadCrumb];
            return this;

        },

        getEditConfigurator() {

            return editParams => {

                this.resetResourceControls();
                return this.setupEdit(assign({query: this.currentQuery}, editParams));

            };

        },

        processConfigureEvent(name, editHandler) {

            const eventMap = {
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

        },

        resetResourceControls() {

            this.resourceControls = [];
            return this;

        },

        processTabSelect(selectedTab) {

            if (!this.isExternal) {
                this.$router.navigateTo(
                    assign(this.getTabRoute(selectedTab), {
                        useHistoryReplace: true
                    })
                );
            }

        },

        getTabQueryKey() {

            return 'tab';

        },

        getTabUrl(tab) {
            return this.$router.url(
                this.getTabRoute(tab)
            );
        },

        getTabRoute(tab) {
            return {
                name: this.$route.name,
                query: assign({}, this.currentQuery, {[this.getTabQueryKey()]: tab})
            };
        },

        handleSystemError(errorObj) {

            confirm({
                message: translate('validation.serverError'),
                acceptText: translate('prompt.continueText'),
                acceptOnly: true,
                parent: this
            });

            throw errorObj;

        },

        handleEditSystemError(errorObj) {

            return this.handleSystemError(errorObj);

        }

    }

});

BaseResourceEditController.getDataKeys = () => ([
    'navigationKey',
    'cssClass',
    'includedRelationships',
    'includedFields',
    'resourceSavedMessage',
    'resourceCreatedMessage'
]);

BaseResourceEditController.toVueComponent = getVueComponentMapper({
    extends: BaseResourceEditController,
    dataKeys: BaseResourceEditController.getDataKeys()
});

export default BaseResourceEditController;

</script>
