<template>
    <form
        class="massActionsType1"
        @submit.prevent="runSelectedAction"
        :class="{
            activeDropdown: selectedModelsOpened,
            withSelection: selectedModels.length
        }"
        v-on-dismiss="{
            callback: closeSelectedModels,
            watch: selectedModelsOpened
        }"
    >
        <div class="selectCont">
            <div class="select">
                <button type="button">
                    {{ selectedAction }}
                    <span v-if="selectedModels.length" class="count">({{ selectedModels.length }})</span>
                </button>
                <select v-model="selectedAction">
                    <option
                        v-for="action in actions"
                        :key="action.caption"
                    >{{ action.caption }}</option>
                </select>
            </div>
        </div>
        <button
            class="submitBtn"
            :class="{active: selectedModels.length > 0}"
            type="submit"
        >{{ submitButtonCaption }}</button>
        <div
            class="selectedItems withItems"
            v-if="selectedModels.length"
        >
            <button
                type="button"
                class="toggleSelectedItems nBtn iconChevronDown"
                @click="toggleSelectedItems"
            >{{ translations.selectedItemsCaption }}: {{ selectedModels.length }}</button>
            <div class="dropdown">
                <ul>
                    <li v-for="model in selectedModels" :key="model.cid">
                        <button
                            class="nBtn removeItem iconX"
                            type="button"
                            @click="deselectModel(model)"
                        >{{ getModelCaption(model) }}</button>
                    </li>
                </ul>
            </div>
        </div>
    </form>
</template>

<script>
import {find, result, assign} from '../library/toolkit.js';
import vueDismiss from 'vue-dismiss';
import translate from '../library/translate.js';
import {confirm} from '../components/dialogModal.vue';
import Loader from '../library/loader.js';

export default {

    mixins: [vueDismiss],

    props: {
        selectedModels: Array,
        actions: Array,
        resourceCaption: {type: [Function, String], default: 'id'}
    },

    data() {

        return {
            selectedModelsOpened: false,
            selectedAction: this.actions[0].caption,
            translations: {
                selectedItemsCaption: translate('massActions.selectedItemsCaption'),
                submitButtonCaption: translate('massActions.confirmButtonCaption')
            }
        };

    },

    computed: {

        currentAction() {

            return find(this.actions, action => action.caption === this.selectedAction);

        },

        submitButtonCaption() {

            return this.currentAction.buttonCaption || this.translations.submitButtonCaption;

        }
    },

    methods: {

        getModelCaption(model) {

            return typeof this.resourceCaption === 'function'
                ? this.resourceCaption(model)
                : (this.resourceCaption === 'id' ? 'ID: ' + model.get('id') : model.get(this.resourceCaption))
            ;

        },

        runSelectedAction() {

            const definition = this.currentAction;
            const resolutions = [];
            const rejections = [];

            const executeAction = () => {

                let actionPromise;
                const loader = Loader.on();

                if (definition.action) {

                    actionPromise = Promise.all(this.selectedModels.map(model => {
                        return Promise.resolve(definition.action(model)).then(() => {
                            resolutions.push(model);
                        }).catch(() => {
                            rejections.push(model);
                        });
                    }));

                } else if (definition.updateAttributes) {

                    actionPromise = Promise.all(this.selectedModels.map(model => {
                        return model.save({
                            attributes: result(definition.updateAttributes, [model])
                        }).then(() => {
                            resolutions.push(model);
                        }).catch(() => {
                            rejections.push(model);
                        });
                    }));

                } else if (definition.massAction) {
                    actionPromise = Promise.resolve(definition.massAction(this.selectedModels));
                }

                actionPromise.then(() => {

                    const params = {resolutions, rejections, selectedModels: this.selectedModels};

                    definition.onComplete && definition.onComplete(params);

                    if (definition.updateMessage) {

                        const errorsPresent = rejections.length > 0;
                        const userMessageData = result(definition.updateMessage[errorsPresent ? 'error' : 'success'], params);
                        const messageData = assign({
                            type: errorsPresent ? 'error' : 'success'
                        }, typeof userMessageData === 'string' ? {text: userMessageData} : userMessageData);

                        this.$emit('message', messageData);

                    }

                    loader.off();

                }).catch(error => { loader.off(); return Promise.reject(error); });

            };

            if (this.selectedModels.length) {

                definition.confirm
                    ? confirm({
                        message: typeof definition.confirm === 'string' ? definition.confirm : undefined,
                        onAccept: executeAction,
                        parent: this
                    })
                    : executeAction();

            }

        },

        toggleSelectedItems() {

            this.selectedModelsOpened = !this.selectedModelsOpened;

        },

        openSelectedModels() {

            this.selectedModelsOpened = true;

        },

        closeSelectedModels() {

            this.selectedModelsOpened = false;

        },

        deselectModel(model) {
            setTimeout(() => this.$emit('deselectModel', model), 20);
        }

    }

};

</script>

<style lang="scss" scoped>

    .massActionsType1 {

        > .selectCont {

            padding: 0; display: inline-block; vertical-align: top;

        }

        .select {

            display: inline-block; position: relative;

            &:before {

                @include iconFont($iconFontName);
                @include iconElementGraphic(30, 30);

                content: map-get($icons, 'chevronDown'); left: auto; right: 0; font-size: 1.3em;
                color: $colorGrayDark3;

            }

            > button {

                @include normalizeButton;
                @include fontSans;

                line-height: em(27,13); font-size: 1.3em; padding: 0 em(28,13) 0 em(10,13);
                position: relative; display: inline-block;
                color: $colorGrayDark3;
                border: 1px solid lighten($colorGrayDark3, 5%); border-right: 0; border-radius: em(4,13) 0 0 em(4,13);

            }

            > select {

                position: absolute; left: 0; top: 0; width: 100%; height: 100%;
                cursor: pointer; opacity: 0; font-size: 1.6em;

            }

        }

        > .submitBtn {

            appearance: none;
            @include fontSans;

            font-size: 1.3em; position: relative; display: inline-block; line-height: em(27,13);
            padding: 0 em(10,13) 0 em(10,13); margin-left: em(-4,13);
            color: $colorGrayDark3; vertical-align: top;
            border: 1px solid lighten($colorGrayDark3, 5%); background: transparent; border-radius: 0 em(4,13) em(4,13) 0;
            cursor: pointer;

            &.active {

                @include hover {

                    background-color: $colorMain1; border-color: $colorMain1; color: #fff;

                }

            }

        }

        > .selectedItems {

            display: none;

            > .toggleSelectedItems {

                font-size: 1.3em; line-height: divide(18,13); padding: em(5,13) em(25,13) em(5,13) em(10,13); color: $colorGrayDark3; display: block;

                &:before {

                    left: auto; right: 0; width: 25px;

                }

            }

            &.withItems {

                display: inline-block;

            }

            > .dropdown {

                animation: slideDownFadeIn 0.2s;

                position: absolute; z-index: 20; padding: 0.5em;
                background: #fff; border: 1px solid $colorGrayLight2; border-radius: 0.4em;
                box-shadow: 0 0.1em 0.3em rgba(#000, 0.06);

                display: none;

                > ul {

                    max-height: 30em; overflow-x: hidden; overflow-y: auto;

                }

                &:after {

                    content: ''; width: 0.7em; height: 0.7em; position: absolute; left: 1.4em; top: 0; margin-top: -0.5em;
                    background-color: #fff; border: 1px solid $colorGrayLight2; border-width: 1px 1px 0 0;
                    transform: rotate(-45deg); z-index: 21;

                }

            }

        }

        .removeItem {

            font-size: 1.3em; width: 100%; line-height: divide(18,13);
            display: block; overflow: hidden; padding: em(7,13) em(10,13) em(7,13) em(25,13);
            color: #000; text-align: left;

            &:before {

                font-size: 0.9em; width: 25px; opacity: 0.4;

            }

            &:hover {

                color: $colorMain1;

                &:before { opacity: 1; }

            }

        }

        &.activeDropdown {

            > .selectedItems > .dropdown {

                display: block;

            }

        }

        @include mediaMaxWidth($breakpointMedium) {

            border-bottom: 1px solid $colorGrayLight2;

            .select > button {

                padding-left: em(20,13); line-height: em(40,13);
                border: 0; border-radius: 0;

            }

            .submitBtn {

                float: right; padding: 0 em(15,13); line-height: em(40,13);
                border: 0; border-left: 1px solid $colorGrayLight2; border-radius: 0;

            }

            > .selectedItems,
            > .selectedItems.withItems {

                display: none;

            }

        }

        @include mediaMinWidth($breakpointMedium) {

            transition: opacity 0.3s;
            opacity: 0.7;

            &.withSelection {

                opacity: 1;

            }

            .select > button > .count {

                display: none;

            }

            > .selectedItems {

                position: relative;

                > .dropdown {

                    top: 100%; left: 1em; width: 20em;

                }

            }

        }

    }

</style>
