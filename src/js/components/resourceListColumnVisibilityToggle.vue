<template>
    <div
        class="columnVisibilityToggle columnVisibilityToggleType1"
        :class="{active: opened}"
        v-on-dismiss="{watch: opened, callback: close}"
    >
        <button type="button" @click="toggle" class="toggleMenu nBtn icr iconGrid">
            {{ toggleButtonCaption }}
        </button>
        <div class="dropdown">
            <ul class="list">
                <li
                    v-for="(item, index) in dropdownItems"
                    :key="index"
                    class="item"
                >
                    <div class="input">
                        <input
                            type="checkbox"
                            :id="'tableColumnToggleItem-' + index"
                            :checked="item.visible"
                            class="checkboxType1"
                            @input="$emit('toggleColumnVisibility', $event.target.checked, item)"
                        />
                        <label :for="'tableColumnToggleItem-' + index" class="icr iconCheck"></label>
                    </div>
                    <label
                        class="caption"
                        :for="'tableColumnToggleItem-' + index"
                    >
                        {{ item.caption }}
                    </label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import vueDismiss from 'vue-dismiss';
import translate from '../library/translate';

export default {

    mixins: [vueDismiss],

    props: {
        listItemsDefinitions: Array
    },

    data: () => ({
        toggleButtonCaption: translate('resourceColumnVisibilityToggle.toggleCaption'),
        opened: false
    }),

    computed: {

        dropdownItems() {

            return this.listItemsDefinitions
                .filter(item => item.Type.elementType !== 'contextMenu')
                .map(item => item.options);

        }

    },

    methods: {

        close() {

            this.opened = false;

        },

        toggle() {

            this.opened = !this.opened;

        }

    }

};

</script>

<style lang="scss" scoped>

    .columnVisibilityToggleType1 {

        position: relative; width: 4em;

        &.active {

            > .dropdown {

                animation: slideDownFadeIn 0.2s;
                display: block;

            }

            > .toggleMenu:before {

                color: $colorMain1;

            }

        }

    }

    .toggleMenu {

        width: 4em; height: 4em; margin: -0.4em 0;

        &:before {

            color: $colorGrayDark2; font-size: 1.4em;

        }

        &:hover:before {

            color: $colorMain1;

        }

    }

    .dropdown {

        display: none; position: absolute; right: 0em; top: 100%;
        z-index: 10; min-width: 16em; padding: 0.5em 0;
        background: #fff; border: 1px solid $colorGrayLight2;
        box-shadow: 0 0.1em 0.3em rgba(#000, 0.06);

        &:after {

            content: ''; width: 0.7em; height: 0.7em; position: absolute; right: 1.5em; top: -0.5em;
            background-color: #fff; border: 1px solid $colorGrayLight2; border-width: 1px 1px 0 0;
            transform: rotate(-45deg);

        }

    }

    .list {

        max-height: 30em; overflow-y: auto; -webkit-overflow-scrolling: touch;

    }

    .item {

        position: relative;

        .input {

            position: absolute; top: 0; left: 0.5em;

        }

        .caption {

            @include fontSans;
            font-size: 1.4em; color: $colorGrayDark1;
            display: block; padding: em(8,14) em(15,14) em(8,14) em(35,14);

        }

        &:hover .caption {

            color: $colorMain1;

        }

    }

</style>
