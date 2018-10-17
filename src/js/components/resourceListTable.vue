<template>
    <table class="tableType1" v-bind:key="modelCollection.cid">
        <thead>
            <th
                v-if="definitions.massActions.length"
                class="massActionCheckboxHeading"
            >
                <input
                    type="checkbox"
                    v-bind:id="'mac-' + modelCollection.cid"
                    class="checkboxType1 massActionCheckbox"
                    v-bind:checked="allModelsAreSelected"
                    v-on:change="$event.target.checked ? selectAllModels() : deselectAllModels()"
                >
                <label class="icr iconCheck" v-bind:for="'mac-' + modelCollection.cid"></label>
            </th>
            <th
                v-for="(definition, index) in definitions.listItems"
                v-bind:key="index"
                v-bind:class="definition.Type.elementType + 'CellHeading'"
            >
                {{ definition.options.caption }}
            </th>
        </thead>
        <tbody>
            <tr v-for="model in modelCollection.models" v-bind:key="model.cid">
                <td
                    v-if="definitions.massActions.length"
                    class="massActionCheckboxCell"
                >
                    <input
                        type="checkbox"
                        v-bind:id="'mac-' + model.cid"
                        class="checkboxType1 massActionCheckbox"
                        v-bind:checked="isModelSelected(model)"
                        v-on:change="$event.target.checked ? selectModel(model) : deselectModel(model)"
                    >
                    <label class="icr iconCheck" v-bind:for="'mac-' + model.cid"></label>
                </td>
                <td
                    v-for="(definition, index) in definitions.listItems"
                    v-bind:key="index"
                    v-bind:class="getCellClass(definition)"
                >
                    <component
                        v-bind:is="definition.Type"
                        v-bind:resourceModel="model"
                        v-bind="definition.options"
                    ></component>
                </td>
            </tr>
        </tbody>
    </table>
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
    },

    methods: {

        getCellClass(definition) {

            const caption = definition.options.caption;
            const captionClass = caption && caption.toLowerCase() === 'id'
                ? 'smallWidthCell'
                : undefined
            ;

            return [
                definition.Type.elementType + 'Cell',
                definition.options.cellClass || captionClass
            ];

        }

    }

};

</script>
