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

    elementType: 'text',

    components: {ElementWrapper},

    mixins: [base],

    props: {
        value: {type: String, default: ''}
    },

    computed: {

        inputAttributes() {

            return this.normalizeAttributes({type: 'text'}, this.attributes.input);

        }

    }

};
</script>
