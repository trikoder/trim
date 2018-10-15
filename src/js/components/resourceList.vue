<template>
    <div class="resourceList resourceListType1">
        <filters
            v-if="showFilters"
            v-bind:definitions="resolvedDefinitions.filters"
            v-bind:initialFilters="apiQuery.filter"
            v-bind:persistentFilters="resolvedDefinitions.persistentFilters"
            v-on:filterRequest="handleFilterRequest"
        ></filters>
        <message v-if="messageData" v-bind="messageData" v-on:close="hideMessage"></message>
        <div class="topListControls cf">
            <mass-actions
                v-if="showMassActions"
                v-bind:resourceCaption="resourceCaption"
                v-bind:actions="resolvedDefinitions.massActions"
                v-bind:selectedModels="selectedModels"
                v-on:deselectModel="deselectModel"
                v-on:message="showMessage"
            ></mass-actions>
            <pagination
                v-if="showPagination"
                v-bind:getUrlForPage="getUrlForPage"
                v-bind:totalItems="totalItems"
                v-bind:currentPage="currentPage"
                v-bind:limit="paginationLimit"
                v-on:pageRequest="handlePageRequest"
            ></pagination>
            <sort
                v-if="showSort"
                v-bind:currentSort="apiQuery.sort"
                v-bind:options="resolvedDefinitions.sorts"
                v-on:sortRequest="handleSortRequest"
            ></sort>
        </div>
        <div class="itemListCont" v-bind:class="{
            withMassActions: definitions.massActions.length > 0,
            selectsOne: selectsResource === 'one',
            selectsMany: selectsResource === 'many'
        }">
            <component
                v-if="modelsPresent"
                v-bind:is="getListTemplateType()"
                v-bind:modelCollection="modelCollection"
                v-bind:definitions="resolvedDefinitions"
                v-bind:allModelsAreSelected="allModelsAreSelected"
                v-bind:selectAllModels="selectAllModels"
                v-bind:deselectAllModels="deselectAllModels"
                v-bind:isModelSelected="isModelSelected"
                v-bind:selectModel="selectModel"
                v-bind:deselectModel="deselectModel"
                v-bind="getAdditionalTemplateParams()"
            ></component>
            <p v-if="modelCollection && !modelsPresent" class="noResults">
                {{ translations.noResultsText }}
            </p>
        </div>
        <div class="bottomListControls cf" v-if="showPagination || showSort">
            <pagination
                v-if="showPagination"
                v-bind:showLimitOptions="true"
                v-bind:getUrlForPage="getUrlForPage"
                v-bind:totalItems="totalItems"
                v-bind:currentPage="currentPage"
                v-bind:limit="paginationLimit"
                v-on:pageRequest="handlePageRequest"
                v-on:limitRequest="handleLimitRequest"
            ></pagination>
            <sort
                v-if="showSort"
                v-bind:currentSort="apiQuery.sort"
                v-bind:options="resolvedDefinitions.sorts"
                v-on:sortRequest="handleSortRequest"
            ></sort>
        </div>
    </div>
</template>

<script>
import Filters from './resourceFilters';
import Sort from './resourceSort';
import Pagination from './resourcePagination';
import TableComponent from './resourceListTable';
import CardsComponent from './resourceListCards';
import MassActions from './massActions';
import Message from './message';
import translate from '../library/translate';
import Loader from '../library/loader';
import {assign, assignDeep, each, result, ensureArray, checkUniqueFieldNames} from '../library/toolkit';
import loadDefinitionType from '../library/loadDefinitionType';
import formElementDefaults from '../formElements/elementDefaults';
import {confirm} from '../components/dialogModal';
import screenSize from '../mixins/screenSize';

export default {

    components: {Filters, Sort, Pagination, MassActions, Message},

    mixins: [screenSize],

    props: {
        Collection: {type: Function, required: true},
        getEditUrl: {type: Function, required: true},
        getIndexUrl: {type: Function, required: true},
        openEdit: {type: Function, required: true},
        resourceCaption: [Function, String],
        selectsResource: {type: [String, Boolean], default: false},
        query: {type: Object, required: true},
        configure: {type: Function, required: true},
        apiInclude: {type: [Array, String]}
    },

    data() {
        return {
            definitions: this.getInitialDefinitions(),
            resolvedDefinitions: undefined,
            template: 'table',
            modelCollection: undefined,
            selectedModels: [],
            apiQuery: {},
            messageData: undefined,
            translations: {
                noResultsText: translate('baseResourceController.noResultsMessage')
            }
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

            return this.apiQuery && this.apiQuery.page
                ? this.apiQuery.page.offset / this.apiQuery.page.limit + 1
                : 1
            ;

        },

        paginationLimit() {

            return this.apiQuery && this.apiQuery.page && this.apiQuery.page.limit;

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

            return this.paginationLimit && this.modelsPresent && this.totalItems > this.paginationLimit;

        },

        showSort() {

            return this.resolvedDefinitions && this.resolvedDefinitions.sorts.length > 1;

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

            const loader = Loader.on();

            if (this.apiInclude) {
                this.addApiInclude(this.apiInclude);
            }

            return Promise.resolve(this.configure(this))
                .then(() => this.runQuery())
                .then(() => this.$emit('afterConfigure', this))
                .then(() => loader.off())
                .catch(error => { loader.off(); return Promise.reject(error); })
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

        addApiInclude(includes) {

            ensureArray(includes).forEach(
                include => include && this.definitions.apiIncludes.push(include)
            );
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

            const type = definition.Type.getType();

            if (type === 'link') {
                this.decorateLinkDefinition(definition);
            } else if (type === 'contextMenu') {
                this.decorateContextMenuDefinition(definition);
            }

            return definition;

        },

        decorateFilterDefinition(definition) {

            const elementType = definition.Type.getElementType();
            const defaultOptions = formElementDefaults.resourceFilters[elementType];

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
                apiIncludes: [],
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
                page: Pagination.getOffsetAndLimit(this.resourceName),
                include: definitions.apiIncludes
            };

            const allowedFilters = definitions.filters.map(
                filterDefinition => filterDefinition.options.name
            );

            each(queryParams, (value, key) => {

                if (key === 'sort') {
                    apiParams.sort = value;
                } else if (key === 'page') {
                    apiParams.page = Pagination.getOffsetAndLimit(this.resourceName, value);
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
                let options = definition.options;

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
                    apiIncludes: this.definitions.apiIncludes.slice(0)
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

                }).catch(error => {
                    this.showApiError(error);
                });

            });

        },

        getUrlForPage(page) {

            let queryData = assign({}, this.query, {page});

            if (page <= 1) {
                delete queryData.page;
            }

            return this.getIndexUrl(queryData);

        },

        handlePageRequest(page) {

            let data = assign({}, this.query, {page});

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

            let data = assign({}, this.query, {sort});

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

        },

        showApiError(errorObj) {

            confirm({
                message: translate('validation.serverError'),
                acceptText: translate('prompt.continueText'),
                acceptOnly: true,
                parent: this
            });

        }

    }
};

</script>
