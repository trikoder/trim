<template>
    <element-wrapper v-bind="elementWrapperProps">
        <multiselect
            v-if="optionElements.length"
            v-bind="inputAttributes"
            :model-value="selectedOptionElements"
            @update:model-value="processInputEvent"
            :options="optionElements"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :hide-selected="false"
            :preserve-search="true"
            :preselect-first="false"
            :show-no-results="false"
            :placeholder="placeholder"
            :disabled="!isInteractive"
            label="caption"
            track-by="value"
        ></multiselect>
        <span v-else class="loading">
            {{ translations.loading }}
        </span>
    </element-wrapper>
</template>

<script>
import base from './base.vue';
import {assign} from '../library/toolkit.js';
import translate from '../library/translate.js';
import {Collection} from '../library/resource.js';
import ElementWrapper from './elementWrapper.vue';
import Multiselect from 'vue-multiselect';

export default {

    elementType: 'multipleSelect',

    components: {ElementWrapper, Multiselect},

    mixins: [base],

    props: {
        modelValue: {type: [Array, String]},
        valueType: {
            default: () => String,
            validator: function(Type) {
                return [Array, String].indexOf(Type) >= 0;
            }
        },
        selectOptions: {type: [Array, Object], required: true}
    },

    data: () => ({
        optionElements: [],
        translations: {
            loading: translate('formElements.multipleSelect.loadingCaption')
        }
    }),

    getInitialValue(options = {}) {

        const OptionsValueType = options.valueType;
        const getDefaultValue = () => OptionsValueType && new OptionsValueType() || '';

        return options.value || getDefaultValue();

    },

    computed: {

        placeholder() {

            const translation = translate('formElements.multipleSelect.placeholderText');
            return this.inputAttributes.placeholder || translation;

        },

        selectedOptionElements() {

            const values = this.valueType === String ? this.modelValue.split(',') : this.modelValue;
            const itemIds = values.filter(id => id);

            return this.optionElements.length
                ? this.optionElements.filter(
                    option => itemIds.indexOf(option.value) >= 0
                )
                : [];

        }

    },

    created() {

        this.getOptionElements(this.selectOptions).then(optionElements => {
            this.optionElements = optionElements;
        });

    },

    methods: {

        processInputEvent(selectedOptions) {

            const values = selectedOptions.map(option => option.value);

            this.$emit('update:modelValue', this.valueType === String ? values.join(',') : values);

        },

        mapModel(mapper, model) {

            return typeof mapper === 'function' ? mapper(model) : model.get(mapper);

        },

        getOptionElements(selectOptions) {

            if (Array.isArray(selectOptions)) {

                return Promise.resolve(selectOptions);

            } else {

                selectOptions = assign({
                    mapCaptionTo: 'name',
                    mapValueTo: 'id'
                }, selectOptions);

                const query = selectOptions.url
                    ? {url: selectOptions.url}
                    : {type: selectOptions.resource, query: selectOptions.query}
                ;

                return Collection.getFromApi(query).then(modelCollection => {

                    return modelCollection.map(model => ({
                        caption: this.mapModel(selectOptions.mapCaptionTo, model),
                        value: this.mapModel(selectOptions.mapValueTo, model)
                    }));

                });

            }

        }

    }

};
</script>

<style>
    @import url('vue-multiselect/dist/vue-multiselect.css');
</style>

<style lang="scss" scoped>

    @use '../../scss/library/all' as *;

    .loading {

        display: inline-block; padding: em(5,13) em(10,13) em(5,13) 0; font-size: 1.3em;
        color: #9c9c9c;

    }

</style>

<style lang="scss">

    @use '../../scss/library/all' as *;

    .inputBlockType1, .inlineInputBlockType1 {

        .multiselect--active {
            z-index: 15;
        }

        .multiselect__tags {

            padding-left: 0; padding-right: 1em;
            border: 0; border-bottom: 1px solid $colorGrayLight2; border-radius: 0;
            background: transparent;

        }

        .multiselect__single, .multiselect__input {

            font-size: 14px; padding-left: 0; padding-top: 1px; padding-bottom: 1px;
            background: transparent; color: darken($colorGrayLight2, 15%);

        }

        .multiselect__select {

            display: none;

        }

        .multiselect__tag {

            margin-right: em(5,10);
            background-color: #a7a7a7; border-radius: 3px;

        }

        .multiselect__tag-icon:after {

            color: #fff;

        }

        .multiselect__tag-icon:focus, .multiselect__tag-icon:hover {

            background-color: rgba(#000, 0.1);

        }

        .multiselect__content-wrapper {

            margin: 0.6em 0;
            border: 1px solid $colorGrayLight2; border-radius: 0.3em;
            box-shadow: 0 0.2em 0.5em rgba(#000, 0.07);

        }

        .multiselect__option--highlight {

            background: #f5f5f5;
            color: $colorGrayDark1;

        }

        .multiselect__option--highlight:after {

            content: ''; background: transparent; color: $colorGrayDark1;

        }

        .multiselect__option--selected {

            background: #fff; color: $colorGrayDark1; font-weight: bold;

        }

        .multiselect__option--selected:after {

            content: ''; color: $colorGrayDark1;

        }

        .multiselect__option--selected.multiselect__option--highlight {

            background: #f5f5f5; color: $colorGrayDark1;

        }

        .multiselect__option--selected.multiselect__option--highlight:after {

            background: #fff; content: ''; color: $colorGrayDark1;

        }

        .multiselect--disabled {

            background: transparent;
            opacity: 1;

        }

    }

    .inlineInputBlockType1 {

        .multiselect { min-height: 0; }

        .loading {

            padding-left: em(5,13);

        }

        .multiselect__tags {

            border: 0; padding-top: 0; min-height: 0; position: relative; top: 4px;

        }

        .multiselect__single, .multiselect__input {

            padding-left: 5px;

        }

    }

    .multiselect.withOutline {

        .multiselect__tags {

            min-height: 0; padding: 0.5em 0.5em 0 0.5em;
            border: 1px solid $colorGrayLight2; border-radius: 0.3em;
            background: #fff;

        }

        .multiselect__tag {

            margin-bottom: 4px;

        }

        .multiselect__content-wrapper {

            margin: 0.3em 0;

        }

    }

</style>
