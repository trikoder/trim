<template>
    <!-- eslint-disable vue/no-mutating-props -->
    <div class="tabPanelType1 tabPanel" :class="{editLayoutRegions: layout.hasRegions, selected}">
        <template v-for="(config, key) in layout">
            <region
                v-if="config.isRegion"
                :class="key"
                :layout="config"
                :formData="formData"
                :visible="selected"
                :key="key"
                :ref="key"
            ></region>
            <group
                v-if="config.isGroup"
                :layout="config"
                :formData="formData"
                :visible="selected"
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
</template>

<script>

import Region from './region.vue';
import Group from './group.vue';

export default {

    components: {Region, Group},

    props: {
        formData: {type: Object, required: true},
        layout: {type: Object, required: true},
        selected: {type: Boolean, required: true}
    },

    methods: {

        isFieldVisible(field) {

            return !this.selected ? false : field.options.visible;

        }

    }

};

</script>
