<template>
   <div
        ref="content"
        v-once
        v-bind="inputAttributes"
        v-html="content"
    ></div>
</template>

<script>

import {load as loadCkEditor} from '../../library/ckeditor';
import {result} from '../../library/toolkit';
import '../html';

export default {

    props: {
        content: String,
        clientId: String,
        editorConfig: Object,
        inputAttributes: Object,
        type: String,
        components: Array
    },

    data() {
        return {
            editorContent: this.content
        };
    },

    watch: {

        content(newContent) {

            if (newContent !== this.editorContent && this.editor) {
                this.editorContent = newContent;
                this.editor.setData(newContent);
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

                const comboName = 'ComponentSelector';

                const options = Object.assign({
                    startupShowBorders: false,
                    toolbar: [
                        {name: 'basicstyles', items: ['Bold', 'Italic', 'Strike', 'RemoveFormat']},
                        {name: 'paragraph', items: ['NumberedList', 'BulletedList', comboName]},
                        {name: 'links', items: ['Link', 'Unlink']},
                        {name: 'format', items: ['Format']},
                        {name: 'document', items: ['Sourcedialog']}
                    ],
                    removePlugins: 'magicline',
                    format_tags: 'p;h1;h2;h3'
                }, this.editorConfig);

                const editor = this.editor = ckeditor.inline(this.$refs.content, options);
                const components = this.components;
                const controlCaption = 'Insert component';
                const self = this;

                editor.ui.addRichCombo(comboName, {
                    label: controlCaption,
                    title: controlCaption,
                    voiceLabel: controlCaption,
                    className: 'ck_add_components',
                    panel: {
                        css: ckeditor.customStyles.richCombo
                    },

                    init: function() {

                        components.forEach(Component => {
                            this.add(
                                Component.componentType,
                                result(Component.insertCaption),
                                result(Component.insertCaption)
                            );
                        });

                    },

                    onClick: function(componentType) {

                        self.prepareInsertEvent(
                            componentType, editor.getSelection().getRanges()[0]
                        );

                        editor.focusManager.blur(true);

                    }
                });

                editor.on('instanceReady', () => editor.setReadOnly(false));

                editor.on('change', () => {

                    const content = editor.getData();

                    this.editorContent = content;

                    this.$emit('updateContent', {
                        clientId: this.clientId,
                        content
                    });

                });

                return editor;

            });

        },

        splitContentByIndex(splitIndex) {

            const content = ['', ''];

            let currentIndex = 0;
            let currentContainer = this.editor.container.getChild(0);

            while (currentContainer) {

                const html = currentContainer.getOuterHtml().trim();

                content[currentIndex < splitIndex ? 0 : 1] += html;
                currentContainer = currentContainer.getNext();
                currentIndex++;
            }

            return content;

        },

        prepareInsertEvent(componentType, selection) {

            const Component = this.components.find(
                Component => Component.componentType === componentType
            );
            let selectedContainer = selection.startContainer;

            while (selectedContainer.getParent().$ !== this.editor.element.$) {
                selectedContainer = selectedContainer.getParent();
            }

            Component.prepareDataModel(componentData => {

                let lastContentContainer = null;

                const eventData = {
                    clientId: this.clientId,
                    component: componentData
                };

                if (selection.startOffset === 0 && !selectedContainer.hasPrevious()) {

                    eventData.placement = 'before';

                } else if (selection.startOffset === 0 && selectedContainer.hasPrevious()) {

                    eventData.placement = 'split';
                    lastContentContainer = selectedContainer.getPrevious();

                } else if (selectedContainer.hasNext()) {

                    eventData.placement = 'split';
                    lastContentContainer = selectedContainer;

                } else {
                    eventData.placement = 'after';
                }

                if (lastContentContainer) {

                    const contentCutContainers = [];
                    const contentContainers = [lastContentContainer];
                    let currentContainer = lastContentContainer;

                    while (currentContainer.hasPrevious()) {
                        currentContainer = currentContainer.getPrevious();
                        contentContainers.push(currentContainer);
                    }

                    currentContainer = lastContentContainer;

                    while (currentContainer.hasNext()) {
                        currentContainer = currentContainer.getNext();
                        contentCutContainers.push(currentContainer);
                    }

                    eventData.content = contentContainers.reverse().filter(
                        container => container.getText().trim()
                    ).map(
                        container => container.getOuterHtml()
                    ).join('').trim();

                    eventData.contentCut = contentCutContainers.filter(
                        container => container.getText().trim()
                    ).map(
                        container => container.getOuterHtml()
                    ).join('').trim();

                }

                this.$emit('insertComponent', eventData);

            });

        }

    }

};
</script>

<style lang="scss">
.ck_add_components .cke_combo_text {
    width: auto;
}
</style>

<style lang="scss" scoped>
.htmlInputType1:not(:last-child) {
    margin-bottom: em(15,16);
    border: 0;
}
</style>

