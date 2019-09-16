<template>
    <element-wrapper v-bind="elementWrapperProps">
        <template v-for="componentConfig in value">
            <html-editor
                v-if="componentConfig.type === 'html'"
                v-bind="componentConfig"
                :inputAttributes="sanitizedInputAttributes"
                :editorConfig="editorConfig"
                :key="componentConfig.clientId"
                :components="components"
                @updateContent="updateComponent"
                @insertComponent="insertComponent"
            ></html-editor>
            <component
                v-else
                v-bind="componentConfig"
                :is="getComponent(componentConfig)"
                :key="componentConfig.clientId"
                @updateComponent="updateComponent"
                @deleteComponent="deleteComponent"
            ></component>
        </template>
    </element-wrapper>
</template>

<script>

import base from '../base';
import ElementWrapper from '../elementWrapper';
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

            const prepComponent = component => Object.assign({
                clientId: clientId()
            }, component);

            const value = this.value.reduce((acc, config) => {

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

            this.$emit('input', this.normalize(value));

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

        }

    }

};
</script>

<style lang="scss">
.htmlComponentsType1 {
    @include clearfix;
}
</style>
