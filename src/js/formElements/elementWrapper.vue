<template>
    <div v-bind="wrapperAttributes" v-show="visible">
        <label
            v-if="label"
            v-bind="labelAttributes"
            :for="elementId"
            v-html="label"
        ></label>
        <div v-if="renderInputWrapper" ref="inputWrapper" v-bind="inputWrapperAttributes">
            <slot></slot>
        </div>
        <slot v-else></slot>
        <div
            v-if="hint"
            v-bind="hintAttributes"
            v-html="hint"
        ></div>
        <p v-if="errorMessage" :class="errorMessageClass" >
            {{ errorMessage }}
        </p>
    </div>
</template>

<script>
export default {

    props: {
        wrapperAttributes: Object,
        labelAttributes: Object,
        inputWrapperAttributes: Object,
        hintAttributes: Object,
        label: String,
        hint: String,
        elementId: String,
        errorMessage: String,
        errorMessageClass: {type: String, default: 'errorMessage errorMessageType1'},
        renderInputWrapper: {type: Boolean, default: true},
        visible: Boolean
    }

};
</script>

<style lang="scss">

    @use '../../scss/library/all' as *;

    .labelType1 {

        font-size: 1.3em; display: inline-block; padding: 0 em(5,13);
        color: $colorGrayDark2; letter-spacing: 0.03em;

    }

    .labelType2 {

        @include fontSans;
        font-size: 1.3em; padding: em(5,13) 0;
        color: $colorGrayDark2;

    }

    .hintType1 {

        @include fontSans;
        font-size: 1.2em; line-height: 1.4;
        display: inline-block; margin-top: em(10,12);
        color: lighten($colorGrayDark2, 15%);

    }

    .checkboxLabelType1 {

        font-size: 1.5em; display: inline-block; padding: em(6,15) 0 em(6,15) em(25,15);
        color: $colorGrayDark1; letter-spacing: 0.03em;

    }

    .errorMessageType1 {

        @include fontSans;
        display: inline-block; font-size: 1.3em; color: $colorError;

    }

    .inputBlockType1 {

        position: relative;

        .labelType2 {

            display: block; margin-bottom: em(5,13);

            &.mod1 {

                margin-bottom: 0; padding-bottom: 0;

            }

        }

        .inputType2 {

            display: block; width: 100%;

        }

        .checkboxType1 + label {

            position: absolute; left: em(-7,10); top: 0;

        }

        .vdpComponent {

            display: block;

            .vdpClearInput {

                top: -1.5em; bottom: 1.5em; right: -1.2em;

            }

        }

        .errorMessageType1 {

            animation: slideDownFadeIn 0.2s;
            display: block; margin: 0.5em 0;

        }

        .externalAdminElement,
        .externalAdminElement.withOne > .item,
        .mediaInputType1 {

            display: block;

        }

        .externalAdminElement.withMany {

            position: relative; padding: 0 3.2em 0.7em 0; min-height: 2.5em;

            > .item {

                margin: em(7,12) 0 0 em(7,12);

            }

            > .openBtn {

                position: absolute; top: 0.1em; right: 0;

            }

        }

        .nestedSelectElement {

            display: block; border: 1px solid $colorGrayLight2; background: #fff; border-radius: 0.3em;

            &.hasOne .item {

                padding: em(7,14) em(5,14) em(3,14);

            }

        }

    }

    .inlineInputBlockType1 {

        display: inline-block; position: relative;
        background-color: #fff; border: 1px solid $colorGrayLight2; border-radius: 0.4em;

        > div,
        > div > input,
        > label,
        .multiselect,
        .externalAdminElement {

            display: inline-block; background-color: transparent; border: 0; vertical-align: middle;

        }

        .multiselect {
            margin-left: 0.5em;
        }

        .scClearInput {

            top: -1.5em; bottom: 1.5em; right: -1.4em;

        }

        &.withError {

            border-color: $colorError;

            .errorMessageType1 {
                position: absolute; left: 0; top: 100%; margin-top: 0.3em; display: none; z-index: 10;
                background-color: #fff; padding: 0.5em; border: 1px solid $colorError; border-radius: em(4,13);
            }

            &:hover .errorMessageType1 {
                display: block;
            }

        }

        .externalAdminElement > .media {

            font-size: 0.8em;

        }

        .nestedSelectElement {

            &.hasOne .item {

                padding: em(6,14) em(5,14) 0;

            }

        }

        > label {

            padding-left: 1em; padding-right: 0; line-height: 34px;

        }

        .checkboxType1 + label {

            vertical-align: middle; margin-right: 0.3em;

        }

    }

    .inlineInputBlockType2 {

        display: inline-block;
        background-color: #fff; border: 1px solid $colorGrayLight2; border-radius: 0.4em;

    }

    .inputBlockHidden {

        display: none;

    }

    .includedAdminBlockType1 {

        > .labelType2 {

            display: block; margin-bottom: 0.5em;

        }

    }

</style>
