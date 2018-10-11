<template>
    <element-wrapper v-bind="elementWrapperProps">
        <pre v-bind="mirrorAttributes"><span ref="mirror">{{ value }}</span><br></pre>
        <textarea
            v-bind="inputAttributes"
            v-bind:id="elementId"
            v-bind:name="name"
            v-bind:disabled="readOnly"
            v-bind:value="value"
            v-on:input="processInputEvent"
        ></textarea>
    </element-wrapper>
</template>

<script>

import base from './base';
import Vue from 'vue';
import ElementWrapper from './elementWrapper';
import {assign, omit} from '../library/toolkit';

const Component = Vue.extend({

    components: {ElementWrapper},

    mixins: [base],

    props: {
        value: {type: String, default: ''}
    },

    computed: {

        inputWrapperAttributes() {
            return this.normalizeAttributes(
                {class: 'textareaAutoHeight'}, this.attributes.inputWrapper
            );
        },

        mirrorAttributes() {

            return omit(this.inputAttributes, ['id', 'name']);

        }

    },

    methods: {

        processInputEvent(e) {

            this.$refs.mirror.textContent = e.target.value;
            this.$emit('input', e.target.value);

        }

    }

});

assign(Component, {

    getElementType: () => 'textarea',

    getDefaultValue: (options = {}) => (options.value || '').toString()

});

export default Component;

</script>

<style lang="scss">

    .textareaAutoHeight {

        position: relative;

        > pre, > textarea {

            word-wrap: break-word; white-space: pre-wrap;
            resize: none; margin: 0; box-sizing: border-box;

        }

        > pre {

            visibility: hidden;

        }

        > textarea {

            position: absolute; top: 0; left: 0; overflow: hidden;
            height: 100%; width: 100%; outline: none;

        }

    }

</style>
