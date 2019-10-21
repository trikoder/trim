<template>
    <li>
        <button
            type="button"
            @click="onSelect(model)"
            :class="{selectableItem: selectable}"
            class="nBtn listItem"
        >{{ caption }}</button>
        <button
            v-if="expandable"
            @click="toggleNode"
            type="button"
            :class="[
                'treeBtn nBtn icr',
                expanded ? 'iconMinus' : 'iconPlus'
            ]"
        ></button>
        <ul v-if="expanded" class="active">
            <tree-node
                v-for="childModel in children"
                :key="childModel.get('id')"
                :model="childModel"
                :expandedResourceIds="expandedResourceIds"
                :getModelCaption="getModelCaption"
                :onExpand="onExpand"
                :onCollapse="onCollapse"
                :onSelect="onSelect"
                :isLeaf="isLeaf"
                :isLevelSelectable="isLevelSelectable"
                :getModelChildren="getModelChildren"
            ></tree-node>
        </ul>
    </li>
</template>

<script>

export default {

    name: 'tree-node',

    props: {
        model: Object,
        expandedResourceIds: Array,
        getModelCaption: Function,
        onExpand: Function,
        onCollapse: Function,
        onSelect: Function,
        isLeaf: Function,
        getModelChildren: Function,
        isLevelSelectable: Function
    },

    computed: {

        caption() {

            return this.getModelCaption(this.model);

        },

        selectable() {

            return this.isLevelSelectable(this.model);

        },

        expandable() {

            return !this.isLeaf(this.model);

        },

        expanded() {

            return this.expandedResourceIds.indexOf(this.model.get('id')) >= 0;

        },

        children() {

            if (this.expandable && this.expanded) {
                const collection = this.getModelChildren(this.model);
                return collection ? collection.models : [];
            } else {
                return [];
            }

        }

    },

    methods: {

        toggleNode() {

            this.expanded
                ? this.onCollapse(this.model)
                : this.onExpand(this.model)
            ;

        }

    }

};

</script>
