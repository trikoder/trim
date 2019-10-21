<template>
    <element-wrapper :renderInputWrapper="false" v-bind="elementWrapperProps">
        <div v-bind="inputWrapperAttributes" ref="inputWrapper">
            <template v-for="componentConfig in value">
                <html-editor
                    v-if="componentConfig.type === 'html'"
                    v-bind="componentConfig"
                    :inputAttributes="sanitizedInputAttributes"
                    :editorConfig="editorConfig"
                    :key="componentConfig.clientId"
                    :components="components"
                    ref="componentInstances"
                    @updateContent="updateComponent"
                    @insertComponent="insertComponent"
                ></html-editor>
                <component
                    v-else
                    v-bind="componentConfig"
                    :is="getComponent(componentConfig)"
                    :key="componentConfig.clientId"
                    ref="componentInstances"
                    class="htmlCustomComponent"
                    @updateComponent="updateComponent"
                    @deleteComponent="deleteComponent"
                ></component>
            </template>
        </div>
    </element-wrapper>
</template>

<script>

import base from '../base';
import ElementWrapper from '../elementWrapper';
import {elementIndex} from '../../library/toolkit';
import HtmlEditor from './html';

let instanceCounter = 0;
const clientId = () => (Date.now() + (++instanceCounter)).toString();

export default {

    elementType: 'htmlComponents',

    components: {ElementWrapper, HtmlEditor},

    mixins: [base],

    props: {
        value: {
            type: Array,
            default: () => ([{
                clientId: clientId(),
                type: 'html',
                content: ''
            }])
        },
        components: {
            type: Array,
            default: () => ([])
        },
        editorConfig: {
            type: Object
        }
    },

    computed: {

        sanitizedInputAttributes() {

            const attributes = Object.assign({}, this.inputAttributes);
            ['id', 'name'].forEach(
                attribute => delete attributes[attribute]
            );
            return attributes;

        }

    },

    mounted() {

        const unWatch = this.$watch('value', components => {

            if (components.length > 1) {
                this.$nextTick(() => {
                    this.setupDragAndDrop();
                    unWatch();
                });
            }

        }, {immediate: true});

    },

    beforeDestroy() {

        if (this.drake) {
            this.drake.destroy();
        }

    },

    methods: {

        getComponent(config) {

            return this.components.find(Component => {
                return Component.componentType === config.type;
            });

        },

        updateComponent(updatedConfig) {

            this.$emit('input', this.value.map(config => {

                return config.clientId === updatedConfig.clientId
                    ? Object.assign({}, config, updatedConfig)
                    : config
                ;

            }));

        },

        insertComponent(event) {

            this.$emit('input', this.normalize(
                this.prepInsert(this.value, event)
            ));

        },

        prepInsert(components, event) {

            const prepComponent = component => Object.assign({
                clientId: clientId()
            }, component);

            return components.reduce((acc, config) => {

                if (config.clientId === event.clientId) {

                    if (event.placement === 'after') {

                        acc.push(config);
                        acc.push(prepComponent(event.component));

                    } else if (event.placement === 'before') {

                        acc.push(prepComponent(event.component));
                        acc.push(config);

                    } else if (event.placement === 'split') {

                        acc.push(Object.assign({}, config, {content: event.content}));
                        acc.push(prepComponent(event.component));

                        if (event.contentCut) {
                            acc.push({
                                clientId: clientId(),
                                type: 'html',
                                content: event.contentCut
                            });
                        }
                    }

                } else {
                    acc.push(config);
                }
                return acc;

            }, []);

        },

        deleteComponent(clientId) {

            this.$emit('input', this.normalize(
                this.value.filter(config => config.clientId !== clientId)
            ));

        },

        normalize(components) {

            const normalizedComponents = components.reduce((acc, config) => {

                const size = acc.length;
                const prevConfig = size >= 1 ? acc[size - 1] : null;

                // remove emtpy html editors
                // if (config.type === 'html' && !config.content.trim()) {
                //     return acc;
                // }

                if (config.type === 'html' && prevConfig && prevConfig.type === 'html') {
                    // merge current component content into prev component
                    acc[size - 1] = Object.assign({}, prevConfig, {
                        content: prevConfig.content + config.content
                    });
                } else {
                    acc.push(config);
                }

                return acc;

            }, []);

            const size = normalizedComponents.length;

            // ensure last component is html
            if (size === 0 || normalizedComponents[size - 1].type !== 'html') {
                normalizedComponents.push({
                    clientId: clientId(),
                    type: 'html',
                    content: ''
                });
            }

            return normalizedComponents;

        },

        setupDragAndDrop() {

            const inputWrapper = this.$refs.inputWrapper;

            import('dragula').then(({default: dragula}) => {

                this.drake = dragula([inputWrapper], {
                    isContainer: el => {

                        const isEditor = Boolean(el.getAttribute('contenteditable'));
                        const isInputWrapper = el === inputWrapper;
                        return isEditor || isInputWrapper;

                    },
                    moves: (el, source, handle, sibling) => {

                        const isSortHandle = Boolean(handle.getAttribute('data-sort-handle'));
                        const isInside = inputWrapper.contains(handle);
                        return isSortHandle && isInside;

                    },
                    mirrorContainer: inputWrapper,
                    direction: 'vertical'
                });

                this.drake.on('drop', (el, target, source, sibling) => {

                    let components = this.value;

                    if (target.getAttribute('contenteditable')) { // droped inside html editor

                        this.drake.cancel(() => false);

                        const droppedComponent = this.getComponentByEl(el);
                        const htmlComponent = this.getComponentByEl(target);
                        const droppedComponentConfig = components.find(
                            component => component.clientId === droppedComponent.clientId
                        );
                        let placement;
                        let content;
                        let contentCut;

                        // remove dropped component to insert it later
                        components = components.filter(
                            component => component.clientId !== droppedComponent.clientId
                        );

                        if (sibling) { // somewhere inside
                            const blockIndex = elementIndex(sibling);
                            if (blockIndex === 0) {
                                placement = 'before';
                            } else {
                                placement = 'split';
                                [content, contentCut] = htmlComponent.splitContentByIndex(blockIndex);
                            }
                        } else { // last position
                            placement = 'after';
                        }

                        components = this.prepInsert(components, {
                            clientId: htmlComponent.clientId,
                            component: droppedComponentConfig,
                            placement,
                            content,
                            contentCut
                        });

                    } else {

                        components.sort((config1, config2) => {
                            const index1 = this.getComponentDomIndex(config1.clientId);
                            const index2 = this.getComponentDomIndex(config2.clientId);
                            return index1 - index2;
                        });

                    }

                    this.$emit('input', this.normalize(components));

                });

            });

        },

        getComponentByEl(el) {

            return this.$refs.componentInstances.find(
                instance => instance.$el === el
            );

        },

        getComponentDomIndex(clientId) {

            const component = this.$refs.componentInstances.find(
                instance => instance.clientId === clientId
            );

            return elementIndex(component.$el);

        }

    }

};
</script>

<style lang="scss">
.htmlComponentsType1 {
    @include clearfix;
}
.htmlInputType1 > .htmlCustomComponent {
    font-size: em(10,16);
}

.htmlComponentsType1 .htmlInputType1:last-child {
    margin-bottom: 0;
}
</style>
