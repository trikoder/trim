<template>
    <div
        v-if="imageUrl"
        :class="[classAttribute, 'mediaListItemType1 image']"
        :style="styleAttribute"
        v-bind="attributes"
    >
        <button v-if="largeImageUrl" type="button" @click="zoomImage" class="zoomImage previewBtn nBtn icr iconMaximize"></button>
    </div>
    <div
        v-else-if="isFile"
        :class="[classAttribute, 'mediaListItemType1 file']"
        :style="styleAttribute"
        v-bind="attributes"
    >
        <button
            type="button" @click="openFile"
            :class="['openFile previewBtn nBtn icr iconFile', {'withFile': fileUrl}]"
        ></button>
    </div>
    <div
        v-else
        :class="[classAttribute, 'mediaListItemType1']"
        :style="styleAttribute"
    >
        <span class="placeholder iconImage icr"></span>
    </div>
</template>

<script>

import base from './base.js';
import {assign} from '../library/toolkit.js';
import SimpleLightbox from 'simple-lightbox';
import 'simple-lightbox/dist/simpleLightbox.min.css';

export default {

    elementType: 'media',

    mixins: [base],

    props: {
        mediaType: {type: [String, Function], default: 'image'},
        mapImageTo: {type: [String, Function]},
        mapLargeImageTo: {type: [String, Function]},
        mapFileUrlTo: {type: [String, Function]},
        imageMediaTypes: {type: Array, default: () => ['image']},
        fileMediaTypes: {type: Array, default: () => ['file']}
    },

    computed: {

        modelMediaType() {

            return typeof this.mediaType === 'function'
                ? this.mediaType(this.resourceModel)
                : this.mediaType
            ;

        },

        isImage() {

            return this.imageMediaTypes.indexOf(this.modelMediaType) >= 0;

        },

        isFile() {

            return this.fileMediaTypes.indexOf(this.modelMediaType) >= 0;

        },

        imageUrl() {

            return this.isImage && (this.mapImageTo || this.mapTo)
                ? this.getModelMapping(this.mapImageTo || this.mapTo)
                : undefined
            ;

        },

        fileUrl() {

            return this.isFile && (this.mapFileUrlTo || this.mapTo)
                ? this.getModelMapping(this.mapFileUrlTo || this.mapTo)
                : undefined
            ;

        },

        largeImageUrl() {

            return this.isImage && this.mapLargeImageTo
                ? this.getModelMapping(this.mapLargeImageTo)
                : undefined
            ;

        },

        styleAttribute() {

            if (this.isImage && this.imageUrl) {
                return assign({}, this.attributes.style, {
                    backgroundImage: 'url(' + this.imageUrl + ')'
                });
            } else {
                return this.attributes.style;
            }

        }

    },

    beforeDestroy() {

        if (this.lightbox) {
            this.lightbox.destroy();
        }

    },

    methods: {

        getModelMapping(mapper) {

            return typeof mapper === 'function'
                ? mapper(this.resourceModel)
                : this.resourceModel.get(mapper)
            ;

        },

        openFile() {

            if (this.fileUrl) {
                window.open(this.fileUrl, '_blank');
            }

        },

        zoomImage() {

            if (this.lightbox) {
                this.lightbox.destroy();
            }

            this.lightbox = SimpleLightbox.open({
                items: [this.largeImageUrl],
                beforeDestroy: () => { delete this.lightbox; }
            });

        }

    }

};

</script>

<style lang="scss" scoped>

    .mediaListItemType1 {

        display: block; padding-bottom: percentage(3/4); position: relative;
        text-align: center; background-color: #f5f5f5; background-repeat: no-repeat; background-position: center center;

        &.image {
            background-repeat: no-repeat; background-size: cover;
        }

        > .placeholder {

            position: absolute; left: 50%; top: 50%; margin: -2em 0 0 -2em;

            &:before {

                font-size: 2.5em; color: $colorGrayLight2;

            }

        }

        > .previewBtn {

            transition: opacity 0.3s, color 0.3s;

            position: absolute; left: 50%; top: 50%; margin: -2em 0 0 -2em; width: 4em; height: 4em;
            background-color: rgba(#000, 0.8); border-radius: 50%; opacity: 0; color: #fff;

            &:before { font-size: 2em; }

            &.openFile {
                opacity: 1; background: transparent; color: $colorGrayDark3;

                &:before {
                    font-size: 2.5em;
                }

                &.withFile:hover {
                    color: $colorGrayDark1;
                }
            }

        }

        &:hover > .previewBtn {

            opacity: 1;

        }

    }

</style>
