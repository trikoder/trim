<template>
    <form
        v-on:submit.prevent="submit"
        class="filters filtersType1"
        v-bind:class="{canContract, sizeExpanded, active}"
        autocomplete="off"
    >
        <div class="inner" ref="container">
            <component
                v-for="definition in definitions"
                v-bind:is="definition.Type"
                v-bind="definition.options"
                v-model="filters[definition.options.name]"
                v-bind:key="definition.options.name"
            ></component>
            <button class="submitBtn" type="submit">
                {{ translations.filterButtonCaption }}
            </button>
        </div>
        <button
            type="button"
            v-bind:title="translations.toggleButtonCaption"
            class="toggleBtn nBtn icr iconSliders"
            v-on:click="toggleActive"
        >
            {{ translations.toggleButtonCaption }}
        </button>
        <button
            v-if="canContract"
            type="button"
            v-bind:title="translations.toggleSizeButtonCaption"
            class="toggleSizeBtn nBtn icr iconMoreHorizontal"
            v-on:click="toggleSize"
        >
            {{ translations.toggleSizeButtonCaption }}
        </button>
    </form>
</template>

<script>
import translate from '../library/translate';
import {assign, each, getComponentInitialValue} from '../library/toolkit';

export default {

    props: {
        definitions: Array,
        initialFilters: Object,
        persistentFilters: Object
    },

    data() {
        return {
            sizeExpanded: false,
            canContract: false,
            active: false,
            filters: this.getResetFilters(),
            translations: {
                filterButtonCaption: translate('resourceFilters.filterButtonCaption'),
                toggleButtonCaption: translate('resourceFilters.toggleButtonCaption'),
                toggleSizeButtonCaption: translate('resourceFilters.toggleSizeButtonCaption')
            }
        };
    },

    watch: {

        initialFilters() {
            this.filters = this.getResetFilters();
        }

    },

    mounted() {

        this.resizeListener = () => this.adjustSize();
        window.addEventListener('resize', this.resizeListener);

        this.adjustSize();

    },

    beforeDestroy() {

        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
        }

    },

    methods: {

        getFieldDefaultValues() {

            return this.definitions.reduce((values, definition) => {

                values[definition.options.name] = getComponentInitialValue(
                    definition.Type,
                    definition.options
                );
                return values;

            }, {});

        },

        getResetFilters() {

            return assign(this.getFieldDefaultValues(), this.initialFilters);

        },

        adjustSize() {

            const oldSizeExpanded = this.sizeExpanded;
            const contractedSize = parseInt(getComputedStyle(this.$refs.container)['min-height'], 10);

            this.sizeExpanded = true;
            this.canContract = false;

            this.$nextTick(() => {

                this.canContract = this.$el.offsetHeight > contractedSize + 10;
                this.sizeExpanded = oldSizeExpanded;

            });

        },

        toggleSize() {

            this.sizeExpanded = !this.sizeExpanded;

        },

        toggleActive() {

            this.active = !this.active;

        },

        submit() {

            const activeFilters = {};

            each(this.filters, (value, key) => {

                if (Array.isArray(value)) {
                    value = value.join(',');
                }

                if (value) {
                    activeFilters[key] = value;
                }

            });

            this.$emit('filterRequest', activeFilters);

        }

    }

};

</script>

<style lang="scss" scoped>

    .filtersType1 {

        position: relative; background: #fff;

        > .inner {

            animation: fadeIn 0.3s;
            padding: 1.5em; position: relative; box-sizing: border-box;
            border-bottom: 1px solid $colorGrayLight1;

        }

        & /deep/ {

            .inlineInputBlockType1 {

                margin: 0 1.5em 1em 0;

            }

            .inputType1 {

                border: 0 !important;

            }

        }

        > .toggleBtn {

            animation: fadeIn 0.3s;

            position: absolute; right: 0em; top: -5em; z-index: 10;
            color: $colorGrayDark2; height: 4.7em; width: 5.2em;

            &:before { font-size: 1.7em; }

        }

        > .toggleSizeBtn {

            position: absolute; left: 50%; top: 100%;
            margin-top: -1em; margin: -1em 0 0 -2.5em; width: 5em; height: 2em;
            border: 1px solid $colorGrayLight2; border-radius: 0.3em; background-color: #fff;
            color: darken($colorGrayLight2, 20%);

            &:before { font-size: 1.4em; }
            &:hover { color: $colorMain1; }

            display: none;

        }

        @include mediaMaxWidth($breakpointMedium) {

            > .inner {

                display: none; padding: 2em 2em 1em; position: relative; margin-top: -1px;
                border: 1px solid $colorGrayLight2; border-width: 1px 0; background-color: #fff;

                &:after {

                    content: ''; width: 1.2em; height: 1.2em; position: absolute; right: 1.95em; top: -0.7em;
                    background-color: #fff; border: 1px solid $colorGrayLight2; border-width: 1px 1px 0 0;
                    transform: rotate(-45deg);

                }

            }

            .submitBtn {

                @include normalizeButton;
                @include fontSans;
                font-size: 2em; padding: em(10,20) 0; display: block; width: 100%; text-align: left;
                color: $colorMain1; letter-spacing: 0.01em;

                @include hover {
                    color: $colorGrayDark1;
                }

            }

            &.active > .inner {

                animation: slideDownFadeIn 0.3s;
                display: block;

            }

            &.active > .toggleBtn { color: $colorMain1; }

        }

        @include mediaMinWidth($breakpointMedium) {

            > .inner {

                display: block; padding: 1em 11em 1em 2em; min-height: 6.7em;

            }

            .submitBtn {

                @include normalizeButton;
                @include fontSansCondensed;
                font-size: 2em; padding: 0 em(20,20) 0 em(60,20);
                position: absolute; right: 0; top: 0; height: em(60,20); width: inherit;
                color: #adadad; letter-spacing: 0.03em; background-color: #fff;
                background: linear-gradient(left, transparent, #fff 30%, #fff 100%);

                @include hover {
                    color: $colorGrayDark1;
                }

            }

            > .toggleBtn {

                display: none;

            }

            &.canContract {

                white-space: nowrap;

                > .toggleSizeBtn { display: block; }

            }

            &.sizeExpanded {

                white-space: normal;

            }

        }

    }

</style>
