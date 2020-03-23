<script>
import ResourceList from './resourceList';
import TableComponent from './resourceListTable';
import CardsComponent from './resourceListCards';
import TreeComponent from './resourceListTree';
import {isEmptyObject} from '../library/toolkit';

export default {

    extends: ResourceList,

    props: {
        mapParentTo: {type: [Function, String], required: true},
        mapChildrenTo: {type: [Function, String], required: true},
        mapLevelTo: {type: [Function, String]},
        mapIsLeafTo: {type: [Function, String]},
        mapPositionTo: {type: [Function, String], required: true},
        expandedResourceIds: {type: Array, required: true},
        expandNode: {type: Function, required: true},
        collapseNode: {type: Function, required: true}
    },

    data() {
        return {
            useTreeTemplate: isEmptyObject(this.query)
        };
    },

    computed: {

        sortComparator() {

            const mapper = this.mapPositionTo;

            return typeof mapper === 'function'
                ? mapper
                : (m1, m2) => m1.get(mapper) - m2.get(mapper)
            ;

        },

        queryIsEmpty() {

            return isEmptyObject(this.query);

        },

        showSort() {

            return !this.queryIsEmpty
                ? this.resolvedDefinitions && this.resolvedDefinitions.sorts.length > 1
                : false
            ;

        },

        showPagination() {

            return !this.queryIsEmpty
                ? this.paginationLimit && this.modelsPresent
                : false
            ;

        },

        rootResourceModels() {

            if (this.modelCollection) {
                return this.modelCollection.filter(
                    model => this.getModelLevel(model) === 0
                ).sort(this.sortComparator);
            } else {
                return [];
            }

        },

        treeItems() {

            const items = [];

            this.rootResourceModels.forEach(model => this.buildTree(model, items, 1));

            return items;

        }

    },

    methods: {

        buildTree(model, items, level) {

            const expandedIds = this.expandedResourceIds;
            const expandable = !this.isLeaf(model);
            const id = model.getId();
            const expanded = expandedIds.indexOf(id) >= 0;
            const spacers = expandable ? level - 1 : level;

            items.push({id, spacers, expanded, expandable, model, level});

            if (expanded) {
                this.getModelChildren(model).sort(
                    this.sortComparator
                ).forEach(childModel => {
                    this.buildTree(childModel, items, level + 1);
                });
            }

        },

        getModelLevel: function(model) {

            if (this.mapLevelTo) {

                return typeof this.mapLevelTo === 'function'
                    ? this.mapLevelTo(model)
                    : model.get(this.mapLevelTo)
                ;

            } else {

                const parent = model.get(this.mapParentTo);
                return parent ? 1 + this.getModelLevel(parent) : 0;

            }

        },

        isLeaf(model) {

            if (this.mapIsLeafTo) {

                return typeof this.mapIsLeafTo === 'function'
                    ? this.mapIsLeafTo(model, this.modelCollection)
                    : model.get(this.mapIsLeafTo)
                ;

            } else {

                return this.getModelChildren(model).length === 0;

            }

        },

        getModelChildren(model) {

            const children = typeof this.mapChildrenTo === 'function'
                ? this.mapChildrenTo(model, this.modelCollection)
                : model.get(this.mapChildrenTo)
            ;

            return children
                ? (children.models ? children.models : children)
                : []
            ;

        },

        getAdditionalTemplateParams() {

            return this.useTreeTemplate ? {
                treeItems: this.treeItems,
                expandNode: this.expandNode,
                collapseNode: this.collapseNode
            } : {};

        },

        getListTemplateType() {

            if (this.useTreeTemplate) {
                return TreeComponent;
            } else {
                return this.template === 'table'
                    ? TableComponent
                    : CardsComponent
                ;
            }

        },

        buildApiQuery() {

            const parentMethod = ResourceList.methods.buildApiQuery;
            const apiParams = parentMethod.apply(this, arguments);

            if (this.queryIsEmpty) {
                delete apiParams.page;
            }

            return apiParams;

        },

        runQuery() {

            return ResourceList.methods.runQuery.call(this).then(() => {
                this.useTreeTemplate = this.queryIsEmpty;
            });

        }

    }

};

</script>
