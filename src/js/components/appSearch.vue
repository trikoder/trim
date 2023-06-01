<template>
    <form
        class="appSearchType1 iconSearch"
        v-on-dismiss="{callback: close, watch: isOpened}"
        :class="{opened: results.length > 0}"
        @submit.prevent
    >
        <input
            ref="input"
            v-model.trim="query"
            @keyup.down="selectNextResult"
            @keyup.up="selectPrevResult"
            @keyup.enter="openResult"
            placeholder="Search"
        />
        <ul v-if="results.length" class="results">
            <li v-for="(item, index) in results" :key="item.key">
                <a
                    class="resultItem"
                    @mouseover="selectedItemIndex = index"
                    @click.prevent="openResult"
                    :class="{focused: item.selected}"
                    :href="item.url"
                >
                    <span
                        v-if="item.parentCaption"
                        class="parentCaption"
                        v-html="item.parentCaption"
                    ></span>
                    <span v-html="item.caption"></span>
                </a>
            </li>
        </ul>
    </form>
</template>

<script>

import addModal from '../library/addModal.js';
import vueDismiss from '../dependencies/vue-dismiss/index.js';

const Component = {

    mixins: [vueDismiss],

    props: {
        getSearchItems: {type: Function, required: true},
        typeTimeout: {type: Number, default: 100}
    },

    data() {

        return {
            query: '',
            selectedItemIndex: 0,
            isOpened: false,
            results: []
        };

    },

    watch: {

        query: 'runQuery',

        selectedItemIndex() {

            this.results.forEach((item, index) => {
                item.selected = this.selectedItemIndex === index;
            });

        }

    },

    mounted() {
        this.open();

        this.$watch('$route', () => {
            this.close();
        });
    },

    methods: {

        runQuery() {

            clearTimeout(this.queryTimeout);

            this.selectedItemIndex = 0;

            if (!this.query) {
                this.results = [];
                return;
            }

            this.queryTimeout = setTimeout(() => {

                Promise.resolve(this.getSearchItems(this.query)).then(results => {

                    this.results = results.map(
                        (result, index) => Object.assign({}, result.item, {
                            selected: this.selectedItemIndex === index
                        })
                    );

                });

            }, this.typeTimeout);

        },

        selectNextResult() {

            if (this.results.length !== 0) {
                if (this.selectedItemIndex + 1 >= this.results.length) {
                    this.selectedItemIndex = 0;
                } else {
                    this.selectedItemIndex++;
                }
            }

        },

        selectPrevResult() {

            if (this.results.length !== 0) {
                if (this.selectedItemIndex <= 0) {
                    this.selectedItemIndex = this.results.length - 1;
                } else {
                    this.selectedItemIndex--;
                }
            }

        },

        openResult() {

            const resultItem = this.results[this.selectedItemIndex];

            if (!resultItem) {
                return;
            }

            if (resultItem.action) {
                resultItem.action();
            } else if (resultItem.url && resultItem.appLink) {
                this.$router.navigateTo(resultItem.url);
            } else if (resultItem.url) {
                window.location.assign(resultItem.url);
            }

            this.close();

        },

        open() {

            if (!this.isOpened) {
                this.isOpened = true;
                this.$refs.input.focus();
            }

            return this;

        },

        close() {

            if (this.isOpened) {
                this.query = '';
                this.selectedItemIndex = 0;
                this.isOpened = false;
            }

            this.$emit('closeModal');

            return this;

        }

    }

};

Component.open = function(props, parent) {
    return addModal({
        props: () => props,
        component: () => Component,
        parent: () => parent
    });
};

export default Component;

</script>

<style lang="scss" scoped>

    .appSearchType1 {

        width: 30em; margin: -14em 0 0 -15em; position: fixed; left: 50%; top: 50%;
        z-index: 20000; padding: 0 6em 0 0; box-sizing: border-box;
        background-color: #FFF; border-radius: 0.4em;
        box-shadow: 0 0.5em 2em rgba(#000, 0.2), 0 1em 6em rgba(#000, 0.1);

        animation: slideDownFadeIn 0.2s;

        &:before {

            font-size: 2em; width: em(60,20); left: auto; right: 0; top: 0.5em; margin-top: 0;
            color: $colorGrayDark2;

        }

        > input {

            appearance: none;
            font-size: 2em; display: block; width: 100%;
            border: 0; padding: em(20,20); background-color: transparent;

        }

        .results {

            display: none; padding: 1em 0; margin-right: -6em;
            max-height: 30em; overflow-y: auto;
            border-top: 1px solid $colorGrayLight1;

        }

        &.opened > .results {

            animation: slideDownFadeIn 0.2s;
            display: block;

        }

        .resultItem {

            font-size: 1.7em; display: block; padding: em(10,17) em(20,17);
            color: $colorGrayDark2;

            &.focused {

                background-color: #f9f9f9; color: $colorGrayDark1;

            }

        }

        .parentCaption {

            display: block; font-size: em(12,17); margin-bottom: em(5,12);
            text-transform: uppercase; letter-spacing: 0.05em;
            color: lighten($colorGrayDark2, 20%);

        }

        .noResults {

            font-size: 1.7em; display: block; padding: em(10,17) em(20,17);
            color: darken($colorGrayLight2, 10%);

        }

        @include mediaMinWidth($breakpointMedium) {

            width: 50em; margin: -18em 0 0 -25em;

        }

    }

</style>
