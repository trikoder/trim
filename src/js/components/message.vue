<template>
    <div class="message" :class="[type, {withAction: Boolean(action), withClose: Boolean(closeAfter) === false}]">
        <div class="text" v-html="text"></div>
        <button
            v-if="!closeAfter"
            type="button"
            class="closeBtn nBtn icr iconClose"
            @click="close"
        >
            {{ translations.closeCaption}}
        </button>
        <button
            v-if="action"
            type="button"
            class="actionBtn nBtn"
            @click="runAction"
        >
            {{ actionCaption }}
        </button>
    </div>
</template>

<script>
import translate from '../library/translate.js';

export default {

    props: {
        text: String,
        closeAfter: {type: [Number, Boolean], default: true},
        action: {type: Function},
        actionCaption: {type: String, default: translate('message.actionCaption')},
        type: {type: String, default: 'success'}
    },

    data: () => ({
        translations: {
            closeCaption: translate('message.closeText')
        }
    }),

    mounted() {

        this.closeWithDelay();

    },

    updated() {

        this.closeWithDelay();

    },

    beforeUnmount() {

        this.closeTimeout && clearTimeout(this.closeTimeout);

    },

    methods: {

        closeWithDelay() {

            clearTimeout(this.closeTimeout);

            if (this.closeAfter) {
                this.closeTimeout = setTimeout(
                    () => this.close(), this.closeAfter === true ? 3000 : this.closeAfter
                );
            }

        },

        runAction() {

            this.action();
            this.close();

        },

        close() {

            clearTimeout(this.closeTimeout);
            this.$emit('close');

        }

    }

};

</script>

<style lang="scss" scoped>

    @use '../../scss/library/all' as *;

    .message {

        font-size: 1.4em; padding: em(20,14); position: relative;
        color: #16A740; background-color: #F4FFF6;
        text-align: center;

        > .closeBtn {

            position: absolute; left: em(10,14); top: em(8,14);

            &:before { color: #16A740; }

        }

        > .actionBtn {

            @include fontSansCondensedBold;
            display: block; font-size: em(12,14); padding: em(8,12) em(10,12); text-align: center; width: 100%; margin-top: em(20,12);
            border: 1px solid #16A740; border-radius: em(3,12); text-transform: uppercase; letter-spacing: 0.05em;

            &:hover {

                box-shadow: 0 0.2em 0.3em rgba(#000, 0.05);

            }

        }

        &.withClose {

            padding: em(20,14) em(40,14);

        }

        &.error {

            background-color: #F8E6E5; color: darken(#F8E6E5, 40%);

            > .actionBtn {

                border-color: darken(#F8E6E5, 20%); color: darken(#F8E6E5, 40%);

            }

            > .closeBtn:before {

                color: darken(#F8E6E5, 20%);

            }

        }

        &.warning {

            background-color: #F8F6E5; color: darken(#F8F6E5, 70%);

            > .actionBtn {

                border-color: darken(#F8F6E5, 40%); color: darken(#F8F6E5, 70%);

            }

            > .closeBtn:before {

                color: darken(#F8F6E5, 40%);

            }

        }

        &.info {

            background-color: #f9f9f9; color: darken(#f9f9f9, 70%);

            > .actionBtn {

                border-color: darken(#f9f9f9, 40%); color: darken(#f9f9f9, 70%);

            }

            > .closeBtn:before {

                color: darken(#f9f9f9, 40%);

            }

        }

        @include mediaMinWidth($breakpointMedium) {

            &.withAction {

                padding-right: em(200,14);

            }

            > .actionBtn {

                margin: 0; position: absolute; right: em(12,12); top: em(12,12); width: auto;

            }

        }

    }

</style>
