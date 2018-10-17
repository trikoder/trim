<template>
    <a
        v-bind:href="href"
        v-bind:class="classAttribute"
        v-bind:style="styleAttribute"
        v-on:click="handleClick"
        v-bind="attributes"
        v-html="content"
    ></a>
</template>

<script>

import base from './base';
import {result} from '../library/toolkit';

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

            if (this.action) {
                e.preventDefault();
                this.action(this.resourceModel, e);
            } else if (!this.isExternalLink) {
                e.preventDefault();
                this.$router.push({path: this.href});
            }

        }

    }

};

</script>

<style lang="scss" scoped>

    .linkListItemType1 {

        @include fontSansBold;
        font-size: 1.3em; line-height: 1.4;
        color: $colorGrayDark1;

        @include hover {

            color: lighten($colorGrayDark1,15%);

        }

    }

</style>
