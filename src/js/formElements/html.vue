<template>
    <element-wrapper v-bind="elementWrapperProps">
       <div
            ref="content"
            v-once
            :contenteditable="isInteractive"
            v-bind="inputAttributes"
            v-html="value"
        ></div>
    </element-wrapper>
</template>

<script>

import base from './base.vue';
import ElementWrapper from './elementWrapper.vue';
import {load as loadCkEditor} from '../library/ckeditor.js';
import {assignDeep} from '../library/toolkit.js';

export default {

    elementType: 'html',

    components: {ElementWrapper},

    mixins: [base],

    props: {
        value: {type: String, default: ''},
        editorConfig: {type: Object}
    },

    data() {
        return {
            editorValue: this.value
        };
    },

    watch: {

        value(newValue) {

            if (newValue !== this.editorValue && this.editor) {
                this.editorValue = newValue;
                this.editor.setData(newValue);
            }

        }

    },

    mounted() {

        this.$watch('isInteractive', isInteractive => {
            isInteractive ? this.setupEditor() : this.disableEditor();
        }, {immediate: true});

    },

    beforeDestroy() {

        this.disableEditor();

    },

    methods: {

        disableEditor() {

            this.editor && this.editor.destroy();
            delete this.editor;

        },

        setupEditor() {

            return loadCkEditor().then(ckeditor => {

                const options = assignDeep({
                    startupShowBorders: true,
                    toolbar: [
                        {name: 'basicstyles', items: ['Bold', 'Italic', 'Strike', 'RemoveFormat']},
                        {name: 'paragraph', items: ['NumberedList', 'BulletedList']},
                        {name: 'links', items: ['Link', 'Unlink']},
                        {name: 'format', items: ['Format']},
                        {name: 'document', items: ['Sourcedialog']}
                    ],
                    removePlugins: 'magicline',
                    format_tags: 'p;h1;h2;h3'
                }, this.editorConfig);

                const editor = this.editor = ckeditor.inline(this.$refs.content, options);

                editor.on('instanceReady', () => editor.setReadOnly(false));

                editor.on('change', () => {

                    const value = editor.getData();

                    this.editorValue = value;
                    this.$emit('input', value);

                });

                return editor;

            });

        }

    }

};
</script>

<style lang="scss">

    .htmlInputType1 {

        @include fontSans;
        font-size: 1.6em; outline: none; margin-bottom: em(30,16);
        min-height: em(22,16); padding: em(10,16) 0;
        border-bottom: 1px solid $colorGrayLight2;

        > p, > ul, > ol {
            margin-bottom: em(25,16); line-height: 1.4;
            color: $colorGrayDark1;

            &:last-child {

                margin-bottom: 0;

            }
        }

        > ul > li {
            padding-left: em(20,16); position: relative;
            margin-bottom: em(10,16);

            &:before {
                content: ''; position: absolute;
                left: 0; top: em(8,16);
                width: em(5,16); height: em(5,16);
                background: $colorGrayDark1;
                border-radius: 50%;
            }
        }

        > ol {
            list-style-type: decimal;
        }

        > ol > li {
            list-style-type: decimal;
            padding-left: em(15,16); margin-left: em(20,16);
            margin-bottom: em(10,16);
        }

        > h1, > h2, > h3 {
            font-size: em(25,16); margin-bottom: em(25,25); line-height: 1.3;
        }

        > h1 { font-size: em(26,16); }
        > h2 { font-size: em(22,16); }
        > h3 { font-size: em(18,16); }

        a {
            color: $colorGrayDark1;
            text-decoration: underline;
            text-decoration-color: $colorMain1;
        }

        &:empty:before {
            font-size: 1.6em;
            content: attr(placeholder); display: block; color: #666; pointer-events: none;
        }

    }

</style>
