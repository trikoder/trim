<template>
    <div
        class="toggleColumnsVisibility"
        v-on-dismiss="{watch: opened, callback: closeDropdown}"
    >

        <button
            class="toggleButton nBtn iconSidebar"
            type="button"
            @click="toggleDropdown"
        >{{ toggleButtonCaption }}</button>

        <div class="dropdown" v-if="opened">
            <ul>
                <li v-for="(item, index) in dropdownItems" :key="index">
                    <input
                        type="checkbox"
                        :id="'toggle-column-visibility-' + index"
                        class="checkbox"
                        @change="toggleColumn(item.options.caption, !$event.target.checked)"
                        :checked="!item.isColumnHidden"
                    >
                    <label class="iconCheck" :for="'toggle-column-visibility-' + index">
                        <span>{{ item.options.caption }}</span>
                    </label>
                </li>
            </ul>
        </div>

    </div>

</template>

<script>

import vueDismiss from '../dependencies/vue-dismiss/index.js';
import {pascal as pascalcase} from 'to-case';
import translate from '../library/translate.js';
import userPreferences from '../library/userPreferences.js';

export default {

    mixins: [vueDismiss],

    props: {
        resourceName: String,
        definitions: Object
    },

    data() {
        return {
            toggleButtonCaption: translate('resourceToggleColumnVisibility.caption'),
            opened: false
        };
    },

    computed: {

        dropdownItems() {
            return this.definitions.listItems
                .filter(item => item.Type.elementType !== 'contextMenu')
                .map(item => item);
        }

    },

    methods: {

        closeDropdown() {
            this.opened = false;
        },

        toggleDropdown() {
            this.opened = !this.opened;
        },

        toggleColumn(key, state) {
            const preferenceKey = `columnVisibility.${this.resourceName}${pascalcase(key)}`;
            if (state) {
                userPreferences.set(preferenceKey, true);
            } else {
                userPreferences.unset(preferenceKey);
            }
            this.$emit('refresh');
        }

    }

};

</script>

<style lang="scss" scoped>

    .toggleColumnsVisibility {

        position: relative; float: right;
        margin-top: 1.3em;

    }

    .toggleButton {

        font-size: 1.4em; padding: em(8,14) em(17,14);
        color: $colorGrayDark3; float: right;

        &:before {
            left: auto; right: em(-17, 14);
            color: $colorGrayDark2;
        }

    }

    .dropdown {

        animation: slideDownFadeIn 0.2s;

        position: absolute; z-index: 20; padding: 0.5em; top: 3.6em; right: 0; min-width: 10em;
        background: #fff; border: 1px solid $colorGrayLight2; border-radius: 0.4em;
        box-shadow: 0 0.1em 0.3em rgba(#000, 0.06);

        > ul {

            max-height: 30em; overflow-x: hidden; overflow-y: auto;

        }

        &:after {

            content: ''; width: 0.7em; height: 0.7em; position: absolute; right: 1.4em; top: 0; margin-top: -0.5em;
            background-color: #fff; border: 1px solid $colorGrayLight2; border-width: 1px 1px 0 0;
            transform: rotate(-45deg); z-index: 21;

        }

    }

    .checkbox {

        position: absolute; left: -999em;

        + label {

            position: relative; display: block;
            overflow: hidden; padding: 0 0.5em 0 2.7em;

            > span {

                font-size: 1.2em; line-height: em(30, 12);

            }

            &:after {

                content: "";
                position: absolute; left: 0.5em; top: 50%; box-sizing: border-box;
                width: 1.5em; height: 1.5em; margin: -0.75em 0 0 0;
                background-color: #fff; border: 1px solid rgba(#000, 0.2); border-radius: 0.2em;

            }

            &:before {

                display: none; z-index: 10; color: $colorMain1; font-size: 1.1em; left: em(5.5,11);
                width: em(15,11);

            }

        }

        &:checked {

            + label:after {

                box-shadow: 0 0.1em 0.3em rgba(#000, 0.06);

            }

            + label:before {

                animation: slideDownFadeIn 0.2s;
                display: block;

            }

        }

    }

</style>
