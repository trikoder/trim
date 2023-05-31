<template>
    <component
        :is="tag"
        :autocomplete="this.tag === 'form' ? 'off' : undefined"
        :class="{withTabs: resolvedDefinitions
            ? resolvedDefinitions.layout.hasTabs
            : false
        }"
        @submit="handleSubmit"
    >
        <message
            v-if="statusMessage && tabItems.length === 0"
            v-bind="statusMessage"
            @close="statusMessage = null"
        ></message>
        <div
            class="layoutContainer"
            v-if="resolvedDefinitions && resourceModel"
            :class="{
                withTabs: resolvedDefinitions.layout.hasTabs,
                withRegions: resolvedDefinitions.layout.hasRegions,
                editLayoutRegions: resolvedDefinitions.layout.hasRegions
            }"
        >
            <nav class="tabNavType1" v-if="tabItems.length">
                <a :href="getTabUrl(tab.key)" class="tabBtn nBtn"
                    v-for="tab in tabItems"
                    :key="tab.key"
                    :class="{selected: tab.key === activeTab}"
                    @click.prevent="selectTab(tab.key)"
                >{{ tab.caption }}</a>
            </nav>
            <message
                v-if="statusMessage && tabItems.length"
                v-bind="statusMessage"
                @close="statusMessage = null"
            ></message>
            <template v-for="(config, key) in resolvedDefinitions.layout">
                <tab
                    v-if="config.isTab"
                    :layout="config"
                    :formData="formData"
                    :selected="key === activeTab"
                    :key="key"
                    :ref="key"
                    :tab-key="key"
                ></tab>
                <region
                    v-if="config.isRegion"
                    :layout="config"
                    :formData="formData"
                    :key="key"
                    :class="key"
                    :ref="key"
                ></region>
                <group
                    v-if="config.isGroup"
                    :layout="config"
                    :formData="formData"
                    :key="key"
                    :ref="key"
                ></group>
                <component
                    v-if="key === 'fields'"
                    v-for="field in config"
                    :is="toComponent(field.Type)"
                    v-bind="field.options"
                    v-model="formData[field.options.name]"
                    :key="field.options.name"
                    :ref="field.options.name"
                ></component>
            </template>
            <slot name="bottomControls"></slot>
        </div>
        <button v-if="tag === 'form'" class="hidden" type="submit"></button>
    </component>
</template>

<script>

import Vue from 'vue';
import loadDefinitionType from '../../library/loadDefinitionType.js';
import bootData from '../../library/bootData.js';
import formElementDefaults from '../../formElements/elementDefaults.js';
import screenSize from '../../mixins/screenSize.js';
import Loader from '../../library/loader.js';
import translate from '../../library/translate.js';
import {space as spaceCase} from 'to-case';
import Message from '../message.vue';
import Tab from './tab.vue';
import Region from './region.vue';
import Group from './group.vue';
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
} from '../../library/toolkit.js';

const Component = Vue.extend({

    components: {Tab, Region, Group, Message},

    mixins: [screenSize],

    props: {
        tag: {type: String, default: 'form'},
        ModelType: {type: Function, required: true},
        model: {type: Object},
        configure: {type: Function, required: true},
        createRequiresDraft: {type: Boolean, default: false},
        createRelatedStrategy: {type: String, default: 'relatedFirst'},
        resourceSavedMessage: String,
        resourceCreatedMessage: String,
        resourceId: String,
        initialSelectedTab: String,
        getTabUrl: Function
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

            const firstTabKey = this.tabItems[0] && this.tabItems[0].key;
            const tabExists = tabKey => Boolean(this.tabItems.find(
                tab => tab.key === tabKey
            ));

            if (!this.resolvedDefinitions) {
                return this.selectedTab;
            }

            if (this.initialSelectedTab && !this.selectedTab) {
                return tabExists(this.initialSelectedTab)
                    ? this.initialSelectedTab
                    : firstTabKey
                ;
            }

            if (this.selectedTab) {
                return tabExists(this.selectedTab)
                    ? this.selectedTab
                    : firstTabKey
                ;
            }

            return firstTabKey;

        }

    },

    watch: {

        resourceId(newId) {

            this.whenResourceModelReady.then(model => {

                const resourceChanged = newId && newId !== model.get('id');
                const switchedToCreate = !newId;

                if (resourceChanged || switchedToCreate) {
                    this.resetUI().catch(
                        e => this.$emit('systemError', e)
                    );
                }

            });

        },

        breakpoint() {

            const oldFormData = this.formData;

            this.resetDefinitions().configureEdit().then(() => {

                each(this.formData, (value, key) => {
                    if (typeof oldFormData[key] !== 'undefined') {
                        this.formData[key] = oldFormData[key];
                    }
                });

            }).catch(e => this.$emit('systemError', e));

        }

    },

    created() {

        this.configureEdit().catch(e => this.$emit('systemError', e));

    },

    methods: {

        resetUI() {

            this.resourceModel = null;

            return this.resetDefinitions().configureEdit();

        },

        configureEdit() {

            this.saveAllowed = true;

            this.$emit('beforeConfigure', this);

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

            let readyPromise;

            if (this.resourceModel) {

                readyPromise = Promise.resolve(this.resourceModel);

            } else if (this.resourceId) {

                readyPromise = this.ModelType.create().setId(
                    this.resourceId
                ).fetch().then(model => {
                    this.resourceModel = model;
                    return model;
                });

            } else if (this.createRequiresDraft) {

                readyPromise = this.ModelType.create().save().then(model => {
                    this.resourceModel = model;
                    return model;
                });

            } else {

                this.resourceModel = this.ModelType.create();
                readyPromise = Promise.resolve(this.resourceModel);

            }
            this.whenResourceModelReady = readyPromise;
            return readyPromise;

        },

        decorateFieldDefinition(definition) {

            const elementType = getComponentOption(definition.Type, 'elementType') || 'other';
            const layoutReference = definition.options.layoutReference;
            const regionPointer = layoutReference && layoutReference.indexOf('sideRegion') >= 0
                ? 'sideRegion'
                : 'mainRegion'
            ;
            const regionOptions = formElementDefaults.resourceEdit[regionPointer];
            const defaultOptions = regionOptions[elementType] || regionOptions.other;

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
            this.$emit('selectTab', key);
            return this;

        },

        showField(fieldName) {

            return this.toggleField(fieldName, true);

        },

        hideField(fieldName) {

            return this.toggleField(fieldName, false);

        },

        toggleField(fieldName, isVisible) {

            return this.getResolvedFieldDefinition(fieldName).then(definition => {

                definition.options.visible = typeof isVisible !== 'undefined'
                    ? isVisible
                    : !definition.options.visible
                ;

            });

        },

        updateField(fieldName, data) {

            return this.getResolvedFieldDefinition(fieldName).then(definition => {

                each(data, (value, key) => {
                    if (key === 'value') {
                        this.formData[fieldName] = value;
                    } else {
                        definition.options = assign({}, definition.options, {[key]: value});
                    }
                });

            });

        },

        updateAllFields(data) {

            return this.whenDefinitionsResolved().then(resolvedDefinitions => {

                resolvedDefinitions.fields.forEach(definition => {

                    each(data, (value, key) => {
                        if (key === 'value') {
                            this.formData[definition.name] = value;
                        } else {
                            definition.options = assign({}, definition.options, {[key]: value});
                        }
                    });

                });

            });

        },

        getResolvedFieldDefinition(fieldName) {

            return this.whenDefinitionsResolved().then(resolvedDefinitions => {

                return find(resolvedDefinitions.fields, definition => {
                    return definition.options.name === fieldName;
                }) || Promise.reject(
                    new Error('Uknown field: ' + fieldName)
                );

            });

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
                    ? resolve(this.resolvedDefinitions)
                    : this.$once('definitionsResolved', () => resolve(this.resolvedDefinitions));
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

            if (this.currentSavePromise) {
                return this.currentSavePromise;
            }

            if (!this.saveAllowed) {
                return Promise.reject(new Error('Save not allowed'));
            }

            const wasNewModel = this.resourceModel.isNew();

            const onSave = () => {

                this.$emit('resourceModelSaved', {
                    resourceModel: this.resourceModel,
                    wasCreated: wasNewModel,
                    wasUpdated: !wasNewModel
                });

                return this.removeErrorMessages().then(() => {

                    const message = wasNewModel ? this.resourceCreatedMessage : this.resourceSavedMessage;

                    this.statusMessage = message ? {text: message, type: 'messageType1'} : null;
                    this.resetDefinitions();

                    return this.configureEdit();

                });

            };

            const onFail = error => {

                if (this.isValidationError(error)) {
                    this.setErrorMessages(error.response.data.errors);
                    return Promise.reject(new Error('Validation failed'));
                } else {
                    return Promise.reject(error);
                }

            };

            this.statusMessage = null;

            if (this.createRelatedStrategy === 'relatedFirst') {

                this.currentSavePromise = this.saveRelatedResources().catch(relatedError => {

                    this.setErrorMessages();

                    return Promise.reject(this.isValidationError(relatedError)
                        ? new Error('Validation failed')
                        : relatedError
                    );

                }).then(() => {

                    return this.saveMainResource().then(onSave).catch(onFail);

                });

            } else if (this.createRelatedStrategy === 'relatedLast') {

                this.currentSavePromise = this.saveMainResource().catch(onFail).then(() => {

                    return this.saveRelatedResources().then(
                        () => this.resourceModel.fetch()
                    ).then(onSave).catch(relatedError => {

                        this.setErrorMessages([
                            {title: translate('validation.mainEntitySavedWithRelatedErrors')}
                        ]);

                        return Promise.reject(this.isValidationError(relatedError)
                            ? new Error('Validation failed')
                            : relatedError
                        );

                    });

                });

            }

            const loader = Loader.on();

            this.currentSavePromise.then(() => {
                loader.off();
                delete this.currentSavePromise;
            }).catch(e => {
                loader.off();
                delete this.currentSavePromise;
            });

            return this.currentSavePromise;

        },

        saveMainResource() {

            return this.getFieldInstances().then(instances => {

                const data = {};

                each(instances, instance => {

                    if (instance.readOnly || instance.disabled) {
                        // skip read only and disabled instances;
                    } else if (instance.savesFile) {

                        const file = instance.getFile();

                        if (file) {
                            data.files = data.files || {};
                            data.files[instance.name] = file;
                        }

                    } else if (instance.relation) {

                        const relationName = instance.relation.name || instance.name;
                        const relationData = this.getFieldRelationData(instance);
                        const isEmptyArray = Array.isArray(relationData) && relationData.length === 0;

                        if (
                            instance.saveEmptyValue === false &&
                            (relationData === null || isEmptyArray)
                        ) {
                            // skip saving empty relation
                        } else {
                            data.relationships = data.relationships || {};
                            data.relationships[relationName] = relationData;
                        }

                    } else {

                        if (
                            instance.saveEmptyValue === false &&
                            (instance.value === '' || instance.value === null)
                        ) {
                            // skip saving empty attribute
                        } else {
                            data.attributes = data.attributes || {};
                            data.attributes[instance.name] = instance.value;
                        }

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

                return fieldInstance.value !== ''
                    ? {
                        type: resourceType,
                        id: fieldInstance.value
                    }
                    : null;

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
                .then(() => this.$nextTick())
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

            return this.getFieldInstances().then(
                instances => instances[name]
            );

        },

        handleSubmit(e) {

            if (this.tag === 'form') {
                e.preventDefault();
                this.save().catch(
                    e => this.handleSaveError(e)
                );
            }

        },

        isValidationError(error) {

            return Boolean(
                error.response &&
                error.response.data &&
                error.response.data.errors
            );

        },

        handleSaveError(error) {

            const isValidationError = error.message === 'Validation failed';
            const isDisallowedSaveError = error.message === 'Save not allowed';

            if (!isValidationError && !isDisallowedSaveError) {
                this.$emit('systemError', error);
            }

        }

    }

});

export default Component;

</script>
