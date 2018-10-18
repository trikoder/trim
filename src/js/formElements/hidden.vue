<template>
    <input
        type="hidden"
        v-bind="inputAttributes"
        v-bind:id="elementId"
        v-bind:name="name"
        v-bind:disabled="readOnly"
        v-bind:value="value"
    >
</template>

<script>
import base from './base';

export default {

    elementType: 'hidden',

    mixins: [base],

    props: {
        value: {default: ''}
    }

};
</script>
