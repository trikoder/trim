<template>
    <element-wrapper v-bind:renderInputWrapper="false" v-bind="elementWrapperProps">
        <div class="stateSelectElement" v-bind="inputWrapperAttributes">
            <p class="stateCaption"><span>{{currentState.caption}}</span></p>
            <div class="controls" v-if="selectableOptions.length">
                <div class="selectContainer">
                    <div class="select">
                        <button type="button">&#8627;&nbsp; {{selectCaption}}</button>
                        <select v-bind:value="selectValue" v-on:input="processInputEvent">
                            <option
                                v-for="(option, index) in selectableOptions"
                                v-bind:key="index"
                                v-bind:value="option.value"
                            >{{ option.caption }}</option>
                        </select>
                    </div>
                </div>
                <button type="button" class="updateBtn nBtn"
                    v-if="updateEntityOnChange" v-on:click="persistState"
                >{{updateControlCaption}}</button>
            </div>
        </div>
    </element-wrapper>
</template>

<script>

import base from './base';
import Vue from 'vue';
import {assign, find} from '../library/toolkit';
import translate from '../library/translate';
import ElementWrapper from './elementWrapper';
import {Model} from '../library/resource';

const Component = Vue.extend({

    components: {ElementWrapper},

    mixins: [base],

    props: {
        value: [String, Boolean, Number],
        updateEntityOnChange: {type: Boolean, default: false},
        updateControlCaption: {type: String, default: () => translate('formElements.stateSelect.updateControlCaption')},
        nextStatePlaceholderCaption: {type: String, default: () => translate('formElements.stateSelect.nextStatePlaceholderCaption')},
        states: {type: Array, required: true}
    },

    data() {
        return {
            currentState: this.getStateFromValue(this.value)
        };
    },

    created() {

        if (this.updateEntityOnChange) {
            if (!this.resourceModel || (this.resourceModel && this.resourceModel.isNew())) {
                throw new Error('Existing resource model required for state select in live update mode');
            }
        }

    },

    beforeUpdate() {

        this.syncCurrentStateToModel();

    },

    computed: {

        selectableOptions() {

            if (this.currentState.transitions === 'all') {

                const stateNames = this.states
                    .map(state => this.getStateKey(state))
                    .filter(key => key !== this.getStateKey(this.currentState))
                ;
                return this.getTransitionsOptions(stateNames);

            } else {

                return this.getTransitionsOptions(this.currentState.transitions || []);

            }

        },

        selectValue() {

            if (this.updateEntityOnChange) {

                const option = find(this.selectableOptions, option => option.value === this.value);

                if (option) {
                    return option.value;
                } else {
                    return this.selectableOptions.length && this.selectableOptions[0].value;
                }

            } else {
                return this.value;
            }

        },

        selectCaption() {

            if (this.selectValue) {
                const option = find(this.selectableOptions, option => option.value === this.selectValue);
                return option && option.caption || '';
            } else {
                return '';
            }

        },

        inputWrapperAttributes() {

            const attributes = this.normalizeAttributes(this.attributes.inputWrapper);

            if (this.selectableOptions.length === 0) {
                this.addToAttribute(attributes, 'class', 'withNoOptions');
            }

            return attributes;

        }

    },

    methods: {

        syncCurrentStateToModel() {

            if (this.resourceModel) {

                const modelStateValue = this.resourceModel.get(this.name);

                if (typeof modelStateValue !== 'undefined') {
                    this.currentState = this.getStateFromValue(modelStateValue);
                }

            }

        },

        getStateKey(state) {

            return state.name || state.value;

        },

        getStateFromValue(value) {

            return find(this.states, state => state.value === value);

        },

        persistState() {

            Model
                .create()
                .setId(this.resourceModel.get('id'))
                .setType(this.resourceModel.getType())
                .saveAttribute(this.name, this.selectValue)
                .then(model => {

                    const stateValue = model.get(this.name);

                    this.resourceModel.setAttribute(this.name, stateValue);
                    this.$emit('input', stateValue);
                    this.currentState = this.getStateFromValue(stateValue);

                });

        },

        getTransitionsOptions(transitions = []) {

            const options = transitions.map(transition => {

                const state = this.states.find(state => this.getStateKey(state) === transition);

                return {
                    caption: state.actionCaption || state.caption,
                    value: state.value
                };

            });

            if (!this.updateEntityOnChange && options.length) {

                options.unshift({
                    caption: this.nextStatePlaceholderCaption,
                    value: this.currentState.value
                });

            }

            return options;

        }

    }

});

assign(Component, {

    getElementType: () => 'stateSelect',

    getDefaultValue(options = {}) {

        return typeof options.value !== 'undefined'
            ? options.value
            : options.states[0].value
        ;

    }

});

export default Component;

</script>

<style lang="scss" scoped>

    .stateSelectElement {

        display: inline-block; position: relative;
        background-color: #fff; border: 1px solid $colorGrayLight2;
        border-radius: 0.3em; overflow: hidden;

        &.withNoOptions {

            background-color: #f9f9f9;

        }

        &.fullWidth {

            display: block;

        }

        .stateCaption {

            font-size: 1.4em; padding: em(8,14) em(10,14);

            > span {

                animation: slideDownFadeIn 0.5s;
                display: block;

            }

        }

        .select {

            animation: slideDownFadeIn 0.5s;

            display: inline-block; position: relative; width: 100%;

            &:before {

                @include iconFont($iconFontName);
                @include iconElementGraphic(30, 30);

                content: map-get($icons, 'chevronDown'); left: auto; right: 0; font-size: 1.2em;
                color: $colorMain1;

            }

            > button {

                @include normalizeButton;

                font-size: 1.4em; padding: em(8,14) em(30,14) em(8,14) em(10,14);
                color: $colorGrayDark1; opacity: 0.7;

            }

            > select {

                position: absolute; left: 0; top: 0; width: 100%; height: 100%;
                cursor: pointer; opacity: 0; font-size: 1.6em;

            }

            &.fullWidth {

                display: block;

            }

            &.disabled {

                opacity: 0.5;

            }

        }

        .controls {

            display: table; width: 100%;
            background-color: #f9f9f9; border-top: 1px solid $colorGrayLight2;

            > .selectContainer, .action {

            }

        }

        .updateBtn {

            display: table-cell; vertical-align: middle;
            font-size: 1.2em; padding: em(10,12) em(10,12);
            color: $colorGrayDark2; text-transform: uppercase; letter-spacing: 0.03em;
            border-left: 1px solid $colorGrayLight2;

            &:hover { color: $colorMain1; }

        }

        .selectContainer {

            width: 100%; display: table-cell; vertical-align: middle;

        }

    }

</style>
