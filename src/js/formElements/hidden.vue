<template>
    <input
        type="hidden"
        v-bind="inputAttributes"
        :value="modelValue"
    >
</template>

<script>
import base from './base.vue';

export default {

    elementType: 'hidden',

    mixins: [base],

    props: {
        modelValue: {default: ''}
    }

};
</script>
