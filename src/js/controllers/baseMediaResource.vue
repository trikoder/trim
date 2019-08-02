<template>
    <div class="resourceController">
        <component
            :is="getResourceHeaderType()"
            :breadcrumbs="breadcrumbs"
            :hasBottomBorder="headerHasBorder"
        >
            <component :is="getResourceControlsType()" :controls="currentResourceControls"></component>
        </component>
        <component
            v-if="currentContext === 'index'"
            :is="getResourceListType()"
            :query="indexQuery"
            :configure="getIndexConfigurator()"
            :Collection="getCollectionType()"
            :getEditUrl="getEditUrl"
            :getIndexUrl="getIndexUrl"
            :openEdit="openEdit"
            :resourceCaption="resourceCaption"
            :apiInclude="includeApiData.index"
            @queryChange="openIndex"
            @beforeConfigure="processIndexEvent('beforeConfigure', $event)"
            @afterConfigure="processIndexEvent('afterConfigure', $event)"
            ref="listHandler"
        ></component>
        <component class="resourceEdit resourceEditType1"
            v-else-if="isStandardEditContext"
            :is="getResourceEditType()"
            :ModelType="getModelType()"
            :configure="getEditConfigurator()"
            :apiInclude="includeApiData.edit"
            :resourceId="editResourceId"
            :createRequiresDraft="createRequiresDraft"
            :createRelatedStrategy="createRelatedStrategy"
            :resourceSavedMessage="resourceSavedMessage"
            :resourceCreatedMessage="resourceCreatedMessage"
            @beforeConfigure="processConfigureEvent('beforeConfigure', $event)"
            @afterConfigure="processConfigureEvent('afterConfigure', $event)"
            @resourceModelSaved="processSaveEvent($event)"
            ref="editHandler"
        ></component>
        <div v-else :key="currentContext" class="mediaUploadType1 resourceEdit resourceEditType1">
            <message v-if="statusMessage" v-bind="statusMessage" @close="statusMessage = null"></message>
            <div class="layoutContainer">
                <file-upload
                    v-if="currentUploadConfig"
                    :uploadCaption="currentUploadConfig.uploadCaption"
                    :mediaType="currentUploadConfig.name"
                    :uploadUrl="uploadUrl()"
                    :paramName="uploadParameter"
                    :headers="uploadHeaders"
                    @upload="processUploadedFile"
                ></file-upload>
                <included-admin
                    ref="includedMedia"
                    name="uploadedIdentifiers"
                    v-show="uploadedIdentifiers.length > 0"
                    v-model="uploadedIdentifiers"
                    :setupEdit="getEditConfigurator()"
                    :removeItems="false"
                    :addItems="false"
                    :attributes="{
                        wrapper: {class: 'includedAdminBlockType1'},
                        inputWrapper: {class: 'includedAdminElement'}
                    }"
                ></included-admin>
            </div>
        </div>
    </div>
</template>

<script>
import BaseResourceController from './baseResource';
import {assign, capitalize, find} from '../library/toolkit';
import {pascal as pascalcase, space as spacecase} from 'to-case';
import translate from '../library/translate';
import bootData from '../library/bootData';
import {Model} from '../library/resource';
import getVueComponentMapper from '../library/getVueComponentMapper';
import FileUpload from '../components/fileUpload';
import IncludedAdmin from '../formElements/includedAdmin';
import Message from '../components/message';
import headerBorderListener from '../mixins/headerBorderListener';

const BaseMediaController = BaseResourceController.extend({

    components: {FileUpload, IncludedAdmin, Message},

    mixins: [headerBorderListener],

    data() {
        return {
            mapMediaTypeTo: 'mediaType',
            uploadParameter: 'binary',
            uploadHeaders: undefined,
            mediaTypes: ['image'],
            uploadControls: [{
                caption: translate('resourceControls.toIndex'),
                className: 'withLeftIcon iconArrowLeft',
                action: () => this.openIndex(this.indexQuery)
            }, {
                isSaveControl: true,
                caption: translate('resourceControls.save'),
                className: 'accented iconUploadCloud',
                action: () => this.saveUploadedMedia()
            }],
            uploadUrl: function() {
                const baseUrl = bootData('baseApiUrl', '/api/');
                const MediaModel = Model.extend({type: this.resourceName}, {baseUrl});
                return MediaModel.url() + '/upload';
            },
            prepareModelFromUpload: (file, response) => {
                return Model.getFromApi({url: file.xhr.getResponseHeader('Location')});
            },
            // private
            resolvedMediaTypes: [],
            uploadedIdentifiers: '',
            statusMessage: null
        };
    },

    computed: {

        isStandardEditContext() {

            const editContexts = ['edit'].concat(this.resolvedMediaTypes.reduce((acc, mediaType) => {
                !mediaType.hasUploadUi && acc.push(mediaType.createContext);
                return acc;
            }, []));

            return editContexts.indexOf(this.currentContext) >= 0;

        },

        currentResourceControls() {

            if (this.currentContext !== 'index' && !this.isStandardEditContext) {
                return this.uploadControls.filter(control => {
                    return this.uploadedIdentifiers.length === 0 ? !control.isSaveControl : true;
                });
            } else {
                return this.resourceControls;
            }

        },

        currentUploadConfig() {

            return find(this.resolvedMediaTypes, mediaType => mediaType.createContext === this.currentContext);

        }

    },

    watch: {
        currentContext() {

            this.uploadedIdentifiers = '';
            this.statusMessage = null;

        }
    },

    created() {

        this.resolveMediaTypes();
        this.setupMediaTypeMethods();

    },

    methods: {

        resolveMediaTypes() {

            this.resolvedMediaTypes = this.mediaTypes.map(mediaType => {

                const mediaTypeInput = typeof mediaType === 'string' ? {name: mediaType} : mediaType;
                const mediaTypeName = mediaTypeInput.name;
                const uploadCaption = capitalize(spacecase(mediaTypeName)) + ' ' + translate('baseMediaController.uploadCaption');

                return assign({
                    createPageTitle: uploadCaption,
                    createRouteName: ['resource', this.resourceName, 'create' + pascalcase(mediaTypeName)].join('.'),
                    uploadCaption,
                    hasUploadUi: true
                }, mediaTypeInput, {
                    createContext: 'create' + pascalcase(mediaTypeName)
                });

            });

        },

        setupMediaTypeMethods() {

            this.resolvedMediaTypes.forEach(typeConfig => {

                const createMethod = 'create' + pascalcase(typeConfig.name);
                const openCreateMethod = 'open' + pascalcase(createMethod);
                const getCreateUrlMethod = 'get' + pascalcase(createMethod) + 'Url';
                const addCreateControl = 'add' + pascalcase(createMethod) + 'Control';

                this[createMethod] = function(routeParams, queryParams) {

                    this.resetContext(createMethod, queryParams);
                    this.setPageTitle(typeConfig.createPageTitle);

                    this.$emit('afterCreateSetup', {controller: this});

                };

                this[openCreateMethod] = function(queryParams) {

                    if (!this.isExternal) {

                        return new Promise(resolve => {
                            this.$once('afterCreateSetup', () => resolve());
                            this.$router.navigateTo(this[getCreateUrlMethod](queryParams));
                        });

                    } else {
                        return this[createMethod](null, queryParams);
                    }

                };

                this[getCreateUrlMethod] = function(queryParams) {

                    return this.$router.url({
                        name: typeConfig.createRouteName,
                        query: queryParams
                    });

                };

                this[addCreateControl] = function(caption) {

                    return this.addControl({
                        caption: caption || translate('resourceControls.create'),
                        url: this[getCreateUrlMethod](),
                        className: 'accented iconEdit',
                        action: () => this[openCreateMethod]()
                    });

                };

            });

        },

        getIndexConfigurator() {

            return list => {

                this.resetResourceControls();
                list.setTemplate('cards');
                return this.setupList({list, query: this.indexQuery});

            };

        },

        getEditConfigurator() {

            return editParams => {

                this.resetResourceControls();

                let methodName;

                if (this.currentContext === 'edit') {

                    const model = editParams.resourceModel;
                    const mediaType = typeof this.mapMediaTypeTo === 'function'
                        ? this.mapMediaTypeTo(model)
                        : model.get(this.mapMediaTypeTo)
                    ;
                    methodName = 'setup' + pascalcase(mediaType) + 'Edit';

                } else {

                    methodName = 'setup' + this.currentContext.replace('create', '') + 'Edit';

                }

                return this[methodName](assign({query: this.currentQuery}, editParams));

            };

        },

        processUploadedFile(data) {

            this.prepareModelFromUpload(data.file, data.response).then(model => {

                this.$refs.includedMedia.addNewIncludedItem(model);

            });

        },

        saveUploadedMedia() {

            return this.$refs.includedMedia.saveRelatedResources().then(() => {

                window.scrollTo(0, 0);

                this.statusMessage = {
                    text: translate('baseResourceController.entitySavedMessage'),
                    type: 'messageType1'
                };

                this.$emit('resourcesUploadedAndUpdated', {
                    models: this.$refs.includedMedia.models
                });

            }).catch(e => {});

        }

    }

});

BaseMediaController.getDataKeys = () => ([
    'mapMediaTypeTo',
    'mediaTypes',
    'uploadParameter',
    'uploadHeaders',
    'uploadControls',
    'uploadUrl',
    'prepareModelFromUpload'
]);

BaseMediaController.toVueComponent = getVueComponentMapper({
    extends: BaseMediaController,
    dataKeys: BaseResourceController.getDataKeys().concat(BaseMediaController.getDataKeys())
});

export default BaseMediaController;

</script>
