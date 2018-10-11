<template>
    <nav class="sort sortType1" v-if="options.length > 0">
        <div class="inner">
            <div class="select">
                <button type="button"><span>{{ translations.buttonText }}</span>{{ selectedSortLabel }}</button>
                <select v-bind:value="selectedSort" v-on:change="$emit('sortRequest', $event.target.value)">
                    <option
                        v-for="(option, index) in options"
                        v-bind:key="index"
                        v-bind:value="option.field"
                    >{{ option.label }}</option>
                </select>
            </div>
        </div>
    </nav>
</template>

<script>

import translate from '../library/translate';
import {find} from '../library/toolkit';

export default {

    props: {
        currentSort: String,
        options: Array
    },

    data: () => ({
        translations: {
            buttonText: translate('resourceSort.caption')
        }
    }),

    computed: {

        selectedSort() {

            return this.currentSort || (this.options.length > 0 && this.options[0].field);

        },

        selectedSortLabel() {

            const selectedOption = find(this.options, option => option.field === this.selectedSort);
            return selectedOption ? selectedOption.label : '';

        }

    }

};

</script>

<style lang="scss" scoped>

    .sortType1 {

        display: inline-block; opacity: 0.5;

        &:hover { opacity: 1; }

        .select {

            display: inline-block; position: relative;

            &:before {

                @include iconFont($iconFontName);
                @include iconElementGraphic(30, 30);

                content: map-get($icons, 'chevronDown'); left: auto; right: 0; font-size: 1.2em;
                color: $colorGrayDark2; text-align: right;

            }

            > button {

                @include normalizeButton;

                font-size: 1.4em; padding: em(8,14) em(15,14) em(8,14) em(5,14); letter-spacing: 0.02em;
                color: $colorGrayDark1;

                > span {

                    opacity: 0.7;

                    &:after { content: ": "; }

                }

            }

            > select {

                position: absolute; left: 0; top: 0; width: 100%; height: 100%;
                cursor: pointer; opacity: 0; font-size: 1.6em;

            }

        }

    }

</style>
