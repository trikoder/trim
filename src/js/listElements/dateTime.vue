<template>
    <p
        :class="classAttribute"
        :style="styleAttribute"
        v-bind="attributes"
        v-html="content"
    ></p>
</template>

<script>

import formatDate from '../library/formatDate';
import base from './base';

export default {

    elementType: 'dateTime',

    mixins: [base],

    props: {
        limitCharacters: {type: [Boolean, Number], default: false},
        ifEmpty: {type: [String, Function], default: ''},
        format: {type: String, default: 'DD.MM.YYYY HH:mm'}
    },

    data: () => ({
        defaultClass: 'dateTimeListItemType1'
    }),

    computed: {

        content() {
            return this.formatModelValue();
        }

    },

    methods: {

        getModelValue() {

            const value = base.methods.getModelValue.call(this);
            return value ? formatDate(value, this.format) : value;

        }

    }

};

</script>

<style lang="scss" scoped>

    .dateTimeListItemType1 {

        @include fontSans;

        font-size: 1.4em; white-space: nowrap;
        color: $colorGrayDark1;

         @include mediaMinWidth($breakpointMedium) {
            font-size: 1.3em;
        }

    }

</style>
