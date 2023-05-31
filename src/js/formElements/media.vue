<template>
    <element-wrapper ref="wrapper" v-bind="elementWrapperProps">
        <div class="mediaContainer">
            <template v-if="mediaModel">
                <img :src="thumbImageUrl"/>
                <button
                    type="button"
                    @click="zoomImage"
                    class="zoomInBtn nBtn icr iconMaximize"
                ></button>
            </template>
            <template v-else>
                <button
                    type="button"
                    class="nBtn placeholderImage icr iconPlus"
                    @click="isInteractive && openFileDialog()"
                    :class="{interactive: enableUpload}"
                ></button>
            </template>
        </div>
        <div class="textControls">
            <span class="openBtn" @click="isInteractive && selectMedia()">
                {{ mediaModel ? changeImageCaption : chooseImageCaption }}
            </span>
            <template v-if="enableUpload">
                <span class="separator"> {{ separatorCaption }} </span>
                <span @click="isInteractive && openFileDialog()" class="fileUploadHandle">
                    {{ uploadImageCaption }}
                </span>
            </template>
        </div>
        <template v-if="mediaModel && isInteractive">
            <button type="button" @click="openEdit" class="editBtn nBtn icr iconEdit2"></button>
            <button type="button" @click="unsetValue" class="removeBtn nBtn icr iconTrash"></button>
        </template>
    </element-wrapper>
</template>

<script>
import base from './base.vue';
import ElementWrapper from './elementWrapper.vue';
import {assign, pickTo} from '../library/toolkit.js';
import {Model} from '../library/resource.js';
import translate from '../library/translate.js';
import ExternalAdmin from './externalAdmin.vue';
import Dropzone from 'dropzone';
import bootData from '../library/bootData.js';
import api from '../library/api.js';
import {confirm} from '../components/dialogModal.vue';
import SimpleLightbox from 'simple-lightbox';
import 'simple-lightbox/dist/simpleLightbox.min.css';

export default {

    elementType: 'media',

    components: {ElementWrapper},

    mixins: [base],

    props: {
        modelValue: {type: String, default: ''},
        acceptedFiles: {type: String},
        maxFileSize: {type: Number},
        mapImageTo: {type: [String, Function], default: 'thumbnailUrl'},
        mapLargeImageTo: {type: [String, Function], default: 'originalUrl'},
        mediaControllerQuery: {type: Object},
        enableUpload: {type: Boolean, default: true},
        uploadUrl: String,
        uploadParameter: {type: String, default: 'binary'},
        uploadHeaders: Object,
        mediaType: {type: String, default: 'image'},
        editAfterUpload: {type: Boolean, default: false},
        prepareModelFromUpload: {
            type: Function,
            default: (file, response) => {
                return Model.getFromApi({url: file.xhr.getResponseHeader('Location')});
            }
        },
        formatUploadErrorMessage: {type: Function, default: message => message},
        changeImageCaption: {type: String, default: () => translate('formElements.media.changeImageCaption')},
        chooseImageCaption: {type: String, default: () => translate('formElements.media.chooseImageCaption')},
        uploadImageCaption: {type: String, default: () => translate('formElements.media.uploadImageCaption')},
        separatorCaption: {type: String, default: () => translate('formElements.media.separatorCaption')}
    },

    data: () => ({
        mediaModel: undefined
    }),

    computed: {

        thumbImageUrl() {

            return this.mediaModel
                ? this.getModelMapping(this.mapImageTo)
                : undefined;

        },

        largeImageUrl() {

            return this.mediaModel
                ? this.getModelMapping(this.mapLargeImageTo)
                : undefined;

        },

        mediaController() {

            return (this.relation && this.relation.resourceName) || this.name;

        }

    },

    watch: {

        modelValue: 'syncMediaModel'

    },

    created() {

        this.syncMediaModel();

    },

    mounted() {

        this.$watch('isInteractive', isInteractive => {
            isInteractive && this.enableUpload
                ? this.setupUpload()
                : this.disableUpload()
            ;
        }, {immediate: true});

    },

    beforeUnmount() {

        if (this.lightbox) {
            this.lightbox.destroy();
        }

        this.disableUpload();

    },

    methods: {

        syncMediaModel() {

            if (!this.modelValue) {
                this.mediaModel = undefined;
                return Promise.resolve();
            }

            if (this.mediaModel && this.mediaModel.get('id') === this.modelValue) {
                return Promise.resolve(this.mediaModel);
            }

            if (this.resourceModel) {

                const mediaModel = this.resourceModel.get(this.name);

                if (mediaModel && mediaModel.get('id') === this.modelValue) {

                    this.mediaModel = mediaModel;
                    return Promise.resolve(mediaModel);

                }

            }

            return Model.getFromApi({
                type: (this.relation && this.relation.resourceName) || this.name,
                id: this.modelValue
            }).then(model => {
                this.mediaModel = model;
                return model;
            });

        },

        setupUpload() {

            const element = this.$refs.wrapper.$refs.inputWrapper;

            const uploadUrl = this.uploadUrl || Model.extend({
                type: (this.relation && this.relation.resourceName) || this.name
            }, {
                baseUrl: bootData('baseApiUrl', '/api/')
            }).url() + '/upload';

            const dropzone = this.dropzone = new Dropzone(element, {
                url: uploadUrl,
                acceptedFiles: this.acceptedFiles,
                maxFilesize: this.maxFileSize,
                params: this.mediaType && {mediaType: this.mediaType},
                maxFiles: 1,
                paramName: this.uploadParameter,
                headers: assign(
                    pickTo({}, api.defaults.headers.common, ['Authorization']),
                    this.uploadHeaders
                )
            });

            dropzone.on('success', (file, response) => {

                this.prepareModelFromUpload(file, response).then(model => this.onModelUpload(model));
                dropzone.removeFile(file);

            }).on('error', (file, errorMessage) => {

                confirm({
                    message: this.formatUploadErrorMessage(errorMessage),
                    acceptText: translate('prompt.continueText'),
                    acceptOnly: true,
                    parent: this
                });

            });

        },

        disableUpload() {

            if (this.dropzone) {
                this.dropzone.disable();
                this.dropzone.destroy();
                delete this.dropzone;
            }

        },

        openFileDialog() {

            if (this.enableUpload && this.dropzone) {
                this.dropzone.hiddenFileInput.click();
            }

        },

        onModelUpload(model) {

            if (this.editAfterUpload) {

                const admin = ExternalAdmin.open({
                    controller: this.mediaController,
                    controllerMethod: 'edit',
                    controllerMethodParams: [{id: model.get('id')}],
                    afterControllerMount: controller => this.assignOnSave(controller, admin),
                    parent: this
                });

            } else {

                this.mediaModel = model;
                this.$emit('update:modelValue', model.get('id'));

            }

        },

        assignOnSave(controller, externalAdmin) {

            controller.$once('resourceSaved', ({resourceModel}) => {

                this.mediaModel = resourceModel;
                this.$emit('update:modelValue', resourceModel.get('id'));
                externalAdmin.$destroy();

            });

        },

        zoomImage() {

            if (this.lightbox) {
                this.lightbox.destroy();
            }

            this.lightbox = SimpleLightbox.open({
                items: [this.largeImageUrl || this.thumbImageUrl],
                beforeUnmount: () => { delete this.lightbox; }
            });

        },

        openEdit() {

            ExternalAdmin.open({
                controller: this.mediaController,
                controllerMethod: 'edit',
                controllerMethodParams: [{id: this.mediaModel.get('id')}],
                parent: this
            });

        },

        selectMedia() {

            const admin = ExternalAdmin.select(this.mediaController, model => {

                this.mediaModel = model;
                this.$emit('update:modelValue', model.get('id'));

            }, {
                controllerMethodParams: [{}, this.mediaControllerQuery || {}],
                afterControllerMount: controller => this.assignOnSave(controller, admin),
                parent: this
            });

        },

        unsetValue() {

            this.$emit('update:modelValue', '');
            return this;

        },

        getModelMapping(mapper) {

            return typeof mapper === 'function'
                ? mapper(this.mediaModel)
                : this.mediaModel.get(mapper)
            ;

        }

    }

};
</script>

<style lang="scss">

    .mediaInputType1 {

        display: inline-block; position: relative; padding: 0.5em; padding-right: 4em; overflow: hidden;
        background-color: #fff; border: 1px solid $colorGrayLight2; border-radius: 0.3em;

        > .mediaContainer {

            $size: 70;
            $ratio: divide(3,4);

            width: em($size, 10); height: em($size * $ratio, 10); line-height: em($size * $ratio, 10);
            display: inline-block; vertical-align: middle; margin-right: 1.5em; position: relative;
            background-color: #f5f5f5; border-radius: 0.3em; text-align: center;

            > img {

                max-width: em($size, 10); max-height: em($size * $ratio, 10);
                display: inline-block; vertical-align: middle;
                border-radius: 0.3em;

            }

            @include mediaMinWidth($breakpointMedium) {

                $size: 120;
                $ratio: divide(3,4);

                width: em($size, 10); height: em($size * $ratio, 10); line-height: em($size * $ratio, 10);

                > img {
                    max-width: em($size, 10); max-height: em($size * $ratio, 10);
                }

            }

        }

        .zoomInBtn {

            transition: opacity 0.3s;

            position: absolute; left: 50%; top: 50%; margin: -2em 0 0 -2em; width: 4em; height: 4em;
            background-color: rgba(#000, 0.8); border-radius: 50%; opacity: 0; color: #fff;

            &:before { font-size: 1.5em; }

        }

        > .mediaContainer:hover > .zoomInBtn {

            opacity: 1;

        }

        .placeholderImage {

            position: absolute; left: 0; top: 0; width: 100%; height: 100%;
            color: $colorGrayDark2;

            &:before {

                font-size: 1.8em;

            }

            &.large:before {

                font-size: 3em;

            }

            &.interactive {

                cursor: pointer;

            }

        }

        > .textControls {

            font-size: 1.7em; display: inline-block; vertical-align: middle;
            box-sizing: border-box; max-width: 50%;
            color: $colorGrayDark2; cursor: pointer;

            @include mediaMinWidth($breakpointLarge) {

                max-width: 70%;

            }

        }

        > .dz-preview {

            > div { display: none; }

            > .dz-progress {

                display: block; position: absolute; left: 0; bottom: 0; right: 0; height: 1px;
                background-color: $colorGrayLight1;

                > .dz-upload {

                    display: block; height: 100%; background-color: $colorMain1;

                }

            }

        }

        .openBtn, .fileUploadHandle {

            &:hover { color: $colorGrayDark1; }

        }

        .removeBtn, .editBtn, .downloadBtn {

            position: absolute; right: 0; top: 0; bottom: 50%; width: 3.5em; height: auto; box-sizing: border-box;
            border-left: 1px solid $colorGrayLight1; color: darken($colorGrayLight2, 15%);

            &:hover { color: darken($colorGrayLight2, 30%); }

            &:before { font-size: 1.8em; }

        }

        .removeBtn {

            top: 50%; bottom: 0;

            &:before { font-size: 1.8em; }

        }

    }

</style>
