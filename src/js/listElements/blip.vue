<template>
    <span
        :class="[classAttribute, value ? 'active': 'inactive']"
        :style="styleAttribute"
        :title="titleAttribute"
        v-bind="attributes"
    ></span>
</template>

<script>

import base from './base';
import {find} from '../library/toolkit';

export default {

    elementType: 'blip',

    mixins: [base],

    props: {
        states: {type: [Array]}
    },

    data: () => ({
        defaultClass: 'blip'
    }),

    computed: {

        value() {
            return this.getModelValue();
        },

        currentState() {

            return this.states && find(this.states, state => state.value === this.value);

        },

        styleAttribute() {

            return this.currentState ? {backgroundColor: this.currentState.color} : undefined;

        },

        titleAttribute() {

            return this.currentState ? this.currentState.caption : undefined;

        }

    }

};

</script>

<style lang="scss" scoped>

    .blip {

        width: 0.8em; height: 0.8em; text-indent: -9999em; background: #ccc;
        display: block; border-radius: 50%;

        &.active {

            background: #65ac68;

        }

        &.inactive {

            background: #da5050;

        }

    }

</style>
