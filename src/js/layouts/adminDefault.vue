<template>
    <div class="appContainer" :class="popupClasses">
        <main-navigation @storeUpdated="$emit('storeReady')"></main-navigation>
        <component
            v-if="currentControllerType"
            :is="currentControllerType"
            v-bind="controllerProps"
            ref="currentController"
        />
        <component
            v-for="(Component, index) in $options.additionalComponents"
            :is="Component" :key="index"
        ></component>
        <loader></loader>
    </div>
</template>

<script>

import {defineAsyncComponent} from 'vue';
import serviceContainer from '../library/serviceContainer.js';
import loadControllerType from '../library/loadControllerType.js';
import Loader from '../components/loader.vue';

export default {

    components: {
        MainNavigation: defineAsyncComponent(() => serviceContainer.get('MainNavigation').then(MainNavigation => {

            return MainNavigation.getNavigationItems
                ? serviceContainer.get('BaseMainNavigation').then(
                    BaseMainNavigation => {
                        return BaseMainNavigation.extend({methods: MainNavigation, render: BaseMainNavigation.render});
                    }
                )
                : MainNavigation
            ;

        })),
        Loader
    },

    props: {
        controller: Object
    },

    data: () => ({
        currentControllerType: null
    }),

    computed: {

        controllerProps() {

            if (this.controller) {
                return this.controller.method
                    ? undefined
                    : this.controller.params
                ;
            } else {
                return undefined;
            }

        },

        popupClasses() {

            return this.$store.state.popupLevel
                ? ['popupActive', 'popupLevel' + this.$store.state.popupLevel]
                : undefined
            ;

        }

    },

    created() {

        this.whenStoreReady = new Promise(resolve => {
            this.$once('storeReady', resolve);
        });

        this.runController();

    },

    watch: {
        controller() {
            this.runController();
        }
    },

    methods: {

        runController() {

            const controller = this.controller;

            this.whenStoreReady
                .then(() => loadControllerType(controller.name))
                .then(ControllerType => {

                    if (this.currentControllerType !== ControllerType) {
                        this.currentControllerType = ControllerType;
                    }

                    if (controller.method) {

                        this.$nextTick(() => {
                            this.$refs.currentController[controller.method](
                                controller.params,
                                controller.query
                            );
                        });

                    }

                })
            ;

        }

    }

};

</script>
