<template>
    <p
        :class="classAttribute"
        :style="styleAttribute"
        v-bind="attributes"
        v-html="content"
    ></p>
</template>

<script>

import base from './base';
import dateTime from './dateTime';

export default {

    elementType: 'date',

    mixins: [base, dateTime],

    props: {
        format: {type: String}, // to be deprecated
        displayFormat: {type: String, default: 'DD.MM.YYYY'}
    },

    data: () => ({
        defaultClass: 'dateListItemType1'
    })

};

</script>

<style lang="scss" scoped>

    .dateListItemType1 {

        @include fontSans;

        font-size: 1.4em; white-space: nowrap;
        color: $colorGrayDark1;

        @include mediaMinWidth($breakpointMedium) {
            font-size: 1.3em;
        }

    }

</style>
