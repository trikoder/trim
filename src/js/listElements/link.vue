<template>
    <a
        :href="href"
        :class="classAttribute"
        :style="styleAttribute"
        @click="handleClick"
        v-bind="attributes"
        v-html="content"
    ></a>
</template>

<script>

import base from './base.js';
import {result, isNewTabClick} from '../library/toolkit.js';

export default {

    elementType: 'link',

    mixins: [base],

    props: {
        url: {type: [String, Function]},
        isExternalLink: {type: Boolean, default: false},
        action: {type: Function},
        escapeHtml: {type: Boolean, default: true},
        limitCharacters: {type: [Boolean, Number], default: false},
        limitWords: {type: [Boolean, Number], default: false},
        stripTags: {type: Boolean, default: false},
        collectionDelimiter: {type: String, default: ', '},
        ifEmpty: {type: [String, Function], default: ''}
    },

    data: () => ({
        defaultClass: 'linkListItemType1'
    }),

    computed: {

        href() {
            return result(this.url, [this.resourceModel], this);
        },

        content() {
            return this.formatModelValue();
        }

    },

    methods: {

        handleClick(e) {

            if (isNewTabClick(e)) {
                // do nothing
            } else if (this.action) {
                e.preventDefault();
                this.action(this.resourceModel, e);
            } else if (!this.isExternalLink) {
                e.preventDefault();
                this.$router.navigateTo(this.href);
            }

        }

    }

};
</script>

<style lang="scss" scoped>

    @use '../../scss/library/all' as *;

    .linkListItemType1 {

        @include fontSansBold;
        font-size: 1.4em; line-height: 1.4;
        color: $colorGrayDark1;

        @include hover {

            color: lighten($colorGrayDark1,15%);

        }

        @include mediaMinWidth($breakpointMedium) {
            font-size: 1.3em;
        }

    }

</style>
