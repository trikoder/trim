<template>
    <!-- eslint-disable vue/no-mutating-props -->
    <div class="editLayoutGroup" :class="[{collapsed}, layout.class]">
        <component
            v-for="field in layout.fields"
            :is="toComponent(field.Type)"
            v-bind="field.options"
            v-model="formData[field.options.name]"
            :visible="isFieldVisible(field)"
            :key="field.options.name"
            :ref="field.options.name"
        ></component>
    </div>
</template>

<script>

import {reduce} from '../../library/toolkit.js';

export default {

    props: {
        formData: {type: Object, required: true},
        layout: {type: Object, required: true},
        visible: {type: Boolean, default: true}
    },

    computed: {

        collapsed() {

            return reduce(this.layout.fields, (visibles, field) => {

                visibles.push(this.isFieldVisible(field));
                return visibles;

            }, []).every(item => item === false);

        }

    },

    methods: {

        isFieldVisible(field) {

            return !this.visible ? false : field.options.visible;

        }

    }

};

</script>
