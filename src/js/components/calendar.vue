<template>
    <div class="scComponent" v-bind:class="{scWithInput: inputBound}">
        <input
            v-if="inputBound"
            type="text"
            v-bind="inputAttributes"
            v-model="inputValue"
            v-on:focus="open"
            v-on:click="open"
        >
        <button
            v-if="inputBound && inputValue"
            class="scClearInput"
            type="button"
            v-on:click="clear"
        ></button>
        <transition name="toggle-calendar">
            <div v-if="opened" class="scOuterWrap" ref="outerWrap" v-on:click="closeViaOverlay" v-bind:class="[positionClass, {scFloating: inputBound}]">
                <div class="scInnerWrap">
                    <header class="scHeader">
                        <button
                            class="scArrow scArrowPrev"
                            v-bind:title="prevMonthCaption"
                            type="button"
                            v-on:click="incrementMonth(-1)"
                        >{{ prevMonthCaption }}</button>
                        <button
                            class="scArrow scArrowNext"
                            type="button"
                            v-bind:title="nextMonthCaption"
                            v-on:click="incrementMonth(1)"
                        >{{ nextMonthCaption }}</button>
                        <div class="scPeriodControls">
                            <div class="scPeriodControl">
                                <button v-bind:class="directionClass" v-bind:key="currentPeriod.month" type="button">
                                    {{ months[currentPeriod.month] }}
                                </button>
                                <select v-model="currentPeriod.month">
                                    <option v-for="(month, index) in months" v-bind:value="index" v-bind:key="month">
                                        {{ month }}
                                    </option>
                                </select>
                            </div>
                            <div class="scPeriodControl">
                                <button v-bind:class="directionClass" v-bind:key="currentPeriod.year" type="button">
                                    {{ currentPeriod.year }}
                                </button>
                                <select v-model="currentPeriod.year">
                                    <option v-for="year in yearRange" v-bind:value="year" v-bind:key="year">
                                        {{ year }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </header>
                    <table class="scTable">
                        <thead>
                            <tr>
                                <th class="scHeadCell" v-for="weekday in weekdays" v-bind:key="weekday">
                                    <span class="scHeadCellContent">{{weekday}}</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            v-bind:key="currentPeriod.year + '-' + currentPeriod.month"
                            v-bind:class="directionClass"
                        >
                            <tr class="scRow" v-for="(week, weekIndex) in currentPeriodDates" v-bind:key="weekIndex">
                                <td
                                    class="scCell"
                                    v-for="(item, itemIndex) in week"
                                    v-bind:class="{
                                        selectable: !item.disabled,
                                        selected: item.selected,
                                        disabled: item.disabled,
                                        today: item.today,
                                        outOfRange: item.outOfRange
                                    }"
                                    v-bind:key="itemIndex"
                                    v-on:click="selectDateItem(item)"
                                >
                                    <div
                                        class="scCellContent"
                                    >{{ item.date.getDate() }}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="pickTime && currentTime" class="scTimeControls">
                        <span class="scTimeCaption">{{ setTimeCaption }}</span>
                        <div class="scTimeUnit">
                            <pre><span>{{ currentTime.hoursPadded }}</span><br></pre>
                            <input
                                type="number" pattern="\d*"
                                v-on:input.prevent="inputTime('hours', $event)"
                                v-bind:value="currentTime.hoursPadded"
                            >
                        </div>
                        <span v-if="pickMinutes" class="scTimeSeparator">:</span>
                        <div v-if="pickMinutes" class="scTimeUnit">
                            <pre><span>{{ currentTime.minutesPadded }}</span><br></pre>
                            <input
                                v-if="pickMinutes"
                                type="number" pattern="\d*"
                                v-on:input="inputTime('minutes', $event)"
                                v-bind:value="currentTime.minutesPadded"
                            >
                        </div>
                        <span v-if="pickSeconds" class="scTimeSeparator">:</span>
                        <div v-if="pickSeconds" class="scTimeUnit">
                            <pre><span>{{ currentTime.secondsPadded }}</span><br></pre>
                            <input
                                v-if="pickSeconds"
                                type="number" pattern="\d*"
                                v-on:input="inputTime('seconds', $event)"
                                v-bind:value="currentTime.secondsPadded"
                            >
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

export default {

    props: {
        value: {type: String, default: ''},
        format: {type: String, default: 'YYYY-MM-DD'},
        displayFormat: {type: String},
        inputBound: {type: Boolean, default: true},
        inputAttributes: {type: Object, default: () => ({class: 'scValueInput'})},
        selectableYearRange: {type: Number, default: 6},
        parseDate: {type: Function},
        formatDate: {type: Function},
        pickTime: {type: Boolean, default: false},
        pickMinutes: {type: Boolean, default: true},
        pickSeconds: {type: Boolean, default: true},
        isDateDisabled: {type: Function, default: () => false},
        nextMonthCaption: {type: String, default: 'Next month'},
        prevMonthCaption: {type: String, default: 'Previous month'},
        setTimeCaption: {type: String, default: 'Set time:'},
        mobileBreakpointWidth: {type: Number, default: 500},
        weekdays: {
            type: Array,
            default: () => ([
                'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
            ])
        },
        months: {
            type: Array,
            default: () => ([
                'January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'
            ])
        }
    },

    data() {
        return {
            inputValue: '',
            currentPeriod: this.getPeriodFromValue(this.value, this.format),
            direction: undefined,
            positionClass: undefined,
            opened: !this.inputBound
        };
    },

    computed: {

        currentPeriodDates() {

            const {year, month} = this.currentPeriod;
            const days = [];
            const date = new Date(year, month, 1);
            const today = new Date();
            const selectedDate = this.value
                ? this.parseDateString(this.value, this.format)
                : undefined
            ;

            // append prev month dates
            const startDay = date.getDay() || 7;

            if (startDay > 1) {
                for (let i = startDay - 2; i >= 0; i--) {

                    const prevDate = new Date(date);
                    prevDate.setDate(-i);
                    days.push({outOfRange: true, date: prevDate});

                }
            }

            while (date.getMonth() === month) {
                days.push({date: new Date(date)});
                date.setDate(date.getDate() + 1);
            }

            // append next month dates
            const daysLeft = 7 - days.length % 7;

            for (let i = 1; i <= daysLeft; i++) {

                const nextDate = new Date(date);
                nextDate.setDate(i);
                days.push({outOfRange: true, date: nextDate});

            }

            // define day states
            days.forEach(day => {
                day.disabled = this.isDateDisabled(day.date);
                day.today = areSameDates(day.date, today);
                day.selected = selectedDate ? areSameDates(day.date, selectedDate) : false;
            });

            return chunkArray(days, 7);

        },

        yearRange() {

            const years = [];
            const currentYear = this.currentPeriod.year;
            const startYear = currentYear - this.selectableYearRange;
            const endYear = currentYear + this.selectableYearRange;

            for (let i = startYear; i <= endYear; i++) {
                years.push(i);
            }

            return years;

        },

        currentTime() {

            const currentDate = this.parseDateString(this.value, this.format);

            return currentDate ? {
                hours: currentDate.getHours(),
                minutes: currentDate.getMinutes(),
                seconds: currentDate.getSeconds(),
                hoursPadded: paddNum(currentDate.getHours(), 1),
                minutesPadded: paddNum(currentDate.getMinutes(), 2),
                secondsPadded: paddNum(currentDate.getSeconds(), 2)
            } : undefined;

        },

        directionClass() {

            return this.direction ? `sc${this.direction}Direction` : undefined;

        }

    },

    watch: {

        value: {
            handler(value) {

                this.inputValue = this.formatDateToString(
                    this.parseDateString(value, this.format), this.displayFormat || this.format
                );

            },
            immediate: true
        },

        currentPeriod(currentPeriod, oldPeriod) {

            const currentDate = new Date(currentPeriod.year, currentPeriod.month).getTime();
            const oldDate = new Date(oldPeriod.year, oldPeriod.month).getTime();

            this.direction = currentDate !== oldDate
                ? (currentDate > oldDate ? 'Next' : 'Prev')
                : undefined
            ;

        }

    },

    beforeDestroy() {

        this.removeCloseEvents();
        this.teardownPosition();

    },

    methods: {

        getPeriodFromValue(dateString, format) {

            const date = this.parseDateString(dateString, format) || new Date();

            return {month: date.getMonth(), year: date.getFullYear()};

        },

        parseDateString(dateString, dateFormat) {

            if (!dateString) {
                return undefined;
            } else if (this.parseDate) {
                return this.parseDate(dateString, dateFormat);
            } else {
                const date = new Date(Date.parse(dateString));
                return isNaN(date) ? undefined : date;
            }

        },

        formatDateToString(date, dateFormat) {

            if (this.formatDate) {
                return this.formatDate(date, dateFormat);
            }

            return date
                ? dateFormat
                    .replace(/Y+/g, match => date.getFullYear())
                    .replace(/M+/g, match => paddNum(date.getMonth() + 1, match.length))
                    .replace(/D+/g, match => paddNum(date.getDate(), match.length))
                    .replace(/H+/g, match => paddNum(date.getHours(), match.length))
                    .replace(/m+/g, match => paddNum(date.getMinutes(), match.length))
                    .replace(/s+/g, match => paddNum(date.getSeconds(), match.length))
                : ''
            ;

        },

        incrementMonth(increment = 1) {

            const refDate = new Date(this.currentPeriod.year, this.currentPeriod.month);
            const incrementDate = new Date(refDate.getFullYear(), refDate.getMonth() + increment);

            this.currentPeriod = {
                month: incrementDate.getMonth(),
                year: incrementDate.getFullYear()
            };

        },

        open() {

            if (!this.opened) {
                this.opened = true;
                this.currentPeriod = this.getPeriodFromValue(this.value, this.format);
                this.addCloseEvents();
                this.setupPosition();
            }
            this.direction = undefined;

        },

        close() {

            if (this.opened) {
                this.opened = false;
                this.direction = undefined;
                this.removeCloseEvents();
                this.teardownPosition();
            }

        },

        closeViaOverlay(e) {

            if (e.target === this.$refs.outerWrap) {
                this.close();
            }

        },

        addCloseEvents() {

            if (!this.closeEventListener) {

                this.closeEventListener = e => this.inspectCloseEvent(e);

                ['click', 'keyup'].forEach(
                    eventName => document.addEventListener(eventName, this.closeEventListener)
                );

            }

        },

        inspectCloseEvent(event) {

            if (event.keyCode) {
                event.keyCode === 27 && this.close();
            } else if (!(event.target === this.$el) && !this.$el.contains(event.target)) {
                this.close();
            }

        },

        removeCloseEvents() {

            if (this.closeEventListener) {

                ['click', 'keyup'].forEach(
                    eventName => document.removeEventListener(eventName, this.closeEventListener)
                );

                delete this.closeEventListener;

            }

        },

        setupPosition() {

            if (!this.positionEventListener) {
                this.positionEventListener = () => this.positionFloater();
                window.addEventListener('resize', this.positionEventListener);
            }

            this.positionFloater();

        },

        positionFloater() {

            let verticalClass = 'scPositionTop';
            let horizontalClass = 'scPositionLeft';
            const elRect = this.$el.getBoundingClientRect();

            if (window.innerWidth > this.mobileBreakpointWidth) {

                // vertical
                if ((window.innerHeight + window.pageYOffset) - (elRect.top + elRect.height) < 280) {
                    verticalClass = 'scPositionBottom';
                }

                // horizontal
                if (window.innerWidth - (elRect.left + elRect.width) < 280) {
                    horizontalClass = 'scPositionRight';
                }

                this.positionClass = verticalClass + ' ' + horizontalClass;

            } else {

                this.positionClass = 'scPositionFixed';

            }

        },

        teardownPosition() {

            if (this.positionEventListener) {
                this.positionClass = undefined;
                window.removeEventListener('resize', this.positionEventListener);
                delete this.positionEventListener;
            }

        },

        clear() {

            this.$emit('input', '');

        },

        selectDateItem(item) {

            if (!item.disabled) {

                const newDate = new Date(item.date);

                if (this.currentTime) {
                    newDate.setHours(this.currentTime.hours);
                    newDate.setMinutes(this.currentTime.minutes);
                    newDate.setSeconds(this.currentTime.seconds);
                }

                this.$emit('input', this.formatDateToString(newDate, this.format));

                if (this.inputBound && !this.pickTime) {
                    this.close();
                }
            }

        },

        inputTime(unit, event) {

            const currentDate = this.parseDateString(this.value, this.format);
            const maxValues = {hours: 23, minutes: 59, seconds: 59};
            const methodMap = {hours: 'setHours', minutes: 'setMinutes', seconds: 'setSeconds'};

            let numValue = parseInt(event.target.value, 10) || 0;

            if (numValue > maxValues[unit]) {
                numValue = maxValues[unit];
            } else if (numValue < 0) {
                numValue = 0;
            }

            event.target.value = paddNum(numValue, unit === 'hours' ? 1 : 2);
            currentDate[methodMap[unit]](numValue);

            this.$emit('input', this.formatDateToString(currentDate, this.format));

        }

    }

};

function paddNum(num, padsize) {

    return num.toString().length > padsize
        ? num
        : new Array(padsize - num.toString().length + 1).join('0') + num
    ;
}

function chunkArray(inputArray, chunkSize) {

    const results = [];

    while (inputArray.length) {
        results.push(inputArray.splice(0, chunkSize));
    }

    return results;

}

function areSameDates(date1, date2) {

    return (date1.getDate() === date2.getDate()) &&
        (date1.getMonth() === date2.getMonth()) &&
        (date1.getFullYear() === date2.getFullYear());

}

</script>

<style lang="css">

    @keyframes scSlideFromLeft {
        from { opacity: 0; transform: translate3d(-0.5em,0,0); }
        to { opacity: 1; transform: translate3d(0,0,0); }
    }

    @keyframes scSlideFromRight {
        from { opacity: 0; transform: translate3d(0.5em,0,0); }
        to { opacity: 1; transform: translate3d(0,0,0); }
    }

    @keyframes scToggleCalendar {
        from { opacity: 0; transform: scale(0.5); }
        to { opacity: 1; transform: scale(1); }
    }

    @keyframes scFadeCalendar {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .toggle-calendar-enter-active {

        transform-origin: top left;
        animation: scToggleCalendar .2s;

    }

    .toggle-calendar-leave-active {

        animation: scToggleCalendar .15s reverse;

    }

    .toggle-calendar-enter-active.scPositionFixed {

        animation: scFadeCalendar .3s;

    }

    .toggle-calendar-leave-active.scPositionFixed {

        animation: scFadeCalendar .3s reverse;

    }

    .scComponent {

        position: relative; display: inline-block; font-size: 10px;
        color: #303030;
        /*font-family: Helvetica, Arial, sans-serif;*/

    }

    .scComponent.scWithInput > input {

        padding-right: 30px;

    }

    .scClearInput {

        position: absolute; top: 0; bottom: 0; right: 0;
        width: 3em;

    }

    .scClearInput:before {

        content: '×'; width: 1.4em; height: 1.4em; line-height: 1.2em; box-sizing: border-box;
        position: absolute; left: 50%; top: 50%; margin: -0.7em 0 0 -0.7em;
        color: rgba(0,0,0,0.3); border: 1px solid rgba(0,0,0,0.15); border-radius: 50%;
        background-color: #fff;

    }

    .scClearInput:hover:before {
        box-shadow: 0 0.2em 0.5em rgba(0,0,0,0.15);
    }

    .scOuterWrap.scFloating {

        position: absolute; padding: 0.5em 0; z-index: 220;

    }

    .scOuterWrap.scPositionFixed {

        position: fixed; left: 0; top: 0; bottom: 0; right: 0;
        padding: 2em;  display: flex; justify-content: center; align-items: center;
        background-color: rgba(0,0,0,0.3);

    }

    .scPositionFixed .scInnerWrap {

        max-width: 30em; margin: 0 auto;
        border: 0; animation: scToggleCalendar 0.3s;

    }

    .scFloating.scPositionTop { top: 100%; }
    .scFloating.scPositionBottom { bottom: 100%; }
    .scFloating.scPositionLeft { left: 0; }
    .scFloating.scPositionRight { right: 0; }

    .scPositionTop.scPositionLeft { transform-origin: top left; }
    .scPositionTop.scPositionRight { transform-origin: top right; }
    .scPositionBottom.scPositionLeft { transform-origin: bottom left; }
    .scPositionBottom.scPositionRight { transform-origin: bottom right; }

    .scInnerWrap {

        overflow: hidden; min-width: 28em; box-sizing: border-box; padding: 1em;
        background: #fff; box-shadow: 0 0.2em 1.5em rgba(0,0,0,0.06);
        border-radius: 0.5em; border: 1px solid rgba(0,0,0,0.15);

    }

    .scHeader {

        position: relative; padding: 0 1em 2.5em; margin: -1em -1em -2.5em;
        text-align: center; background: #f5f5f5;

    }

    .scClearInput,
    .scArrow,
    .scPeriodControl > button {

         margin:0; padding: 0; border: 0; cursor: pointer; background: none;

    }

    .scArrow::-moz-focus-inner,
    .scClearInput::-moz-focus-inner,
    .scPeriodControl > button::-moz-focus-inner {

        padding: 0; border: 0;

    }

    .scArrow {

        width: 5em; text-indent: -999em; overflow: hidden;
        position: absolute; top: 0; bottom: 2.5em; text-align: left;

    }

    .scArrow:before {

        content: ''; width: 2.2em; height: 2.2em;
        position: absolute; left: 50%; top: 50%; margin: -1.1em 0 0 -1.1em;
        border-radius: 100%; transition: background-color 0.2s;

    }

    .scArrow:hover:before,
    .scArrow:focus:before {

        background-color: rgba(0,0,0,0.03);

    }

    .scArrow:active:before {

        background-color: rgba(0,0,0,0.07);

    }

    .scArrowNext:before {

        margin-left: -1.4em;

    }

    .scArrow:after {

        content: ''; position: absolute; left: 50%; top: 50%;
        margin-top: -0.5em; width: 0; height: 0;
        border: 0.5em solid transparent;

    }

    .scArrowPrev {

        left: -0.3em;

    }

    .scArrowPrev:after {

        margin-left: -0.8em;
        border-right-color: #7485c2;

    }

    .scArrowNext {

        right: -0.6em;

    }

    .scArrowNext:after {

        margin-left: -0.5em;
        border-left-color: #7485c2;

    }

    .scPeriodControl {

        display: inline-block; position: relative;

    }

    .scPeriodControl > button {

        font-size: 1.5em; padding: 1em 0.4em; display: inline-block;

    }

    .scPeriodControl > select {

        position: absolute; left: 0; top: 0; width: 100%; height: 100%;
        cursor: pointer; opacity: 0; font-size: 1.6em;

    }

    .scTable {

        width: 100%; table-layout: fixed; position: relative; z-index: 10;

    }

    .scNextDirection {

        animation: scSlideFromRight 0.5s;

    }

    .scPrevDirection {

        animation: scSlideFromLeft 0.5s;

    }

    .scCell, .scHeadCell {

        text-align: center; box-sizing: border-box;

    }

    .scCell {

        padding: 0.5em 0;

    }

    .scHeadCell {

        padding: 0.3em 0.5em 1.8em;

    }

    .scHeadCellContent {

        font-size: 1.3em; font-weight: normal;
        color: #848484;

    }

    .scCellContent {

        font-size: 1.4em; display: block; margin: 0 auto;
        width: 1.857em; height: 1.857em; line-height: 1.857em;
        text-align: center; border-radius: 100%;
        transition: background 0.1s, color 0.1s;

    }

    .scCell.outOfRange {

        color: #c7c7c7;

    }

    .scCell.today {

        color: #7485c2;

    }

    .scCell.selectable:hover .scCellContent,
    .scCell.selected .scCellContent {

        color: #fff; background: #7485c2;

    }

    .scCell.selectable {

        cursor: pointer;

    }

    .scCell.disabled {

        opacity: 0.5;

    }

    .scTimeControls {

        padding: 1.2em 2em; position: relative; margin: 1em -1em -1em;
        text-align: center;
        background: #f5f5f5;
        /*border-top: 1px solid rgba(0,0,0,0.15);*/

    }

    .scTimeUnit {

        display: inline-block; position: relative; vertical-align: middle;

    }

    .scTimeUnit > pre, .scTimeUnit > input {

        font-size: 1.7em; line-height: 1.3; padding: 0.1em 0.1em;
        word-wrap: break-word; white-space: pre-wrap;
        resize: none; margin: 0; box-sizing: border-box;
        color: #000; border: 0; border-bottom: 1px solid transparent;
        text-align: center;

    }

    .scTimeUnit > pre {

        visibility: hidden; font-family: inherit;

    }

    .scTimeUnit > input {

        position: absolute; top: 0; left: 0; overflow: hidden;
        height: 100%; width: 100%; outline: none; padding: 0;
        background: transparent;

        -moz-appearance:textfield;

    }

    .scTimeUnit > input:hover,
    .scTimeUnit > input:focus {

        border-bottom-color: #7485c2;

    }

    .scTimeUnit > input::-webkit-inner-spin-button,
    .scTimeUnit > input::-webkit-outer-spin-button {
        margin: 0;
        -webkit-appearance: none;
    }

    .scTimeSeparator, .scTimeCaption {

        display: inline-block; vertical-align: middle; font-size: 1.3em;
        color: #848484;

    }

    .scTimeCaption {

        margin-right: 0.5em;

    }

</style>
