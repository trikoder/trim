<template>
    <element-wrapper v-bind="elementWrapperProps">
       <div
            ref="content"
            contenteditable="true"
            v-once
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

        this.setupEditor();

    },

    beforeDestroy() {

        this.editor && this.editor.destroy();

    },

    methods: {

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
        min-height: em(10,16); padding: em(10,16) 0;
        border-bottom: 1px solid $colorGrayLight2;

        > p, > ul, > ol {

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
            font-size: em(25,16); margin-bottom: em(25,25); line-height: 1.3;

        }

        > h1 { font-size: em(30,16); }
        > h2 { font-size: em(22,16); }
        > h3 { font-size: em(18,16); }

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
