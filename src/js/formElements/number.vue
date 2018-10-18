<template>
    <element-wrapper v-bind="elementWrapperProps">
        <input
            v-bind="inputAttributes"
            v-bind:id="elementId"
            v-bind:name="name"
            v-bind:disabled="readOnly"
            v-bind:value="value"
            v-on:input="processInputEvent"
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
        value: {type: [Number, Object], default: null}
    },

    getInitialValue(options = {}) {

        const value = parseFloat(options.value);

        return value || (value === 0 ? value : null);

    },

    computed: {

        inputAttributes() {

            return this.normalizeAttributes({type: 'number'}, this.attributes.input);

        }

    },

    methods: {

        processInputEvent(e) {

            this.$emit('input', parseFloat(e.target.value));

        }

    }

};
</script>
