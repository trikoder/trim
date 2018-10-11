<template>
    <input
        type="hidden"
        v-bind="inputAttributes"
        v-bind:id="elementId"
        v-bind:name="name"
        v-bind:disabled="readOnly"
        v-bind:value="value"
    >
</template>

<script>

import base from './base';
import Vue from 'vue';
import {assign} from '../library/toolkit';

const Component = Vue.extend({

    mixins: [base],

    props: {
        value: {default: ''}
    }

});

assign(Component, {

    getElementType: () => 'hidden',

    getDefaultValue: (options = {}) => options.value || ''

});

export default Component;

</script>
