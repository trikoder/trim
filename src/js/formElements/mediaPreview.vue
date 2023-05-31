<template>
    <element-wrapper v-bind="elementWrapperProps">
        <template v-if="mediaModel">
            <div class="imageContainer">
                <img :src="imageUrl" />
                <button type="button" @click="zoomImage" class="zoomImage previewBtn nBtn icr iconMaximize"></button>
            </div>
            <p><span @click="zoomImage" class="zoomImage">Zoom image</span></p>
        </template>
        <span v-else class="placeholder iconImage icr"></span>
    </element-wrapper>
</template>

<script>
import base from './base.vue';
import ElementWrapper from './elementWrapper.vue';
import SimpleLightbox from 'simple-lightbox';
import 'simple-lightbox/dist/simpleLightbox.min.css';

export default {

    elementType: 'mediaPreview',

    components: {ElementWrapper},

    mixins: [base],

    props: {
        modelValue: {type: String, default: ''},
        readOnly: {type: Boolean, default: true},
        mapImageTo: {type: [String, Function], default: 'thumbnailUrl'},
        mapLargeImageTo: {type: [String, Function], default: 'originalUrl'},
        mapMediaTypeTo: {type: String, default: 'mediaType'},
        mediaRelation: String
    },

    computed: {

        mediaModel() {

            return this.resourceModel
                ? (this.mediaRelation
                    ? this.resourceModel.get(this.mediaRelation)
                    : this.resourceModel)
                : undefined
            ;

        },

        mediaType() {

            return this.mediaModel
                ? this.mediaModel.get(this.mapMediaTypeTo)
                : undefined
            ;

        },

        imageUrl() {

            return this.mediaModel
                ? this.getModelMapping(this.mapImageTo)
                : undefined;

        },

        largeImageUrl() {

            return this.mediaModel
                ? this.getModelMapping(this.mapImageTo)
                : undefined;

        }

    },

    beforeUnmount() {

        if (this.lightbox) {
            this.lightbox.destroy();
        }

    },

    methods: {

        zoomImage() {

            if (this.lightbox) {
                this.lightbox.destroy();
            }

            this.lightbox = SimpleLightbox.open({
                items: [this.largeImageUrl || this.imageUrl],
                beforeUnmount: () => { delete this.lightbox; }
            });

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

    .mediaPreviewType1 {

        position: relative; padding: 0.5em;
        border: 1px solid $colorGrayLight1; border-radius: 0.3em; background-color: #fff;

        > .imageContainer {

            $size: 110;
            $ratio: divide(3,4);

            display: inline-block; vertical-align: middle; width: em($size, 10); height: em($size * $ratio, 10); margin-right: 1.5em; position: relative;
            background-color: #f5f5f5; border-radius: 0.3em; text-align: center; line-height: em($size * $ratio, 10);

            > img {

                display: inline-block; max-width: em($size, 10); max-height: em($size * $ratio, 10); vertical-align: middle;
                border-radius: 0.3em;

            }

            > .zoomImage {

                transition: opacity 0.3s;

                position: absolute; left: 50%; top: 50%; margin: -2em 0 0 -2em; width: 4em; height: 4em;
                background-color: rgba(#000, 0.8); border-radius: 50%; opacity: 0; color: #fff;

                &:before { font-size: 1.5em; }

            }

        }

        > .imageContainer:hover > .zoomImage {

            opacity: 1;

        }

        .placeholderImage {

            position: absolute; left: 0; top: 0; width: 100%; height: 100%;
            color: $colorGrayDark2; cursor: pointer;

            &:before {

                font-size: 1.8em;

            }

        }

        > p {

            font-size: 1.7em; display: inline-block; vertical-align: middle;
            padding: 0 em(15,17); box-sizing: border-box; max-width: 50%;
            color: $colorGrayDark2; cursor: pointer;

            > span:hover { color: $colorMain1; }

        }

    }

</style>
