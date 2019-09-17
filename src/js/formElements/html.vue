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

import base from './base';
import ElementWrapper from './elementWrapper';
import {load as loadCkEditor} from '../library/ckeditor';
import {assignDeep} from '../library/toolkit';

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

        outline: none; margin-bottom: em(30,10);
        min-height: em(22,10); padding: em(10,10) 0;
        border-bottom: 1px solid $colorGrayLight2;

        > p, > ul, > ol {

            font-size: 1.6em;
            margin-bottom: em(25,16); line-height: 1.4;
            color: $colorGrayDark1;

            &:last-child {

                margin-bottom: 0;

            }

        }

        > ul {

            list-style-type: disc; list-style-position: inside;

        }

        > ol {

            list-style-type: decimal; list-style-position: inside;

        }

        > h1, > h2, > h3 {

            @include fontSansCondensedBold;
            font-size: em(25,10); margin-bottom: em(25,25); line-height: 1.3;

        }

        > h1 { font-size: em(30,10); }
        > h2 { font-size: em(22,10); }
        > h3 { font-size: em(18,10); }

        > ul, > ol {

            > li {

                list-style: inherit;

            }

        }

        a {
            color: $colorMain1;
        }

        &:empty:before {

            font-size: 1.6em;
            content: attr(placeholder); display: block; color: #666; pointer-events: none;

        }

    }

</style>
