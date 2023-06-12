<template>
    <!-- eslint-disable vue/no-mutating-props -->
    <div class="region">
        <div class="regionInner">
            <template v-for="(config, key) in layout">
                <group
                    v-if="config.isGroup"
                    :layout="config"
                    :formData="formData"
                    :visible="visible"
                    :key="key"
                    :ref="key"
                ></group>
                <component
                    v-if="key === 'fields'"
                    v-for="field in config"
                    :is="toRawComponentProps(field.Type)"
                    v-bind="field.options"
                    v-model="formData[field.options.name]"
                    :visible="isFieldVisible(field)"
                    :key="field.options.name"
                    :ref="field.options.name"
                ></component>
            </template>
        </div>
    </div>
</template>

<script>

import Group from './group.vue';

export default {

    components: {Group},

    props: {
        formData: {type: Object, required: true},
        layout: {type: Object, required: true},
        visible: {type: Boolean, default: true}
    },

    methods: {

        isFieldVisible(field) {

            return !this.visible ? false : field.options.visible;

        }

    }

};

</script>
