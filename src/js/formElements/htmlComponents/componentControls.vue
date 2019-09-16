<template>
    <div class="componentControls">
        <template v-for="(control, index) in controls">
            <button
                v-if="isButtonControl(control)" type="button"
                class="buttonControl nBtn icr" :class="getIconClass(control)"
                :key="index" :title="control.caption"
                @click="runControlAction(control)"
            >{{ control.caption }}</button>
        </template>
    </div>
</template>

<script>
import {capitalize} from '../../library/toolkit';

export default {

    props: {
        controls: Array
    },

    methods: {

        getIconClass(control) {
            return control.icon ? 'icon' + capitalize(control.icon) : null;
        },

        isButtonControl(control) {
            return true;
        },

        runControlAction(control) {
            control.action && control.action();
        }

    }

};
</script>

<style lang="scss" scoped>

.componentControls {
    position: absolute; right: -1px; top: -1px;
    background: #fff; border-radius: 0.4em;
    border: 1px solid $colorGrayLight1;
}

.buttonControl {
    display: block;
    &:before {
        font-size: 1.4em;
    }

    &:hover {
        color: $colorMain1;
    }
}

</style>

