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
        <div class="colorPreview" v-bind:style="{backgroundColor: value}"></div>
    </element-wrapper>
</template>

<script>
import base from './base';
import ElementWrapper from './elementWrapper';

export default {

    elementType: 'color',

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

<style lang="scss">

    .colorInputType1 {

        position: relative;

        > .colorPreview {

            width: 1em; height: 1em; margin-top: -0.5em;
            position: absolute; right: 1em; top: 50%;
            border-radius: 50%; box-shadow: 0 0.1em 0.3em rgba(#000, 0.15);
            transition: background-color 0.3s;

        }

    }

</style>
