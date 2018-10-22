<template>
    <element-wrapper v-bind="elementWrapperProps">
        <input
            v-bind="inputAttributes"
            v-bind:id="elementId"
            v-bind:name="name"
            v-bind:disabled="readOnly"
            v-bind:type="inputAttributes.type || 'text'"
            v-bind:value="value"
            v-on:input="processInputEvent"
        >
        <slot name="inputWrapperEnd"></slot>
    </element-wrapper>
</template>

<script>
import base from './base';
import ElementWrapper from './elementWrapper';

export default {

    elementType: 'text',

    components: {ElementWrapper},

    mixins: [base],

    props: {
        value: {type: String, default: ''}
    }

};
</script>
