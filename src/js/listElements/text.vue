<template>
    <p
        :class="classAttribute"
        :style="styleAttribute"
        v-bind="attributes"
        v-html="content"
    ></p>
</template>

<script>

import base from './base.js';

export default {

    elementType: 'text',

    mixins: [base],

    props: {
        escapeHtml: {type: Boolean, default: true},
        limitCharacters: {type: [Boolean, Number], default: false},
        limitWords: {type: [Boolean, Number], default: false},
        stripTags: {type: Boolean, default: false},
        collectionDelimiter: {type: String, default: ', '},
        ifEmpty: {type: [String, Function], default: ''}
    },

    data: () => ({
        defaultClass: 'textListItemType1'
    }),

    computed: {

        content() {
            return this.formatModelValue();
        }

    }

};

</script>

<style lang="scss" scoped>

    .textListItemType1 {

        @include fontSans;

        font-size: 1.4em; line-height: 1.4;
        color: $colorGrayDark1;

        &.mod1 {

            font-size: 1.2em;
            letter-spacing: 0.02em; line-height: 1.4; color: $colorGrayDark2;
            text-transform: uppercase;

        }

        @include mediaMinWidth($breakpointMedium) {
            font-size: 1.3em;
        }

    }

</style>
