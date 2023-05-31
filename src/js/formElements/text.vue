<template>
    <element-wrapper v-bind="elementWrapperProps">
        <input
            v-bind="inputAttributes"
            :type="inputAttributes.type || 'text'"
            :value="modelValue"
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
        modelValue: {type: String, default: ''}
    }

};
</script>
