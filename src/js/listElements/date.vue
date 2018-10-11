<template>
    <p
        v-bind:class="classAttribute"
        v-bind:style="styleAttribute"
        v-bind="attributes"
        v-html="content"
    ></p>
</template>

<script>

import base from './base';
import dateTime from './dateTime';

export default {

    mixins: [base, dateTime],

    props: {
        format: {type: String, default: 'DD.MM.YYYY'}
    },

    data: () => ({
        defaultClass: 'dateListItemType1'
    }),

    getType: () => 'date'

};

</script>

<style lang="scss" scoped>

    .dateListItemType1 {

        @include fontSans;

        font-size: 1.3em; white-space: nowrap;
        color: $colorGrayDark1;

    }

</style>
