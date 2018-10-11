<template>
    <section v-bind:class="className">
        <div class="controls">
            <div class="sizeControls">
                <button
                    v-for="item in parsedScreenSizes"
                    class="nBtn" v-bind:key="item.size"
                    v-bind:class="{active: item.size === currentSize}"
                    v-on:click="setSize(item.size)"
                    type="button"
                >{{item.caption}}</button>
            </div>
            <input disabled="disabled" type="text" class="previewUrl" v-bind:value="url" />
        </div>
        <div class="pageContainerWrap">
            <div class="pageContainer" v-bind:style="{width: currentSize}">
                <iframe v-bind:src="url" frameborder="0"></iframe>
            </div>
        </div>
    </section>
</template>

<script>

import Vue from 'vue';
import app from '../app';
import {Popup} from './popup';

const Component = Vue.extend({

    props: {
        className: {type: String, default: 'pagePreviewType1'},
        url: {type: String, required: true},
        screenSizes: {type: Array, default: () => [320, 728, 1024, 1300]}

    },

    data: () => ({
        currentSize: '100%'
    }),

    computed: {

        parsedScreenSizes() {

            return [{caption: '100%', size: '100%'}].concat(this.screenSizes.map(size => {

                if (typeof size === 'object') {
                    return size;
                } else if (typeof size === 'number') {
                    return {caption: size.toString(), size: size + 'px'};
                } else if (typeof size === 'string') {
                    return {caption: size, size};
                }

            }));

        }

    },

    methods: {

        setSize(size) {

            this.currentSize = size;

        }

    }

});

export default Component;

export function PagePreview(config) {

    config = typeof config === 'string' ? {url: config} : config;

    return Popup({
        component: Component,
        props: config,
        dark: true,
        parent: config.parent || app.rootView
    });

};

</script>

<style lang="scss" scoped>

    .pagePreviewType1 {

        > .controls {

            padding: 2em;

        }

        .sizeControls {

            display: inline-block; vertical-align: middle;
            border: 1px solid #777; border-radius: 0.3em;

            > button {

                transition: color 0.3s;

                font-size: 1.3em; padding: em(4,13) em(20,13);
                color: #777;

                &:not(:first-child) {

                    border-left: 1px solid #777;

                }

                &.active,
                &:hover { color: #fff; }

            }

        }

        .previewUrl {

            appearance: none;
            @include ellipsis(45%);

            font-size: 1.4em;  display: inline-block; vertical-align: middle;
            margin-left: em(20,14); width: 45%;
            color: #777; border: 0; background: transparent;

        }

        > .pageContainerWrap {

            position: absolute; left: 2em; right: 2em; top: 6.8em; bottom: 0;

        }

        .pageContainer {

            transition: width 0.5s;

            position: absolute; left: 0; top: 0; width: 100%; height: 100%;
            box-shadow: 0 0.2em 0.5em rgba(#000, 0.4);

            > iframe {

                position: absolute; left: 0; top: 0; width: 100%; height: 100%;

            }

        }

    }

</style>
