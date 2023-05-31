import {createApp, toRaw, configureCompat} from 'vue';
import AppView from './components/appView.vue';
import AdminDefaultLayout from './layouts/adminDefault.vue';
import {create as createRouter} from './library/router.js';
import {ensureArray} from './library/toolkit.js';
import translate from './library/translate.js';
import bootData from './library/bootData.js';
import browserFeatures from './library/browserFeatures.js';
import serviceContainer from './library/serviceContainer.js';
import Loader from './library/loader.js';
import viewport from './library/viewport.js';
import appServices from './appServices.js';
import store from './store.js';

Loader.setActions({
    onActivate: () => store.commit('loading', true),
    onDeactivate: () => store.commit('loading', false)
});

viewport.setBreakpoints({
    ranges: {
        small: [0, 979],
        large: [980, Infinity]
    },
    onMatch: breakpoint => store.commit('setBreakpoint', breakpoint)
}).checkBreakpoints();

let routesProvider;
let beforeAdminEnter = () => {};
let auth = false;

serviceContainer.register(appServices);

configureCompat({
    COMPONENT_V_MODEL: false
});

const api = {

    start() {

        browserFeatures.runTests();

        const router = createRouter();

        Promise.resolve(auth
            ? auth.setup({router, beforeAdminEnter})
            : beforeAdminEnter()
        ).then(() => {

            routesProvider(router);
            router.controller('*', 'error', 'Error@pageNotFound');

            /* eslint-disable no-new */
            this.rootView = createApp(AppView);

            this.rootView.config.globalProperties.toComponent = function(component) {
                return toRaw(component);
            };

            this.rootView.use(router);
            this.rootView.use(store);

            this.rootView.mount('#app');

        });

    },

    setLocale(locale) {

        translate.setLocale(locale);
        return this;

    },

    getLocale() {

        return translate.getLocale();

    },

    loadTranslations(items, locale, prefix) {

        translate.add(items, locale, prefix);
        return this;

    },

    setTranslationPluralizationRule(locale, rule, options) {

        translate.setPluralizationRule(locale, rule, options);
        return this;

    },

    interpolateTranslationWith(interpolateRE) {

        translate.interpolateWith(interpolateRE);
        return this;

    },

    setBootData(data) {

        bootData.set(data);
        return this;

    },

    registerServices: function(services) {

        serviceContainer.register(services);
        return this;

    },

    registerRoutes: function(userRoutesProvider) {

        routesProvider = userRoutesProvider;
        return this;

    },

    useAuth: function(api) {

        auth = api;
        return this;

    },

    beforeAdminEnter(callback) {

        beforeAdminEnter = callback;
        return this;

    },

    appendAppComponent(Component) {
        AdminDefaultLayout.additionalComponents = ensureArray(Component);
        return this;
    }

};

export default api;
