<template>
    <li>
        <button
            type="button"
            v-on:click="onSelect(model)"
            v-bind:class="{selectableItem: selectable}"
            class="nBtn listItem"
        >{{ caption }}</button>
        <button
            v-if="expandable"
            v-on:click="toggleNode"
            type="button"
            class="treeBtn nBtn icr iconPlus"
        ></button>
        <ul v-if="expanded" class="active">
            <tree-node
                v-for="childModel in children"
                v-bind:key="childModel.get('id')"
                v-bind:model="childModel"
                v-bind:expandedResourceIds="expandedResourceIds"
                v-bind:getModelCaption="getModelCaption"
                v-bind:onExpand="onExpand"
                v-bind:onCollapse="onCollapse"
                v-bind:onSelect="onSelect"
                v-bind:isLeaf="isLeaf"
                v-bind:isLevelSelectable="isLevelSelectable"
                v-bind:getModelChildren="getModelChildren"
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
