<script>
import BaseResourceController from './baseResource.vue';
import NestedResourceList from '../components/resourceListNested.vue';
import getVueComponentMapper from '../library/getVueComponentMapper.js';

const BaseNestedController = {

    extends: BaseResourceController,

    data: () => ({
        mapParentTo: 'parent',
        mapChildrenTo: 'children',
        mapLevelTo: undefined,
        mapIsLeafTo: undefined,
        mapPositionTo: () => 0,
        expandedResourceIds: []
    }),

    methods: {

        getResourceListType() {

            return NestedResourceList;

        },

        getAdditionalListProps() {

            return {
                mapParentTo: this.mapParentTo,
                mapChildrenTo: this.mapChildrenTo,
                mapLevelTo: this.mapLevelTo,
                mapIsLeafTo: this.mapIsLeafTo,
                mapPositionTo: this.mapPositionTo,
                expandedResourceIds: this.expandedResourceIds,
                expandNode: model => this.expandNode(model),
                collapseNode: model => this.collapseNode(model)
            };

        },

        expandNode(model) {

            this.expandedResourceIds.push(model.get('id'));

        },

        collapseNode(model) {

            this.expandedResourceIds = this.expandedResourceIds.filter(
                id => id !== model.get('id')
            );

        }

    }

};

BaseNestedController.getDataKeys = () => ([
    'mapParentTo',
    'mapChildrenTo',
    'mapLevelTo',
    'mapIsLeafTo',
    'mapPositionTo'
]);

BaseNestedController.toVueComponent = getVueComponentMapper({
    extends: BaseNestedController,
    dataKeys: BaseResourceController.getDataKeys().concat(BaseNestedController.getDataKeys())
});

export default BaseNestedController;

</script>
