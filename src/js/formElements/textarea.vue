<template>
    <element-wrapper v-bind="elementWrapperProps">
        <pre v-bind="mirrorAttributes"><span ref="mirror">{{ value }}</span><br></pre>
        <textarea
            v-bind="inputAttributes"
            :value="value"
            @input="processInputEvent"
        ></textarea>
    </element-wrapper>
</template>

<script>
import base from './base.vue';
import ElementWrapper from './elementWrapper.vue';
import {omit} from '../library/toolkit.js';

export default {

    elementType: 'textarea',

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

};
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
