<template>
    <input
        type="hidden"
        v-bind="inputAttributes"
        :value="value"
    >
</template>

<script>
import base from './base.vue';

export default {

    elementType: 'hidden',

    mixins: [base],

    props: {
        value: {default: ''}
    }

};
</script>
