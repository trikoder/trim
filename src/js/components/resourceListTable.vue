<template>
    <table class="tableType1" :key="modelCollection.cid">
        <thead>
            <th
                v-if="definitions.massActions.length"
                class="massActionCheckboxHeading"
            >
                <input
                    type="checkbox"
                    :id="'mac-' + modelCollection.cid"
                    class="checkboxType1 massActionCheckbox"
                    :checked="allModelsAreSelected"
                    @change="$event.target.checked ? selectAllModels() : deselectAllModels()"
                >
                <label class="icr iconCheck" :for="'mac-' + modelCollection.cid"></label>
            </th>
            <th
                v-for="(definition, index) in definitions.listItems"
                :key="index"
                :class="definition.Type.elementType + 'CellHeading'"
            >
                {{ definition.options.caption }}
            </th>
        </thead>
        <tbody>
            <tr v-for="model in modelCollection.models" :key="model.cid">
                <td
                    v-if="definitions.massActions.length"
                    class="massActionCheckboxCell"
                >
                    <input
                        type="checkbox"
                        :id="'mac-' + model.cid"
                        class="checkboxType1 massActionCheckbox"
                        :checked="isModelSelected(model)"
                        @change="$event.target.checked ? selectModel(model) : deselectModel(model)"
                    >
                    <label class="icr iconCheck" :for="'mac-' + model.cid"></label>
                </td>
                <td
                    v-for="(definition, index) in definitions.listItems"
                    :key="index"
                    :class="getCellClass(definition)"
                >
                    <component
                        :is="toRawComponentProps(definition.Type)"
                        :resourceModel="model"
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
