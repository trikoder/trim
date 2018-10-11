<template>
    <div class="region">
        <div class="regionInner">
            <template v-for="(config, key) in layout">
                <group
                    v-if="config.isGroup"
                    v-bind:layout="config"
                    v-bind:formData="formData"
                    v-bind:visible="visible"
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
    </div>
</template>

<script>

import Group from './group';

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
