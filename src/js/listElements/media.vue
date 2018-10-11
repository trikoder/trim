<template>
    <div
        v-if="isImage && mediaModel.get(mapImageTo)"
        v-bind:style="{backgroundImage: 'url(' + mediaModel.get(mapImageTo) + ')'}"
        class="mediaListItemType1 image"
    >
        <button type="button" v-on:click="zoomImage" class="zoomImage previewBtn nBtn icr iconMaximize"></button>
    </div>
    <div v-else-if="isFile" class="mediaListItemType1 file">
        <button type="button" v-on:click="openFile" class="openFile previewBtn nBtn icr iconMaximize"></button>
    </div>
    <div v-else class="mediaListItemType1">
        <span class="placeholder iconImage icr"></span>
    </div>
</template>

<script>

import base from './base';
import SimpleLightbox from 'simple-lightbox';
import 'simple-lightbox/dist/simpleLightbox.min.css';

export default {

    mixins: [base],

    props: {
        mapMediaTypeTo: {type: String, default: 'mediaType'},
        mapMediaRelationTo: String,
        mapImageTo: {type: String, default: 'thumbnailUrl'},
        mapLargeImageTo: {type: String, default: 'originalUrl'},
        mapFileUrlTo: {type: String, default: 'fileUrl'},
        imageMediaTypes: {type: Array, default: () => ['image']},
        fileMediaTypes: {type: Array, default: () => ['file']}
    },

    computed: {

        mediaModel() {

            return this.mapMediaRelationTo
                ? this.resourceModel.get(this.mapMediaRelationTo)
                : this.resourceModel
            ;

        },

        mediaType() {

            return this.mediaModel.get(this.mapMediaTypeTo);

        },

        isImage() {

            return this.imageMediaTypes.indexOf(this.mediaType) >= 0;

        },

        isFile() {

            return this.fileMediaTypes.indexOf(this.mediaType) >= 0;

        }

    },

    beforeDestroy() {

        if (this.lightbox) {
            this.lightbox.destroy();
        }

    },

    methods: {

        openFile() {

            window.open(this.mediaModel.get(this.mapFileUrlTo), '_blank');

        },

        zoomImage() {

            if (this.lightbox) {
                this.lightbox.destroy();
            }

            this.lightbox = SimpleLightbox.open({
                items: [this.mediaModel.get(this.mapLargeImageTo)],
                beforeDestroy: () => { delete this.lightbox; }
            });

        }

    },

    getType: () => 'media'

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
