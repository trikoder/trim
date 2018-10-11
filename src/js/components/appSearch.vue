<template>
    <form
        class="appSearchType1 iconSearch"
        v-on-dismiss="{callback: close, watch: isOpened}"
        v-bind:class="{opened: results.length > 0}"
        v-on:submit.prevent
    >
        <input
            ref="input"
            v-model="query"
            v-on:keyup.down="selectNextResult()"
            v-on:keyup.up="selectPrevResult()"
            v-on:keyup.enter="followLink()"
            placeholder="Search"
        />
        <ul v-if="results.length" class="results">
            <li v-for="(item, index) in results" v-bind:key="item.key">
                <router-link
                    class="resultItem"
                    v-on:mouseover.native="selectedItemIndex = index"
                    v-on:click.native="close()"
                    v-bind:class="{focused: item.selected}"
                    v-bind:to="item.url"
                >
                    {{ item.caption }}
                </router-link>
            </li>
        </ul>
    </form>
</template>

<script>

import Vue from 'vue';
import dismissListener from '../mixins/dismissListener';
import Fuse from 'fuse.js';

export default Vue.extend({

    mixins: [dismissListener],

    props: {
        dataset: {type: Array, required: true}
    },

    created() {

        this.fuse = new Fuse(this.dataset, {keys: ['caption'], threshold: 0.4});

    },

    data() {

        return {
            query: '',
            selectedItemIndex: 0,
            isOpened: false
        };

    },

    computed: {

        results() {

            return this.fuse.search(this.query).map((item, index) => {
                item.selected = this.selectedItemIndex === index;
                return item;
            });

        }

    },

    methods: {

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

        followLink() {

            this.$router.push(
                this.results[this.selectedItemIndex].url
            );

            this.close();

        },

        open() {

            if (!this.isOpened) {
                this.$mount();
                document.body.appendChild(this.$el);
                this.isOpened = true;
                this.$refs.input.focus();
            }

            return this;

        },

        close() {

            if (this.isOpened) {
                this.query = '';
                this.selectedItemIndex = 0;
                document.body.removeChild(this.$el);
                this.isOpened = false;
            }

            return this;

        }

    }

});

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

        .noResults {

            font-size: 1.7em; display: block; padding: em(10,17) em(20,17);
            color: darken($colorGrayLight2, 10%);

        }

        @include mediaMinWidth($breakpointMedium) {

            width: 50em; margin: -18em 0 0 -25em;

        }

    }

</style>
