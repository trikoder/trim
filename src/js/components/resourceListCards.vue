<template>
    <ul class="cardListType1" :key="modelCollection.cid">
        <li v-for="model in modelCollection.models" :key="model.cid">
            <div class="cardType1">
                <div v-if="definitions.massActions.length" class="massActionCheckboxControl">
                    <input
                        type="checkbox"
                        :id="'mac-' + model.cid"
                        class="checkboxType1 massActionCheckbox"
                        :checked="isModelSelected(model)"
                        @change="$event.target.checked ? selectModel(model) : deselectModel(model)"
                    >
                    <label class="icr iconCheck" :for="'mac-' + model.cid"></label>
                </div>
                <component
                    v-for="(definition, index) in definitions.listItems"
                    :key="index"
                    :is="definition.Type"
                    :resourceModel="model"
                    v-bind="definition.options"
                ></component>
            </div>
        </li>
    </ul>
</template>

<script>

export default {

    props: {
        modelCollection: {type: Object, required: true},
        definitions: {type: Object, required: true},
        allModelsAreSelected: {type: Boolean, required: true},
        selectAllModels: {type: Function, required: true},
        deselectAllModels: {type: Function, required: true},
        isModelSelected: {type: Function, required: true},
        selectModel: {type: Function, required: true},
        deselectModel: {type: Function, required: true}
    }

};

</script>

<style lang="scss" scoped>

    .cardListType1 {

        animation: slideDownFadeIn 0.2s;

        > li { margin: 1em; }

        @include mediaMinWidth($breakpointMedium) {

            display: flex; flex-wrap: wrap; margin: 0 -1em;

            > li {

                display: flex; flex-wrap: wrap; width: percentage(divide(1,5));
                box-sizing: border-box; padding: 1em; margin: 0;

            }

        }

    }

    .cardType1 {

        min-height: 20em; padding: 3.5em 1em 1em; position: relative; width: 100%; box-sizing: border-box;
        background-color: #fff;

        ::v-deep {

            > .mediaListItemType1 {

                margin-bottom: 1.5em;

            }

            > .linkListItemType1 {

                margin-bottom: em(12,14); display: block;

            }

            > .linkListImageView {

                font-size: em(56,14); text-align: center;
                display: block; margin-bottom: em(5,14); padding: em(7,14) 0;
                background-color: #f5f5f5;

            }

            > .textListItemType1 {

                margin-bottom: em(5,14); display: block;

            }

            > .contextMenuType1 {

                position: absolute !important; right: -0.3em; top: 1em;

                > ul {

                    right: 0.7em !important;

                    &:after { right: 0.8em; }

                }

            }

            > .externalAdminPicker {

                position: absolute; right: 2.3em; top: -0.3em;
                // padding-right: 0.9em; padding-left: 1.6em;
                // border: 0; border-radius: 0;border-right: 1px solid $colorGrayLight1;

                &:before {

                    content: map-get($icons, 'arrowDownCircle');

                }

            }

        }

        > .massActionCheckboxControl {

            position: absolute; left: 0.3em; top: 0.2em;

        }

    }

</style>
