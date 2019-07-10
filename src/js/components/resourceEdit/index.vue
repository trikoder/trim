<template>
    <component
        v-bind:is="tag"
        v-bind:autocomplete="this.tag === 'form' ? 'off' : undefined"
        v-on:submit="handleSubmit"
    >
        <message v-if="statusMessage && tabItems.length === 0" v-bind="statusMessage" v-on:close="statusMessage = null"></message>
        <div
            class="layoutContainer"
            v-if="resolvedDefinitions && resourceModel"
            v-bind:class="{
                withTabs: resolvedDefinitions.layout.hasTabs,
                withRegions: resolvedDefinitions.layout.hasRegions,
                editLayoutRegions: resolvedDefinitions.layout.hasRegions
            }"
        >
            <nav class="tabNavType1" v-if="tabItems.length">
                <button type="button" class="tabBtn nBtn"
                    v-for="tab in tabItems"
                    v-bind:key="tab.key"
                    v-bind:class="{selected: tab.key === activeTab}"
                    v-on:click="selectTab(tab.key)"
                >{{ tab.caption }}</button>
            </nav>
            <message v-if="statusMessage && tabItems.length" v-bind="statusMessage" v-on:close="statusMessage = null"></message>
            <template v-for="(config, key) in resolvedDefinitions.layout">
                <tab
                    v-if="config.isTab"
                    v-bind:layout="config"
                    v-bind:formData="formData"
                    v-bind:selected="key === activeTab"
                    v-bind:key="key"
                    v-bind:ref="key"
                    v-bind:tab-key="key"
                ></tab>
                <region
                    v-if="config.isRegion"
                    v-bind:layout="config"
                    v-bind:formData="formData"
                    v-bind:key="key"
                    v-bind:class="key"
                    v-bind:ref="key"
                ></region>
                <group
                    v-if="config.isGroup"
                    v-bind:layout="config"
                    v-bind:formData="formData"
                    v-bind:key="key"
                    v-bind:ref="key"
                ></group>
                <component
                    v-if="key === 'fields'"
                    v-for="field in config"
                    v-bind:is="field.Type"
                    v-bind="field.options"
                    v-model="formData[field.options.name]"
                    v-bind:key="field.options.name"
                    v-bind:ref="field.options.name"
                ></component>
            </template>
            <slot name="bottomControls"></slot>
        </div>
        <button v-if="tag === 'form'" class="hidden" type="submit"></button>
    </component>
</template>

<script>

import Vue from 'vue';
import loadDefinitionType from '../../library/loadDefinitionType';
import bootData from '../../library/bootData';
import formElementDefaults from '../../formElements/elementDefaults';
import screenSize from '../../mixins/screenSize';
import Loader from '../../library/loader';
import translate from '../../library/translate';
import {space as spaceCase} from 'to-case';
import Message from '../message';
import Tab from './tab';
import Region from './region';
import Group from './group';
import {
    ensureArray,
    assign,
    assignDeep,
    deepSet,
    each,
    reduce,
    find,
    isEmptyObject,
    checkUniqueFieldNames,
    getComponentOption,
    getComponentInitialValue
} from '../../library/toolkit';

const Component = Vue.extend({

    components: {Tab, Region, Group, Message},

    mixins: [screenSize],

    props: {
        tag: {type: String, default: 'form'},
        ModelType: {type: Function, required: true},
        model: {type: Object},
        configure: {type: Function, required: true},
        apiInclude: {type: [Array, String]},
        createRequiresDraft: {type: Boolean, default: false},
        createRelatedStrategy: {type: String, default: 'relatedFirst'},
        resourceSavedMessage: String,
        resourceCreatedMessage: String,
        resourceId: String
    },

    data() {
        return {
            definitions: this.getInitialDefinitions(),
            resourceModel: this.model,
            resolvedDefinitions: undefined,
            definitionsResolved: false,
            formData: undefined,
            selectedTab: undefined,
            statusMessage: null,
            saveInProgress: false,
            saveAllowed: true
        };
    },

    computed: {

        tabItems() {

            const definitions = this.resolvedDefinitions;

            return reduce(definitions && definitions.layout || {}, (tabs, config, key) => {

                config.isTab && tabs.push({
                    caption: config.caption,
                    key
                });

                return tabs;

            }, []);

        },

        activeTab() {

            if (!this.resolvedDefinitions) {
                return this.selectedTab;
            }

            if (!this.selectedTab) {
                return this.tabItems.length ? this.tabItems[0].key : undefined;
            } else {
                return this.tabItems.filter(tab => tab.key === this.selectedTab).length > 0
                    ? this.selectedTab
                    : this.tabItems[0].key
                ;
            }

        }

    },

    watch: {

        breakpoint() {

            const oldFormData = this.formData;

            this.resetDefinitions().configureEdit().then(() => {

                each(this.formData, (value, key) => {
                    if (typeof oldFormData[key] !== 'undefined') {
                        this.formData[key] = oldFormData[key];
                    }
                });

            });

        }

    },

    created() {

        this.configureEdit();

    },

    methods: {

        configureEdit() {

            this.saveAllowed = true;

            this.$emit('beforeConfigure', this);

            if (this.apiInclude) {
                ensureArray(this.apiInclude).forEach(
                    include => include && this.definitions.apiIncludes.push(include)
                );
            }

            const method = this.resourceModel
                ? (this.resourceModel.isNew() ? 'create' : 'edit')
                : (this.resourceId ? 'edit' : 'create')
            ;

            const resourceId = this.resourceModel
                ? (this.resourceModel.get('id') || undefined)
                : (this.resourceId || undefined)
            ;

            const loader = Loader.on();

            return this.bootstrapModel()
                .then(() => Promise.resolve(this.configure({
                    edit: this,
                    method,
                    resourceId,
                    resourceModel: this.resourceModel
                })))
                .then(() => this.setupUI())
                .then(() => this.$emit('afterConfigure', this))
                .then(() => loader.off())
                .catch(error => { loader.off(); return Promise.reject(error); })
            ;

        },

        allowSave(isAllowed = true) {

            this.saveAllowed = isAllowed;
            return this;

        },

        resetDefinitions() {

            this.definitions.observers.forEach(unWatch => unWatch());
            this.definitions.listeners.forEach(item => {
                this.$off(item.eventName, item.callback);
            });
            this.definitionsResolved = false;
            this.definitions = this.getInitialDefinitions();

            return this;

        },

        getInitialDefinitions() {

            return {
                fields: [],
                apiIncludes: [],
                layout: {},
                layoutAdditions: {},
                observers: [],
                listeners: []
            };

        },

        addField(Type, options) {

            (options
                ? [{Type, options}]
                : ensureArray(Type)
            ).forEach(item => {

                const definition = Array.isArray(item)
                    ? {Type: item[0], options: item[1]}
                    : item
                ;

                if (typeof definition.options.visible === 'undefined') {
                    definition.options.visible = true;
                }

                this.definitions.fields.push(definition);

                if (definition.options.layoutReference) {
                    this.addLayoutReference(definition.options.layoutReference);
                }

            });

            return this;

        },

        addLayoutReference(reference) {

            let currentContext = this.definitions.layout;
            let prevPointer;

            reference.split('.').forEach(pointer => {

                if (pointer.indexOf('Tab') >= 0) {

                    if (!currentContext[pointer]) {
                        currentContext.hasTabs = true;
                        currentContext[pointer] = {
                            caption: spaceCase(pointer.replace('Tab', '')),
                            isTab: true
                        };
                    }

                } else if (pointer.indexOf('Region') >= 0) {

                    if (!currentContext[pointer]) {
                        currentContext.hasRegions = true;
                        currentContext[pointer] = {
                            isRegion: true
                        };
                    }

                } else {

                    if (!currentContext[pointer]) {
                        currentContext.hasGroups = true;
                        currentContext[pointer] = {
                            isGroup: true,
                            class: prevPointer === 'sideRegion' ? 'layoutGroupType2' : undefined
                        };
                    }

                }

                currentContext = currentContext[pointer];
                prevPointer = pointer;

            });

        },

        configureLayout(pointer, data) {

            each((typeof data !== 'undefined' ? {[pointer]: data} : pointer), (value, key) => {
                this.definitions.layoutAdditions[key] = value;
            });

            return this;

        },

        buildLayout(layoutConfig, layoutAdditions, fieldDefinitions) {

            const layout = assignDeep({}, layoutConfig);

            fieldDefinitions.forEach(definition => {

                const layoutReference = definition.options.layoutReference;
                const fieldName = definition.options.name;
                const path = (layoutReference ? layoutReference + '.' : '') + 'fields.' + fieldName;

                deepSet(layout, path, definition);

            });

            each(layoutAdditions, (value, key) => {
                deepSet(layout, key, value);
            });

            return layout;

        },

        bootstrapModel() {

            if (this.resourceModel) {

                return Promise.resolve(this.resourceModel);

            } else if (this.resourceId) {

                return this.ModelType.getFromApi({
                    id: this.resourceId,
                    query: {include: this.definitions.apiIncludes}
                }).then(model => {
                    this.resourceModel = model;
                    return model;
                });

            } else if (this.createRequiresDraft) {

                return this.ModelType.create().save().then(model => {

                    this.resourceModel = model;
                    return model;

                });

            } else {

                this.resourceModel = this.ModelType.create();
                return Promise.resolve(this.resourceModel);

            }

        },

        decorateFieldDefinition(definition) {

            const elementType = getComponentOption(definition.Type, 'elementType');
            const layoutReference = definition.options.layoutReference;
            const regionPointer = layoutReference && layoutReference.indexOf('sideRegion') >= 0
                ? 'sideRegion'
                : 'mainRegion'
            ;

            const defaultOptions = formElementDefaults.resourceEdit[regionPointer][elementType];

            definition.options = assignDeep({}, defaultOptions, definition.options);

            assign(definition.options, {
                resourceModel: this.resourceModel,
                errorMessage: null
            });

            delete definition.options.addOnCreate;
            delete definition.options.addOnEdit;

            return definition;

        },

        resolveDefinitions() {

            const definitions = this.definitions;
            const isCreateUI = this.resourceModel.isNew();
            const fields = definitions.fields.filter(definition => {

                const options = definition.options;
                let addIf = true;
                let addOnCreate = true;
                let addOnEdit = true;

                if (typeof options.addIf !== 'undefined') {
                    addIf = Boolean(options.addIf);
                    delete options.addIf;
                }

                if (typeof options.addOnCreate !== 'undefined') {
                    addOnCreate = Boolean(options.addOnCreate);
                    delete options.addOnCreate;
                }

                if (typeof options.addOnEdit !== 'undefined') {
                    addOnEdit = Boolean(options.addOnEdit);
                    delete options.addOnEdit;
                }

                return addIf ? (isCreateUI ? addOnCreate : addOnEdit) : false;

            });

            checkUniqueFieldNames(fields);

            return Promise.all([

                Promise.all(fields.map(fieldDefinition => {
                    return loadDefinitionType(assignDeep({}, fieldDefinition)).then(
                        definition => this.decorateFieldDefinition(definition)
                    );
                }))

            ]).then(([fieldDefinitions]) => {

                return {
                    fields: fieldDefinitions,
                    apiIncludes: definitions.apiIncludes.slice(0),
                    layout: this.buildLayout(
                        definitions.layout, definitions.layoutAdditions, fieldDefinitions
                    )
                };

            });

        },

        getFieldDefaultValues(definitions) {

            return definitions.reduce((values, definition) => {

                values[definition.options.name] = getComponentInitialValue(
                    definition.Type,
                    definition.options
                );
                return values;

            }, {});

        },

        mapModelToFormData() {

            const definitions = this.resolvedDefinitions.fields;
            const model = this.resourceModel;
            const defaultFieldValues = this.getFieldDefaultValues(definitions);

            const modelValues = definitions.reduce((values, definition) => {

                const pointer = definition.options.name;
                let modelValue;

                if (definition.options.relation) {
                    modelValue = model.getRelationshipReferences(pointer);
                    if (Array.isArray(modelValue)) {
                        modelValue = modelValue.join(',');
                    }
                } else {
                    modelValue = model.get(pointer);
                }

                if (typeof modelValue !== 'undefined') {
                    values[pointer] = modelValue;
                }

                return values;

            }, {});

            return assign(defaultFieldValues, modelValues);

        },

        setupUI() {

            return this.resolveDefinitions().then(definitions => {

                this.resolvedDefinitions = definitions;
                this.formData = this.mapModelToFormData();
                this.definitionsResolved = true;
                this.$emit('definitionsResolved');

            });

        },

        selectTab(key) {

            this.selectedTab = key;
            return this;

        },

        showField(fieldName) {

            return this.toggleField(fieldName, true);

        },

        hideField(fieldName) {

            return this.toggleField(fieldName, false);

        },

        toggleField(fieldName, isVisible) {

            this.whenDefinitionsResolved().then(() => {

                const fieldDefinition = find(this.resolvedDefinitions.fields, definition => {
                    return definition.options.name === fieldName;
                });

                if (fieldDefinition) {
                    fieldDefinition.options.visible = typeof isVisible !== 'undefined'
                        ? isVisible
                        : !fieldDefinition.options.visible
                    ;
                }

            });

            return this;

        },

        observe(key, handler, options) {

            this.whenDefinitionsResolved().then(() => {

                this.definitions.observers.push(
                    this.$watch(key, handler, options)
                );

            });

            return this;

        },

        whenDefinitionsResolved() {

            return new Promise(resolve => {

                this.definitionsResolved
                    ? resolve()
                    : this.$once('definitionsResolved', () => resolve());
                ;

            });

        },

        listen(eventName, callback) {

            this.$on(eventName, callback);
            this.definitions.listeners.push({eventName, callback});

            return this;

        },

        listenOnce(eventName, callback) {

            this.$once(eventName, callback);
            this.definitions.listeners.push({eventName, callback});

            return this;

        },

        save() {

            const wasNewModel = this.resourceModel.isNew();
            const loader = Loader.on();

            const onSave = () => {

                this.removeErrorMessages().then(() => {

                    const message = wasNewModel ? this.resourceCreatedMessage : this.resourceSavedMessage;

                    this.statusMessage = message ? {text: message, type: 'messageType1'} : null;
                    this.resetDefinitions();
                    this.configureEdit();

                    this.tag === 'form' && window.scrollTo(0, 0);

                });

                this.$emit('resourceModelSaved', {
                    resourceModel: this.resourceModel,
                    wasCreated: wasNewModel,
                    wasUpdated: !wasNewModel
                });

                this.saveInProgress = false;
                loader.off();

            };

            const onFail = error => {

                if (error.response && error.response.data && error.response.data.errors) {
                    this.setErrorMessages(error.response.data.errors);
                } else {
                    this.$emit('apiError', translate('validation.serverError'));
                }

                this.saveInProgress = false;
                loader.off();

                return Promise.reject(error);

            };

            this.statusMessage = null;

            if (this.saveInProgress || !this.saveAllowed) {
                loader.off();
                return;
            }

            this.saveInProgress = true;

            if (this.createRelatedStrategy === 'relatedFirst') {

                return this.saveRelatedResources().catch(relatedError => {

                    this.setErrorMessages();
                    this.saveInProgress = false;
                    loader.off();
                    return Promise.reject(relatedError);

                }).then(() => {

                    return this.saveMainResource().then(onSave).catch(onFail);

                });

            } else if (this.createRelatedStrategy === 'relatedLast') {

                return this.saveMainResource().catch(onFail).then(() => {

                    return this.saveRelatedResources().then(() => this.resourceModel.fetch({
                        url: this.ModelType.url({
                            id: this.resourceModel.get('id'),
                            query: {include: this.definitions.apiIncludes}
                        })
                    })).then(onSave).catch(relatedError => {

                        this.setErrorMessages([
                            {title: translate('validation.mainEntitySavedWithRelatedErrors')}
                        ]);
                        this.saveInProgress = false;
                        loader.off();
                        return Promise.reject(relatedError);

                    });

                });

            }

        },

        saveMainResource() {

            return this.getFieldInstances().then(instances => {

                const data = {};

                each(instances, instance => {

                    if (instance.readOnly) {
                        // skip readInly instance;
                    } else if (instance.savesFile) {

                        const file = instance.getFile();

                        if (file) {
                            data.files = data.files || {};
                            data.files[instance.name] = file;
                        }

                    } else if (instance.relation) {

                        const relationName = instance.relation.name || instance.name;
                        const relationData = this.getFieldRelationData(instance);
                        data.relationships = data.relationships || {};
                        data.relationships[relationName] = relationData;

                    } else {

                        data.attributes = data.attributes || {};
                        data.attributes[instance.name] = instance.value;

                    }

                });

                if (!isEmptyObject(data)) {
                    return this.resourceModel.save(data);
                }

            });

        },

        getFieldRelationData(fieldInstance) {

            const resourceType = fieldInstance.relation.resourceName || fieldInstance.name;

            if (fieldInstance.relation.type === 'hasMany') {

                return fieldInstance.value.split(',').filter(item => item).map(value => ({
                    type: resourceType,
                    id: value
                }));

            } else {

                return fieldInstance.value !== '' ? {
                    type: resourceType,
                    id: fieldInstance.value
                } : null;

            }

        },

        saveRelatedResources() {

            return this.getFieldInstances().then(instances => {

                const relatedInstances = reduce(instances, (acc, instance) => {

                    if (instance.setMainRelationReference && this.resourceModel.get('id')) {
                        instance.setMainRelationReference(this.resourceModel.get('id'));
                    }

                    if (instance.saveRelatedResources) {
                        acc.push(instance);
                    }

                    return acc;

                }, []);

                return Promise.all(
                    relatedInstances.map(instance => instance.saveRelatedResources())
                );

            });

        },

        removeErrorMessages() {

            return this.whenDefinitionsResolved().then(() => {
                this.resolvedDefinitions.fields.forEach(field => {
                    field.options.errorMessage = null;
                });
            });

        },

        setErrorMessages(errors = []) {

            this.removeErrorMessages().then(() => {

                const globalErrors = [];
                const errorField = bootData('validationErrorField', 'title');

                errors.forEach(errorObj => {

                    if (errorObj.source && errorObj.source.pointer) {

                        const fieldName = errorObj.source.pointer.split('/').slice(-1)[0];
                        const fieldDefinition = find(this.resolvedDefinitions.fields,
                            fieldDefinition => fieldDefinition.options.name === fieldName
                        );

                        if (fieldDefinition) {
                            fieldDefinition.options.errorMessage = errorObj[errorField];
                        } else {
                            globalErrors.push(errorObj[errorField]);
                        }

                    } else {
                        globalErrors.push(errorObj[errorField] || translate('validation.globalErrorsMessage'));
                    }

                });

                if (globalErrors.length === 0) {
                    globalErrors.push(translate('validation.globalErrorsMessage'));
                }

                this.statusMessage = {
                    text: globalErrors.join('. '),
                    type: 'error messageType1',
                    closeAfter: false
                };

                if (this.tag === 'form') {
                    this.focusErrors();
                }

            });

        },

        focusErrors() {

            this.$nextTick(() => {

                const elementWithError = this.$el.querySelector('.formElementWithError');
                const scrollToError = () => elementWithError.scrollIntoView({behavior: 'smooth', block: 'center'});

                if (elementWithError) {

                    if (this.tabItems.length && elementWithError.closest) {
                        this.selectedTab = elementWithError.closest('.tabPanel').getAttribute('tab-key');
                        this.$nextTick(scrollToError);
                    } else {
                        scrollToError();
                    }

                }

            });

        },

        getFieldInstances() {

            return this.whenDefinitionsResolved()
                .then(this.$nextTick())
                .then(() => this.resolvedDefinitions.fields.reduce((registry, field) => {

                    const layoutReference = field.options.layoutReference;
                    const fieldName = field.options.name;

                    const layoutComponent = layoutReference
                        ? layoutReference.split('.').reduce((currentComponent, pointer) => {
                            return currentComponent.$refs[pointer][0];
                        }, this)
                        : this
                    ;

                    registry[fieldName] = layoutComponent.$refs[fieldName][0];
                    return registry;

                }, {}));

        },

        getFieldInstance(name) {

            return this.getFieldInstances().then(instances => instances[name]);

        },

        handleSubmit(e) {

            if (this.tag === 'form') {
                e.preventDefault();
                this.save().catch(e => {});
            }

        }

    }

});

export default Component;

</script>
