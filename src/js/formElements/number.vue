<template>
    <element-wrapper v-bind="elementWrapperProps">
        <input
            v-bind="inputAttributes"
            :type="inputAttributes.type || 'number'"
            :value="value"
            @input="processInputEvent"
        >
    </element-wrapper>
</template>

<script>
import base from './base';
import ElementWrapper from './elementWrapper';

export default {

    elementType: 'number',

    components: {ElementWrapper},

    mixins: [base],

    props: {
        value: {
            validator: value => typeof value === 'number' || value === null,
            default: null
        }
    },

    methods: {

        processInputEvent(e) {

            const inputValue = parseFloat(e.target.value);

            this.$emit('input', typeof inputValue === 'number' && !isNaN(inputValue)
                ? inputValue
                : null
            );

        }

    }

};
</script>
