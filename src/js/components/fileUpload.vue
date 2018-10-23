<template>
    <div class="fileUploadType1">
        <div class="handle iconUpload dz-clickable">{{ uploadCaption }}</div>
    </div>
</template>

<script>
import Dropzone from 'dropzone';
import {assign, pickTo} from '../library/toolkit';
import api from '../library/api';

export default {

    props: {
        uploadCaption: {type: String, required: true},
        uploadUrl: {type: String, required: true},
        clickableSelector: {type: String, default: '.handle'},
        paramName: {type: String, default: 'binary'},
        mediaType: {type: String, default: 'image'},
        removePreviewOnUpload: {type: Boolean, default: true},
        headers: Object,
        maxFiles: Number
    },

    mounted() {

        this.setupUpload();

    },

    beforeDestroy() {

        this.dropzone && this.dropzone.destroy();

    },

    methods: {

        setupUpload() {

            const clickableElements = [].slice.call(
                this.$el.querySelectorAll(this.clickableSelector)
            );

            const dropzone = this.dropzone = new Dropzone(this.$el, {
                url: this.uploadUrl,
                params: this.mediaType && {mediaType: this.mediaType},
                clickable: clickableElements.length ? clickableElements : true,
                maxFiles: this.maxFiles,
                paramName: this.paramName,
                headers: assign(
                    pickTo({}, api.defaults.headers.common, ['Authorization']),
                    this.headers
                )
            });

            dropzone.on('sending', (file, xhr, formData) => {

                this.$emit('sending', {file, xhr, formData});

            }).on('success', (file, response) => {

                this.$emit('upload', {file, response});
                this.removePreviewOnUpload && dropzone.removeFile(file);

            }).on('error', (file, errorMessage) => {

                this.$emit('uploadError', {file, errorMessage});
                this.removePreviewOnUpload && dropzone.removeFile(file);

            });

        }

    }

};

</script>

<style lang="scss">

    .fileUploadType1 {

        overflow: hidden;
        border: 1px solid $colorGrayLight1; border-radius: 0.3em;

        > .handle {

            font-size: 1.6em; display: block; box-sizing: border-box;
            width: 100%; padding: em(50,16) em(20,16) em(20,16);
            text-align: center;  background-color: #f5f5f5; color: $colorGrayDark2;
            cursor: pointer;

            &:before {

                font-size: em(25,16);
                left: 50%; top: em(30,25); margin-left: em(-20,25);

            }

        }

        .dz-preview {

            padding: 1em; position: relative;

        }

        .dz-image {

            display: inline-block; width: 6em; height: 6em;
            line-height: 6em; margin-right: 1em;
            background-color: #f5f5f5; text-align: center;

            > img {

                display: inline-block; max-width: 6em; max-height: 6em; vertical-align: middle;
                border-radius: 0.3em;

            }

        }

        .dz-details {

            display: inline-block; vertical-align: middle; font-size: 1.5em;

        }

        .dz-size {

            display: inline-block; vertical-align: middle;

        }

        .dz-filename {

            display: inline-block; vertical-align: middle;
        }

        .dz-progress {

            position: absolute; left: 0; top: 0; right: 0; height: 1px;
            background-color: $colorGrayLight1;

            > .dz-upload {

                display: block; height: 100%; background-color: $colorMain1;

            }

        }

        .dz-error-message {

            font-size: 1.4em; padding: em(20,14); background-color: #F8E6E5; color: darken(#F8E6E5, 40%);
            text-align: center; border-radius: em(3,13); margin-top: em(15,13); border: 1px solid darken(#F8E6E5, 40%);
            display: none;

        }

        .dz-error .dz-error-message {

            animation: slideDownFadeIn 0.2s;

            display: block;

        }

        .dz-success-mark,
        .dz-error-mark {

            display: none;

        }

    }

</style>
