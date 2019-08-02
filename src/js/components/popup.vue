<template>
    <section :class="[this.className, 'level' + level, {modDark: dark}]">
        <div class="overlay"></div>
        <div class="content" ref="content">
            <component
                v-if="component"
                :is="component"
                v-bind="props"
                ref="component"
                @create="onComponentCreate"
            ></component>
        </div>
        <button
            :title="closeButtonCaption"
            @click="close"
            class="popupCloseBtn nBtn icr iconX"
            type="button"
        >{{closeButtonCaption}}</button>
    </section>
</template>

<script>

import Vue from 'vue';
import translate from '../library/translate';
import app from '../app';

const PopupComponent = Vue.extend({

    props: {
        component: {type: [Object, Function]},
        props: {type: Object},
        content: {type: [Object, String]},
        dark: {type: Boolean, default: false},
        onComponentCreate: {type: Function, default: () => {}},
        afterMount: {type: Function},
        afterDestroy: {type: Function},
        className: {type: String, default: 'popupType1'},
        closeButtonCaption: {type: String, default: () => translate('popup.closeButtonCaption')},
        parent: {type: Object}
    },

    data: () => ({
        level: undefined
    }),

    created() {

        this.$store.commit('addPopup');
        this.level = this.$store.state.popupLevel;

    },

    mounted() {

        if (!this.component && this.content) {

            if (typeof this.content === 'string') {
                this.$refs.content.innerHTML = this.content;
            } else {
                this.$refs.content.appendChild(this.content);
            }

        }

        if (this.afterMount) {
            this.afterMount({
                popup: this,
                component: this.$refs.component,
                content: this.$refs.content
            });
        }

    },

    destroyed() {

        this.$store.commit('removePopup');

        if (this.afterDestroy) {
            this.afterDestroy(this);
        }

    },

    methods: {

        close() {

            document.body.removeChild(this.$el);
            this.$destroy();
            return this;

        },

        open() {

            this.$mount();
            document.body.appendChild(this.$el);
            return this;

        }

    }

});

export default PopupComponent;

export function Popup(config) {

    return new PopupComponent({
        propsData: config,
        parent: config.parent || app.rootView
    }).open();

};

</script>

<style lang="scss" scoped>

    .popupType1 {

        position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 1998;

        > .overlay {

            animation: fadeIn 0.3s;

            position: absolute; left: 0; top: 0; width: 100%; height: 100%;
            background-color: rgba(#000, 0.5);

        }

        > .content {

            animation: slideUpFadeIn 0.5s;

            position: absolute; top: 0.5em; right: 0.5em; bottom: 0; left: 0.5em;
            overflow-x: hidden; overflow-y: auto; -webkit-overflow-scrolling: touch;
            background-color: #fff; box-shadow: 0 0.4em 1em rgba(#000, 0.5);

        }

        > .popupCloseBtn {

            animation: slideUpFadeIn 0.5s;

            position: absolute; left: 1em; top: 1em; width: 4em; height: 4em; z-index: 300;
            background-color: #fff; color: $colorGrayDark1; border-radius: 50%;

            &:before { font-size: 1.8em; }

            &:hover { color: darken(#666,25%); }

        }

        @include mediaMinWidth($breakpointMedium) {

            > .content {

                top: 1.5em; right: 1.5em; bottom: 0; left: 1.5em;

                &:before {

                    position: absolute; content: ""; left: 0; top: 0; right: 0; height: 5em;
                    background-color: #fff; border-bottom: 1px solid rgba(#000,0.12);

                }

            }

            > .popupCloseBtn {

                left: 1.5em; top: 1.5em; width: 5em; height: 5em;
                background: transparent;

            }

            &.level2 {

                > .content {
                    left: 3em; top: 3em; right: 3em;
                }

                > .popupCloseBtn {

                    left: 3em; top: 3em;

                }

            }

            &.modDark {

                > .content {

                    background-color: #333333;

                    &:before { display: none; }

                }

                > .popupCloseBtn {

                    left: auto; right: 2.5em; top: 2.5em;
                    border: 0; color: #fff; background-color: transparent;

                    &:before { font-size: 2.2em; }

                }

                &.level2 > .popupCloseBtn {

                    top: 4.3em; right: 4.3em;

                }

            }

        }

    }

</style>
