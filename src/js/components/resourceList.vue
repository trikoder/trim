<template>
    <div class="resourceList resourceListType1">
        <filters
            v-if="showFilters"
            :definitions="resolvedDefinitions.filters"
            :initialFilters="apiQuery.filter"
            :persistentFilters="resolvedDefinitions.persistentFilters"
            @filterRequest="handleFilterRequest"
        ></filters>
        <message v-if="messageData" v-bind="messageData" @close="hideMessage"></message>
        <div class="topListControls cf">
            <mass-actions
                v-if="showMassActions"
                :resourceCaption="resourceCaption"
                :actions="resolvedDefinitions.massActions"
                :selectedModels="selectedModels"
                @deselectModel="deselectModel"
                @message="showMessage"
            ></mass-actions>
            <toggle-columns-visibility
                v-if="showToggleColumnsVisibility"
                :resourceName="resourceName"
                :definitions="resolvedDefinitions"
                @refresh="refreshItems"
            />
            <pagination
                v-if="showPagination"
                :getUrlForPage="getUrlForPage"
                :totalItems="totalItems"
                :currentPage="currentPage"
                :limit="paginationLimit"
                @pageRequest="handlePageRequest"
            ></pagination>
            <sort
                v-if="showSort"
                :currentSort="apiQuery.sort"
                :options="resolvedDefinitions.sorts"
                @sortRequest="handleSortRequest"
            ></sort>
        </div>
        <div class="itemListCont" :class="{
            withMassActions: definitions.massActions.length > 0,
            selectsOne: selectsResource === 'one',
            selectsMany: selectsResource === 'many'
        }">
            <component
                v-if="modelsPresent"
                :is="toRawComponentProps(getListTemplateType())"
                :modelCollection="modelCollection"
                :definitions="resolvedDefinitions"
                :allModelsAreSelected="allModelsAreSelected"
                :selectAllModels="selectAllModels"
                :deselectAllModels="deselectAllModels"
                :isModelSelected="isModelSelected"
                :selectModel="selectModel"
                :deselectModel="deselectModel"
                v-bind="getAdditionalTemplateParams()"
            ></component>
            <p v-if="modelCollection && !modelsPresent" class="noResults">
                {{ getEmptyListMessage() }}
            </p>
        </div>
        <div v-if="showPagination || showSort" class="bottomListControls cf">
            <pagination
                v-if="showPagination"
                :showLimitOptions="true"
                :getUrlForPage="getUrlForPage"
                :totalItems="totalItems"
                :currentPage="currentPage"
                :limit="paginationLimit"
                @pageRequest="handlePageRequest"
                @limitRequest="handleLimitRequest"
            ></pagination>
            <sort
                v-if="showSort"
                :currentSort="apiQuery.sort"
                :options="resolvedDefinitions.sorts"
                @sortRequest="handleSortRequest"
            ></sort>
        </div>
    </div>
</template>

<script>
import {pascal as pascalcase} from 'to-case';
import Filters from './resourceFilters.vue';
import Sort from './resourceSort.vue';
import Pagination from './resourcePagination.vue';
import TableComponent from './resourceListTable.vue';
import CardsComponent from './resourceListCards.vue';
import MassActions from './massActions.vue';
import Message from './message.vue';
import ToggleColumnsVisibility from './resourceToggleColumnsVisibility.vue';
import bootData from '../library/bootData.js';
import userPreferences from '../library/userPreferences.js';
import Loader from '../library/loader.js';
import loadDefinitionType from '../library/loadDefinitionType.js';
import formElementDefaults from '../formElements/elementDefaults.js';
import screenSize from '../mixins/screenSize.js';
import emitter from '../mixins/emitter.js';
import {
    assign,
    assignDeep,
    each,
    result,
    ensureArray,
    checkUniqueFieldNames,
    getComponentOption
} from '../library/toolkit.js';

export default {

    components: {Filters, Sort, ToggleColumnsVisibility, Pagination, MassActions, Message},

    mixins: [screenSize, emitter],

    props: {
        Collection: {type: Function, required: true},
        getEditUrl: {type: Function, required: true},
        getIndexUrl: {type: Function, required: true},
        openEdit: {type: Function, required: true},
        resourceCaption: [Function, String],
        selectsResource: {type: [String, Boolean], default: false},
        query: {type: Object, required: true},
        configure: {type: Function, required: true},
        getEmptyListMessage: {type: Function, required: true},
        includedRelationships: {type: [Array, String]},
        includedFields: {type: Object}
    },

    data() {
        return {
            definitions: this.getInitialDefinitions(),
            resolvedDefinitions: undefined,
            template: 'table',
            modelCollection: undefined,
            selectedModels: [],
            apiQuery: {},
            messageData: undefined
        };
    },

    watch: {

        query() {

            this.resetDefinitions();
            this.configureList();

        },

        breakpoint() {

            this.resetDefinitions();
            this.configureList();

        }

    },

    computed: {

        modelsPresent() {

            return this.modelCollection && this.modelCollection.length > 0;

        },

        resourceName() {

            return this.Collection.getType();

        },

        currentPage() {

            if (this.apiQuery && this.apiQuery.page) {
                return Pagination.getPageFromQuery(this.apiQuery.page);
            } else {
                return 1;
            }

        },

        paginationLimit() {

            if (this.apiQuery && this.apiQuery.page) {
                return Pagination.getLimitFromQuery(this.apiQuery.page);
            } else {
                return undefined;
            }

        },

        totalItems() {

            return this.modelCollection
                ? parseInt(this.modelCollection.meta.total, 10)
                : 0
            ;

        },

        selectedModelIds() {

            return this.selectedModels.map(model => model.get('id'));

        },

        allModelsAreSelected() {

            return this.modelCollection.models.every(
                model => this.isModelSelected(model)
            );

        },

        showMassActions() {

            return this.resolvedDefinitions && this.resolvedDefinitions.massActions.length > 0;

        },

        showFilters() {

            return this.resolvedDefinitions && this.resolvedDefinitions.filters.length;

        },

        showPagination() {

            return this.paginationLimit && this.modelsPresent;

        },

        showSort() {

            return this.resolvedDefinitions && this.resolvedDefinitions.sorts.length > 1;

        },

        showToggleColumnsVisibility() {

            return bootData('toggleColumnsVisibility') &&
                this.resolvedDefinitions &&
                this.resolvedDefinitions.listItems.length > 0 &&
                this.template === 'table';

        }

    },

    created() {

        this.configureList();

    },

    methods: {

        getListTemplateType() {

            return this.template === 'table'
                ? TableComponent
                : CardsComponent
            ;

        },

        getAdditionalTemplateParams() {

            return undefined;

        },

        configureList() {

            this.$emit('beforeConfigure', this);
            this.$emitter.emit('beforeConfigure', this);

            const loader = Loader.on();

            if (this.includedRelationships) {
                this.includeRelationsips(this.includedRelationships);
            }

            if (this.includedFields) {
                this.includeFields(this.includedFields);
            }

            return Promise.resolve(this.configure(this))
                .then(() => this.runQuery())
                .then(() => {
                    this.$emit('afterConfigure', this);
                    this.$emitter.emit('afterConfigure', this);
                })
                .then(() => loader.off())
                .catch(error => {
                    loader.off();
                    this.$emit('systemError', error);
                })
            ;

        },

        addItem(Type, options) {

            return this.addTypeDefinition('listItems', Type, options);

        },

        addFilter(Type, options) {

            return this.addTypeDefinition('filters', Type, options);

        },

        addTypeDefinition(stack, Type, options) {

            const definitionsArray = options
                ? [{Type, options}]
                : ensureArray(Type)
            ;

            definitionsArray.forEach(definition => {

                this.definitions[stack].push(
                    Array.isArray(definition)
                        ? {Type: definition[0], options: definition[1]}
                        : definition
                );

            });

            return this;

        },

        includeRelationsips(includes) {

            ensureArray(includes).forEach(
                include => include && this.definitions.includedRelationships.push(include)
            );
            return this;

        },

        includeFields(fields) {

            assignDeep(this.definitions.includedFields, fields);
            return this;

        },

        addSort(sortDefinition) {

            ensureArray(sortDefinition).forEach(definition => {
                this.definitions.sorts.push(definition);
            });

            return this;

        },

        addMassAction(massActionDefinition) {

            ensureArray(massActionDefinition).forEach(definition => {
                this.definitions.massActions.push(definition);
            });

            return this;

        },

        setTemplate(template) {

            this.template = template;
            return this;

        },

        filterAlwaysBy(key, value) {

            assign(this.definitions.persistentFilters, typeof value === 'undefined' ? key : {[key]: value});
            return this;

        },

        filterInitiallyBy(key, value) {

            assign(this.definitions.initialFilters, typeof value === 'undefined' ? key : {[key]: value});
            return this;

        },

        refreshItems() {

            return this.runQuery();

        },

        decorateLinkDefinition(definition) {

            if (definition.options.action === 'editItem') {
                assign(definition.options, {
                    url: model => this.getEditUrl({id: model.get('id')}),
                    action: model => this.openEdit({id: model.get('id')})
                });
            }

        },

        decorateContextMenuDefinition(definition) {

            if (!Array.isArray(definition.options.items)) {
                return;
            }

            const refreshItems = () => this.refreshItems();

            definition.options.items.forEach(item => {

                if (item.action === 'editItem') {

                    assign(item, {
                        url: model => this.getEditUrl({id: model.get('id')}),
                        action: model => this.openEdit({id: model.get('id')})
                    });

                } else if (item.action === 'deleteItem') {

                    item.action = (model, contextMenu) => {

                        contextMenu.close();
                        model.destroy().then(refreshItems).catch(refreshItems);

                    };

                } else if (item.updateAttributes) {

                    item.action = (model, contextMenu) => {

                        contextMenu.close();

                        model.save({
                            attributes: result(item.updateAttributes, [model])
                        }).then(refreshItems).catch(refreshItems);

                    };

                }

            });

        },

        decorateListItemDefinition(definition) {

            const type = definition.Type.elementType;

            if (type === 'link') {
                this.decorateLinkDefinition(definition);
            } else if (type === 'contextMenu') {
                this.decorateContextMenuDefinition(definition);
            }

            if (bootData('toggleColumnsVisibility')) {
                const storageKey = `columnVisibility.${this.resourceName}${pascalcase(definition.options.caption)}`;
                definition.isColumnHidden = userPreferences.get(storageKey, false);
            }

            return definition;

        },

        decorateFilterDefinition(definition) {

            const elementType = getComponentOption(definition.Type, 'elementType') || 'other';
            const filterDefaults = formElementDefaults.resourceFilters;
            const defaultOptions = filterDefaults[elementType] || filterDefaults.other;

            definition.options = assignDeep({}, defaultOptions, definition.options);

            return definition;

        },

        decorateMassActionDefinition(definition) {

            if (!definition.onComplete) {
                definition.onComplete = () => {
                    this.selectedModels = [];
                    this.refreshItems();
                };
            }

            return definition;

        },

        getInitialDefinitions() {
            return {
                listItems: [],
                sorts: [],
                filters: [],
                persistentFilters: {},
                initialFilters: {},
                includedRelationships: [],
                includedFields: {},
                massActions: []
            };
        },

        resetDefinitions() {

            this.definitions = this.getInitialDefinitions();
            return this;

        },

        buildApiQuery(queryParams = {}, definitions) {

            const apiParams = {
                filter: {},
                sort: definitions.sorts.length ? definitions.sorts[0].field : undefined,
                page: Pagination.getApiParams(this.resourceName),
                include: definitions.includedRelationships,
                fields: definitions.includedFields
            };

            const allowedFilters = definitions.filters.map(
                filterDefinition => filterDefinition.options.name
            );

            each(queryParams, (value, key) => {

                if (key === 'sort') {
                    apiParams.sort = value;
                } else if (key === 'page') {
                    apiParams.page = Pagination.getApiParams(this.resourceName, value);
                } else {
                    if (allowedFilters.indexOf(key) >= 0) {
                        apiParams.filter[key] = value;
                    }
                }

            });

            if (Object.keys(apiParams.filter).length === 0) {
                assign(apiParams.filter, definitions.initialFilters);
            }

            if (definitions.persistentFilters) {
                assign(apiParams.filter, definitions.persistentFilters);
            }

            return apiParams;

        },

        resolveDefinitions() {

            checkUniqueFieldNames(this.definitions.filters);

            const filterConditionals = definition => {

                let addIf = true;
                const options = definition.options;

                if (options && typeof options.addIf !== 'undefined') {
                    addIf = Boolean(options.addIf);
                    delete options.addIf;
                }

                return addIf;

            };

            return Promise.all([

                Promise.all(this.definitions.listItems.map(listItemDefinition => {
                    return loadDefinitionType(assignDeep({}, listItemDefinition)).then(
                        definition => this.decorateListItemDefinition(definition)
                    );
                })),

                Promise.all(this.definitions.filters.map(filterDefinition => {
                    return loadDefinitionType(assignDeep({}, filterDefinition)).then(
                        definition => this.decorateFilterDefinition(definition)
                    );
                }))

            ]).then(([listDefinitions, filterDefinitions]) => {

                return {
                    listItems: listDefinitions.filter(filterConditionals),
                    filters: filterDefinitions.filter(filterConditionals),
                    persistentFilters: assign({}, this.definitions.persistentFilters),
                    initialFilters: assign({}, this.definitions.initialFilters),
                    sorts: this.definitions.sorts.map(
                        definition => assign({}, definition)
                    ),
                    massActions: this.definitions.massActions.map(definition => {
                        return this.decorateMassActionDefinition(assignDeep({}, definition));
                    }),
                    includedRelationships: this.definitions.includedRelationships.slice(0),
                    includedFields: assignDeep({}, this.definitions.includedFields)
                };

            });

        },

        runQuery() {

            return this.resolveDefinitions().then(definitions => {

                const apiQuery = this.buildApiQuery(this.query, definitions);

                return this.Collection.getFromApi({query: apiQuery}).then(modelCollection => {

                    this.apiQuery = apiQuery;
                    this.resolvedDefinitions = definitions;
                    this.modelCollection = modelCollection;

                });

            });

        },

        getUrlForPage(page) {

            const queryData = assign({}, this.query, {page});

            if (page <= 1) {
                delete queryData.page;
            }

            return this.getIndexUrl(queryData);

        },

        handlePageRequest(page) {

            const data = assign({}, this.query, {page});

            if (data.page <= 1) {
                delete data.page;
            }

            this.$emit('queryChange', data);

        },

        handleLimitRequest(limit) {

            Pagination.setLimit(this.resourceName, limit);

            if (this.query.page >= 1) {
                this.handlePageRequest(1);
            } else {
                this.refreshItems();
            }

        },

        handleSortRequest(sort) {

            const data = assign({}, this.query, {sort});

            delete data.page;

            this.$emit('queryChange', data);

        },

        handleFilterRequest(filters) {

            this.$emit('queryChange', assign({}, filters, {sort: this.query.sort}));

        },

        selectAllModels() {

            this.selectModel(this.modelCollection.models);
            return this;

        },

        deselectAllModels() {

            this.modelCollection.forEach(model => this.deselectModel(model));
            return this;

        },

        selectModel(model) {

            ensureArray(model).forEach(itemModel => {

                if (!this.isModelSelected(itemModel)) {
                    this.selectedModels.push(itemModel);
                }

            });

            return this;

        },

        deselectModel(model) {

            this.selectedModels = this.selectedModels.filter(
                selectedModel => selectedModel.get('id') !== model.get('id')
            );

            return this;

        },

        isModelSelected(model) {

            return this.selectedModelIds.indexOf(model.get('id')) >= 0;

        },

        showMessage(data) {

            this.messageData = data;
            return this;

        },

        hideMessage() {

            this.messageData = undefined;
            return this;

        }

    }
};

</script>
