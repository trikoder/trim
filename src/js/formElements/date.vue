<template>
    <element-wrapper v-bind:renderInputWrapper="false" v-bind="elementWrapperProps">
        <calendar
            v-bind="inputWrapperAttributes"
            v-bind:format="format"
            v-bind:displayFormat="displayFormat"
            v-bind:inputAttributes="inputAttributes"
            v-bind:isDateDisabled="isDateDisabled"
            v-bind:weekdays="weekdays"
            v-bind:months="months"
            v-bind:parseDate="parseDate"
            v-bind:formatDate="formatDate"
            v-bind:pickTime="pickTime"
            v-bind:pickMinutes="pickMinutes"
            v-bind:pickSeconds="pickSeconds"
            v-bind:prevMonthCaption="prevMonthCaption"
            v-bind:nextMonthCaption="nextMonthCaption"
            v-bind:setTimeCaption="setTimeCaption"
            v-bind:value="value"
            v-on:input="processInputEvent"
        ></calendar>
    </element-wrapper>
</template>

<script>

import base from './base';
import Vue from 'vue';
import translate from '../library/translate';
import {assign} from '../library/toolkit';
import ElementWrapper from './elementWrapper';
import Calendar from '../components/calendar';

const Component = Vue.extend({

    components: {ElementWrapper, Calendar},

    mixins: [base],

    props: {
        value: {type: String, default: ''},
        format: {type: String, default: 'YYYY-MM-DD'},
        displayFormat: {type: String, default: 'DD.MM.YYYY'},
        isDateDisabled: {type: Function},
        pickTime: {type: Boolean, default: false},
        pickMinutes: {type: Boolean, default: true},
        pickSeconds: {type: Boolean, default: true},
        parseDate: {type: Function},
        formatDate: {type: Function},
        nextMonthCaption: {type: String, default: () => translate('calendar.nextMonthCaption')},
        prevMonthCaption: {type: String, default: () => translate('calendar.prevMonthCaption')},
        setTimeCaption: {type: String, default: () => translate('calendar.setTimeCaption')}
    },

    computed: {

        inputAttributes() {

            return this.normalizeAttributes(
                this.attributes.input, {id: this.elementId, readonly: true}
            );

        },

        weekdays() {

            return [
                'monday', 'tuesday', 'wednesday', 'thursday',
                'friday', 'saturday', 'sunday'
            ].map(key => translate('calendar.dayAbbreviations.' + key));

        },

        months() {

            return [
                'january', 'february', 'march', 'april',
                'may', 'june', 'july', 'august',
                'september', 'october', 'november', 'december'
            ].map(key => translate('calendar.months.' + key));

        }

    },

    methods: {

        processInputEvent(value) {

            this.$emit('input', value);

        }

    }

});

assign(Component, {

    getElementType: () => 'date',

    getDefaultValue: (options = {}) => options.value || ''

});

export default Component;

</script>

<style lang="scss" scoped>

    .scComponent /deep/ {

        .inputType1 {

            appearance: none;
            font-size: 1.4em; padding: em(8,14);
            background-color: #fff; border: 1px solid $colorGrayLight2; border-radius: em(4,14);

            &.fullWidth {
                width: 100%;
            }

            &.fontBold {
                @include fontSansCondensedBold;
            }

        }

        .inputType2 {

            appearance: none;
            transition: border-color 0.2s;
            @include fontSans;

            font-size: 1.6em; padding: em(10,16) 0; line-height: 1.4;
            background-color: transparent; border: 0; border-bottom: 1px solid $colorGrayLight2;

            &.withError, .formElementWithError & {
                border-bottom-color: $colorError;
            }

            &.size1 {
                font-size: 2.4em;
            }

            &.size2 {
                font-size: 3em; padding: em(10,30) 0;
            }

            &:focus {
                border-bottom-color: $colorMain1;
            }

            &.fontBold {
                letter-spacing: -0.01em;
                @include fontSansBold;
            }

        }

        .scArrowPrev:after {

            border-right-color: $colorMain1;

        }

        .scArrowNext:after {

            border-left-color: $colorMain1;

        }

        .scCell.selectable:hover .scCellContent,
        .scCell.selected .scCellContent {

            background: $colorMain1;

        }

        .scCell.today {

            color: $colorMain1;

        }

        .scTimeUnit > input:hover,
        .scTimeUnit > input:focus {

            border-bottom-color: $colorMain1;

        }

    }

</style>
