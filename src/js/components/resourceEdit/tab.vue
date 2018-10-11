<template>
    <div class="tabPanelType1 tabPanel" v-bind:class="{editLayoutRegions: layout.hasRegions, selected}">
        <template v-for="(config, key) in layout">
            <region
                v-if="config.isRegion"
                v-bind:class="key"
                v-bind:layout="config"
                v-bind:formData="formData"
                v-bind:visible="selected"
                v-bind:key="key"
                v-bind:ref="key"
            ></region>
            <group
                v-if="config.isGroup"
                v-bind:layout="config"
                v-bind:formData="formData"
                v-bind:visible="selected"
                v-bind:key="key"
                v-bind:ref="key"
            ></group>
            <component
                v-if="key === 'fields'"
                v-for="field in config"
                v-bind:is="field.Type"
                v-bind="field.options"
                v-model="formData[field.options.name]"
                v-bind:visible="isFieldVisible(field)"
                v-bind:key="field.options.name"
                v-bind:ref="field.options.name"
            ></component>
        </template>
    </div>
</template>

<script>

import Region from './region';
import Group from './group';

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
