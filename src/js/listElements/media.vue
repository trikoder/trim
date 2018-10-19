<template>
    <div
        v-if="imageUrl"
        v-bind:class="[classAttribute, 'mediaListItemType1 image']"
        v-bind:style="styleAttribute"
        v-bind="attributes"
    >
        <button v-if="largeImageUrl" type="button" v-on:click="zoomImage" class="zoomImage previewBtn nBtn icr iconMaximize"></button>
    </div>
    <div
        v-else-if="isFile"
        v-bind:class="[classAttribute, 'mediaListItemType1 file']"
        v-bind:style="styleAttribute"
        v-bind="attributes"
    >
        <button type="button" v-on:click="openFile" class="openFile previewBtn nBtn icr iconMaximize"></button>
    </div>
    <div
        v-else
        v-bind:class="[classAttribute, 'mediaListItemType1']"
        v-bind:style="styleAttribute"
    >
        <span class="placeholder iconImage icr"></span>
    </div>
</template>

<script>

import base from './base';
import {assign} from '../library/toolkit';
import SimpleLightbox from 'simple-lightbox';
import 'simple-lightbox/dist/simpleLightbox.min.css';

export default {

    elementType: 'media',

    mixins: [base],

    props: {
        mediaType: {type: [String, Function], default: 'image'},
        mapImageTo: String,
        mapLargeImageTo: String,
        mapFileUrlTo: String,
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

            return this.isImage
                ? this.getModelMapping(this.mapImageTo || this.mapTo)
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

            window.open(this.getModelMapping(this.mapFileUrlTo), '_blank');

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

            transition: opacity 0.3s;

            position: absolute; left: 50%; top: 50%; margin: -2em 0 0 -2em; width: 4em; height: 4em;
            background-color: rgba(#000, 0.8); border-radius: 50%; opacity: 0; color: #fff;

            &:before { font-size: 2em; }

            &.iconPlay:before { font-size: 2.2em; left: 2px; }
            &.openFile:before { font-size: 2.2em; left: 2px; }

        }

        &:hover > .previewBtn {

            opacity: 1;

        }

    }

</style>
