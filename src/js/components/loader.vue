<template>
    <transition name="loader">
        <div
            v-if="$store.state.loading"
            class="loadingSpinner"
            v-bind:class="popupClass"
        >
            <div v-for="n in 5" v-bind:key="n" v-bind:class="'rect' + n"></div>
        </div>
    </transition>
</template>

<script>

export default {

    computed: {

        popupClass() {

            return this.$store.state.popupLevel
                ? 'popupActive popupLevel' + this.$store.state.popupLevel
                : undefined
            ;

        }

    }
};

</script>

<style lang="scss" scoped>

    .loader-enter-active, .loader-leave-active {
        transition: opacity 0.2s;
    }
    .loader-enter, .loader-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    @include mediaMaxWidth($breakpointMedium) {

        @keyframes loaderMobile {
            from  { opacity: 0.2; }
            to { opacity: 1; }
        }

        .loadingSpinner {

            position: fixed; left: 0; top: 0; right: 0; bottom: 0;
            z-index: 10000; overflow: hidden;

        }

        .rect1 {

            position: absolute; left: -5em; top: 0; right: -5em; height: 0.2em;
            background-color: $colorMain1;
            animation: loaderMobile 0.6s infinite alternate;

        }

    }

    @include mediaMinWidth($breakpointMedium) {

        @keyframes sk-stretchdelay {
            0%, 40%, 100% {
                transform: scaleY(0.4);
                -webkit-transform: scaleY(0.4);
            }  20% {
                transform: scaleY(1.0);
                -webkit-transform: scaleY(1.0);
            }
        }

        .loadingSpinner {

            position: fixed; left: 0; top: 0; right: 0; bottom: 0;
            text-align: center;
            font-size: 10px;
            padding: 15px 0;
            z-index: 10000;
            background-color: $colorMain1;

            padding-left: 5em; height: auto; bottom: 0; background-color: transparent;

            &.popupLevel1  {
                padding: 3em 0 0 0; z-index: 10001;
            }

            &.popupLevel2 {
                padding: 4.5em 0 0 0;
            }

        }

        .loadingSpinner > div {

            height: 20px;
            width: 3px; margin: 0 1px;
            display: inline-block;
            background-color: $colorMain1;

            -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
            animation: sk-stretchdelay 1.2s infinite ease-in-out;

        }

        .loadingSpinner > .rect2 {
            -webkit-animation-delay: -1.1s;
            animation-delay: -1.1s;
        }

        .loadingSpinner > .rect3 {
            -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s;
        }

        .loadingSpinner > .rect4 {
            -webkit-animation-delay: -0.9s;
            animation-delay: -0.9s;
        }

        .loadingSpinner > .rect5 {
            -webkit-animation-delay: -0.8s;
            animation-delay: -0.8s;
        }

    }

</style>
