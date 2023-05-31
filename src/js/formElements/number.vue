<template>
    <element-wrapper v-bind="elementWrapperProps">
        <input
            v-bind="inputAttributes"
            :type="inputAttributes.type || 'number'"
            :value="modelValue"
            @input="processInputEvent"
        >
    </element-wrapper>
</template>

<script>
import base from './base.vue';
import ElementWrapper from './elementWrapper.vue';

export default {

    elementType: 'number',

    components: {ElementWrapper},

    mixins: [base],

    props: {
        modelValue: {
            validator: value => typeof value === 'number' || value === null,
            default: null
        }
    },

    methods: {

        processInputEvent(e) {

            const inputValue = parseFloat(e.target.value);

            this.$emit('update:modelValue', typeof inputValue === 'number' && !isNaN(inputValue)
                ? inputValue
                : null
            );

        }

    }

};
</script>
