
<template>
    <element-wrapper v-bind="elementWrapperProps">
        <div ref="content" v-once v-bind="inputAttributes"></div>
    </element-wrapper>
</template>

<script>
import base from './base.vue';
import ElementWrapper from './elementWrapper.vue';
import {assign} from '../library/toolkit.js';
import CodeMirror from 'codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/lib/codemirror.css';

export default {

    elementType: 'code',

    components: {ElementWrapper},

    mixins: [base],

    props: {
        modelValue: {type: String, default: ''},
        editorConfig: {type: Object}
    },

    data() {
        return {
            editorValue: this.modelValue
        };
    },

    watch: {

        modelValue(newValue) {

            if (newValue !== this.editorValue && this.editor) {
                this.editorValue = newValue;
                this.editor.setValue(newValue);
            }

        },

        isInteractive() {

            if (this.editor) {
                this.editor.setOption('readOnly', !this.isInteractive);
            }

        }

    },

    mounted() {

        const unWatch = this.$watch('visible', isVisible => {

            if (isVisible) {
                this.$nextTick(() => {
                    unWatch();
                    this.setupEditor();
                });
            }

        }, {immediate: true});

    },

    methods: {

        setupEditor() {

            const options = assign({
                lineNumbers: true
            }, this.editorConfig, {
                readOnly: !this.isInteractive,
                value: this.modelValue
            });

            const editor = this.editor = CodeMirror(
                this.$refs.content, options
            );

            editor.on('change', () => {

                const newValue = editor.getValue();

                this.editorValue = newValue;
                this.$emit('update:modelValue', newValue);

            });

        }

    }

};
</script>

<style lang="scss">

    @use '../../scss/library/all' as *;

    .codeInputType1 {

        .CodeMirror {

            font-size: 1.6em; line-height: 1.5;
            border: 1px solid $colorGrayLight2; border-radius: em(4,16);
            height: auto;

        }

        .CodeMirror-scroll {
            min-height: 8em;
        }

        .cm-s-default .cm-atom {
            color: $colorMain1;
        }

    }

</style>
