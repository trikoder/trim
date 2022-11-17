<template>
    <nav class="resourceControls" v-if="parsedControls.length">
        <template v-for="(control, index) in parsedControls">
            <div
                v-if="control.isDropdown"
                :key="control.caption + index"
                class="dropdownControls"
                :class="{active: control.active, accentedAdjecent: control.accentedAdjecent}"
                v-on-dismiss="{callback: () => closeDropdown(control), watch: control.active}"
            >
                <button
                    class="toggleBtn nBtn"
                    :class="control.className"
                    @click="toggleDropdown(control)"
                >
                    {{ control.caption }}
                </button>
                <div class="dropdown">
                    <button
                        v-for="(item, index) in control.items"
                        :key="item.caption + index"
                        type="button"
                        class="nBtn"
                        :title="item.caption"
                        @click.prevent="runDropdownAction(control, item)"
                    >
                    {{ item.caption }}
                    </button>
                </div>
            </div>
            <a
                v-else-if="control.url"
                :href="control.url"
                :key="control.caption + index"
                :class="control.className"
                :title="control.caption"
                @click.prevent="runControlAction(control)"
            >
              <span>{{ control.caption }}</span>
            </a>
            <button
                v-else
                class="nBtn"
                type="button"
                :key="control.caption + index"
                :class="control.className"
                :title="control.caption"
                @click.prevent="runControlAction(control)"
            >
                <span>{{ control.caption }}</span>
            </button>
        </template>
    </nav>
</template>

<script>

import translate from '../library/translate.js';
import {assign} from '../library/toolkit.js';
import vueDismiss from 'vue-dismiss';
import screenSize from '../mixins/screenSize.js';

export default {

    mixins: [vueDismiss, screenSize],

    props: {
        controls: {type: Array, default: () => []}
    },

    data() {
        return {
            parsedControls: this.parseControls()
        };
    },

    watch: {

        controls() {

            this.parsedControls = this.parseControls();

        }

    },

    methods: {

        parseControls() {

            return this.controls.map((control, index) => {

                return control.isDropdown ? assign({
                    className: 'accented icr iconAlignLeft',
                    caption: translate('resourceControls.dropdownToggle')
                }, control, {
                    active: false,
                    accentedAdjecent: this.controls[index - 1].className.indexOf('accented') >= 0
                }) : assign({}, control);

            }).filter(control => {

                const isRegularControl = !control.isDropdown;
                const withNoIcon = Boolean(!control.className || control.className.indexOf('icon') === -1);
                const isSmallScreen = this.screenIsSmall;

                if (isSmallScreen && isRegularControl && withNoIcon) {
                    return false;
                } else {
                    return true;
                }

            });

        },

        runControlAction(config) {

            config.action.call(config.actionContext);

        },

        runDropdownAction(dropdownControl, config) {

            this.closeDropdown(dropdownControl);
            config.action.call(config.actionContext);

        },

        toggleDropdown(control) {

            return control.active
                ? this.closeDropdown(control)
                : this.openDropdown(control)
            ;

        },

        openDropdown(control) {

            control.active = true;
            return this;

        },

        closeDropdown(control) {

            control.active = false;
            return this;

        }

    }

};

</script>

<style lang="scss">

    .resourceControls .dropdownControls {

        float: left; position: relative;

        &.active > .dropdown {

            animation: slideDownFadeIn 0.2s;
            display: block;

        }

    }

    .resourceControls .dropdown {

        position: absolute; top: 100%; right: 0; margin-top: -0.5em; display: none;
        padding: 0.8em 0; box-sizing: border-box; min-width: 22em;
        background-color: #fff; border: 1px solid rgba(#000, 0.1);
        box-shadow: 0 0.1em 0.3em rgba(#000, 0.06);

        @include mediaMinWidth($breakpointMedium) {

            border-radius: 0.4em 0 0.4em 0.4em;

        }

        &:after {

            content: ''; width: 0.7em; height: 0.7em; position: absolute; right: 1.4em; top: -0.5em;
            background-color: #fff; border: 1px solid rgba(#000, 0.1); border-width: 1px 1px 0 0;
            transform: rotate(-45deg);

        }

        > button, > a {

            @include fontSans;
            font-size: 1.4em; display: block; width: 100%; padding: em(9,14) em(20,14);
            text-align: left; white-space: nowrap;

            @include hover { color: $colorMain1; }

        }

    }

    @include mediaMaxWidth($breakpointMedium) {

        .resourceControls {

            position: absolute; right: 0.5em; top: 0; height: 5em; z-index: $zIndexHeader;

            > button, > a, .dropdownControls >.toggleBtn {

                @include iconReplacement;
                animation: slideFromRight 0.2s;

                width: 4em; height: 6em; float: left;
                color: $colorHeaderIconsSmallScreen;

                &:before { font-size: 2.2em; }
                &.hiddenOnMobile { display: none; }
                &.accented { color: $colorHeaderIconsAccentedSmallScreen; }

            }

            > .dropdownControls {

                float: left;

                >.toggleBtn:before { font-size: 2.2em; }

            }

        }

    }

    @include mediaMinWidth($breakpointMedium) {

        .resourceControls {

            position: absolute; right: 0; top: 0; height: 5em;
            box-sizing: border-box; padding: 0.5em;
            z-index: $zIndexHeader + 10;

            > button,
            > a,
            .dropdownControls >.toggleBtn {

                animation: slideFromRight 0.2s;
                @include fontSansCondensedBold;

                font-size: 1.2em; padding: 0 em(15,12) 0 em(15,12);
                line-height: em(41,12); height: em(40,12); float: left; position: relative;
                text-transform: uppercase; letter-spacing: 0.05em; color: $colorGrayDark2;

                &:hover { color: $colorMain1; }

                &:after {
                    content: ""; position: absolute; left: 0; top: 1em; bottom: 1em; border-left: 1px solid $colorGrayLight1;
                }

                &.accented {

                    padding: 0 em(40,12) 0 em(15,12); margin-left: em(5,12);
                    background-color: $colorMain1; color: #fff; border-radius: 0.3em;

                    &:hover { background-color: lighten($colorMain1,2%); color: #fff; }
                    &:before { left: auto; right: em(0,14); font-size: 1.4em; }
                    &:after { display: none; }

                }

                &.icr {

                    padding: 0; width: em(38,12); height: em(40,12);

                    &:before { left: 0; }

                }

                &.withLeftIcon {

                    padding-left: em(37,12);

                    &:before { font-size: 1.2em; }

                }

                &:first-child:after { display: none; }

            }

            .dropdownControls.accentedAdjecent >.toggleBtn {

                margin-left: -0.3em;
                border-radius: 0 0.3em 0.3em 0;
                border-left: 1px solid darken($colorMain1, 10%);

            }

            .dropdown > button.hiddenOnDesktop,
            .dropdown > a.hiddenOnDesktop { display: none; }

        }

    }

</style>
