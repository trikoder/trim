<template>
    <button type="button"
        v-on:click.prevent="runAction"
        v-bind:class="classAttribute"
        v-bind:style="styleAttribute"
        v-bind="attributes"
        v-html="content"
    ></button>
</template>

<script>

import base from './base';
import {pascal as pascalCase} from 'to-case';

export default {

    mixins: [base],

    props: {
        action: {type: Function, required: true},
        mapTo: {type: [String, Function], required: false},
        escapeHtml: {type: Boolean, default: true},
        limitCharacters: {type: [Boolean, Number], default: false},
        limitWords: {type: [Boolean, Number], default: false},
        stripTags: {type: Boolean, default: false},
        collectionDelimiter: {type: String, default: ', '},
        ifEmpty: {type: [String, Function], default: ''},
        useIcon: {type: [String, Boolean], default: false}
    },

    data: () => ({
        defaultClass: 'nBtn listElementButton'
    }),

    computed: {

        content() {
            return this.formatModelValue();
        },

        classAttribute() {

            return this.useIcon
                ? ['icon' + pascalCase(this.useIcon), 'nBtn icr listElementIconButton'].join(' ')
                : this.attributes.class || this.defaultClass
            ;

        }

    },

    methods: {

        runAction() {

            this.action(this.resourceModel);

        },

        getModelValue() {

            return this.mapTo ? base.methods.getModelValue.call(this) : this.caption;

        }

    },

    getType: () => 'button'

};

</script>

<style lang="scss" scoped>

    .listElementButton {

        font-size: 1.2em; display: inline-block; white-space: nowrap;
        padding: 0.4em 0.8em;
        background-color: #fff; border:1px solid rgba(#000, 0.2);
        border-radius: 0.3em; color: $colorGrayDark2; letter-spacing: 0.02em;

        @include hover { color: $colorMain1; }

    }

    .listElementIconButton {

        color: $colorGrayDark1;

        &:before {

            font-size: 1.4em;

        }

        @include hover { color: $colorMain1; }

    }

</style>
