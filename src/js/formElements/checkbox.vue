<template>
    <element-wrapper v-bind="elementWrapperProps">
        <input
            type="checkbox"
            v-bind="inputAttributes"
            :checked="value === valueMap.checked"
            :disabled="!isInteractive"
            @input="processInputEvent"
        >
        <label class="icr iconCheck" :for="inputAttributes.id"></label>
    </element-wrapper>
</template>

<script>
import base from './base.vue';
import ElementWrapper from './elementWrapper.vue';

export default {

    elementType: 'checkbox',

    components: {ElementWrapper},

    mixins: [base],

    props: {
        value: {type: [String, Boolean], default: false},
        valueMap: {type: Object, default: () => ({checked: true, unchecked: false})}
    },

    getInitialValue(options = {}) {

        if (typeof options.value !== 'undefined') {
            return options.value;
        } else if (options.valueMap) {
            return options.valueMap.unchecked;
        } else {
            return false;
        }

    },

    methods: {

        processInputEvent(e) {
            this.$emit('input', this.valueMap[e.target.checked ? 'checked' : 'unchecked']);
        }

    }

};
</script>

<style lang="scss">

    .checkboxType1 {

        position: absolute; left: -999em;

        + label {

            position: relative; width: 3em; height: 3em; display: inline-block;

            &:after {

                content: "";
                position: absolute; left: 50%; top: 50%; box-sizing: border-box;
                width: 1.5em; height: 1.5em; margin: -0.75em 0 0 -0.75em;
                background-color: #fff; border: 1px solid rgba(#000, 0.2); border-radius: 0.2em;

            }

            &:before {

                display: none; z-index: 10; color: $colorMain1; font-size: 1.1em; left: em(1,11);

            }

        }

        &:checked {

            + label:after {

                box-shadow: 0 0.1em 0.3em rgba(#000, 0.06);

            }

            + label:before {

                animation: slideDownFadeIn 0.2s;
                display: block;

            }

        }

    }

</style>
