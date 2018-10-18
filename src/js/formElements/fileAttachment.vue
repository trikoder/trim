<template>
    <element-wrapper v-bind:renderInputWrapper="false" v-bind="elementWrapperProps">
        <div v-bind="inputWrapperAttributes">
            <div class="mediaContainer">
                <template v-if="thumbnailUrl">
                    <img v-bind:src="thumbnailUrl"/>
                    <a v-bind:href="fileUrl" class="nBtn icr iconMaximize"></a>
                </template>
                <button
                    v-else
                    type="button"
                    class="nBtn fileUploadClickable placeholderImage icr"
                    v-bind:class="{
                        'iconFile large': selectedFile || fileUrl,
                        'iconPlus': !selectedFile && !fileUrl
                    }"
                />
            </div>
            <div class="textControls">
                <span class="fileUploadHandle">
                    {{textControlCaption}}
                    <span class="fileName" v-if="selectedFileName">{{selectedFileName}}</span>
                    <input v-on:input="processFile" type="file" v-bind:accept="acceptedFiles" />
                </span>
            </div>
            <a
                v-if="fileUrl && !thumbnailUrl && !selectedFile"
                v-bind:href="fileUrl"
                target="_blank"
                class="downloadBtn nBtn icr iconDownload"
                v-bind:class="{fullSize: !selectedFile}"
            ></a>
            <button
                v-if="selectedFile"
                v-on:click="removeSelectedFile"
                type="button"
                class="removeBtn nBtn icr iconRotateCcw"
            ></button>
        </div>
    </element-wrapper>
</template>

<script>
import base from './base';
import translate from '../library/translate';
import ElementWrapper from './elementWrapper';
import loadImage from 'blueimp-load-image';

export default {

    elementType: 'fileAttachment',

    components: {ElementWrapper},

    mixins: [base],

    props: {
        value: {type: String, default: ''},
        acceptedFiles: {type: String, default: ''},
        mapThumbnailTo: {type: String, required: true},
        mapCurrentFileUrlTo: {type: String, required: true},
        addFileCaption: {type: String, default: () => translate('formElements.fileAttachment.addFileCaption')},
        changeFileCaption: {type: String, default: () => translate('formElements.fileAttachment.changeFileCaption')}
    },

    data() {
        return {
            savesFile: true,
            clientThumbnail: undefined,
            selectedFile: undefined
        };
    },

    computed: {

        thumbnailUrl() {

            if (this.clientThumbnail) {

                return this.clientThumbnail;

            } else if (!this.selectedFile) {

                return this.resourceModel.get(this.mapThumbnailTo);

            } else {

                return undefined;

            }

        },

        fileUrl() {

            return this.resourceModel.get(this.mapCurrentFileUrlTo);

        },

        selectedFileName() {

            return this.selectedFile && this.selectedFile.name;

        },

        textControlCaption() {

            return this.selectedFile || this.fileUrl ? this.changeFileCaption : this.addFileCaption;

        }

    },

    methods: {

        getFile() {

            return this.selectedFile;

        },

        processFile({target}) {

            const file = Array.from(target.files)[0];

            if (file.type.search('image') >= 0) {

                this.processImage(file);

            } else {

                this.clientThumbnail = undefined;
                this.setFile(file);

            }

        },

        processImage(file) {

            loadImage.parseMetaData(file, data => {
                loadImage(file, canvas => {
                    canvas.toBlob(blob => {
                        this.clientThumbnail = URL.createObjectURL(blob);
                    }, 'image/jpeg');
                }, {
                    canvas: true,
                    orientation: data.exif.get('Orientation'),
                    maxWidth: 240
                });
                loadImage(file, canvas => {
                    canvas.toBlob(blob => {
                        this.setFile(blob);
                    }, 'image/jpeg');
                }, {
                    canvas: true,
                    orientation: data.exif.get('Orientation')
                });
            });

        },

        setFile(file) {

            this.selectedFile = file;

        },

        removeSelectedFile() {

            this.clientThumbnail = undefined;
            this.selectedFile = undefined;

        }

    }

};
</script>

<style lang="scss" scoped>

    .fileAttachment {

        display: block; position: relative; padding: 0.5em; padding-right: 4em; overflow: hidden;
        background-color: #fff; border: 1px solid $colorGrayLight2; border-radius: 0.3em;

        .mediaContainer {

            $size: 70;
            $ratio: 3/4;

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
                $ratio: 3/4;

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

        .dz-preview {

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

        .fileUploadHandle {

            position: relative; overflow: hidden; cursor: pointer;

            > input {
                position: absolute; z-index: 2; top: 0; left: 0; width: 100%; height: 100%; cursor: pointer; opacity: 0;
            }

        }

        .removeBtn, .editBtn, .downloadBtn {

            position: absolute; right: 0; top: 0; bottom: 50%; width: 3.5em; height: auto; box-sizing: border-box;
            border-left: 1px solid $colorGrayLight1; color: darken($colorGrayLight2, 15%);

            &:hover { color: darken($colorGrayLight2, 30%); }

            &:before { font-size: 1.8em; }

        }

        .removeBtn {

            top: 0; bottom: 0;

            &:before { font-size: 1.8em; }

        }

        .fileName {

            display: block; font-size: em(14,17); margin-top: em(5,14); opacity: 0.5;

        }

        .downloadBtn.fullSize {

            bottom: 0;

        }

        .downloadBtn + .removeBtn {

            top: 50%;

        }

    }

</style>
