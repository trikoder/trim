<template>
    <div class="editLayoutGroup" v-bind:class="[{collapsed}, layout.class]">
        <component
            v-for="field in layout.fields"
            v-bind:is="field.Type"
            v-bind="field.options"
            v-model="formData[field.options.name]"
            v-bind:visible="isFieldVisible(field)"
            v-bind:key="field.options.name"
            v-bind:ref="field.options.name"
        ></component>
    </div>
</template>

<script>

import {reduce} from '../../library/toolkit';

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
