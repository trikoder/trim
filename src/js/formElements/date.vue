<template>
    <element-wrapper :renderInputWrapper="false" v-bind="elementWrapperProps">
        <date-pick
            v-bind="inputWrapperAttributes"
            :format="format"
            :displayFormat="displayFormat"
            :inputAttributes="dateInputAttributes"
            :isDateDisabled="isDateDisabled"
            :weekdays="weekdays"
            :months="months"
            :parseDate="parseDate"
            :formatDate="formatDate"
            :pickTime="pickTime"
            :pickMinutes="pickMinutes"
            :pickSeconds="pickSeconds"
            :selectableYearRange="selectableYearRange"
            :startPeriod="startPeriod"
            :use12HourClock="use12HourClock"
            :startWeekOnSunday="startWeekOnSunday"
            :prevMonthCaption="prevMonthCaption"
            :nextMonthCaption="nextMonthCaption"
            :setTimeCaption="setTimeCaption"
            :modelValue="modelValue"
            :editable="isInteractive"
            @update:modelValue="processInputEvent"
        ></date-pick>
    </element-wrapper>
</template>

<script>

import base from './base.vue';
import translate from '../library/translate.js';
import ElementWrapper from './elementWrapper.vue';
import DatePick from '../dependencies/vue-date-pick/index.vue';

export default {

    elementType: 'date',

    components: {ElementWrapper, DatePick},

    mixins: [base],

    props: {
        modelValue: {type: String, default: ''},
        format: {type: String, default: 'YYYY-MM-DD'},
        displayFormat: {type: String, default: 'DD.MM.YYYY'},
        isDateDisabled: {type: Function},
        pickTime: {type: Boolean, default: false},
        pickMinutes: {type: Boolean, default: true},
        pickSeconds: {type: Boolean, default: true},
        parseDate: {type: Function},
        formatDate: {type: Function},
        selectableYearRange: [Number, Object, Function],
        startPeriod: Object,
        use12HourClock: Boolean,
        startWeekOnSunday: Boolean,
        nextMonthCaption: {type: String, default: () => translate('calendar.nextMonthCaption')},
        prevMonthCaption: {type: String, default: () => translate('calendar.prevMonthCaption')},
        setTimeCaption: {type: String, default: () => translate('calendar.setTimeCaption')}
    },

    computed: {

        dateInputAttributes() {

            return this.normalizeAttributes(
                this.inputAttributes, {readonly: true}
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

            this.$emit('update:modelValue', value);

        }

    }

};
</script>

<style lang="scss">
    @import '../dependencies/vue-date-pick/index.scss';

    .vdpComponent {

        .inputType1 {

            appearance: none;
            font-size: 1.6em; padding: em(8,16);
            background-color: #fff; border: 1px solid $colorGrayLight2; border-radius: em(4,14);

            &.fullWidth {
                width: 100%;
            }

            &.fontBold {
                @include fontSansCondensedBold;
            }

            @include mediaMinWidth($breakpointMedium) {
                font-size: 1.4em; padding: em(8,14);
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

    }

</style>
