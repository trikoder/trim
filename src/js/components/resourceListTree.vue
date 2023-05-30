<template>
    <table class="tableType1 nested" :key="modelCollection.cid">
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
            <tr
                v-for="item in treeItems"
                :key="item.model.cid"
                :style="{marginLeft: screenIsSmall ? (item.level - 1) * 20 + 'px' : undefined}"
                :class="{indented: item.level > 1}"
            >
                <td
                    v-if="definitions.massActions.length"
                    class="massActionCheckboxCell"
                >
                    <input
                        type="checkbox"
                        :id="'mac-' + item.model.cid"
                        class="checkboxType1 massActionCheckbox"
                        :checked="isModelSelected(item.model)"
                        @change="$event.target.checked ? selectModel(item.model) : deselectModel(item.model)"
                    >
                    <label class="icr iconCheck" :for="'mac-' + item.model.cid"></label>
                </td>
                <td
                    v-for="(definition, index) in definitions.listItems"
                    :key="index"
                    :class="definition.Type.elementType + 'Cell'"
                >
                    <template v-if="index === 0">
                        <span
                            v-for="n in item.spacers"
                            :key="n"
                            class="treeSpacer"
                        ></span><button
                            v-if="item.expandable"
                            @click="toggleNode(item)"
                            type="button"
                            :class="[
                                'treeBtn nBtn icr',
                                item.expanded ? 'iconMinus' : 'iconPlus'
                            ]"
                        ></button>
                    </template>
                    <component
                        :is="toComponent(definition.Type)"
                        :resourceModel="item.model"
                        v-bind="definition.options"
                    ></component>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import screenSize from '../mixins/screenSize.js';

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
