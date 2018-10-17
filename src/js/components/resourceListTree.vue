<template>
    <table class="tableType1 nested" v-bind:key="modelCollection.cid">
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
            <tr
                v-for="item in treeItems"
                v-bind:key="item.model.cid"
                v-bind:style="{marginLeft: screenIsSmall ? (item.level - 1) * 20 + 'px' : undefined}"
                v-bind:class="{indented: item.level > 1}"
            >
                <td
                    v-if="definitions.massActions.length"
                    class="massActionCheckboxCell"
                >
                    <input
                        type="checkbox"
                        v-bind:id="'mac-' + item.model.cid"
                        class="checkboxType1 massActionCheckbox"
                        v-bind:checked="isModelSelected(item.model)"
                        v-on:change="$event.target.checked ? selectModel(item.model) : deselectModel(item.model)"
                    >
                    <label class="icr iconCheck" v-bind:for="'mac-' + item.model.cid"></label>
                </td>
                <td
                    v-for="(definition, index) in definitions.listItems"
                    v-bind:key="index"
                    v-bind:class="definition.Type.elementType + 'Cell'"
                >
                    <template v-if="index === 0">
                        <span
                            v-for="n in item.spacers"
                            v-bind:key="n"
                            class="treeSpacer"
                        ></span><button
                            v-if="item.expandable"
                            v-on:click="toggleNode(item)"
                            type="button"
                            class="treeBtn nBtn icr iconPlus"
                        ></button>
                    </template>
                    <component
                        v-bind:is="definition.Type"
                        v-bind:resourceModel="item.model"
                        v-bind="definition.options"
                    ></component>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import screenSize from '../mixins/screenSize';

export default {

    mixins: [screenSize],

    props: {
        modelCollection: {type: Object, required: true},
        definitions: {type: Object, required: true},
        allModelsAreSelected: {type: Boolean, required: true},
        selectAllModels: {type: Function, required: true},
        deselectAllModels: {type: Function, required: true},
        isModelSelected: {type: Function, required: true},
        selectModel: {type: Function, required: true},
        deselectModel: {type: Function, required: true},
        treeItems: {type: Array, required: true},
        expandNode: {type: Function, required: true},
        collapseNode: {type: Function, required: true}
    },

    methods: {

        toggleNode(nodeItem) {

            nodeItem.expanded
                ? this.collapseNode(nodeItem.model)
                : this.expandNode(nodeItem.model)
            ;

        }

    }

};

</script>
