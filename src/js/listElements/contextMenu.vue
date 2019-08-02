<template>
    <div
        :class="[classAttribute, {active: opened}]"
        :style="styleAttribute"
        v-bind="attributes"
        v-on-dismiss="{callback: close, watch: opened}"
    >
        <button type="button" @click="toggle" class="toggleContextMenu nBtn icr iconMenu">
            {{ toggleButtonCaption }}
        </button>
        <ul>
            <li
                v-for="(item, index) in dropdownItems"
                :key="index"
            >
                <a
                    v-if="item.url"
                    class="contextItem"
                    @click="runItemAction(item, $event)"
                    :target="item.isExternalLink ? '_blank' : undefined"
                    :class="item.class"
                    :href="item.url"
                >{{ item.caption }}</a>
                <button
                    v-else
                    type="button"
                    class="contextItem"
                    @click="runItemAction(item, $event)"
                    :class="item.class"
                >{{ item.caption }}</button>

            </li>
        </ul>
    </div>
</template>

<script>

import vueDismiss from 'vue-dismiss';
import translate from '../library/translate';
import {assign, result} from '../library/toolkit';
import {confirm} from '../components/dialogModal';

export default {

    elementType: 'contextMenu',

    mixins: [vueDismiss],

    props: {
        resourceModel: {type: Object, required: true},
        caption: {type: String, required: true},
        items: {type: [Array, Function], required: true},
        attributes: {type: Object, default: () => ({})}
    },

    data: () => ({
        defaultClass: 'contextMenuType1',
        toggleButtonCaption: translate('listElements.contextMenu.toggleCaption'),
        opened: false
    }),

    computed: {

        styleAttribute() {

            return this.attributes.style;

        },

        classAttribute() {

            return this.attributes.class || this.defaultClass;

        },

        dropdownItems() {

            const resultOptions = [this.resourceModel];

            return result(this.items, resultOptions).filter(item => {

                return typeof item.showIf !== 'undefined'
                    ? result(item.showIf, resultOptions)
                    : true
                ;

            }).map(item => {

                let dropdownItem = assign({}, item);

                dropdownItem.caption = result(dropdownItem.caption, resultOptions);

                if (dropdownItem.url) {
                    dropdownItem.url = result(dropdownItem.url, resultOptions);
                }

                return dropdownItem;

            });

        }

    },

    methods: {

        open() {

            this.opened = true;

        },

        close() {

            this.opened = false;

        },

        toggle() {

            this.opened = !this.opened;

        },

        runItemAction(item, event) {

            const executeAction = () => item.action && item.action(this.resourceModel, this);

            item.action && event.preventDefault();

            item.confirm ? confirm({
                message: typeof item.confirm === 'string' ? item.confirm : undefined,
                onAccept: executeAction,
                parent: this
            }) : executeAction();

        }

    }

};

</script>

<style lang="scss" scoped>

    .contextMenuType1 {

        position: relative; width: 4em;

        &.active {

            > ul {

                animation: slideDownFadeIn 0.2s;
                display: block;

            }

            > .toggleContextMenu:before {

                color: $colorMain1;

            }

        }

    }

    .toggleContextMenu {

        width: 4em; height: 4em; margin: -1.5em 0;

        color: $colorMain1;

        &:before {

            color: $colorGrayDark1; font-size: 1.7em;

        }

        &:hover:before {

            color: $colorMain1;

        }

        @include mediaMinWidth($breakpointMedium) {

            &:before {

                font-size: 1.4em;

            }

        }

    }

    .contextItem {

        @include normalizeButton;
        @include fontSansCondensed;
        font-size: 1.6em; padding: em(10,16) em(15,16); display: block; width: 100%; box-sizing: border-box;
        text-align: left; color: $colorGrayDark1;

        &:hover {

            color: $colorMain1;

        }

        @include mediaMinWidth($breakpointMedium) {
            font-size: 1.4em; padding: em(8,14) em(15,14);
        }

    }

    ul {

        display: none; position: absolute; right: 0em; top: 100%; margin-top: 0.7em;
        z-index: 10; padding: 0.5em 0; min-width: 16em;
        background: #fff; border: 1px solid $colorGrayLight2;
        box-shadow: 0 0.1em 0.3em rgba(#000, 0.06);

        &:after {

            content: ''; width: 0.7em; height: 0.7em; position: absolute; right: 1.5em; top: -0.5em;
            background-color: #fff; border: 1px solid $colorGrayLight2; border-width: 1px 1px 0 0;
            transform: rotate(-45deg);

        }

    }

</style>
