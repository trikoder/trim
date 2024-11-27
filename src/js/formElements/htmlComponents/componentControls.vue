<template>
    <div class="componentControls">
        <template v-for="(control, index) in controls" :key="index">
            <button
                type="button" class="buttonControl nBtn icr" :class="getIconClass(control)"
                :title="control.caption"
                :data-sort-handle="control.isSortHandle ? 'true' : null"
                @click="runControlAction(control)"
            >{{ control.caption }}</button>
        </template>
    </div>
</template>

<script>
import {capitalize} from '../../library/toolkit.js';

export default {

    props: {
        controls: Array
    },

    methods: {

        getIconClass(control) {
            return control.icon ? 'icon' + capitalize(control.icon) : null;
        },

        runControlAction(control) {
            control.action && control.action();
        }

    }

};
</script>

<style lang="scss" scoped>
@use '../../../scss/library/all' as *;

.componentControls {
    position: absolute; right: -1px; top: -1px;
    background: #fff; border-radius: 0.4em;
    border: 1px solid $colorGrayLight1;
}

.buttonControl {
    display: block;
    color: darken($colorGrayLight2, 15%);

    &:hover {
        color: darken($colorGrayLight2, 30%);
    }

    &:before {
        font-size: 1.4em;
    }

    &[data-sort-handle] {
        cursor: move;
    }
}

</style>

