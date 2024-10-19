<template>
    <element-wrapper v-bind="elementWrapperProps" v-on-dismiss="{callback: closeDropdown, watch: dropdownActive}">
        <div class="controls">
            <div v-for="model in relatedModels" :key="model.get('id')" class="item">
                {{ getModelCaption(model) }}
                <button
                    v-if="isInteractive" type="button"
                    @click="isInteractive && deselectModel(model)"
                    class="removeBtn iconClose icr nBtn"
                ></button>
            </div>
            <button
                type="button"
                @click="isInteractive && toggleDropdown()"
                class="openBtn nBtn"
                :class="{iconMoreHorizontal: isInteractive}"
            >{{ modelValue ? '' : selectText }}</button>
        </div>
        <div class="dropdown" v-if="dropdownActive && isInteractive && !loading">
            <div class="search iconSearch">
                <input
                    type="text"
                    class="searchInput"
                    v-model="searchQuery"
                    ref="searchInput"
                    :placeholder="searchPlaceholder"
                    @keyup.down="focusNextResult()"
                    @keyup.up="focusPrevResult()"
                    @keydown.enter.prevent="selectFocusedItem"
                />
                <div v-if="searchResults" class="searchResults">
                    <span
                        v-for="(item, index) in searchResults"
                        :key="item.id"
                        class="searchResultItem"
                        :class="{focused: item.selected}"
                        v-html="item.searchCaption || item.caption"
                        @mouseover="focusSearchResult(index)"
                        @click="selectSearchResult(item)"
                    ></span>
                    <p v-if="searchResults.length === 0" class="noSearchResults">No results</p>
                </div>
            </div>
            <ul class="itemList">
                <tree-node
                    v-for="model in rootResourceModels"
                    :key="model.get('id')"
                    :model="model"
                    :expandedResourceIds="expandedResourceIds"
                    :getModelCaption="getModelCaption"
                    :onExpand="expandNode"
                    :onCollapse="collapseNode"
                    :onSelect="selectModel"
                    :isLeaf="isLeaf"
                    :isLevelSelectable="isLevelSelectable"
                    :getModelChildren="getModelChildren"
                ></tree-node>
            </ul>
        </div>
    </element-wrapper>
</template>

<script>
import base from '../base.vue';
import translate from '../../library/translate.js';
import ElementWrapper from '../elementWrapper.vue';
import TreeNode from './treeNode.vue';
import {Model, Collection} from '../../library/resource.js';
import vueDismiss from '../../dependencies/vue-dismiss/index.js';

export default {

    elementType: 'nestedSelect',

    components: {ElementWrapper, TreeNode},

    mixins: [base, vueDismiss],

    props: {
        modelValue: {type: String, default: ''},
        mapCaptionTo: {type: [String, Function], default: 'title'},
        mapSearchCaptionTo: {type: [String, Function]},
        mapParentTo: {type: [String, Function], default: 'parent'},
        mapChildrenTo: {type: [String, Function], default: 'children'},
        mapIsLeafTo: {type: [String, Function]},
        mapLevelTo: {type: [String, Function]},
        mapPositionTo: {type: [Function, String]},
        selectableLevel: {type: [String, Array, Function], default: 'leaf'},
        getCollectionType: {type: Function, default: () => Collection},
        getModelType: {type: Function, default: () => Model},
        modelQuery: {type: Object},
        collectionQuery: {type: Object},
        select: {type: String, default: 'one'},
        selectText: {type: String, default: () => translate('formElements.nestedSelect.selectText')},
        searchPlaceholder: {type: String, default: () => translate('formElements.nestedSelect.searchPlaceholder')}
    },

    data: () => ({
        loading: false,
        relatedModels: undefined,
        dropdownActive: false,
        resourceCollection: undefined,
        searchQuery: '',
        searchResults: undefined,
        searchPosition: 0,
        expandedResourceIds: []
    }),

    computed: {

        resourceName() {

            return (this.relation && this.relation.resourceName) || this.name;

        },

        selectsOne() {

            return this.relation && this.relation.type
                ? this.relation.type === 'hasOne'
                : this.select === 'one'
            ;

        },

        sortComparator() {

            const mapper = typeof this.mapPositionTo !== 'undefined'
                ? this.mapPositionTo
                : () => 0;

            return typeof mapper === 'function'
                ? mapper
                : (m1, m2) => m1.get(mapper) - m2.get(mapper)
            ;

        },

        rootResourceModels() {

            if (this.resourceCollection) {
                return this.resourceCollection.filter(
                    model => this.getModelLevel(model) === 0
                ).sort(this.sortComparator);
            } else {
                return [];
            }

        },

        inputWrapperAttributes() {

            const attributes = this.normalizeAttributes(this.attributes.inputWrapper);

            attributes.class = [
                'nestedSelectElement',
                this.selectsOne ? 'hasOne' : 'hasMany',
                this.relatedModels && 'hasItems',
                this.dropdownActive && 'active',
                this.searchIsActive && 'searchActive',
                this.loading && 'loading',
                attributes.class || ''
            ].filter(className => className).join(' ');

            return attributes;

        },

        searchIsActive() {

            return this.searchQuery.length > 0 && this.searchResults;

        }

    },

    watch: {
        modelValue: 'syncRelatedModels',
        searchQuery: 'runSearch'
    },

    created() {

        this.syncRelatedModels();

    },

    methods: {

        getModelCaption(model) {

            return typeof this.mapCaptionTo === 'function'
                ? this.mapCaptionTo(model)
                : model.get(this.mapCaptionTo)
            ;

        },

        getModelSearchCaption(model) {

            if (this.mapSearchCaptionTo) {
                return typeof this.mapSearchCaptionTo === 'function'
                    ? this.mapSearchCaptionTo(model)
                    : model.get(this.mapSearchCaptionTo)
                ;
            }

        },

        expandNode(model) {

            this.expandedResourceIds.push(model.get('id'));

        },

        collapseNode(model) {

            this.expandedResourceIds = this.expandedResourceIds.filter(id => id !== model.get('id'));

        },

        selectModel(model) {

            if (!this.isLevelSelectable(model)) {
                return;
            }

            if (this.selectsOne) {

                this.relatedModels = [model];
                this.closeDropdown();

            } else if (this.relatedModels) {

                const alreadySelected = this.relatedModels.filter(
                    relatedModel => relatedModel.get('id') === model.get('id')
                ).length > 0;

                if (!alreadySelected) {
                    this.relatedModels.push(model);
                }

            } else {
                this.relatedModels = [model];
            }

            this.$emit('update:modelValue', this.relatedModels.map(
                relatedModel => relatedModel.get('id')
            ).join(','));

        },

        deselectModel(model) {

            if (this.relatedModels) {

                this.relatedModels = this.relatedModels.filter(relatedModel => {
                    return relatedModel.get('id') !== model.get('id');
                });

                if (this.relatedModels.length === 0) {
                    this.relatedModels = undefined;
                }

            }

            this.$emit('update:modelValue', this.relatedModels
                ? this.relatedModels.map(relatedModel => relatedModel.get('id')).join(',')
                : ''
            );

            return this;

        },

        toggleDropdown() {

            this.dropdownActive ? this.closeDropdown() : this.openDropdown();

        },

        openDropdown() {

            this.dropdownActive = true;
            this.getResourceCollection()
                .then(() => this.$nextTick())
                .then(() => this.$refs.searchInput.focus())
            ;

        },

        closeDropdown() {

            this.dropdownActive = false;
            this.searchPosition = 0;

        },

        isLevelSelectable(model) {

            const selectableLevel = this.selectableLevel;

            if (selectableLevel === 'leaf') {
                return this.isLeaf(model);
            } else if (selectableLevel === 'all') {
                return true;
            } else if (Array.isArray(selectableLevel)) {
                return selectableLevel.indexOf(this.getModelLevel(model)) >= 0;
            } else if (typeof selectableLevel === 'function') {
                return selectableLevel({model, nestedSelect: this});
            }

        },

        isLeaf(model) {

            if (this.mapIsLeafTo) {

                return typeof this.mapIsLeafTo === 'function'
                    ? this.mapIsLeafTo(model, this.resourceCollection)
                    : model.get(this.mapIsLeafTo)
                ;

            } else {

                return this.getModelChildren(model).length === 0;

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

        getModelChildren(model) {

            const children = typeof this.mapChildrenTo === 'function'
                ? this.mapChildrenTo(model, this.resourceCollection)
                : model.get(this.mapChildrenTo)
            ;

            return children
                ? (children.models ? children.models : children)
                : []
            ;

        },

        syncRelatedModels() {

            const modelIds = this.modelValue.split(',').filter(id => id.length);
            const Model = this.getModelType();

            if (modelIds.length === 0) {
                this.relatedModels = undefined;
                return Promise.resolve(this.relatedModels);
            }

            // check if existing or previously selected models align
            if (this.relatedModels && this.areCollectionsAligned(modelIds, this.relatedModels)) {
                return Promise.resolve(this.relatedModels);
            }

            // check if models attached to resource model align
            if (this.resourceModel) {

                const relationData = this.resourceModel.get(this.name);

                if (relationData) {

                    const relatedModels = relationData.models || [relationData];

                    if (this.areCollectionsAligned(modelIds, relatedModels)) {
                        this.relatedModels = relatedModels;
                        return Promise.resolve(this.relatedModels);
                    }

                }

            }

            this.loading = true;

            return Promise.all(modelIds.map(id => Model.getFromApi({
                type: this.resourceName,
                id,
                query: this.modelQuery
            }))).then(models => {
                this.loading = false;
                this.relatedModels = models;
                return models;
            });

        },

        areCollectionsAligned(idCollection, modelCollection) {

            const areSameSize = idCollection.length === modelCollection.length;
            const haveSameIds = idCollection.every(id => {
                return modelCollection.filter(model => model.get('id') === id).length === 1;
            });

            return areSameSize && haveSameIds;

        },

        getResourceCollection() {

            const Collection = this.getCollectionType();

            if (!this.resourceCollectionPromise) {

                this.loading = true;

                this.resourceCollectionPromise = Collection.getFromApi({
                    type: this.resourceName,
                    query: this.collectionQuery
                }).then(collection => {
                    this.loading = false;
                    this.resourceCollection = collection;
                    return collection;
                });

            }

            return this.resourceCollectionPromise;

        },

        setupSearchEngine() {

            if (!this.searchEnginePromise) {

                this.searchEnginePromise = import('fuse.js').then(({default: Fuse}) => {

                    const searchItems = this.resourceCollection
                        .filter(model => this.isLevelSelectable(model))
                        .map(model => ({
                            id: model.get('id'),
                            caption: this.getModelCaption(model),
                            searchCaption: this.getModelSearchCaption(model)
                        }));

                    return new Fuse(searchItems, {keys: ['caption'], threshold: 0.4});

                });

            }

            return this.searchEnginePromise;

        },

        runSearch() {

            clearTimeout(this.searchTimeout);

            if (this.searchQuery.length === 0) {
                return;
            }

            this.searchTimeout = setTimeout(() => {

                this.searchPosition = 0;

                this.getResourceCollection()
                    .then(() => this.setupSearchEngine())
                    .then(searchEngine => {

                        this.searchResults = searchEngine.search(this.searchQuery).map((result, index) => {
                            result.item.selected = index === 0;
                            return result.item;
                        });

                    });

            }, 100);

        },

        selectFocusedItem() {

            if (this.searchResults) {
                this.selectSearchResult(this.searchResults[this.searchPosition]);
            }

        },

        selectSearchResult(item) {

            this.selectModel(this.resourceCollection.getModel(item.id));

        },

        focusNextResult() {

            this.focusSearchResult(this.searchPosition + 1);

        },

        focusPrevResult() {

            this.focusSearchResult(this.searchPosition - 1);

        },

        focusSearchResult(positionIndex) {

            if (this.searchResults && this.searchResults.length) {

                const maxPosition = this.searchResults.length - 1;

                if (positionIndex < 0) {
                    positionIndex = maxPosition;
                } else if (positionIndex > maxPosition) {
                    positionIndex = 0;
                }

                this.searchPosition = positionIndex;

                this.searchResults.forEach((item, index) => {
                    item.selected = index === positionIndex;
                });

            }

        }

    }

};
</script>

<style lang="scss">

    @use '../../../scss/library/all' as *;

    .nestedSelectElement {

        display: inline-block; position: relative; box-sizing: border-box;

        > .controls {

            transition: opacity 0.2s;

        }

        &.hasOne {

            > .controls {

                > .item {

                    font-size: 1.6em; line-height: divide(16,14); display: inline-block;
                    color: $colorGrayDark1;

                    > .removeBtn {

                        font-size: em(10,14); width: 2em; height: 2em; position: absolute; right: -0.8em; top: -0.8em;
                        z-index: 10;

                        &:before {

                            content: '×'; width: 1.4em; height: 1.4em; line-height: 1em; box-sizing: border-box;
                            position: absolute; left: 50%; top: 50%; margin: -0.7em 0 0 -0.7em;
                            color: rgba(#000, 0.3); border: 1px solid rgba(#000, 0.15); border-radius: 50%;
                            background-color: #fff;

                        }

                        &:hover:before {
                            box-shadow: 0 0.2em 0.5em rgba(#000, 0.15);
                        }

                    }

                    @include mediaMinWidth($breakpointMedium) {
                        font-size: 1.4em;
                    }

                }

            }

        }

        &.hasMany {

            > .controls {

                > .item {

                    display: inline-block; font-size: 1.2em; line-height: divide(15,12); position: relative;
                    padding: em(2,12) em(6,12) em(2,12) em(18,12); margin: em(5,12) em(5,12) 0 0; vertical-align: middle;
                    border-radius: em(3,12); border: 1px solid darken(#9c9c9c, 5%);
                    cursor: auto; color: #fff; letter-spacing: 0.02em;
                    background-color: #9c9c9c;

                    > .removeBtn {

                        font-size: em(10,12); position: absolute; left: 0; top: 50%; z-index: 10;
                        width: em(20,10); line-height: em(20,10); height: em(20,10); margin-top: em(-10,10);
                        text-align: center; color: #fff; cursor: pointer;

                    }

                }

            }

        }

        .openBtn {

            font-size: 1.6em; line-height: divide(32,14); text-align: left;
            padding: 0 em(30,16) 0 em(10,16); display: block; width: 100%;

            &:before {

                font-size: em(14,14); color: $colorMain1; left: auto; right: 0; width: em(22,10);

            }

            @include mediaMinWidth($breakpointMedium) {
                font-size: 1.4em; padding: 0 em(30,14) 0 em(10,14);
            }

        }

        &.hasItems {

            padding: 0 2.6em 0.6em 0.5em;

            .openBtn {

                position: absolute; top: 0; right: 0; height: 100%; width: 100%;

            }

        }

        > .dropdown {

            display: none; position: absolute; z-index: 20; top: 100%; left: -1px; right: -1px;
            margin: 0.5em 0 5em; min-width: 20em;
            background: #fff; border: 1px solid $colorGrayLight2;
            box-shadow: 0 0.1em 0.3em rgba(#000, 0.06); border-radius: 0.4em;

        }

        .itemList {

            overflow-x: hidden; overflow-y: auto; max-height: 30em; padding: 1em 0;

            ul {

                border-left: 1px solid $colorGrayLight2; display: none;

                &.active { display: block; animation: slideDownFadeIn 0.15s; }

            }

            li {

                position: relative; padding: 0 0 0 2.5em;

            }

            .listItem {

                display: block; width: 100%; font-size: 1.4em;
                padding: em(5,14) em(5,14) em(5,14) em(6,14); margin-left: em(-6,14); line-height: 1.4;
                cursor: auto; border-radius: em(3,14); text-align: left;

                &.selectableItem {

                    &:hover {

                        color: $colorMain1; background-color: #f5f5f5;

                    }

                    cursor: pointer;

                }

            }

            .treeBtn {

                position: absolute; left: 0; top: 0.2em; width: 2.5em; height: 2.5em;
                opacity: 0.3;

                &:before {

                    font-size: 1.2em;

                }

                &:hover {

                    color: $colorMain1; opacity: 1;

                }

            }

        }

        .search {

            display: block; padding: 0;

            &:before {

                font-size: 1.4em; width: em(25,14); opacity: 0.3; top: em(-5,14); margin-top: 0;

            }

            > input {

                appearance: none;
                font-size: 1.6em; color: $colorGrayDark2; padding: em(7,16); width: 100%; padding-left: em(25,16);
                border: 0; border-bottom: 1px solid $colorGrayLight2; background: transparent;

            }

        }

        .searchResults {

            overflow-x: hidden; overflow-y: auto; max-height: 30em; padding: 1em;
            display: none;

        }

        .searchResultItem, .noSearchResults {

            display: block; width: 100%; font-size: 1.4em; box-sizing: border-box;
            padding: em(5,14); line-height: 1.4;
            cursor: pointer; border-radius: em(3,14); text-align: left;

            &.focused, &.active {

                color: $colorMain1; background-color: #f5f5f5;

            }

        }

        .noSearchResults {

            opacity: 0.5; cursor: auto;

        }

        &.loading {

            > .controls { opacity: 0.5; }

            .openBtn:before {

                animation: rotate 0.8s infinite;

            }

        }

        &.active > .dropdown {

            display: block; animation: slideDownFadeIn 0.15s;

        }

        &.searchActive {

            .itemList {

                display: none;

            }

            .searchResults {

                display: block;

            }

        }

    }

</style>
