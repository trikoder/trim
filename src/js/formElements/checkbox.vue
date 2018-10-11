<template>
    <element-wrapper v-bind="elementWrapperProps">
        <input
            type="checkbox"
            v-bind="inputAttributes"
            v-bind:id="elementId"
            v-bind:name="name"
            v-bind:disabled="readOnly"
            v-bind:checked="value === valueMap.checked"
            v-on:input="processInputEvent"
        >
        <label class="icr iconCheck" v-bind:for="elementId"></label>
    </element-wrapper>
</template>

<script>

import base from './base';
import Vue from 'vue';
import ElementWrapper from './elementWrapper';
import {assign} from '../library/toolkit';

const Component = Vue.extend({

    components: {ElementWrapper},

    mixins: [base],

    props: {
        value: {type: [String, Boolean], default: false},
        valueMap: {type: Object, default: () => ({checked: true, unchecked: false})}
    },

    methods: {

        processInputEvent(e) {
            this.$emit('input', this.valueMap[e.target.checked ? 'checked' : 'unchecked']);
        }

    }

});

assign(Component, {

    getElementType: () => 'checkbox',

    getDefaultValue(options = {}) {

        if (options.value) {
            return options.value;
        } else if (options.valueMap) {
            return options.valueMap.unchecked;
        } else {
            return false;
        }

    }

});

export default Component;

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
