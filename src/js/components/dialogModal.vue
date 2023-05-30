<template>
    <div class="overlay">
        <form class="modal" @submit.prevent="accept">
            <p class="message">{{ message }}</p>
            <div class="controls">
                <button
                    class="cancelBtn nBtn"
                    type="button"
                    v-if="!acceptOnly"
                    @click.prevent="cancel"
                >{{ cancelText }}</button>
                <button
                    ref="acceptBtn"
                    :class="['acceptBtn nBtn', {fullSize: acceptOnly}]"
                    type="submit"
                    @click.prevent="accept"
                >{{ acceptText }}</button>
            </div>
        </form>
    </div>
</template>

<script>

import translate from '../library/translate.js';
import {assign, isPlainObject} from '../library/toolkit.js';
import app from '../app.js';
import addModal from '../library/addModal.js';

const Component = {

    props: {
        message: {type: String, default: () => translate('prompt.defaultMessage')},
        acceptText: {type: String, default: () => translate('prompt.acceptText')},
        cancelText: {type: String, default: () => translate('prompt.cancelText')},
        acceptOnly: {type: Boolean, default: false},
        onAccept: {type: Function, default: () => {}},
        onCancel: {type: Function, default: () => {}},
        parent: {type: Object}
    },

    mounted() {

        this.$refs.acceptBtn.focus();

        this.$watch('$route', () => {
            this.remove();
        });

    },

    methods: {

        accept() {

            this.onAccept();
            this.remove();

        },

        cancel() {

            this.onCancel();
            this.remove();

        },

        remove() {

            this.$emit('closeModal');

        }

    }

};

export default Component;

export function confirm(message, onAccept, config) {

    let params;

    if (isPlainObject(message)) {
        params = message;
    } else if (typeof message === 'function') {
        params = {onAccept: message};
    } else {
        params = assign({}, config, {message, onAccept});
    }

    return addModal({
        props: () => params,
        component: () => Component,
        parent: () => params.parent || app.rootView
    });

}

</script>

<style lang="scss" scoped>

    .overlay {

        position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: 3000;
        background-color: rgba(#000, 0.5); animation: fadeIn 0.5s;

    }

    .modal {

        position: absolute; width: 30em; left: 50%; top: 40%; margin: -4em 0 0 -15em;
        background-color: #fff; text-align: center;
        box-shadow: 0 0.2em 0.5em rgba(#000, 0.2); border-radius: 0.3em;
        animation: slideDownFadeIn 0.5s;

        @include mediaMinWidth($breakpointMedium) {
            width: 32em; margin-left: -16em;
        }

    }

    .message {

        @include fontSans;
        font-size: 1.4em; padding: em(25,14) em(30,14) em(25,14); margin: 0;
        line-height: 1.5;
        text-align: center; color: #4B4B4B;

    }

    .controls {

        position: relative; overflow: hidden;
        border-top: 1px solid #e9e9e9;

    }

    .cancelBtn, .acceptBtn {

        font-size: 1.4em; font-weight: bold; float: left;
        width: 50%; padding: em(15,14) 0; box-sizing: border-box;
        color: #a6a6a6; text-decoration: none; text-transform: uppercase;  text-align: center;

        &:hover, &:focus { color: darken(#a6a6a6,10%); }

    }

    .acceptBtn {

        color: #5D5B5B; border-left: 1px solid #e9e9e9; margin-left: -1px;

        &:hover, &:focus { color: darken(#5D5B5B,10%); }

        &.fullSize {

            float: none; width: 100%; border: 0; display: block;

        }

    }

</style>
