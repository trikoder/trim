<template>
    <element-wrapper v-bind="elementWrapperProps">
        <input
            v-bind="inputAttributes"
            :type="inputAttributes.type || 'text'"
            :value="value"
            @input="processInputEvent"
        >
        <slot name="inputWrapperEnd"></slot>
    </element-wrapper>
</template>

<script>
import base from './base.vue';
import ElementWrapper from './elementWrapper.vue';

export default {

    elementType: 'text',

    components: {ElementWrapper},

    mixins: [base],

    props: {
        value: {type: String, default: ''}
    }

};
</script>
