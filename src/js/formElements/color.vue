<template>
    <text-form-element v-bind="$props" @input="$emit('update:modelValue', $event)">
        <template v-slot:inputWrapperEnd>
            <div class="colorPreview" :style="{
                backgroundColor: modelValue,
                opacity: isValidColor ? 1 : 0
            }"></div>
          </template>
    </text-form-element>
</template>

<script>
import base from './base.vue';
import TextFormElement from './text.vue';

export default {

    elementType: 'color',

    components: {TextFormElement},

    mixins: [base],

    props: {
        modelValue: {type: String, default: ''}
    },

    computed: {

        isValidColor() {

            const testEl = document.createElement('div');
            testEl.style.color = this.modelValue;
            return Boolean(testEl.style.color);

        }

    }

};
</script>

<style lang="scss">

    @use '../../scss/library/all' as *;

    .colorInputType1 {

        position: relative;

        > .colorPreview {

            width: 1em; height: 1em; margin-top: -0.5em;
            position: absolute; right: 1em; top: 50%;
            border-radius: 50%; box-shadow: 0 0.1em 0.3em rgba(#000, 0.15);
            transition: background-color 0.3s, opacity 0.3s;

        }

    }

</style>
