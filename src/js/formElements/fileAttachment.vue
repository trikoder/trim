<template>
    <element-wrapper :renderInputWrapper="false" v-bind="elementWrapperProps">
        <div v-bind="inputWrapperAttributes" ref="inputWrapper">
            <div class="mediaContainer">
                <template v-if="thumbnailUrl">
                    <img :src="thumbnailUrl"/>
                    <button type="button" @click="zoomImage" class="nBtn icr zoomInBtn iconMaximize"></button>
                </template>
                <button v-else type="button" @click="openFileDialog" :class="[{
                        'iconFile large': selectedFile || fileUrl,
                        'iconPlus': !selectedFile && !fileUrl
                }, 'nBtn fileUploadClickable placeholderImage icr']"/>
            </div>
            <div class="textControls">
                <span class="fileUploadHandle" @click="openFileDialog">
                    {{ textControlCaption }}
                    <span class="fileName" v-if="selectedFileName">{{ selectedFileName }}</span>
                </span>
            </div>
            <a
                v-if="fileUrl && !selectedFile"
                :href="fileUrl"
                @click="clickDownload"
                target="_blank"
                class="downloadBtn nBtn icr iconDownload"
            ></a>
            <button
                v-if="selectedFile"
                @click="isInteractive && removeSelectedFile()"
                type="button"
                class="removeBtn nBtn icr iconRotateCcw"
            ></button>
        </div>
    </element-wrapper>
</template>

<script>
import base from './base.vue';
import translate from '../library/translate.js';
import ElementWrapper from './elementWrapper.vue';
import Dropzone from 'dropzone';
import {confirm} from '../components/dialogModal.vue';
import SimpleLightbox from 'simple-lightbox';
import 'simple-lightbox/dist/simpleLightbox.min.css';

export default {

    elementType: 'fileAttachment',

    components: {ElementWrapper},

    mixins: [base],

    props: {
        value: {},
        acceptedFiles: {type: String},
        maxFileSize: {type: Number},
        mapThumbnailTo: {type: [String, Function]},
        mapCurrentFileUrlTo: {type: [String, Function]},
        addFileCaption: {type: String, default: () => translate('formElements.fileAttachment.addFileCaption')},
        changeFileCaption: {type: String, default: () => translate('formElements.fileAttachment.changeFileCaption')},
        downloadAction: {type: Function}
    },

    data: () => ({
        savesFile: true,
        clientThumbnail: undefined,
        selectedFile: undefined
    }),

    computed: {

        thumbnailUrl() {

            if (this.clientThumbnail) {
                return this.clientThumbnail;
            } else if (!this.selectedFile && this.mapThumbnailTo) {
                return this.getModelMapping(this.mapThumbnailTo);
            } else {
                return undefined;
            }

        },

        fileUrl() {

            if (this.selectedFile) {
                return undefined;
            } else if (this.mapCurrentFileUrlTo) {
                return this.getModelMapping(this.mapCurrentFileUrlTo);
            } else {
                return undefined;
            }

        },

        selectedFileName() {

            return this.selectedFile && this.selectedFile.name;

        },

        textControlCaption() {

            return this.selectedFile || this.fileUrl
                ? this.changeFileCaption
                : this.addFileCaption
            ;

        }

    },

    mounted() {

        this.$watch('isInteractive', isInteractive => {
            isInteractive
                ? this.setupFileInput()
                : this.destroyFileInput()
            ;
        }, {immediate: true});

    },

    beforeDestroy() {

        if (this.lightbox) {
            this.lightbox.destroy();
        }

        this.destroyFileInput();

    },

    methods: {

        clickDownload(e) {

            if (this.downloadAction) {
                e.preventDefault();
                this.downloadAction(this.fileUrl);
            }

        },

        getModelMapping(mapper) {

            return typeof mapper === 'function'
                ? mapper(this.resourceModel)
                : this.resourceModel.get(mapper)
            ;

        },

        setupFileInput() {

            var dropzone = this.dropzone = new Dropzone(this.$refs.inputWrapper, {
                url: '/dummy-upload-url',
                acceptedFiles: this.acceptedFiles,
                maxFilesize: this.maxFileSize,
                clickable: true,
                maxFiles: 1,
                uploadMultiple: false,
                createImageThumbnails: true,
                autoProcessQueue: false,
                autoDiscover: false,
                thumbnailWidth: 800,
                thumbnailHeight: 800,
                thumbnailMethod: 'contain',
                previewsContainer: document.createElement('div')
            });

            dropzone.on('addedfile', file => {
                this.clientThumbnail = undefined;
                this.selectedFile = file;
                this.dropzone.removeAllFiles();
            }).on('thumbnail', (file, dataUrl) => {
                if (file === this.selectedFile) {
                    this.clientThumbnail = dataUrl;
                }
            }).on('error', (file, errorMessage) => {
                confirm({
                    message: errorMessage,
                    acceptText: translate('prompt.continueText'),
                    acceptOnly: true,
                    parent: this
                });
                this.removeSelectedFile();
            });

        },

        destroyFileInput() {

            if (this.dropzone) {
                this.dropzone.removeAllFiles();
                this.dropzone.disable();
                this.dropzone.destroy();
                delete this.dropzone;
            }

        },

        getFile() {

            return this.selectedFile;

        },

        openFileDialog() {

            if (this.dropzone) {
                this.dropzone.hiddenFileInput.click();
            }

        },

        zoomImage() {

            if (this.lightbox) {
                this.lightbox.destroy();
            }

            this.lightbox = SimpleLightbox.open({
                items: [this.clientThumbnail || this.fileUrl],
                beforeDestroy: () => { delete this.lightbox; }
            });

        },

        removeSelectedFile() {

            this.selectedFile = this.clientThumbnail = undefined;
            this.dropzone.removeAllFiles();

        }

    }

};
</script>

<style lang="scss" scoped>

    .fileAttachment {

        display: block; position: relative; padding: 0.5em; padding-right: 4em; overflow: hidden;
        background-color: #fff; border: 1px solid $colorGrayLight2; border-radius: 0.3em;

    }

    .mediaContainer {

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

        &:before { font-size: 1.3em; }

    }

    .mediaContainer:hover > .zoomInBtn {

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

    .textControls {

        font-size: 1.7em; display: inline-block; vertical-align: middle;
        box-sizing: border-box; max-width: 50%;
        color: $colorGrayDark2; cursor: pointer;

        @include mediaMinWidth($breakpointLarge) {

            max-width: 70%;

        }

    }

    .openBtn, .fileUploadHandle {

        &:hover { color: $colorGrayDark1; }

    }

    .fileUploadHandle {

        position: relative; overflow: hidden; cursor: pointer;

    }

    .fileName {

        display: block; font-size: em(14,17); margin-top: em(5,14); opacity: 0.5;

    }

    .removeBtn,  .downloadBtn {

        position: absolute; right: 0; top: 0; bottom: 0; width: 3.5em; height: auto; box-sizing: border-box;
        border-left: 1px solid $colorGrayLight1; color: darken($colorGrayLight2, 15%);

        &:hover { color: darken($colorGrayLight2, 30%); }

        &:before { font-size: 1.8em; }

    }

</style>
